using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class SavingsDto
{
    [Required]
    public int UserId { get; set; }
    public decimal Savings { get; set; }

}