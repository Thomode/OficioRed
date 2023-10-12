using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Models;
using OficioRed.Services;
using System;
using System.Collections.Generic;

namespace OficioRed.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfesionalController : ControllerBase
    {
        private readonly IProfesionalService _profesionalService;

        public ProfesionalController(IProfesionalService profesionalService)
        {
            _profesionalService = profesionalService;
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

        [HttpPut("{id}")]
        public IActionResult Update(int id, ProfesionalDTO profesionalDTO)
        {
            try
            {
                _profesionalService.Update(id, profesionalDTO);

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
    }
}
