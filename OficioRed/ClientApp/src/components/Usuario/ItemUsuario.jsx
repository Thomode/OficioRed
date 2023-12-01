import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableRow, TableCell, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import { usuarioService } from "../../services/usuario.service";

export function ItemUsuario({ usuario, loadUsuarios, index }) {
  const getRolName = (idRol) => {
    switch (idRol) {
      case 1:
        return "Admin";
      case 2:
        return "Profesional";
      case 3:
        return "Interesado";
      default:
        return "Desconocido";
    }
  };

  const mostrarAlerta = (nombreUsuario) => {
    Swal.fire({
      title: `¿Eliminar usuario "${nombreUsuario}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b325f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarUsuario(usuario.idUsuario);
      }
    });
  };

  const eliminarUsuario = async (id) => {
    try {
      await usuarioService.deleteUser(Number(id));
      loadUsuarios();
      Swal.fire({
        title: "Eliminado!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el usuario",
        icon: "error",
      });
    }
  };

  const actualizarUsuario = async (id, user, passwordUser, idRol) => {
    const roles = ["Interesado", "Profesional"];
    const us = await usuarioService.get(Number(id));
    const passwordActual = us.data.password;

    await Swal.fire({
      title: "Editar Usuario",
      html: `
        <input id="user" class="swal2-input" placeholder="Nombre de Usuario" value="${user}">
        <input class="swal2-input" placeholder="Contraseña" hidden=true type="password" value="${passwordActual}" readonly>
        <select id="rolUsuario" class="swal2-input swal2-select">
          ${roles
            .map(
              (rol) =>
                `<option value="${rol}" ${
                  rol === getRolName(idRol) ? "selected" : ""
                }>${rol}</option>`
            )
            .join("")}
        </select>`,
      showCancelButton: true,
      confirmButtonColor: "#1b325f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const userName = document.getElementById("user").value;
        const selectedRol = document.getElementById("rolUsuario").value;
        const nuevoIdRol =
          selectedRol === "Profesional"
            ? 3
            : selectedRol === "Interesado"
            ? 4
            : null;

        if (nuevoIdRol === null) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Usuario no válido",
          });
          return;
        }

        try {
          console.log(id, userName, passwordActual, nuevoIdRol);
          await usuarioService.update(id, userName, passwordActual, nuevoIdRol);

          loadUsuarios();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario actualizado con éxito",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data,
          });
        }
      },
    });
  };

  return (
    <TableRow
      key={usuario.idUsuario}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell component="th" scope="row">
        {usuario.user}
      </TableCell>
      <TableCell align="right">{getRolName(usuario.idRol)}</TableCell>
      <TableCell align="right">{usuario.fhAlta}</TableCell>
      <TableCell align="right">
        <IconButton
          color="primary"
          size="large"
          onClick={() =>
            actualizarUsuario(
              usuario.idUsuario,
              usuario.user,
              usuario.password,
              usuario.idRol
            )
          }
        >
          <EditIcon></EditIcon>
        </IconButton>
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="warning"
          size="large"
          onClick={() => mostrarAlerta(usuario.user, usuario.idRol)}
        >
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
