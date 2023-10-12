using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OficioRed.Services;


public interface IAccesoService
{
    public Usuario? Authenticate(LoginDTO userLogin);
    public string GenerateToken(Usuario user);
    public SesionDTO? GetCurrentUsuario();
}

public class AccesoService: IAccesoService
{
    private DbOficioRedContext _context;
    private IConfiguration _config;
    private IHttpContextAccessor _contextAccessor;

    public AccesoService(DbOficioRedContext context, IConfiguration config, IHttpContextAccessor contextAccessor)
    {
        _context = context;
        _config = config;
        _contextAccessor = contextAccessor;
    }

    public Usuario? Authenticate(LoginDTO loginDto)
    {
        var currentUser = _context.Usuarios
            .FirstOrDefault(x => x.User == loginDto.User && x.Password == loginDto.Password);

        if (currentUser != null)
        {
            return currentUser;
        }

        return null;
    }

    public string GenerateToken(Usuario user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // Crear los claims
        var claims = new[]
        {
                new Claim(ClaimTypes.NameIdentifier, user.IdUsuario.ToString()),
                new Claim(ClaimTypes.Name, user.User),
                new Claim(ClaimTypes.Role, user.Rol),
            };

        // Crear el token
        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(60),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public SesionDTO? GetCurrentUsuario()
    {
        var identity = _contextAccessor.HttpContext.User.Identity as ClaimsIdentity;

        if (identity != null)
        {
            var userClains = identity.Claims;

            var sesion = new SesionDTO();
            sesion.Id = int.Parse(userClains.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value);
            sesion.User = userClains.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value;
            sesion.Rol = userClains.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value;

            return sesion;      
        }

        return null;
    }
}
