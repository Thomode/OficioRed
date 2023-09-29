using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OficioRed.Context;
using OficioRed.Models;
using OficioRed.Services;

namespace OficioRed.Controllers
{

    [ApiController]
    [Route("[controller]")]

    public class UsuarioController : ControllerBase
    {
        private IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var usuarios = _usuarioService.GetAll();

            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var usuario = _usuarioService.Get(id);

            return Ok(usuario);
        }

        [HttpPost]
        public IActionResult Create(Usuario usuario)
        {
            _usuarioService.Create(usuario);

            return Ok(new
            {
                message = "Usuario creado"
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Usuario usuario) 
        {
            _usuarioService.Update(id, usuario);

            return Ok(new
            {
                message = "Usuario actualizado"
            });
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _usuarioService.Delete(id);

            return Ok(new
            {
                message = "Usuario eliminado"
            });
        }
    }
}