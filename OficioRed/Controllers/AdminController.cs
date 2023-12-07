using Microsoft.AspNetCore.Mvc;
using OficioRed.Services;

namespace OficioRed.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminController: ControllerBase
{
    private IUsuarioService _usuarioService;

    public AdminController(IUsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpGet("Dashboard")]
    public IActionResult GetDashboard()
    {
        try
        {
            var usuarios = _usuarioService.GetAll();

            int totalUsuario = 0;
            int cantidadAdmin = 0;
            int cantidadProfesional = 0;
            int cantidadInteresado = 0;

            foreach (var usuario in usuarios)
            {
                if (usuario.IdRol == 1)
                {
                    cantidadAdmin++;
                }
                else if (usuario.IdRol == 2)
                {
                    cantidadProfesional++;
                }
                else if (usuario.IdRol == 3)
                {
                    cantidadInteresado++;
                }

                totalUsuario++;
            }

            var response = new
            {
                totalUsuario,
                cantidadAdmin,
                cantidadProfesional,
                cantidadInteresado
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
