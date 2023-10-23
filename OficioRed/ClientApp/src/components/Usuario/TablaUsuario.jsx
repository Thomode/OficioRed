import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ItemUsuario } from './ItemUsuario'; 


export function TablaUsuario({ usuarios, loadUsuarios }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Usuarios</TableCell>
                        <TableCell align="right">Rol</TableCell>
                        <TableCell align="right">FechaAlta</TableCell>
                        <TableCell align="right">Editar</TableCell>
                        <TableCell align="right">Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario) => (
                        <ItemUsuario usuario={usuario} loadUsuarios={loadUsuarios}></ItemUsuario>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
