import { Grid, Card, Typography, CardContent, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { usuarioService } from '../services/usuario.service';

export default function UsuarioForm() {
    const [usuario, setUsuario] = useState({
        user: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar mensajes de error
        setSuccessMessage(''); // Limpiar mensajes de éxito

        try {
            const response = await usuarioService.createUsuarioRequest(usuario);
            setSuccessMessage('Usuario creado con éxito'); // Mostrar mensaje de éxito
            console.log(response);
        } catch (error) {
            setErrorMessage('Error al crear el usuario'); // Mostrar mensaje de error
            console.error(error);
        }
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

                            <Button variant='contained' color='primary' type='submit'>
                                Enviar
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
