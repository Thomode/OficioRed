using Microsoft.AspNetCore.Mvc;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Models;
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
    public IActionResult Login(LoginDTO loginDTO)
    {
        var usuario = _accesoService.Authenticate(loginDTO);

        if (usuario != null)
        {
            // Crear el token
            var token = _accesoService.GenerateToken(usuario);
            var tokenResponse = new ResponseToken();
            tokenResponse.User = usuario.User;
            tokenResponse.IdRol = usuario.IdRol;
            tokenResponse.Token = token;

            return Ok(tokenResponse);
        }

        return NotFound("Usuario no encontrado");
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterDTO registerDTO)
    {
        // Crea el usuario nuevo con sus correpondientes valores
        var nuevoUsuario = new Usuario();
        nuevoUsuario.User = registerDTO.User;
        nuevoUsuario.Password = registerDTO.Password;
        nuevoUsuario.IdRol = registerDTO.IdRol;
        nuevoUsuario.Activo = 1;
        nuevoUsuario.Fhalta = DateTime.Now;

        _context.Usuarios.Add(nuevoUsuario);
        _context.SaveChanges();

        return Ok("Usuario Registrado!");
    }
}
