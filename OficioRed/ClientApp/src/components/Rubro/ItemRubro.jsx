import { TableRow, TableCell, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { rubroService } from '../../services/rubro.service'; 
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export function ItemRubro({ rubro, loadRubros }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDelete = async (id) => {
        try {
            await rubroService.deleteRubro(Number(id));
            loadRubros();
        } catch (error) {
            console.log('No eliminado');
        }
        setOpenDeleteDialog(false);
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
                <IconButton color="warning" size='large' onClick={() => setOpenDeleteDialog(true)}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </TableCell>
            {/* Diálogo de confirmación para eliminar */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '10px', // Personaliza el borde del modal
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Agrega una sombra
                    },
                    '& .MuiDialogTitle-root': {
                        background: '#f0f0f0', // Cambia el color del encabezado del modal
                    },
                }}
            >
                <DialogTitle>Baja de Usuario</DialogTitle>
                <DialogContent>
                    Apreta en confirmar para eliminar a "{rubro.nombre}"
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            color: 'gray',
                            '&:hover': {
                                color: 'black',
                            },
                        }}
                        onClick={() => setOpenDeleteDialog(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'darkred',
                            },
                        }}
                        onClick={() => handleDelete(rubro.idUsuario)}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </TableRow>
    );
}
