using OficioRed.Context;
using OficioRed.Helpers;
using OficioRed.Models;
using BCrypt.Net;


namespace OficioRed.Services;

public interface IUsuarioService
{
    List<Usuario> GetAll();
    Usuario Get(int id);
    void Create(Usuario usuario);
    void Update(int id, Usuario usuario); 
    void Delete(int id);
}

public class UsuarioService: IUsuarioService
{
    private DbOficioRedContext _context;

    public UsuarioService(DbOficioRedContext context) 
    { 
        _context = context;
    }

    public List<Usuario> GetAll()
    {
        return _context.Usuarios.Where(e => !e.Fhbaja.HasValue).ToList();
    }

    public Usuario Get(int id) 
    {
        return GetUsuario(id);
    }

    public void Create(Usuario usuario)
    {
        if (_context.Usuarios.Any(x => x.User == usuario.User)) {
            throw new AppException("Usuario ya registrado");
        }

        usuario.Password = BCrypt.Net.BCrypt.HashPassword(usuario.Password);

        _context.Usuarios.Add(usuario);
        _context.SaveChanges();
    }

    public void Update(int id, Usuario usuario)
    {
        var usuarioEncontrado = GetUsuario(id);

        if(usuarioEncontrado.User != usuario.User)
        {
            throw new AppException("Usuario no existe");
        }

        usuario.Password = BCrypt.Net.BCrypt.HashPassword(usuario.Password);

        _context.Usuarios.Update(usuario);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var usuario = GetUsuario(id);
    
        usuario.Fhbaja = DateTime.Now;
        _context.Usuarios.Update(usuario);
        _context.SaveChanges();
        
    }

    private Usuario GetUsuario(int id)
    {
        var usuario = _context.Usuarios.Find(id);

        if ( usuario == null || usuario.Fhbaja != null )
        {
            throw new KeyNotFoundException("Usuario no encontrado");
        }

        return usuario;
    }
}
