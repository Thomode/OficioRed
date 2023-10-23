import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ItemRubro } from "./ItemRubro";

export function TablaRubro({ rubros, loadRubros }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Rubro</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Editar</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rubros.map((rubro) => (
                        <ItemRubro rubro={rubro} loadRubros={loadRubros}></ItemRubro>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
