using OficioRed.Models;
using OficioRed.Dtos;
using OficioRed.Context;
using OficioRed.Helpers;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace OficioRed.Services;

public interface IComentarioService
{
    void Create(ComentarioDTO comentarioDTO);
    List<Comentario> GetAllByIdProfesional(int IdProfesional);
    List<Comentario> GetAll();
    void Update(ComentarioUpdateDTO comentarioUpdateDTO);
    void Delete(int idComentario);
}

public class ComentarioService : IComentarioService
{
    private readonly DbOficioRedContext _context;
    private readonly IAccesoService _accesoService;
    private readonly IMapper _mapper;

    public ComentarioService(DbOficioRedContext context, IAccesoService accesoService, IMapper mapper)
    {
        _context = context;
        _accesoService = accesoService;
        _mapper = mapper;
    }

    public void Create(ComentarioDTO comentarioDTO)
    {
        var sesion = _accesoService.GetCurrentUsuario();

        var profesional = _context.Profesionals.Find(comentarioDTO.IdProfesional);
        
        if (profesional == null || profesional.Fhbaja != null)
        {
            throw new AppException("Profesional no registrado");
        }

        var comentario = new Comentario();
        comentario.IdUsuario = sesion.Id;
        comentario.Fhalta = DateTime.Now;

        _mapper.Map(comentarioDTO, comentario);      

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Comentarios.Add(comentario);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al crear el comentario.", ex);

            }
        }
    }

    public void Delete(int idComentario)
    {
        var sesion = _accesoService.GetCurrentUsuario();

        if (sesion == null)
        {
            throw new AppException("El Usuario no esta logeado");
        }

        var comentario = _context.Comentarios.Find(idComentario);

        if (comentario == null || comentario.Fhbaja.HasValue)
        {
            throw new AppException("Comentario no encontrado");
        }

        if (comentario.IdUsuario != sesion.Id)
        {
            throw new AppException("El comentario no corresponde a tu usuario");
        }

        comentario.Fhbaja = DateTime.Now;

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí

                _context.Comentarios.Update(comentario);
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

    public List<Comentario> GetAll()
    {
        return _context.Comentarios.Where(e => !e.Fhbaja.HasValue).ToList();
    }

    public List<Comentario> GetAllByIdProfesional(int IdProfesional)
    {
        return _context.Comentarios
            .Where(e => e.IdProfesional == IdProfesional && !e.Fhbaja.HasValue)
            .Include(e => e.IdUsuarioNavigation)
            .Include(e => e.IdProfesionalNavigation)
            .ToList();
    }

    public void Update(ComentarioUpdateDTO comentarioUpdateDTO)
    {
        var sesion = _accesoService.GetCurrentUsuario();

        if (sesion == null)
        {
            throw new AppException("El Usuario no esta logeado");
        }

        var comentario = _context.Comentarios.Find(comentarioUpdateDTO.IdComentario);

        if (comentario == null || comentario.Fhbaja.HasValue)
        {
            throw new AppException("Comentario no encontrado");
        }

        if(comentario.IdUsuario != sesion.Id)
        {
            throw new AppException("El comentario no corresponde a tu usuario");
        }

        comentario.Comentario1 = comentarioUpdateDTO.Comentario1;

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí

                _context.Comentarios.Update(comentario);
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
}
