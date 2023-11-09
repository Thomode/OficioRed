using AutoMapper;
using OficioRed.Dtos;
using OficioRed.Models;

namespace OficioRed.Helpers;

public class AutoMapperProfile: Profile
{
    public AutoMapperProfile()
    {
        // UsuarioDTO -> Usuario
        CreateMap<UsuarioDTO, Usuario>();

        // Usuario -> UsuarioResponseDTO
        CreateMap<Usuario, UsuarioResDTO>();

        // RubroDto -> Rubro
        CreateMap<RubroDTO, Rubro>();

        // InteresadoDTO -> Interesado
        CreateMap<InteresadoDTO, Interesado>();

        // ProfesionalDTO -> Profesional
        CreateMap<ProfesionalDTO, Profesional>();

        // Rol -> RolDTO
        CreateMap<Rol, RolDTO>();

        // ContactoDTO -> Contacto
        CreateMap<ContactoDTO, Contacto>();
    }
}
