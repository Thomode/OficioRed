using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Models;
using OficioRed.Services;
using System;
using System.Collections.Generic;
using static System.Net.Mime.MediaTypeNames;

namespace OficioRed.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfesionalController : ControllerBase
    {
        private readonly IProfesionalService _profesionalService;
        private readonly IRubroService _rubroService;

        public ProfesionalController(IProfesionalService profesionalService, IRubroService rubroService)
        {
            _profesionalService = profesionalService;
            _rubroService = rubroService; 
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var profesionales = _profesionalService.GetAll();
                return Ok(profesionales);
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
                var profesional = _profesionalService.Get(id);
                return Ok(profesional);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Create(ProfesionalDTO profesionalDTO)
        {
            try
            {
                _profesionalService.Create(profesionalDTO);

                return Ok(new
                {
                    message = "Profesional creado"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("asociar-rubro/{rubroId}")]
        public IActionResult AsociarRubroAProfesional(int rubroId)
        {
            try
            {
                // Llama a la función AsociarRubro en el servicio Profesional
                _profesionalService.AsociarRubro(rubroId);

                return Ok("Rubro asociado al profesional exitosamente.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{id}")]
        public IActionResult Update(ProfesionalDTO profesionalDTO)
        {
            try
            {
                _profesionalService.Update(profesionalDTO);

                return Ok(new
                {
                    message = "Profesional actualizado"
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
                _profesionalService.Delete(id);

                return Ok(new
                {
                    message = "Profesional eliminado"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("upload")]
        public async Task<IActionResult> SubirFotoPerfil([FromForm] ArchivoDTO archivoDTO)
        {         
            try
            {
                Stream image = archivoDTO.Archivo.OpenReadStream();
                var profesional = await _profesionalService.SubirFotoPerfil(image, archivoDTO.Archivo.FileName);

                return Ok(new
                {
                    message = "Foto de Profesional subida",
                    url = profesional.FotoPerfil
                });

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }        
        }
    }
}
