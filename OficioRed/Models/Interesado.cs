using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Interesado
{
    public int IdInteresado { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public int? IdDireccion { get; set; }

    public string? Email { get; set; }

    public string? FotoPerfil { get; set; }

    public int? IdContacto { get; set; }

    public int IdUsuario { get; set; }

    public virtual Contacto? IdContactoNavigation { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
