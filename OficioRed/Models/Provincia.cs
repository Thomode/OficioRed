using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Provincia
{
    public int IdProvincia { get; set; }

    public string? Nombre { get; set; }

    public int? IdPais { get; set; }

    public virtual ICollection<Direccion> Direccions { get; set; } = new List<Direccion>();

    public virtual Pais? IdPaisNavigation { get; set; }

    public virtual ICollection<Localidad> Localidads { get; set; } = new List<Localidad>();
}
