import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { ItemRubro } from "./ItemRubro";

export function TablaRubro({ rubros, loadRubros }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              #
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Rubro
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Editar
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Eliminar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rubros.map((rubro, index) => (
            <ItemRubro
              index={index}
              rubro={rubro}
              loadRubros={loadRubros}
            ></ItemRubro>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
