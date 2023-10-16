import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { RoutesWithNotFound } from './utilities/RoutesWithNotFound';
//import { AppRoutes } from './AppRoutes';
import { Container, CssBaseline, Box, createTheme, ThemeProvider } from '@mui/material';
import backgroundImage from './assets/armarios-formas-geometricas.jpg'; // Reemplaza con la ruta de tu imagen
import { NavBarLateral } from './layouts/NavBarLateral';

// Importa el contexto de usuario para que este disponible en toda la aplicacion
import { UserContextProvider } from './auth/UserContext';

// Importo las paginas
import  HomePage  from "./pages/Private/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { UsuarioAdminPage } from "./pages/UsuarioAdminPage";
import { OficioAdminPage } from "./pages/OficioAdminPage";
import { OficioForm } from "./components/Oficio/OficioForm";
import { ProfesionalPage } from "./pages/ProfesionalPage";
import UsuarioForm from "./components/Usuario/UsuarioForm";
import { PrivateRoutes, PublicRoutes } from './guards/routes';
import { AuthGuard } from './guards/authGuard';
import { Suspense } from 'react';
import { LoginPage } from './pages/LoginPage';
import { Private } from './pages/Private/Private';

//const LoginPage = React.lazy(() => import('./pages/LoginPage'));
//const Private = React.lazy(() => import('./pages/Private/Private'));


// Crea un tema personalizado (opcional)
const theme = createTheme();

export function App() {
    return (
        <UserContextProvider>
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
                    {/*<NavBarLateral>*/}
                    <Suspense fallback={<div>Cargando...</div>}> {/* Muestra un mensaje mientras se carga la pagina */}
                        <Container>
                            <RoutesWithNotFound>
                                <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />

                                <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
                                <Route path={PublicRoutes.SIGNUP} element={<SignupPage />} />

                                <Route element={< AuthGuard />}> {/* Cualquier ruta que tenga ../private/... va a entrar por aca */}
                                    <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
                                </Route>
                            </RoutesWithNotFound>
                        </Container>
                    </Suspense>
                </Box>
            </ThemeProvider>
        </UserContextProvider>
    );
}