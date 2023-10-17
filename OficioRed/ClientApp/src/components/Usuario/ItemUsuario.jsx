import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { usuarioService } from '../../services/usuario.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function ItemUsuario({ usuario, loadUsuarios }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
                {usuario.idUsuario}
            </TableCell>
            <TableCell align="right">{usuario.user}</TableCell>
            <TableCell align="right">
                <TextField
                    type={showPassword ? "text" : "password"}
                    value={usuario.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    disabled
                />
            </TableCell>
            <TableCell align="right">{usuario.rol}</TableCell>
            <TableCell align="right">{usuario.fhalta}</TableCell>
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
