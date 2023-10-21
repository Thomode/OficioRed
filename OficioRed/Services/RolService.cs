using OficioRed.Context;
using OficioRed.Models;

namespace OficioRed.Services;

public interface IRolService
{
    List<Rol> GetAll();
}
public class RolService : IRolService
{
    private DbOficioRedContext _context;

    public RolService(DbOficioRedContext context)
    {
        _context = context; 
    }
    public List<Rol> GetAll()
    {
        return _context.Rols.ToList();
    }
}
