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
                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Usuario</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fecha de Alta</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Editar</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario, index) => (
                        <ItemUsuario index={index} usuario={usuario} loadUsuarios={loadUsuarios}></ItemUsuario>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
