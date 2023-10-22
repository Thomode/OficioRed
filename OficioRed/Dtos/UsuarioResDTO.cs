namespace OficioRed.Dtos
{
    public class UsuarioResDTO
    {
        public int IdUsuario { get; set; }
        public string User { get; set; }
        public int IdRol { get; set; }
        public int Activo { get; set; }
        public DateTime FHAlta { get; set; }
    }
}
