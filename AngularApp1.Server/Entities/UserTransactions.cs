using System.ComponentModel.DataAnnotations.Schema;

namespace AngularApp1.Server.Entities;

public class UserTransactions
{

    public int Id { get; set; }
    public  required string Month { get; set; }
    public decimal BalanceChange { get; set; }

    [ForeignKey("UserCard")]
    public int UserCardId { get; set; }

}
