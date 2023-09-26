using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OficioRed.Context;
using OficioRed.Models;

namespace OficioRed.Controllers
{

    [ApiController]
    [Route("[controller]")]

    public class UsuarioController : ControllerBase
    {
        private DbOficioRedContext context;

        public UsuarioController(DbOficioRedContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> ObtenerUsuarios()
        {
            var usuarios = await context.Usuarios.ToListAsync();

            return Ok(usuarios);
        }

    }
}