namespace OficioRed.Dtos
{
    public class ProfesionalVisualizarDTO
    {
        public int IdProfesional { get; set; }
        public string Nombre { get; set; } 
        public string Apellido { get; set; }
        public int? IdOficio { get; set; }
        public string Descripcion { get; set; }
        public string FotoPerfil { get; set; }
    }
}
