using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OficioRed.Constants;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Models;
using OficioRed.Utils;
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

    public AccesoController(IConfiguration config, DbOficioRedContext context)
    {
        this.config = config;
        this.context = context;
    }

    [HttpGet]
    public IActionResult GetUser()
    {
        return Ok(GetCurrentUsuario());
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDTO userLogin)
    {
        var user = Authenticate(userLogin);

        if (user != null)
        {
            // Crear el token
            var token = GenerateToken(user);

            return Ok(token);
        }

        return NotFound("Usuario no encontrado");
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterDTO registerUserDTO)
    {
        // Crea el usuario nuevo con sus correpondientes valores
        var newUser = new Usuario();
        newUser.User = registerUserDTO.Usuario;
        newUser.Password = registerUserDTO.Password;
        newUser.Rol = "cliente";
        newUser.Fhalta = DateTime.Now;

        context.Usuarios.Add(newUser);
        context.SaveChanges();

        return Ok("Usuario Registrado!");
    }

    [NonAction]
    private Usuario Authenticate(LoginDTO userLogin)
    {
        var currentUser = context.Usuarios
            .FirstOrDefault(x => x.User == userLogin.Usuario && x.Password == userLogin.Password);

        if (currentUser != null)
        {
            return currentUser;
        }

        return null;
    }

    [NonAction]
    private string GenerateToken(Usuario user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // Crear los claims
        var claims = new[]
        {
                new Claim(ClaimTypes.NameIdentifier, user.User),
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
