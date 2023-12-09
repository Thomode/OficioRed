using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Rating
{
    public int IdRating { get; set; }

    public int IdProfesional { get; set; }

    public int Puntuacion { get; set; }

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public int IdUsuario { get; set; }

    public virtual Profesional IdProfesionalNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
