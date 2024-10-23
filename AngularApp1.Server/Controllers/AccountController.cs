using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    private AppUser GetLoggedInUser(ClaimsPrincipal user)
    {
        var currentUserId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var currentUser = context.Users.Include(u => u.Cards).FirstOrDefault(u => u.Id == currentUserId);
        return currentUser!;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        try
        {
            if (await UserExists(registerDto.Username)) return BadRequest("User Already Exists");
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                Email = registerDto.Email,
                MonthlyIncome = registerDto.MonthlyIncome,
                Savings = registerDto.Savings
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.Username,
                Token = tokenService.CreateToken(user)
            };
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error occured while processing request" });
        }

    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(x =>
            x.Username == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            };

            return new UserDto
            {
                UserId = user.Id,
                Username = user.Username,
                Token = tokenService.CreateToken(user)
            };
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error occured while processing request" });
        }
    }

    [Authorize]
    [HttpPut("add-savings")]
    public async Task<ActionResult<int>> AddSavings([FromBody] SavingsDto userSavings)
    {
        try
        {
            var currentUser = GetLoggedInUser(User);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (currentUser == null)
            {
                return NotFound("User not found");
            }

            currentUser.Savings += (int)userSavings.Savings;

            await context.SaveChangesAsync();

            return Ok(currentUser.Savings);
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error occured while processing request" });
        }
    }

    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(x => x.Username.ToLower() == username.ToLower());
    }
}
