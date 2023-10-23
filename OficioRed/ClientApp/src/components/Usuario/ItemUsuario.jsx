import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { usuarioService } from '../../services/usuario.service';
import { useNavigate } from 'react-router-dom';

export function ItemUsuario({ usuario, loadUsuarios }) {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const res = await usuarioService.deleteUser(Number(id));
            loadUsuarios();
        } catch (error) {
            console.log('No eliminado');
        }
    }

    return (
        <TableRow
            key={usuario.idUsuario}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {usuario.user}
            </TableCell>
            <TableCell align="right">{usuario.idRol}</TableCell>
            <TableCell align="right">{usuario.fhAlta}</TableCell>
            <TableCell align="right">
                <IconButton color="primary" size='large' onClick={() => navigate(`/admin/usuarios/${usuario.idUsuario}/edit`)}>
                    <EditIcon></EditIcon>
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton color="warning" size='large' onClick={() => handleDelete(usuario.idUsuario)}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
