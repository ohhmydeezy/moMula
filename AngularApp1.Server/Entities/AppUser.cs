using AngularApp1.Server.Entities;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
    public required string Email { get; set; }
    public int MonthlyIncome { get; set; }
    public int Savings { get; set; }

    public ICollection<UserCard>? Cards { get; set;}
}
