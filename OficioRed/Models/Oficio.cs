using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Oficio
{
    public int IdOficio { get; set; }

    public string Nombre { get; set; } = null!;

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public virtual OficioProfesion? OficioProfesion { get; set; }
}
