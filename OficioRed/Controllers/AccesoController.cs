using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OficioRed.Constants;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Models;
using OficioRed.Services;
using OficioRed.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OficioRed.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccesoController : ControllerBase
{
    private DbOficioRedContext _context;
    private IAccesoService _accesoService;


    public AccesoController(DbOficioRedContext context, IAccesoService accesoService)
    {
        _context = context;
        _accesoService = accesoService;
    }

    [HttpGet]
    public IActionResult GetUser()
    {
        var sesion = _accesoService.GetCurrentUsuario();

        if (sesion != null)
        {
            return Ok(sesion);
        }

        return BadRequest("Sesion no encontrada");
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDTO userLogin)
    {
        var user = _accesoService.Authenticate(userLogin);

        if (user != null)
        {
            // Crear el token
            var token = _accesoService.GenerateToken(user);

            return Ok(token);
        }

        return NotFound("Usuario no encontrado");
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterDTO registerUserDTO)
    {
        // Crea el usuario nuevo con sus correpondientes valores
        var newUser = new Usuario();
        newUser.User = registerUserDTO.User;
        newUser.Password = registerUserDTO.Password;
        newUser.Rol = "cliente";
        newUser.Fhalta = DateTime.Now;

        _context.Usuarios.Add(newUser);
        _context.SaveChanges();

        return Ok("Usuario Registrado!");
    }
}
