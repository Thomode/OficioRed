using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string User { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Rol { get; set; } = null!;

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public virtual ICollection<Interesado> Interesados { get; set; } = new List<Interesado>();

    public virtual ICollection<Profesional> Profesionals { get; set; } = new List<Profesional>();
}
