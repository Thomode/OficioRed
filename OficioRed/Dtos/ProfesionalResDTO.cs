using OficioRed.Models;

namespace OficioRed.Dtos;

public class ProfesionalResDTO
{
    public int IdProfesional { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public int? IdRubroXprofesional { get; set; }

    public string? Descripcion { get; set; }

    public string? FotoPerfil { get; set; }

    public int? IdRating { get; set; }

    public int? IdContacto { get; set; }

    public int? IdDireccion { get; set; }

    public int IdUsuario { get; set; }

    public string Email { get; set; } = null!;

    public List<Rubro>? rubros {  get; set; }

}
