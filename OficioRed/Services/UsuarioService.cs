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
    void Create(UsuarioDTO usuarioDTO);
    void Update(int id, UsuarioDTO usuario); 
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

    public void Create(UsuarioDTO usuarioDTO)
    {
        if (_context.Usuarios.Any(x => x.User == usuarioDTO.User)) {
            throw new AppException("Usuario ya registrado");
        }

        var usuario = new Usuario();
        usuario.Fhalta = DateTime.Now;

        // usuarioDTO.Password = BCrypt.Net.BCrypt.HashPassword(usuarioDTO.Password);

        _mapper.Map(usuarioDTO, usuario);
        _context.Usuarios.Add(usuario);
        _context.SaveChanges();
    }

    public void Update(int id, UsuarioDTO usuarioDTO)
    {
        var usuario = GetUsuario(id);

        if(usuario == null)
        {
            throw new AppException("Usuario no existe");
        }

        // updateUsuarioDTO.Password = BCrypt.Net.BCrypt.HashPassword(updateUsuarioDTO.Password);

        _mapper.Map(usuarioDTO, usuario);

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
