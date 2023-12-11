using AutoMapper;
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
        private readonly IRatingService _ratingService;
        private readonly IMapper _mapper;

        public ProfesionalController(IProfesionalService profesionalService, IRubroService rubroService,IRatingService ratingService, IMapper mapper)
        {
            _profesionalService = profesionalService;
            _rubroService = rubroService;
            _ratingService = ratingService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()   
        {
            try
            {
                var profesionalesResDTO = _profesionalService.GetAll();

                return Ok(profesionalesResDTO);
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

                var profesionalResDTO = new ProfesionalResDTO();

                _mapper.Map(profesional, profesionalResDTO);

                profesionalResDTO.Rubros = _profesionalService.GetRubrosXProfesional(profesionalResDTO.IdProfesional);

                return Ok(profesionalResDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("usuario/{idUsuario}")]
        public IActionResult GetByIdUsuario(int idUsuario)
        {
            try
            {
                var profesional = _profesionalService.GetByIdUsuario(idUsuario);

                var profesionalResDTO = new ProfesionalResDTO();

                _mapper.Map(profesional, profesionalResDTO);

                profesionalResDTO.Rubros = _profesionalService.GetRubrosXProfesional(profesionalResDTO.IdProfesional);

                return Ok(profesionalResDTO);
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

        [HttpPost("asociar-rubro/{idRubro}")]
        public IActionResult AsociarRubroAProfesional(int idRubro)
        {
            try
            {
                // Llama a la función AsociarRubro en el servicio Profesional
                _profesionalService.AsociarRubro(idRubro);
                
                return Ok("Rubro asociado al profesional exitosamente.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("desasociar-rubro/{idRubro}")]
        public IActionResult DesasociarRubroAProfesional(int idRubro)
        {
            try
            {
                // Llama a la función AsociarRubro en el servicio Profesional
                _profesionalService.DesasociarRubro(idRubro);

                return Ok("Rubro desasociado al profesional exitosamente.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Update(ProfesionalUpdateDTO profesionalUpdateDTO)
        {
            try
            {
                _profesionalService.Update(profesionalUpdateDTO);

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


        [HttpGet("{idProfesional}/rubros")]
        public IActionResult GetRubrosXProfesional(int idProfesional)
        {
            try
            {
                var rubros = _profesionalService.GetRubrosXProfesional(idProfesional);
                return Ok(rubros);
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

        [HttpGet("rubros")]
        public IActionResult GetRubros()
        {
            try
            {
                var rubros = _profesionalService.GetRubros();
                return Ok(rubros);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
