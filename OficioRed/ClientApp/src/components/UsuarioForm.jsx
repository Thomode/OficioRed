import { Grid, Card, Typography, CardContent, TextField, Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import { usuarioService } from '../services/usuario.service';
import { useNavigate } from 'react-router-dom';

export default function UsuarioForm() {
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState({
        user: '',
        password: '',
        rol: ''
    });

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
        setErrorMessage(''); // Limpiar mensajes de error
        setSuccessMessage(''); // Limpiar mensajes de exito

        try {
            const response = await usuarioService.create(usuario.user, usuario.password, usuario.rol);
            setSuccessMessage('Usuario creado con exito'); // Mostrar mensaje de exito
            navigate('/usuarios')
            console.log(response);
        } catch (error) {
            setErrorMessage('Error al crear el usuario'); // Mostrar mensaje de error
            console.error(error);
        }
    }

    const handleCancelar = () => {
        navigate('/usuarios')
    }

    const handleChange = e => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    return (
        <Grid container alignItems='center' justifyContent='center'>
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: "1rem" }}>
                    <Typography variant='h5' align='center' color='white'>
                        Crear Usuario
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Usuario'
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                name="user"
                                onChange={handleChange}
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                required // Marcar como campo obligatorio
                            />

                            <TextField
                                variant='filled'
                                label='Password'
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                type="password"
                                name="password"
                                onChange={handleChange}
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                required // Marcar como campo obligatorio
                            />

                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                defaultValue="Cliente"
                                helperText="Seleccione el rol"
                                type="rol"
                                name="rol"
                                onChange={handleChange}
                                InputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                required // Marcar como campo obligatorio
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Button variant='contained' color='primary' type='submit'>
                                Agregar
                            </Button>

                            <Button variant='contained' color='error' type='button' onClick={handleCancelar}>
                                Cancelar
                            </Button>

                            {errorMessage && (
                                <Typography variant='body2' color='error'>
                                    {errorMessage}
                                </Typography>
                            )}

                            {successMessage && (
                                <Typography variant='body2' color='success'>
                                    {successMessage}
                                </Typography>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
