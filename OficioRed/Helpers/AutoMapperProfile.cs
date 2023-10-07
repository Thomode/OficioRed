﻿using AutoMapper;
using OficioRed.Dtos;
using OficioRed.Models;

namespace OficioRed.Helpers;

public class AutoMapperProfile: Profile
{
    public AutoMapperProfile()
    {
        // UsuarioDTO -> Usuario
        CreateMap<UsuarioDTO, Usuario>();

        // OficoDTO -> Oficio
        CreateMap<OficioDTO, Oficio>();
    }
}
