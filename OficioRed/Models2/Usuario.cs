using System;
using System.Collections.Generic;

namespace OficioRed.Models2;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string Password { get; set; } = null!;

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public int? IdRol { get; set; }

    public string Usuario1 { get; set; } = null!;

    public int? Activo { get; set; }

    public virtual ICollection<Interesado> Interesados { get; set; } = new List<Interesado>();

    public virtual ICollection<Profesional> Profesionals { get; set; } = new List<Profesional>();
}
