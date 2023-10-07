using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Models;
using OficioRed.Services;

namespace OficioRed.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

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
            try
            {
                var usuarios = _usuarioService.GetAll();

                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var usuario = _usuarioService.Get(id);

                return Ok(usuario);
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Create(UsuarioDTO usuarioDTO)
        {
            try
            {
                _usuarioService.Create(usuarioDTO);

                return Ok(new
                {
                    message = "Usuario creado"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UsuarioDTO usuarioDTO) 
        {
            try
            {
                _usuarioService.Update(id, usuarioDTO);

                return Ok(new
                {
                    message = "Usuario actualizado"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _usuarioService.Delete(id);

                return Ok(new
                {
                    message = "Usuario eliminado"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  
            }
        }
    }
}