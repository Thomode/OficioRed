using System;
using System.Collections.Generic;

namespace OficioRed.Models2;

public partial class Provincia
{
    public int IdProvincia { get; set; }

    public string? Nombre { get; set; }

    public int? PaisId { get; set; }

    public virtual ICollection<Localidade> Localidades { get; set; } = new List<Localidade>();

    public virtual Pai? Pais { get; set; }
}
