using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Models;
using System;
using System.Linq;
using System.Collections.Generic;

public interface IRatingService
{
    void CreateRating(RatingDTO ratingDTO);
    List<Rating>GetRatingsForProfesional(int idProfesional);
    double GetAverageRatingForProfesional(int idProfesional);
    void UpdateRating(int idRating, RatingDTO updatedRatingDTO);
}

public class RatingService : IRatingService
{
    private readonly DbOficioRedContext _context;

    public RatingService(DbOficioRedContext context)
    {
        _context = context;
    }

    public void CreateRating(RatingDTO ratingDTO)
    {
        var profesional = _context.Profesionals.FirstOrDefault(p => p.IdProfesional == ratingDTO.IdProfesional);

        if (profesional == null)
        {
            throw new Exception("El profesional al que se califica no existe.");
        }

        var rating = new Rating
        {
            IdProfesional = ratingDTO.IdProfesional,
            Puntuacion = ratingDTO.Puntuacion,
            Comentario = ratingDTO.Comentario
        };

        _context.Ratings.Add(rating);
        _context.SaveChanges();
    }

    public List<Rating> GetRatingsForProfesional(int idProfesional)
    {
        var ratings = _context.Ratings.Where(r => r.IdProfesional == idProfesional).ToList();
        return ratings;
    }

    public double GetAverageRatingForProfesional(int idProfesional)
    {
        var ratings = _context.Ratings.Where(r => r.IdProfesional == idProfesional).ToList();

        if (ratings.Count == 0)
        {
            return 0;
        }

        double totalPuntuacion = (double)ratings.Sum(r => r.Puntuacion);
        double averageRating = totalPuntuacion / ratings.Count;

        return averageRating;
    }

    public void UpdateRating(int idRating, RatingDTO updatedRatingDTO)
    {
        var existingRating = _context.Ratings.FirstOrDefault(r => r.IdRating == idRating);

        if (existingRating == null)
        {
            throw new Exception("La calificación que intentas actualizar no existe.");
        }

        existingRating.Puntuacion = updatedRatingDTO.Puntuacion;
        existingRating.Comentario = updatedRatingDTO.Comentario;

        _context.SaveChanges();
    }
}
