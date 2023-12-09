import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { comentarioService } from "../../services/comentario.service";
import { usuarioService } from "../../services/usuario.service";
import Swal from "sweetalert2";

export function Comentario({ idComentario, idUser, comentario, fecha }) {
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const idUsuarioSesion = usuarioService.getId();

  function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return fechaFormateada;
  }

  const infoPerfil = async (idUser) => {
    try {
      const response = await usuarioService.get(idUser);
      let fotoUsuario = null;
      let nombre = "";
      let apellido = "";

      if (response.data.idRol === 2) {
        const profesionalResponse = await axios.get(
          `/api/Profesional/${idUser}`
        );
        fotoUsuario = profesionalResponse.data.fotoPerfil;
        nombre = profesionalResponse.data.nombre;
        apellido = profesionalResponse.data.apellido;
      } else if (response.data.idRol === 3) {
        const interesadoResponse = await axios.get(`/api/Interesado/${idUser}`);
        fotoUsuario = interesadoResponse.data.fotoPerfil;
        nombre = interesadoResponse.data.nombre;
        apellido = interesadoResponse.data.apellido;
      }

      return { fotoUsuario, nombre, apellido };
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const infoUsuario = await infoPerfil(idUser);
        if (infoUsuario) {
          setUsuarioInfo(infoUsuario);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchUserInfo();
  }, [idUser]);

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

  const handleClickEdit = async (comentariom) => {
    await Swal.fire({
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
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data,
            confirmButtonColor: "#1b325f",
          });
        }
      },
    });
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

      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el rubro",
        icon: "error",
        confirmButtonColor: "#1b325f",
      });
    }
  };

  return (
    <div style={cardStyles}>
      {usuarioInfo && (
        <div style={userInfoStyles}>
          <img
            src={usuarioInfo.fotoUsuario}
            alt={`Foto de usuario ${idUser}`}
            style={userImageStyles}
          />
          <div>
            <span
              style={userNameStyles}
            >{`${usuarioInfo.nombre} ${usuarioInfo.apellido}`}</span>
            <span style={timeUserStyles}>{formatearFecha(fecha)}</span>
          </div>
        </div>
      )}
      <p style={parrafoStyles}>{comentario}</p>

      {esUsuarioActual && (
        <div>
          <EditIcon
            style={{ cursor: "pointer", marginRight: "8px" }}
            onClick={() => handleClickEdit()}
          />
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleClickDelete(comentario, idComentario)}
          />
        </div>
      )}
    </div>
  );
}
