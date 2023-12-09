using System;
using System.Collections.Generic;

namespace OficioRed.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string User { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int IdRol { get; set; }

    public int Activo { get; set; }

    public DateTime Fhalta { get; set; }

    public DateTime? Fhbaja { get; set; }

    public string? Token { get; set; }

    public string? Email { get; set; }

    public DateTime? Fhtoken { get; set; }

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();

    public virtual Rol IdRolNavigation { get; set; } = null!;

    public virtual ICollection<Interesado> Interesados { get; set; } = new List<Interesado>();

    public virtual ICollection<Profesional> Profesionals { get; set; } = new List<Profesional>();

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();
}
