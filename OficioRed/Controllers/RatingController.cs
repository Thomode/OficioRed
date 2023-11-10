using Microsoft.AspNetCore.Mvc;
using OficioRed.Dtos;
using OficioRed.Services;

[ApiController]
[Route("api/[controller]")]
public class RatingController : ControllerBase
{
    private readonly IRatingService _ratingService;

    public RatingController(IRatingService ratingService)
    {
        _ratingService = ratingService;
    }

    [HttpPost]
    public IActionResult CreateRating(RatingDTO ratingDTO)
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
}
