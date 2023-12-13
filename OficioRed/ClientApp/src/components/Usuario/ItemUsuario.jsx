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
