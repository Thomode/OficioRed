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

        Console.WriteLine("Comentario");
        Console.WriteLine(comentario.IdUsuario);
        Console.WriteLine(comentario.IdProfesional);
        Console.WriteLine(comentario.Comentario1);

        _context.Comentarios.Add(comentario);
        _context.SaveChanges();

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                

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
}
