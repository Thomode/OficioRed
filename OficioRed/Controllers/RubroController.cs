using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Services;

namespace OficioRed.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RubroController : ControllerBase
{
    private IRubroService _rubroService;

    public RubroController(IRubroService rubroService)
    {
        _rubroService = rubroService;
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id) {
        try
        {
            return Ok(_rubroService.Get(id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        try
        {
            return Ok(_rubroService.GetAll());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public IActionResult Create(OficioDTO oficioDTO)
    {
        try
        {
            _rubroService.Create(oficioDTO);

            return Ok(new
            {
                message = "Rubro creado"
            });

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpPut("{id}")]
    public IActionResult Update(int id, OficioDTO oficioDTO) 
    {
        try
        {
           _rubroService.Update(id, oficioDTO);

            return Ok(new
            {
                message = "Rubro actualizado"
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
            _rubroService.Delete(id);

            return Ok(new
            {
                message = "Rubro eliminado"
            });

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
