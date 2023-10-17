import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { oficioService } from '../../services/oficio.service';
import { useNavigate} from 'react-router-dom';

export function ItemOficio({ oficio, loadOficios }) {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        try {
            const res = await oficioService.deleteOfice(Number(id))
            loadOficios()

        } catch (error) {
            console.log('No eliminado')
        }
    }

    return (
        <TableRow
            key={oficio.idOficio}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {oficio.idOficio}
            </TableCell>
            <TableCell align="right">{oficio.nombre}</TableCell>
            <TableCell align="right">
                <IconButton color="primary" size='large' onClick={() => navigate(`/admin/oficios/${oficio.idOficio}/edit`)}>
                    <EditIcon></EditIcon>
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton color="warning" size='large' onClick={() => handleDelete(oficio.idOficio)}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}