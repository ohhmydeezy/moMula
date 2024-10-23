using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(DataContext context) : BaseApiController
{
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        try
        {
            var users = await context.Users.ToListAsync();
            return Ok(users);
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error occured while processing request" });
        }


    }

    [Authorize]
    [HttpGet("getuserbyid")]
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        try
        {
            var user = await context.Users.Include(u => u.Cards!).ThenInclude(uc => uc.Transactions).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound();

            return Ok(user);
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error occured while processing request" });
        }


    }
}
