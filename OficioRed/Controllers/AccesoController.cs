using Microsoft.AspNetCore.Mvc;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Models2;
using OficioRed.Services;
using Org.BouncyCastle.Bcpg;

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
        try
        {
            var sesion = _accesoService.GetCurrentUsuario();

            if (sesion != null)
            {
                return Ok(sesion);
            }

            return BadRequest("Sesion no encontrada");
        }

        catch (Exception ex)
        {
            return BadRequest("Sesion no encontrada");
        }
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDTO userLogin)
    {
        var user = _accesoService.Authenticate(userLogin);

        if (user != null)
        {
            // Crear el token
            var token = _accesoService.GenerateToken(user);
            var tokenResponse = new ResponseToken();
            tokenResponse.User = user.Usuario1;
            tokenResponse.IdRol = (int)user.IdRol;
            tokenResponse.Token = token;

            return Ok(tokenResponse);
        }

        return NotFound("Usuario no encontrado");
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterDTO registerUserDTO)
    {
        // Crea el usuario nuevo con sus correpondientes valores
        var newUser = new Usuario();
        newUser.Usuario1 = registerUserDTO.User;
        newUser.Password = registerUserDTO.Password;
        newUser.IdRol = registerUserDTO.IdRol;
        newUser.Fhalta = DateTime.Now;

        _context.Usuarios.Add(newUser);
        _context.SaveChanges();

        return Ok("Usuario Registrado!");
    }
}
