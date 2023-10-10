import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usuarioService } from '../../services/usuario.service';
import { Grid, Card, Typography, CardContent, TextField, Button, MenuItem, Paper, Box } from '@mui/material';

export default function UsuarioForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [editing, setEditing] = useState(false);
    const [usuario, setUsuario] = useState({
        user: '',
        password: '',
        rol: 'Cliente', 
    });

    useEffect(() => {
        const loadUsuario = async () => {
            if (params.id) {
                try {
                    const data = await hadleGet(params.id);
                    setUsuario(data); // Actualiza el estado "usuario" con los datos del usuario existente
                    setEditing(true); // Establece la bandera de edici�n en true
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            }
        };
        loadUsuario();
    }, [params.id]);

    const hadleGet = async (id) => {
        try {
            const res = await usuarioService.get(Number(id));
            return res.data;
        } catch (error) {
            console.log('Error', error);
        }
    }

    const currencies = [
        {
            value: 'Cliente',
            label: 'Cliente',
        },
        {
            value: 'Admin',
            label: 'Admin',
        },
    ];

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        setSuccessMessage(''); 

        try {
            if (editing) {
                // Si estamos editando, llama a la funci�n de edici�n en lugar de creaci�n
                const response = await usuarioService.update(params.id, usuario.user, usuario.password, usuario.rol);
                setSuccessMessage('Usuario actualizado con �xito');
            } else {
                const response = await usuarioService.create(usuario.user, usuario.password, usuario.rol);
                setSuccessMessage('Usuario creado con �xito'); 
            }
            navigate('/usuarios');
        } catch (error) {
            setErrorMessage('Error al guardar el usuario'); 
            console.error(error);
        }
    }

    const handleCancelar = () => {
        navigate('/usuarios');
    }

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    return (
        <Grid container alignItems='center' justifyContent='center' style={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card elevation={5} sx={{ backgroundColor: 'white', padding: '1rem' }}>
                    <Typography variant='h4' align='center' color='black' gutterBottom>
                        {editing ? 'Editar Usuario' : 'Crear Usuario'}
                    </Typography>
                    <CardContent>
                        <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant='outlined'
                                    label='Usuario'
                                    fullWidth
                                    margin='normal'
                                    name='user'
                                    value={usuario.user}
                                    onChange={handleChange}
                                    InputProps={{ style: { color: 'black', fontSize: '1.2rem' } }}
                                    InputLabelProps={{ style: { color: 'black', fontSize: '1.2rem' } }}
                                    required
                                />

                                <TextField
                                    variant='outlined'
                                    label='Password'
                                    fullWidth
                                    margin='normal'
                                    type='password'
                                    name='password'
                                    value={usuario.password}
                                    onChange={handleChange}
                                    InputProps={{ style: { color: 'black', fontSize: '1.2rem' } }}
                                    InputLabelProps={{ style: { color: 'black', fontSize: '1.2rem' } }}
                                    required
                                />

                                <TextField
                                    id='outlined-select-currency'
                                    select
                                    label='Select'
                                    fullWidth
                                    margin='normal'
                                    defaultValue='Cliente'
                                    helperText='Seleccione el rol'
                                    name='rol'
                                    value={usuario.rol}
                                    onChange={handleChange}
                                    InputProps={{ style: { color: 'black', fontSize: '1.2rem' } }}
                                    InputLabelProps={{ style: { color: 'black', fontSize: '1.2rem' } }}
                                    required
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Box display="flex" justifyContent="center" marginTop="20px">
                                    <Button variant='contained' color='primary' type='submit' style={{ marginRight: '10px', fontSize: '1.2rem' }}>
                                        {editing ? 'Actualizar' : 'Agregar'}
                                    </Button>

                                    <Button variant='contained' color='error' type='button' onClick={handleCancelar} style={{ fontSize: '1.2rem' }}>
                                        Cancelar
                                    </Button>
                                </Box>

                                {errorMessage && (
                                    <Typography variant='body2' color='error' style={{ marginTop: '10px', fontSize: '1.2rem' }}>
                                        {errorMessage}
                                    </Typography>
                                )}

                                {successMessage && (
                                    <Typography variant='body2' color='success' style={{ marginTop: '10px', fontSize: '1.2rem' }}>
                                        {successMessage}
                                    </Typography>
                                )}
                            </form>
                        </Paper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
