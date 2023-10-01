using AutoMapper;
using OficioRed.Dtos;
using OficioRed.Models;

namespace OficioRed.Helpers;

public class AutoMapperProfile: Profile
{
    public AutoMapperProfile()
    {
        // UpdateUsuarioDTO -> Usuario
        CreateMap<UpdateUsuarioDTO, Usuario>();
    }
}
