using System;
using System.Collections.Generic;

namespace OficioRed.Models2;

public partial class Rating
{
    public int IdRating { get; set; }

    public int? IdProfesional { get; set; }

    public int? Puntuacion { get; set; }

    public string? Comentario { get; set; }
}
