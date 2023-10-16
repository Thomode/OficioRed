import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, IconButton, Grid, Box } from '@mui/material';
import imagenProfesional from '../../assets/profile.png';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const cardStyle = {
    maxWidth: 345,
    borderRadius: 10,
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out',
    marginBottom: '20px', // Margen inferior
    marginLeft: '35px',  // Margen izquierdo
    '&:hover': {
        transform: 'scale(1.05)',
    },
};

const buttonStyle = {
    margin: '0 8px',
};

const CardProfesional = () => {
    return (
        <div>
            <Card sx={cardStyle}>
                <CardMedia
                    component="img"
                    alt="profesional"
                    height="140"
                    src={imagenProfesional}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Bordino, Tobías
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Profesional Electricista Matriculado
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                style={{ backgroundColor: '#1b325f', color: 'white' }}
                                sx={buttonStyle}
                            >
                                CONTACTAR
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                style={{ backgroundColor: '#f26c4f', color: 'white' }}
                                sx={buttonStyle}
                            >
                                Leer más
                            </Button>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="Agregar a favoritos">
                                <FavoriteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="Compartir">
                                <ShareIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </div>
    );
};

export default CardProfesional;
