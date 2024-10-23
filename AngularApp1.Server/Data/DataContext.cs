using AngularApp1.Server.Entities;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{

    public DbSet<AppUser> Users { get; set; }
    public DbSet<UserCard> Cards { get; set; }
    public DbSet<UserTransactions> Transactions { get; set; }
}
