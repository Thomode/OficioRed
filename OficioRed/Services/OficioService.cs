using AutoMapper;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Helpers;
using OficioRed.Models;

namespace OficioRed.Services;

public interface IOficioService
{
    List<Oficio> GetAll();
    Oficio Get(int id);
    void Create(OficioDTO oficioDTO);
    void Update(int id, OficioDTO oficioDTO);
    void Delete(int id);
}

public class OficioService : IOficioService
{
    private DbOficioRedContext _context;
    private IMapper _mapper;

    public OficioService(DbOficioRedContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void Create(OficioDTO oficioDTO)
    {
        if(_context.Oficios.Any(e => e.Nombre == oficioDTO.Nombre))
        {
            throw new AppException("Oficio ya registrado");
        }

        var oficio = new Oficio();
        oficio.Nombre = oficioDTO.Nombre; 
        oficio.Fhalta = DateTime.Now;

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Oficios.Add(oficio);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al crear el oficio.", ex);

            }
        }
    }

    public void Delete(int id)
    {
        var oficio = getOficio(id);

        oficio.Fhbaja = DateTime.Now;
        
        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Oficios.Update(oficio);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al eliminar el oficio.", ex);

            }
        }
    }

    public Oficio Get(int id)
    {
        return getOficio(id);
    }

    public List<Oficio> GetAll()
    {
        return _context.Oficios.Where(e => !e.Fhbaja.HasValue).ToList();
    }

    public void Update(int id, OficioDTO oficioDTO)
    {
        var oficio = getOficio(id);

        if (_context.Oficios.Any(e => e.Nombre == oficioDTO.Nombre))
        {
            throw new AppException("Nombre de oficio ya registrado");
        }

        if (oficio == null)
        {
            throw new AppException("Es oficio no existe");
        }

        _mapper.Map(oficioDTO, oficio);

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Oficios.Update(oficio);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al actualizar el oficio.", ex);
            }
        }
    }

    private Oficio getOficio(int id)
    {
        var oficio = _context.Oficios.Find(id);

        if (oficio == null || oficio.Fhbaja != null)
        {
            throw new KeyNotFoundException("Oficio no encontrado");
        }

        return oficio;
    }
}