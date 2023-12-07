using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Direccion
{
    public int IdDireccion { get; set; }

    public string? Calle { get; set; }

    public string? Barrio { get; set; }

    public int IdPais { get; set; }

    public int IdProvincia { get; set; }

    public int IdLocalidad { get; set; }

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public virtual Localidad IdLocalidadNavigation { get; set; } = null!;

    public virtual Pais IdPaisNavigation { get; set; } = null!;

    public virtual Provincia IdProvinciaNavigation { get; set; } = null!;

    public virtual ICollection<Interesado> Interesados { get; set; } = new List<Interesado>();

    public virtual ICollection<Profesional> Profesionals { get; set; } = new List<Profesional>();
}
