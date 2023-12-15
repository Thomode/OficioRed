using OficioRed.Context;
using OficioRed.Dtos;
using System;
using System.Linq;
using System.Collections.Generic;
using OficioRed.Models;
using OficioRed.Helpers;
using OficioRed.Services;

public interface IRatingService
{
    void AgregarRating(RatingDTO ratingDTO);
    List<Rating>GetRatingsForProfesional(int idProfesional);
    double GetAverageRatingForProfesional(int idProfesional);
}

public class RatingService : IRatingService
{
    private readonly DbOficioRedContext _context;
    private readonly IAccesoService _accesoService;

    public RatingService(DbOficioRedContext context, IAccesoService accesoService)
    {
        _context = context;
        _accesoService = accesoService; 
    }

    public void AgregarRating(RatingDTO ratingDTO)
    {
        var sesion = _accesoService.GetCurrentUsuario();

        if (sesion == null)
        {
            throw new AppException("El Usuario no esta logeado");
        }

        var profesional = _context.Profesionals.FirstOrDefault(p => p.IdProfesional == ratingDTO.IdProfesional);

        if (profesional == null)
        {
            throw new Exception("El profesional al que se califica no existe.");
        }

        if(profesional.IdUsuario == sesion.Id)
        {
            throw new Exception("El profesional no se puede autocalificar");
        }

        var ratingEncontrado = _context.Ratings.FirstOrDefault(e => e.IdUsuario == sesion.Id && e.IdProfesional == ratingDTO.IdProfesional);

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí

                if (ratingEncontrado == null || ratingEncontrado.Fhbaja.HasValue)
                {
                    var ratingNuevo = new Rating
                    {
                        IdProfesional = ratingDTO.IdProfesional,
                        IdUsuario = sesion.Id,
                        Puntuacion = ratingDTO.Puntuacion,
                        Fhalta = DateTime.Now,
                    };

                    _context.Ratings.Add(ratingNuevo);
                }
                else
                {
                    ratingEncontrado.Puntuacion = ratingDTO.Puntuacion;

                    _context.Ratings.Update(ratingEncontrado);
                }

                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al eliminar el comentario.", ex);

            }
        }
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
}
