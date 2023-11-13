import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Adicionales/Typography';
import Imagen1Values from '../../assets/conectar.png';
import Imagen2Values from '../../assets/profesionalizacion.png';
import Imagen3Values from '../../assets/experiencias.png';

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

function ProductValues() {
    return (
        <Box
            component="section"
            sx={{ display: 'flex', overflow: 'hidden', bgcolor: '#9cc4e4', alignItems: 'center', justifyContent: 'center' }}
        >
            <Container sx={{ mt: 10, mb: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <Typography variant="h4" marked="center" component="h2" sx={{ mb: 5, fontWeight: 'bold' }}>
                    ¿Qué buscamos?
                </Typography>
                <Box
                    component="img"
                    src="/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
                />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={Imagen1Values}
                                alt="suitcase"
                                sx={{ height: 150 }}
                            />
                            <Typography variant="h6" sx={{ my: 5, textAlign: 'center', color: '#1b325f', fontWeight: 'bold' }}>
                                SER LA CONEXIÓN
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                {
                                    'Conectar personas interesadas y profesionales, permitiendo que ambos puedan contactarse de manera ágil'
                                }
                                {
                                    ' y efectiva según lo que necesiten.'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={Imagen2Values}
                                alt="suitcase"
                                sx={{ height: 150 }}
                            />
                            <Typography variant="h6" sx={{ my: 5, textAlign: 'center', color: '#1b325f', fontWeight: 'bold' }}>
                                INCENTIVAR A LAS PERSONAS
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                {
                                    'Promover la profesionalización, ya que permite visualizar las capacidades y formación de otros profesionales.'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={Imagen3Values}
                                alt="suitcase"
                                sx={{ height: 150 }}
                            />
                            <Typography variant="h6" sx={{ my: 5, textAlign: 'center', color: '#1b325f', fontWeight: 'bold' }}>
                                DAR NUEVAS POSIBILIDADES
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                {'Compartir las experiencias individuales de cada usuario en relación con el servicio proporcionado por un profesional en particular.'}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ProductValues;
