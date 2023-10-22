namespace OficioRed.Dtos;

public class InteresadoDTO
{
    public string Nombre { get; set; } = null!;
    public string Apellido { get; set; } = null!;
    public string? Email { get; set; }
    public int? IdDireccion { get; set; }
    public string? FotoPerfil { get; set; }
}
