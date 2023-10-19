using System;
using System.Collections.Generic;

namespace OficioRed.Models2;

public partial class Rubro
{
    public int IdRubro { get; set; }

    public string Nombre { get; set; } = null!;

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public virtual ICollection<RubroXprofesional> RubroXprofesionals { get; set; } = new List<RubroXprofesional>();
}
