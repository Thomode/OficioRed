using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Contacto
{
    public int IdContacto { get; set; }

    public int? IdProfesional { get; set; }

    public string? Telefono { get; set; }

    public string? Email { get; set; }

    public string? Instagram { get; set; }

    public string? Facebook { get; set; }

    public virtual ICollection<Interesado> Interesados { get; set; } = new List<Interesado>();

    public virtual ICollection<Profesional> Profesionals { get; set; } = new List<Profesional>();
}
