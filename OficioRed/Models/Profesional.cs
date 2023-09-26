using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Profesional
{
    public int IdProfesional { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public int? IdOficio { get; set; }

    public string? Descripcion { get; set; }

    public string? FotoPerfil { get; set; }

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public int? IdRating { get; set; }

    public int? IdContacto { get; set; }

    public int? IdDireccion { get; set; }

    public int IdUsuario { get; set; }

    public virtual Contacto? IdContactoNavigation { get; set; }

    public virtual Direccion? IdDireccionNavigation { get; set; }

    public virtual Rating? IdRatingNavigation { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;

    public virtual ICollection<OficioProfesion> OficioProfesions { get; set; } = new List<OficioProfesion>();
}
