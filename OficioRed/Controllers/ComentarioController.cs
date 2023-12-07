using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Models;
using OficioRed.Services;

namespace OficioRed.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ComentarioController : ControllerBase
{
    private readonly IComentarioService _comentarioService;

    public ComentarioController(IComentarioService comentarioService)
    {
        _comentarioService = comentarioService;
    }

    [HttpGet("{idProfesional}")]
    public IActionResult GetAllByIdProfesional(int idProfesional)
    {
        try
        {
            var comentarios = _comentarioService.GetAllByIdProfesional(idProfesional);

            return Ok(comentarios);

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
            var comentarios = _comentarioService.GetAll();

            return Ok(comentarios);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public IActionResult Create(ComentarioDTO comentarioDTO)
    {
        try
        {
            _comentarioService.Create(comentarioDTO);

            return Ok(new
            {
                message = "Comentario creado"
            });

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
