namespace OficioRed.Dtos
{
    public class ProfesionalDTO
    {
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Descripcion { get; set; }
        public int? IdRubroXprofesional { get; set; }
        public string? FotoPerfil { get; set; }
        public int? IdRating { get; set; }
        public int? IdContacto { get; set; }
        public int? IdDireccion { get; set; }
    }
}
