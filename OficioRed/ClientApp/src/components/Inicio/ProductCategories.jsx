import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from './Adicionales/Typography';
import ImagenPintor from '../../assets/primer-img-inicio.jpg'
import ImagenPlomero from '../../assets/quinta-img-inicio.jpg'
import ImagenTecnico from '../../assets/septima-img-inicio.jpg'
import ImagenElectricista from '../../assets/segunda-img-inicio.jpg'
import ImagenJardinero from '../../assets/tercer-img-inicio.jpg'
import ImagenTecnicoAire from '../../assets/sexta-img-inicio.jpg'
import ImagenCarpintero from '../../assets/cuarta-img-inicio.jpg'
import ImagenLimpiadora from '../../assets/ocatava-img-inicio.jpg'
import ImagenAlbañil from '../../assets/albañil.webp'


const ImageBackdrop = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: '#000',
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('md')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover': {
        zIndex: 1,
    },
    '&:hover .imageBackdrop': {
        opacity: 0.15,
    },
    '&:hover .imageMarked': {
        opacity: 0,
    },
    '&:hover .imageTitle': {
        border: '4px solid currentColor',
    },
    '& .imageTitle': {
        position: 'relative',
        padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
    },
    '& .imageMarked': {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

const images = [
    {
        url: ImagenPintor,
        title: 'Pintura',
        width: '30%',
    },
    {
        url: ImagenPlomero ,
        title: 'Plomería',
        width: '30%',
    },
    {
        url: ImagenTecnico ,
        title: 'Reparación',
        width: '40%',
    },
    {
        url: ImagenJardinero ,
        title: 'Jardinería',
        width: '35%',
    },
    {
        url: ImagenElectricista ,
        title: 'Electricidad',
        width: '35%',
    },
    {
        url: ImagenAlbañil ,
        title: 'Albañileria',
        width: '30%',
    },
    {
        url: ImagenTecnicoAire ,
        title: 'Tecnicos',
        width: '30%',
    },
    {
        url: ImagenLimpiadora ,
        title: 'Limpieza',
        width: '30%',
    },
    {
        url: ImagenCarpintero ,
        title: 'Carpinteria',
        width: '40%',
    },
];

export default function ProductCategories() {
    return (
        <Container component="section" sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h4" marked="center" align="center" component="h2">
                SELECCIONA EL RUBRO QUE NECESITAS
            </Typography>
            <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image) => (
                    <ImageIconButton
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 40%',
                                backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <ImageBackdrop className="imageBackdrop" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'common.white',
                            }}
                        >
                            <Typography
                                component="h3"
                                variant="h6"
                                color="inherit"
                                className="imageTitle"
                            >
                                {image.title}
                                <div className="imageMarked" />
                            </Typography>
                        </Box>
                    </ImageIconButton>
                ))}
            </Box>
        </Container>
    );
}