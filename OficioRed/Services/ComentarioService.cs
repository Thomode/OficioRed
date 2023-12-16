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
    List<ComentarioResDTO> GetAllByIdProfesional(int IdProfesional);
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

        if (sesion == null)
        {
            throw new AppException("El Usuario no esta logeado");
        }

        var profesional = _context.Profesionals.Find(comentarioDTO.IdProfesional);
        
        if (profesional == null || profesional.Fhbaja != null)
        {
            throw new AppException("Profesional no registrado");
        }

        if (profesional.IdUsuario == sesion.Id)
        {
            throw new Exception("No puede comentarse a sí mismo");
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

    public List<ComentarioResDTO> GetAllByIdProfesional(int IdProfesional)
    {
        var comentarios = _context.Comentarios
            .Where(e => e.IdProfesional == IdProfesional && !e.Fhbaja.HasValue)
            .Include(e => e.IdUsuarioNavigation)
            .ToList();

        var comentarioResDTOs = new List<ComentarioResDTO>();

        foreach(var comentario in comentarios)
        {
            var nombre = "";
            var apellido = "";
            var fotoPerfil = "";

            if(comentario.IdUsuarioNavigation.IdRol == 2)
            {
                var profesional = _context.Profesionals.FirstOrDefault(e => e.IdUsuario == comentario.IdUsuario);

                if(profesional != null)
                {
                    nombre = profesional.Nombre;
                    apellido = profesional.Apellido;
                    fotoPerfil = profesional.FotoPerfil;
                }
            }
            else if(comentario.IdUsuarioNavigation.IdRol == 3)
            {
                var interesado = _context.Interesados.FirstOrDefault(e => e.IdUsuario == comentario.IdUsuario);

                if(interesado != null)
                {
                    nombre = interesado.Nombre; 
                    apellido = interesado.Apellido; 
                    fotoPerfil = interesado.FotoPerfil;
                }
            }

            comentarioResDTOs.Add(new ComentarioResDTO()
            {
                IdComentario = comentario.IdComentario,
                IdProfesional = comentario.IdProfesional,
                IdUsuario = comentario.IdUsuario,
                Comentario1 = comentario.Comentario1,
                Fhalta = comentario.Fhalta,
                Nombre = nombre,
                Apellido = apellido,
                FotoPerfil = fotoPerfil,

            });
        }

        return comentarioResDTOs;
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
