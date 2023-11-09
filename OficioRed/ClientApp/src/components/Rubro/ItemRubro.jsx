import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { rubroService } from "../../services/rubro.service";
import Swal from "sweetalert2";

export function ItemRubro({ index, rubro, loadRubros }) {
  const mostrarAlerta = (nombreRubro) => {
    Swal.fire({
      title: `¿Eliminar rubro "${nombreRubro}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b325f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarRubro(rubro.idRubro);
      }
    });
  };

  const eliminarRubro = async (id) => {
    try {
      await rubroService.deleteRubro(Number(id));
      loadRubros();
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
      });
    }
  };

  const actualizarRubro = async (nombreRubro) => {
    await Swal.fire({
      title: "Editar Rubro",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      inputValue: nombreRubro,
      showCancelButton: true,
      confirmButtonColor: "#1b325f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      preConfirm: async (nuevoNombre) => {
        try {
          await rubroService.update(rubro.idRubro, nuevoNombre);
          loadRubros();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rubro actualizado con éxito",
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
      key={rubro.idRubro}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">{index + 1}</TableCell>
      <TableCell align="right">{rubro.nombre}</TableCell>
      <TableCell align="right">
        <IconButton
          color="primary"
          size="large"
          onClick={() => actualizarRubro(rubro.nombre)}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="warning"
          size="large"
          onClick={() => mostrarAlerta(rubro.nombre)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
