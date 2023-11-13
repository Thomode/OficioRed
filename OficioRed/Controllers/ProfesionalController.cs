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
                var profesionales = _profesionalService.GetAll();

                var profesionalesResDTO = new List<ProfesionalResDTO>();

                _mapper.Map(profesionales, profesionalesResDTO);

                foreach(var p  in profesionalesResDTO)
                {
                    p.rubros = _profesionalService.GetRubrosXProfesional(p.IdProfesional);
                }

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

        //Rating
        [HttpGet("{idProfesional}/ratings")]
        public IActionResult GetRatingsForProfesional(int idProfesional)
        {
            try
            {
                var ratings = _ratingService.GetRatingsForProfesional(idProfesional);
                return Ok(ratings);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{idProfesional}/average-rating")]
        public IActionResult GetAverageRatingForProfesional(int idProfesional)
        {
            try
            {
                var averageRating = _ratingService.GetAverageRatingForProfesional(idProfesional);
                return Ok(averageRating);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{idProfesional}/rate")]
        public IActionResult CreateRatingForProfesional(int idProfesional, RatingDTO ratingDTO)
        {
            try
            {
                _ratingService.CreateRating(ratingDTO);
                return Ok(new { message = "Calificación creada" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{idProfesional}/ratings/{idRating}")]
        public IActionResult UpdateRatingForProfesional(int idProfesional, int idRating, RatingDTO updatedRatingDTO)
        {
            try
            {
                _ratingService.UpdateRating(idRating, updatedRatingDTO);
                return Ok(new { message = "Calificación actualizada" });
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
    }
}
