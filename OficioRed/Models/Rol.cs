﻿using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Rol
{
    public int IdRol { get; set; }

    public string Nombre { get; set; } = null!;

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
