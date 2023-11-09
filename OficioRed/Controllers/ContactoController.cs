using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Services;

namespace OficioRed.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContactoController : ControllerBase
{
    private IContactoService _contactoService;

    public ContactoController(IContactoService contactoService)
    {
        _contactoService = contactoService;
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        try
        {
            return Ok(_contactoService.Get(id));
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
            return Ok(_contactoService.GetAll());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public IActionResult Create(ContactoDTO contactoDTO)
    {
        try
        {
            _contactoService.Create(contactoDTO);

            return Ok(new
            {
                message = "Contacto creado"
            });

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpPut("{id}")]
    public IActionResult Update(int id, ContactoDTO contactoDTO)
    {
        try
        {
            _contactoService.Update(id, contactoDTO);

            return Ok(new
            {
                message = "Contacto actualizado"
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
            _contactoService.Delete(id);

            return Ok(new
            {
                message = "Contacto eliminado"
            });

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
