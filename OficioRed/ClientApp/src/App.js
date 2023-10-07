
import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Container, CssBaseline, Box, createTheme, ThemeProvider } from '@mui/material';
import backgroundImage from './assets/armarios-formas-geometricas.jpg'; // Reemplaza con la ruta de tu imagen
import { NavBarLateral } from './layouts/NavBarLateral';

// Crea un tema personalizado (opcional)
const theme = createTheme();

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                component="div"
                sx={{
                    backgroundImage: `url(${backgroundImage})`, // URL de tu imagen de fondo
                    backgroundSize: 'cover', // Ajusta la imagen al tama?o del contenedor
                    minHeight: '100vh', // Establece el alto m?nimo para ocupar toda la ventana
                    width: '100vw', // Establece el ancho m?nimo para ocupar toda la ventana
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <NavBarLateral>
                    <Container>
                        <Routes>
                            {AppRoutes.map((route, index) => {
                                const { element, ...rest } = route;
                                return <Route key={index} {...rest} element={element} />;
                            })}
                        </Routes>
                    </Container>
                </NavBarLateral>       
            </Box>
        </ThemeProvider>
    );
}