using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Pais
{
    public int IdPais { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<Direccion> Direccions { get; set; } = new List<Direccion>();

    public virtual ICollection<Provincia> Provincia { get; set; } = new List<Provincia>();
}
