using System;
using System.Collections.Generic;

namespace OficioRed.Models2;

public partial class Localidade
{
    public int IdLocalidad { get; set; }

    public string? Nombre { get; set; }

    public int? ProvinciaId { get; set; }

    public virtual Provincia? Provincia { get; set; }
}
