import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Adicionales/Typography';
import Imagen1Values from '../../assets/conectar.png'
import Imagen2Values from '../../assets/profesionalizacion.png'
import Imagen3Values from '../../assets/experiencias.png'

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
            sx={{ display: 'flex', overflow: 'hidden', bgcolor: '#f26c4f' }}
        >
            <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
                <Box
                    component="img"
                    src="/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={Imagen1Values}
                                alt="suitcase"
                                sx={{ height: 100 }}
                            />
                            <Typography variant="h6" sx={{ my: 5, textAlign: 'center' }}>
                                FUNCIONAR COMO INTERMEDIARIOS
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                                {
                                    'Conectar personas y profesionales, permitiendo que ambos puedan contactarse de manera ágil'
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
                                sx={{ height: 100 }}
                            />
                            <Typography variant="h6" sx={{ my: 5, textAlign: 'center' }}>
                                INCENTIVAR A LAS PERSONAS
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                                {
                                    'Promover la profesionalización, ya que permite visualizar los estudios y formación de otros profesionales.'
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
                                sx={{ height: 100 }}
                            />
                            <Typography variant="h6" sx={{ my: 5, textAlign: 'center' }}>
                                NUEVAS POSIBILIDADES
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: 'center' }}>
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