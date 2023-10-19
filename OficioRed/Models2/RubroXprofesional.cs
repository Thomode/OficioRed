using System;
using System.Collections.Generic;

namespace OficioRed.Models2;

public partial class RubroXprofesional
{
    public int IdRubro { get; set; }

    public int IdProfesional { get; set; }

    public int IdRubroXprofesional { get; set; }

    public virtual Profesional IdProfesionalNavigation { get; set; } = null!;

    public virtual Rubro IdRubroNavigation { get; set; } = null!;
}
