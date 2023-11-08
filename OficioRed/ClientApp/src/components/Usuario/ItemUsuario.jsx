import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usuarioService } from "../../services/usuario.service";

export function ItemUsuario({ usuario, loadUsuarios, index }) {
  const getRolName = (idRol) => {
    switch (idRol) {
      case 2:
        return "Admin";
      case 3:
        return "Profesional";
      case 4:
        return "Interesado";
      default:
        return "Desconocido";
    }
  };

  const navigate = useNavigate();

  const mostrarAlerta = (nombreUsuario) => {
    Swal.fire({
      title: `¿Eliminar a ${nombreUsuario}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
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
        text: "Usuario eliminado de la base de datos",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
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
          color="primary"
          size="large"
          onClick={() => navigate(`/admin/usuarios/${usuario.idUsuario}/edit`)}
        >
          <EditIcon></EditIcon>
        </IconButton>
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="warning"
          size="large"
          onClick={() => mostrarAlerta(usuario.user)}
        >
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
