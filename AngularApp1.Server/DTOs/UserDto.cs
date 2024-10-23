using AngularApp1.Server.DTOs;

namespace API.DTOs;

public class UserDto
{
    public required string Username { get; set; }
    public required string Token { get; set; }
    public int UserId { get; set; }

    public ICollection<UserCardDto>? Cards { get; set; }
}
