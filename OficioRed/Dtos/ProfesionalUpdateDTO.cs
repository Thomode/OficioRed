namespace OficioRed.Dtos;

public class ProfesionalUpdateDTO
{
    public string Nombre { get; set; } = null!;
    public string Apellido { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Descripcion { get; set; }
}
