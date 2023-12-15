using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Helpers;
using OficioRed.Models;

namespace OficioRed.Services;

public interface IFavoritoService
{
    void Create(int idProfesional);
    List<Favorito> GetAllForUser();
    List<Favorito> GetAll();
    void Delete(int idFavorito);
}

public class FavoritoService : IFavoritoService
{
    private readonly DbOficioRedContext _context;
    private readonly IAccesoService _accesoService;

    public FavoritoService(DbOficioRedContext context, IAccesoService accesoService)
    {
        _context = context;
        _accesoService = accesoService;
    }

    public void Create(int idProfesional)
    {
        var sesion = _accesoService.GetCurrentUsuario();

        var profesional = _context.Profesionals.Find(idProfesional);

        if (profesional == null || profesional.Fhbaja != null)
        {
            throw new AppException("Profesional no registrado");
        }

        if (profesional.IdUsuario == sesion.Id)
        {
            throw new Exception("El profesional no se puede guardar como favorito");
        }

        var favorito = new Favorito();
        favorito.IdUsuario = sesion.Id;
        favorito.Fhalta = DateTime.Now;
        favorito.IdProfesional = idProfesional;

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Favoritos.Add(favorito);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al crear el favorito.", ex);

            }
        }
    }

    public void Delete(int idFavorito)
    {
        var sesion = _accesoService.GetCurrentUsuario();

        if (sesion == null)
        {
            throw new AppException("El Usuario no esta logeado");
        }

        var favorito = _context.Favoritos.Find(idFavorito);

        if (favorito == null || favorito.Fhbaja.HasValue)
        {
            throw new AppException("Favorito no encontrado");
        }

        if (favorito.IdUsuario != sesion.Id)
        {
            throw new AppException("El favorito no corresponde a tu usuario");
        }

        favorito.Fhbaja = DateTime.Now;

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí

                _context.Favoritos.Update(favorito);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al eliminar el favorito.", ex);

            }
        }
    }

    public List<Favorito> GetAll()
    {
        return _context.Favoritos.Where(e => !e.Fhbaja.HasValue).ToList();
    }

    public List<Favorito> GetAllForUser()
    {
        var sesion = _accesoService.GetCurrentUsuario();

        if (sesion == null)
        {
            throw new AppException("El Usuario no esta logeado");
        }

        return _context.Favoritos.Where(e =>  e.IdUsuario == sesion.Id && !e.Fhbaja.HasValue).ToList();
    }
}
