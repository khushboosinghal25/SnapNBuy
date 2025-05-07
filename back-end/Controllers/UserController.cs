using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using EcommercePlatform.Models;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ProductDbContext _context;

    public AuthController(ProductDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public IActionResult Register(User user)
    {
        if (_context.Users.Any(u => u.Username == user.Username))
            return BadRequest("User already exists");

        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _context.Users.Add(user);
        _context.SaveChanges();

        return Ok("User registered successfully");
    }

    [HttpPost("login")]
    public IActionResult Login(User user)
    {
        var existingUser = _context.Users.FirstOrDefault(u => u.Username == user.Username);
        if (existingUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password))
            return Unauthorized("Invalid credentials");

        var token = GenerateJwtToken(user.Username);
        return Ok(new { Token = token,existingUser });
    }
    
    [HttpGet("profile")]
[Authorize]
public IActionResult GetProfile()
{
    // Access the username claim from the JWT token
    var username = User.FindFirstValue("username");  // or User.Identity.Name

    if (string.IsNullOrEmpty(username))
    {
        return Unauthorized("Invalid token");
    }

    var user = _context.Users.FirstOrDefault(u => u.Username == username);
    if (user == null)
        return NotFound("User not found");

    var profileData = new
    {
        Username = user.Username,
        Email = user.Username.Substring(0, 5),  // Just an example, you can include more data
    };

    return Ok(profileData);
}


   private string GenerateJwtToken(string username)
{
    
    var claims = new[] { new Claim(ClaimTypes.Name, username) };

   
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourStrong256BitKeyHereThatIsExactly32Bytes!")); // 32 bytes = 256 bits
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

   
    var token = new JwtSecurityToken(
        claims: claims, 
        expires: DateTime.Now.AddHours(1), 
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}

}
