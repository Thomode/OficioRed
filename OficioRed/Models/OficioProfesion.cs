using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class OficioProfesion
{
    public int IdOficio { get; set; }

    public int IdProfesional { get; set; }

    public int IdOficioProfesion { get; set; }

    public virtual Oficio IdOficioNavigation { get; set; } = null!;

    public virtual Profesional IdProfesionalNavigation { get; set; } = null!;
}
