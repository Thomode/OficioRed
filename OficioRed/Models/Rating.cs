using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Rating
{
    public int IdRating { get; set; }

    public int? IdProfesional { get; set; }

    public int? Puntuacion { get; set; }

    public string? Comentario { get; set; }

    public virtual ICollection<Profesional> Profesionals { get; set; } = new List<Profesional>();
}
