using OficioRed.Context;
using OficioRed.Helpers;
using OficioRed.Models;
using BCrypt.Net;
using OficioRed.Dtos;
using AutoMapper;

namespace OficioRed.Services;

public interface IUsuarioService
{
    List<Usuario> GetAll();
    Usuario Get(int id);
    void Create(Usuario usuario);
    void Update(int id, UpdateUsuarioDTO usuario); 
    void Delete(int id);
}

public class UsuarioService: IUsuarioService
{
    private DbOficioRedContext _context;
    private IMapper _mapper;

    public UsuarioService(DbOficioRedContext context, IMapper mapper) 
    { 
        _context = context;
        _mapper = mapper;
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

    public void Update(int id, UpdateUsuarioDTO updateUsuarioDTO)
    {
        var usuario = GetUsuario(id);

        if(usuario == null)
        {
            throw new AppException("Usuario no existe");
        }

        // updateUsuarioDTO.Password = BCrypt.Net.BCrypt.HashPassword(updateUsuarioDTO.Password);

        _mapper.Map(updateUsuarioDTO, usuario);

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
