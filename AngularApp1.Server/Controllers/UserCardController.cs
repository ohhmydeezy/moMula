using System.Security.Claims;
using AngularApp1.Server.DTOs;
using AngularApp1.Server.Entities;
using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using Image = SixLabors.ImageSharp.Image;

namespace AngularApp1.Server.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserCardController(DataContext context) : BaseApiController
    {
        private AppUser? GetLoggedInUser(ClaimsPrincipal user)
        {

            var currentUserId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var currentUser = context.Users.Include(u => u.Cards).FirstOrDefault(u => u.Id == currentUserId);
            if (currentUser == null) return null;

            return currentUser;
        }

        private static Color GenerateColorFromNumber(string cardId)
        {
            using var md5 = System.Security.Cryptography.MD5.Create();
            byte[] hash = md5.ComputeHash(System.Text.Encoding.UTF8.GetBytes(cardId));

            byte r = hash[0];
            byte g = hash[1];
            byte b = hash[2];

            return Color.FromRgb(r, g, b);
        }

        private static void ApplyColorTint(Image<Rgba32> image, Rgba32 color, float alpha, byte whiteThreshold)
        {
            int width = image.Width;
            int height = image.Height;

            // Iterate over each pixel and blend with the tint color
            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    Rgba32 originalColor = image[x, y];

                    // Check if the pixel is close to white
                    if (originalColor.R > whiteThreshold && originalColor.G > whiteThreshold && originalColor.B > whiteThreshold)
                    {
                        continue;
                    }

                    // Blend the color
                    byte r = (byte)(originalColor.R * (1 - alpha) + color.R * alpha);
                    byte g = (byte)(originalColor.G * (1 - alpha) + color.G * alpha);
                    byte b = (byte)(originalColor.B * (1 - alpha) + color.B * alpha);

                    image[x, y] = new Rgba32(r, g, b, originalColor.A);
                }
            }
        }

        private async Task<bool> CardExists(string AccountName)
        {
            return await context.Cards.AnyAsync(x => x.AccountName.ToLower() == AccountName.ToLower());
        }

        [Authorize]
        [HttpPost("add-card")]
        public async Task<ActionResult<UserCardDto>> AddUserCard(UserCardDto userCardDto)
        {
            try
            {
                if (await CardExists(userCardDto.AccountName)) return BadRequest("Card Already Exists");
                var currentUser = GetLoggedInUser(User);

                var card = new UserCard
                {
                    AccountName = userCardDto.AccountName,
                    OpeningBalance = userCardDto.OpeningBalance,
                    AccountBalance = userCardDto.OpeningBalance,
                    CardImage = userCardDto.CardImage,
                };

                Random rnd = new Random();
                int rndNumber = rnd.Next(1000, 9999);

                // Use the Id of the UserCard to generate a color
                Rgba32 cardColor = GenerateColorFromNumber(rndNumber.ToString());

                using (Image<Rgba32> image = Image.Load<Rgba32>("wwwroot/Images/Credit_Card.png"))
                {
                    // Apply a color tint manually, skipping white pixels
                    ApplyColorTint(image, cardColor, 0.8f, 128);

                    using (var memoryStream = new MemoryStream())
                    {
                        image.SaveAsPng(memoryStream);
                        var inputAsString = Convert.ToBase64String(memoryStream.ToArray());
                        card.CardImage = inputAsString;
                    }
                }

                currentUser?.Cards?.Add(card);
                await context.SaveChangesAsync();

                return new UserCardDto
                {
                    Id = card.Id,
                    AccountName = card.AccountName,
                    OpeningBalance = card.OpeningBalance,
                    AccountBalance = card.OpeningBalance,
                    CardImage = card.CardImage
                };
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Server error occured while processing add Card request" });
            }

        }

        [Authorize]
        [HttpGet("getcardbyid")]
        public async Task<ActionResult<UserCard>> GetindividualCard(int cardId)
        {
            try
            {
                var card = await context.Cards.Include(c => c.Transactions).FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return NotFound();

                return Ok(card);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Server error occured while processing Card request" });
            }
        }

        [Authorize]
        [HttpGet("cards")]
        public ActionResult<IEnumerable<UserCardDto>> GetCards()
        {
            try
            {
                var currentUser = GetLoggedInUser(User);

                if (currentUser?.Id == 0)
                {
                    return Unauthorized("User Unauthorized");
                }
                // Filter the cards by the current user's ID
                var cards = currentUser?.Cards?
                    .Select(c => new UserCard
                    {
                        Id = c.Id,
                        AccountName = c.AccountName,
                        OpeningBalance = c.OpeningBalance,
                        AccountBalance = c.AccountBalance,
                        CardImage = c.CardImage,
                        Transactions = c.Transactions
                    })
                    .ToList();

                return Ok(cards);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Error occured while processing request" });
            }

        }

        [Authorize]
        [HttpPut("add-payment")]
        public async Task<ActionResult<UserTransactionsDto>> AddAccountPayment([FromBody] UserTransactionsDto userTransactions)
        {
            try
            {
                var currentUser = GetLoggedInUser(User);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userCard = await context.Cards.Include(c => c.Transactions).FirstOrDefaultAsync(c => c.Id == userTransactions.CardId);
                if (userCard == null)
                {
                    return NotFound("Card not found");
                }

                userCard.AccountBalance += userTransactions.BalanceChange;

                if (currentUser?.Id == null)
                {
                    return Unauthorized("Invalid user ID");
                }

                var newTransaction = new UserTransactions
                {
                    BalanceChange = userTransactions.BalanceChange,
                    Month = userTransactions.Month,
                };

                userCard?.Transactions?.Add(newTransaction);

                await context.SaveChangesAsync();

                return Ok(userTransactions);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Server error occured while processing payment request" });
            }
        }

        [Authorize]
        [HttpDelete("delete-card")]
        public async Task<IActionResult> DeleteCard(int Id)
        {
            try
            {
                var card = await context.Cards.FindAsync(Id);
                if (card == null)
                {
                    return NotFound();
                }
                context.Cards.Remove(card);

                await context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Server error occured while processing delete request" });
            }

        }
    }
}
