using AutoMapper;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Helpers;
using OficioRed.Models;

namespace OficioRed.Services;

public interface IRubroService
{
    List<Rubro> GetAll();
    Rubro Get(int id);
    void Create(RubroDTO oficioDTO);
    void Update(int id, RubroDTO oficioDTO);
    void Delete(int id);
}

public class RubroService : IRubroService
{
    private DbOficioRedContext _context;
    private IMapper _mapper;

    public RubroService(DbOficioRedContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void Create(RubroDTO oficioDTO)
    {
        if(_context.Rubros.Any(e => e.Nombre == oficioDTO.Nombre && e.Fhbaja.HasValue))
        {
            throw new AppException("Rubro ya registrado");
        }

        var rubro = new Rubro();
        rubro.Nombre = oficioDTO.Nombre; 
        rubro.Fhalta = DateTime.Now;

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Rubros.Add(rubro);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al crear el rubro.", ex);

            }
        }
    }

    public void Delete(int id)
    {
        var rubro = getRubroById(id);

        rubro.Fhbaja = DateTime.Now;
        
        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Rubros.Update(rubro);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al eliminar el rubro.", ex);

            }
        }
    }

    public Rubro Get(int id)
    {
        return getRubroById(id);
    }

    public List<Rubro> GetAll()
    {
        return _context.Rubros.Where(e => !e.Fhbaja.HasValue).ToList();
    }

    public void Update(int id, RubroDTO oficioDTO)
    {
        var rubro = getRubroById(id);

        if (_context.Rubros.Any(e => e.Nombre == oficioDTO.Nombre))
        {
            throw new AppException("Nombre de rubro ya registrado");
        }

        if (rubro == null)
        {
            throw new AppException("Es rubro no existe");
        }

        _mapper.Map(oficioDTO, rubro);

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // Realiza tus operaciones de base de datos aquí
                _context.Rubros.Update(rubro);
                _context.SaveChanges();

                // Si todo va bien, haz un commit
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Si ocurre un error, realiza un rollback
                transaction.Rollback();
                throw new Exception("Error al actualizar el rubro.", ex);
            }
        }
    }

    private Rubro getRubroById(int id)
    {
        var rubro = _context.Rubros.Find(id);

        if (rubro == null || rubro.Fhbaja != null)
        {
            throw new KeyNotFoundException("Rubro no encontrado");
        }

        return rubro;
    }
}