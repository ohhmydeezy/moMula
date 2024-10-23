using System.ComponentModel.DataAnnotations;
namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(70, ErrorMessage = "Username Max 70 characters")]
    public required string Username { get; set; }
    [Required]
    [MaxLength(50, ErrorMessage = "Password Max 50 characters")]
    public required string Password { get; set; }
    [Required]
    public required string Email { get; set; }
    [Required]
    public int MonthlyIncome { get; set; }
    public int Savings { get; set; }

}
