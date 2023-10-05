import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';


export function ItemUsuario({ usuario }) {
    return (
        <TableRow
            key={usuario.idUsuario}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {usuario.idUsuario}
            </TableCell>
            <TableCell align="right">{usuario.user}</TableCell>
            <TableCell align="right">{usuario.password}</TableCell>
            <TableCell align="right">{usuario.rol}</TableCell>
            <TableCell align="right">{usuario.fhalta}</TableCell>
            <TableCell align="right">
                <IconButton color="primary" size='large'>
                    <EditIcon></EditIcon>
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton color="warning" size='large'>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}