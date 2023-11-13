using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Services;

namespace OficioRed.Controllers;

[Route("api/[controller]")]
[ApiController]
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
    public IActionResult Create(InteresadoDTO interesadoDTO)
    {
        try
        {
            _interesadoService.Create(interesadoDTO);

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

    [HttpPut]
    public IActionResult Update(InteresadoUpdateDTO interesadoUpdateDTO)
    {
        try
        {
            _interesadoService.Update(interesadoUpdateDTO);

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

    [HttpPost("upload")]
    public async Task<IActionResult> SubirFotoPerfil([FromForm] ArchivoDTO archivoDTO)
    {
        try
        {
            Stream image = archivoDTO.Archivo.OpenReadStream();
            var interesado = await _interesadoService.SubirFotoPerfil(image, archivoDTO.Archivo.FileName);

            return Ok(new
            {
                message = "Foto de Interesado subida",
                url = interesado.FotoPerfil
            });

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
