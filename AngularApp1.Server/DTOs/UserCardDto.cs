using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.DTOs;

public class UserCardDto
{
    

    public int Id { get; set; }
    [MaxLength(35, ErrorMessage = "AccountName Max 35 characters")]
    public required string AccountName{ get; set; }
    public decimal OpeningBalance { get; set; }
    public decimal AccountBalance { get; set; }
    
    public string? CardImage { get; set; }

}
