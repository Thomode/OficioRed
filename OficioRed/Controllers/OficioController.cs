using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Services;

namespace OficioRed.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OficioController : ControllerBase
{
    private IOficioService _oficioService;

    public OficioController(IOficioService oficioService)
    {
        _oficioService = oficioService;
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id) {
        try
        {
            return Ok(_oficioService.Get(id));
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
            return Ok(_oficioService.GetAll());
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
            _oficioService.Create(oficioDTO);

            return Ok(new
            {
                message = "Oficio creado"
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
            _oficioService.Update(id, oficioDTO);

            return Ok(new
            {
                message = "Oficio actualizado"
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
            _oficioService.Delete(id);

            return Ok(new
            {
                message = "Oficio eliminado"
            });

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
