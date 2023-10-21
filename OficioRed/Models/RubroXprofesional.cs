using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class RubroXprofesional
{
    public int IdRubroXprofesional { get; set; }

    public int IdRubro { get; set; }

    public int IdProfesional { get; set; }

    public DateTime Fhalta { get; set; } 

    public DateTime? Fhbaja { get; set; }

    public virtual Profesional IdProfesionalNavigation { get; set; } = null!;

    public virtual Rubro IdRubroNavigation { get; set; } = null!;

    public virtual ICollection<Profesional> Profesionals { get; set; } = new List<Profesional>();
}
