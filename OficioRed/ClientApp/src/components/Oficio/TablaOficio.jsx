import { ItemOficio } from "./ItemOficio";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function TablaOficio({ oficios, loadOficios }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow color="primary">
            <TableCell>Id</TableCell>
            <TableCell align="right">nombre</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {oficios.map((oficio) => (
           <ItemOficio oficio={oficio} loadOficios={loadOficios}></ItemOficio>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
