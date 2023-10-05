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

        _context.Oficios.Add(oficio);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var oficio = getOficio(id);

        oficio.Fhbaja = DateTime.Now;
        _context.Oficios.Remove(oficio);
        _context.SaveChanges();
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

        if (oficio == null)
        {
            throw new AppException("Es oficio no existe");
        }

        _mapper.Map(oficioDTO, oficio);

        _context.Oficios.Update(oficio);
        _context.SaveChanges();
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