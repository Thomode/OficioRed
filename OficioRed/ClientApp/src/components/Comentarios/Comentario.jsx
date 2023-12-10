import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { comentarioService } from "../../services/comentario.service";
import { usuarioService } from "../../services/usuario.service";
import Swal from "sweetalert2";

export function Comentario({
  idComentario,
  idUser,
  comentario,
  fecha,
  nombre,
  apellido,
  fotoPerfil,
  onUpdate,
}) {
  const idUsuarioSesion = usuarioService.getId();

  function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return fechaFormateada;
  }
  

  const cardStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    marginBottom: "16px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  };
  const userInfoStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  };
  const userImageStyles = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "8px",
    objectFit: "cover",
  };
  const userNameStyles = {
    fontSize: "16px",
    fontWeight: "bold",
  };
  const timeUserStyles = {
    color: "#757575",
    marginBottom: "8px",
    marginLeft: "8px",
  };
  const parrafoStyles = {
    fontSize: "14px",
  };
  const esUsuarioActual = idUsuarioSesion && idUsuarioSesion === idUser;

  const handleClickEdit = async (comentario, idComentario) => {
    try {
      const nuevoComentario = await Swal.fire({
        title: "Editar Comentario",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        inputValue: comentario,
        showCancelButton: true,
        confirmButtonColor: "#1b325f",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        reverseButtons: true,
        preConfirm: async (nuevoComentario) => {
          try {
            await comentarioService.update(idComentario, nuevoComentario);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Comentario actualizado con éxito",
              showConfirmButton: false,
              timer: 1500,
            });
            onUpdate();
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message || "Error desconocido",
              confirmButtonColor: "#1b325f",
            });
          }
        },
      });

      if (nuevoComentario && nuevoComentario.data) {
        console.log(nuevoComentario.data);
      }
    } catch (error) {
      console.error("Error en handleClickEdit:", error);
    }
  };

  const handleClickDelete = (comentario, id) => {
    Swal.fire({
      title: `¿Eliminar comentario "${comentario}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b325f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarComentario(id);
      }
    });
  };
  const eliminarComentario = async (id) => {
    try {
      await comentarioService.deleteComentario(id);
      await Swal.fire({
        title: "Eliminado!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      onUpdate();
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
      Swal.fire({
        title: "Error",
        text: error.response
          ? error.response.data
          : "No se pudo eliminar el comentario",
        icon: "error",
        confirmButtonColor: "#1b325f",
      });
    }
  };

  return (
    <>
        <div style={cardStyles}>
          <div style={userInfoStyles}>
            <img
              src={fotoPerfil}
              alt={`Foto de usuario ${fotoPerfil}`}
              style={userImageStyles}
            />
            <div>
              <span
                style={userNameStyles}
              >{`${nombre} ${apellido}`}</span>
              <span style={timeUserStyles}>{formatearFecha(fecha)}</span>
            </div>
          </div>
          <p style={parrafoStyles}>{comentario}</p>
          {esUsuarioActual && (
            <div>
              <EditIcon
                style={{ cursor: "pointer", marginRight: "8px" }}
                onClick={() => handleClickEdit(comentario, idComentario)}
              />
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleClickDelete(comentario, idComentario)}
              />
            </div>
          )}
        </div>
    </>
  );
}
