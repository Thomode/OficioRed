using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Services;

namespace OficioRed.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FavoritoController : ControllerBase
{
    private readonly IFavoritoService _favoritoService;

    public FavoritoController(IFavoritoService favoritoService)
    {
        _favoritoService = favoritoService;
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        try
        {
            var favoritos = _favoritoService.GetAll();

            return Ok(favoritos);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("")]
    public IActionResult GetAllForUser()
    {
        try
        {
            var favoritos = _favoritoService.GetAllForUser();

            return Ok(favoritos);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public IActionResult Create(int idProfesional)
    {
        try
        {
            _favoritoService.Create(idProfesional);

            return Ok(new
            {
                message = "Favorito creado"
            });

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete]
    public IActionResult Delete(int idFavorito)
    {
        try
        {
            _favoritoService.Delete(idFavorito);

            return Ok(new
            {
                message = "Favorito eliminado"
            });

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
