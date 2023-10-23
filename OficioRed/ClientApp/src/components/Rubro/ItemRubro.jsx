import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { rubroService } from '../../services/rubro.service'; 
import { useNavigate } from 'react-router-dom';

export function ItemRubro({ rubro, loadRubros }) { 
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const res = await rubroService.deleteRubro(Number(id)); 
            loadRubros();
        } catch (error) {
            console.log('No eliminado');
        }
    }

    return (
        <TableRow
            key={rubro.idRubro} 
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="right">{rubro.nombre} 
            </TableCell>
            <TableCell align="right">
                <IconButton color="primary" size='large' onClick={() => navigate(`/admin/rubros/${rubro.idRubro}/edit`)}> 
                    <EditIcon></EditIcon>
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton color="warning" size='large' onClick={() => handleDelete(rubro.idRubro)}> 
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
