import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import fondoInicio from '../../assets/arregloHogar.jpeg';
import { useNavigate } from 'react-router-dom';
const backgroundImage = fondoInicio;



const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    minHeight: '1000px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const buttonStyle = {
    marginTop: '16px',
    backgroundColor: '#1b325f',
    color: 'white',
};

const titleStyle = {
    fontSize: '100px',
    fontWeight: 'bold',
    color: '#1b325f',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    WebkitTextStroke: '2px white', // Agrega borde blanco al texto
    MozTextStroke: '2px white', // Agrega borde blanco al texto
};

const contentStyle = {
    textAlign: 'center',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
};

export default function ProductHero() {
    const navigate = useNavigate()
    return (
        <Paper style={containerStyle}>
            <Container maxWidth="md">
                <div style={contentStyle}>
                    <Typography variant="h2" sx={titleStyle}>
                        OFICIORED
                    </Typography>
                    <Typography variant="h5">
                        Encuentra el servicio que buscas
                    </Typography>
                    <Button
                        variant="outlined"
                        size="large"
                        style={buttonStyle}
                        onClick={() => navigate(`/profesionales`)}
                    >
                        COMIENZA LA BÚSQUEDA
                    </Button>
                </div>
            </Container>
        </Paper>
    );
}
