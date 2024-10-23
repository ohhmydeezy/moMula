using System.ComponentModel.DataAnnotations.Schema;

namespace AngularApp1.Server.Entities;

public class UserCard
{
    public int Id { get; set; }
    public required string AccountName { get; set; }
    public decimal OpeningBalance { get; set; }
    public decimal AccountBalance { get; set; }
    public string? CardImage { get; set; }
    public ICollection<UserTransactions>? Transactions { get; set; }
    
    [ForeignKey("User")]
    public int AppUserId { get; set; }
}
