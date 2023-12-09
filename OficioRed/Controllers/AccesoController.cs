using Microsoft.AspNetCore.Mvc;
using OficioRed.Context;
using OficioRed.Dtos;
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
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDTO loginDTO)
    {
        try
        {
            var tokenResponse = _accesoService.Login(loginDTO);

            return Ok(tokenResponse);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterDTO registerDTO)
    {
        try
        {
            _accesoService.Register(registerDTO);

            return Ok("Usuario Registrado");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
