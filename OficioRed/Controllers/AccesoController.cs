using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OficioRed.Constants;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OficioRed.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccesoController : ControllerBase
{
    public IConfiguration config;
    public DbOficioRedContext context;
    public AccesoController(IConfiguration _config, DbOficioRedContext _context)
    {
        config = _config;
        context = _context;
    }

    [HttpGet]
    public IActionResult GetUser()
    {
        return Ok(GetCurrentUsuario());
    }

    [HttpPost("login")]
    public IActionResult Login(LoginUserDTO userLogin)
    {
        var user = Authenticate(userLogin);

        if (user != null)
        {
            // Crear el token
            var token = Generate(user);

            return Ok(token);
        }

        return NotFound("Usuario no encontrado");
    }

    [HttpPost("register")]
    public IActionResult Register()
    {
        return Ok("");
    }


    [NonAction]
    private Usuario Authenticate(LoginUserDTO userLogin)
    {
        var currentUser = context.Usuarios
            .FirstOrDefault(x => x.Usuario1 == userLogin.usuario && x.Password == userLogin.password);

        if (currentUser != null)
        {
            return currentUser;
        }

        return null;
    }

    [NonAction]
    private string Generate(Usuario user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // Crear los claims
        var claims = new[]
        {
                new Claim(ClaimTypes.NameIdentifier, user.Usuario1),
                new Claim(ClaimTypes.Role, user.Rol),
            };

        // Crear el token
        var token = new JwtSecurityToken(
            config["Jwt:Issuer"],
            config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(60),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [NonAction]
    private dynamic GetCurrentUsuario()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;

        if (identity != null)
        {
            var userClains = identity.Claims;

            return new
            {
                usuario = userClains.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                rol = userClains.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
            };
        }
        return null;
    }
}
