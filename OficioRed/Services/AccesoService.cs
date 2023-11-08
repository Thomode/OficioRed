using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using OficioRed.Context;
using OficioRed.Dtos;
using OficioRed.Helpers;
using OficioRed.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OficioRed.Services;


public interface IAccesoService
{
    ResponseToken Login(LoginDTO loginDTO);
    void Register(RegisterDTO registerDTO);
    Usuario? Authenticate(LoginDTO userLogin);
    string GenerateToken(Usuario user);
    SesionDTO? GetCurrentUsuario();
}

public class AccesoService: IAccesoService
{
    private DbOficioRedContext _context;
    private IConfiguration _config;
    private IHttpContextAccessor _contextAccessor;
    private IUsuarioService _usuarioService;

    public AccesoService(DbOficioRedContext context, IConfiguration config, IHttpContextAccessor contextAccessor, IUsuarioService usuarioService)
    {
        _context = context;
        _config = config;
        _contextAccessor = contextAccessor;
        _usuarioService = usuarioService;
    }

    public Usuario? Authenticate(LoginDTO loginDto)
    {
        var usuario = _context.Usuarios
            .FirstOrDefault(x => x.User == loginDto.User);

        if (usuario != null)
        {
            if (usuario.Password != loginDto.Password)
            {
                throw new AppException("Password incorrecta");
            }
            return usuario;
        }

        return null;
    }

    public string GenerateToken(Usuario user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // Crear los claims
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.IdUsuario.ToString()),
            new Claim(ClaimTypes.Name, user.User),
            new Claim(ClaimTypes.Role, user.IdRol.ToString())
        };

        // Crear el token
        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(60),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public SesionDTO? GetCurrentUsuario()
    {
        var identity = _contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
        Console.WriteLine(identity);
        if (identity != null)
        {
            var userClains = identity.Claims;
            Console.WriteLine(userClains);
            var sesion = new SesionDTO();

            try
            {
                Console.WriteLine(userClains.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value);
                Console.WriteLine(userClains.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value);
                Console.WriteLine(userClains.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value);
                sesion.Id = int.Parse(userClains.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value);
                sesion.User = userClains.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value;
                sesion.IdRol = int.Parse(userClains.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value);
            }
            catch (Exception ex)
            {
                throw new AppException("Error al obtener la sesion actual");
            }

            return sesion;
        }

        return null;
    }

    public ResponseToken Login(LoginDTO loginDTO)
    {
        var usuario = _context.Usuarios
            .FirstOrDefault(x => x.User == loginDTO.User);

        if (usuario == null)
        {
            throw new Exception("Usuario no encontrado");
        }

        if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, usuario.Password))
        {
            throw new Exception("Password incorrecta");
        }

        // Crear el token
        var token = GenerateToken(usuario);

        var tokenResponse = new ResponseToken();
        tokenResponse.Id = usuario.IdUsuario;
        tokenResponse.User = usuario.User;
        tokenResponse.IdRol = usuario.IdRol;
        tokenResponse.Token = token;

        return tokenResponse;
    }

    public void Register(RegisterDTO registerDTO)
    {
        if (registerDTO.IdRol == 2)
        {
            throw new AppException("Usuario con ese rol no esta permitido");
        }

        // Crea el usuario nuevo con sus correpondientes valores
        var usuarioDto = new UsuarioDTO();
        usuarioDto.User = registerDTO.User;
        usuarioDto.Password = registerDTO.Password;
        usuarioDto.IdRol = registerDTO.IdRol;
        usuarioDto.Activo = 1;

        _usuarioService.Create(usuarioDto);
    }
}
