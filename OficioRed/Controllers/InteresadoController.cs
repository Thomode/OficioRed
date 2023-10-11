using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Models;
using OficioRed.Services;

namespace OficioRed.Controllers
{
    [ApiController]
    [Route("api/interesados")]
    public class InteresadoController : ControllerBase
    {
        private IInteresadoService _interesadoService;

        public InteresadoController(IInteresadoService interesadoService)
        {
            _interesadoService = interesadoService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var interesados = _interesadoService.GetAll();

                return Ok(interesados);
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
                var interesado = _interesadoService.Get(id);

                return Ok(interesado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Create(InteresadoDTO intersadoDTO)
        {
            try
            {
                _interesadoService.Create(intersadoDTO);

                return Ok(new
                {
                    message = "Interesado creado"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateInteresadoDTO updateInteresadoDTO)
        {
            try
            {
                _interesadoService.Update(id, updateInteresadoDTO);

                return Ok(new
                {
                    message = "Interesado actualizado"
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
                _interesadoService.Delete(id);

                return Ok(new
                {
                    message = "Interesado eliminado"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
