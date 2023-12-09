using OficioRed.Models;

namespace OficioRed.Dtos;

public class ComentarioResDTO
{
    public int IdComentario { get; set; }

    public string Comentario1 { get; set; } = null!;

    public int IdProfesional { get; set; }

    public int IdUsuario { get; set; }

    public DateTime Fhalta { get; set; }
 
    public string Nombre { get; set; }

    public string Apellido { get; set; }

    public string FotoPerfil { get; set; }
}
