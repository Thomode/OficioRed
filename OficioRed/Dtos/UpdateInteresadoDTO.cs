namespace OficioRed.Dtos
{
    public class UpdateInteresadoDTO
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public DateTime? FHAlta { get; set; }
        public DateTime? FHBaja { get; set; }
        public int IdDireccion { get; set; }
        public string FotoPerfil { get; set; }
        public int IdContacto { get; set; }
        public int IdUsuario { get; set; }
    }
}
