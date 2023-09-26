using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Direccion
{
    public int IdDireccion { get; set; }

    public string? Calle { get; set; }

    public string Localidad { get; set; } = null!;

    public string? Barrio { get; set; }

    public string Ciudad { get; set; } = null!;

    public string? Estado { get; set; }

    public string Pais { get; set; } = null!;

    public string? CodigoPostal { get; set; }

    public virtual ICollection<Profesional> Profesionals { get; set; } = new List<Profesional>();
}
