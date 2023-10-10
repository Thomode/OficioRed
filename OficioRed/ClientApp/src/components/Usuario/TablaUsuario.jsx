import { ItemUsuario } from "./ItemUsuario";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function TablaUsuario({ usuarios, loadUsuarios }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow color="primary">
            <TableCell>Id</TableCell>
            <TableCell align="right">Usuario</TableCell>
            <TableCell align="right">Contraseña</TableCell>
            <TableCell align="right">Rol</TableCell>
            <TableCell align="right">Fecha Alta</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <ItemUsuario usuario={usuario} loadUsuarios= {loadUsuarios}></ItemUsuario>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
