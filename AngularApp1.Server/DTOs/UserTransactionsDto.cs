using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.DTOs;

public class UserTransactionsDto
{
    public int CardId { get; set; }
    [MaxLength(9, ErrorMessage = "Month Max 9 characters")]
    public required string Month { get; set; }
    public decimal BalanceChange { get; set; }

}
