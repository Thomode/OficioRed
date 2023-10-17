import React, { useEffect, useState } from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { RoutesWithNotFound } from './utilities/RoutesWithNotFound';
//import { AppRoutes } from './AppRoutes';
import { Container, CssBaseline, Box, createTheme, ThemeProvider } from '@mui/material';
import backgroundImage from './assets/armarios-formas-geometricas.jpg'; // Reemplaza con la ruta de tu imagen
import { NavBarLateral } from './layouts/NavBarLateral';

// Importa el contexto de usuario para que este disponible en toda la aplicacion
import { UserContextProvider } from './auth/UserContext';

// Importo las paginas
import HomePage from "./pages/Private/HomePage";
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
import { ProtectedRoute, RouteGuard } from './utilities/ProtectedRoute';

//const LoginPage = React.lazy(() => import('./pages/LoginPage'));
//const Private = React.lazy(() => import('./pages/Private/Private'));


// Crea un tema personalizado (opcional)
const theme = createTheme();

const adminRoutes = [
    {
        path: '/admin/usuarios',
        element: <UsuarioAdminPage />
    },
    {
        path: '/admin/usuariosForm',
        element: <UsuarioForm />
    },
    {
        path: '/admin/usuarios/:id/edit',
        element: <UsuarioForm />
    },
    {
        path: '/admin/oficios',
        element: <OficioAdminPage />
    },
    {
        path: '/admin/oficioForm',
        element: <OficioForm />
    },
    {
        path: '/admin/oficios/:id/edit',
        element: <OficioForm />
    }
]

const clientRoutes = [
    {
        path: '/home',
        element: <HomePage />
    },
    {
        path: '/profesionales',
        element: <ProfesionalPage />
    },
]

export function App() {
    const [login, setLogin] = useState(false)
    const [rol, setRol] = useState("")
    const navigate = useNavigate()

    const loadLogin = async () => {
        const token = await window.localStorage.getItem("token");

        console.log(token)

        setLogin(false)
        setRol("")

        if (token != '') {
            setLogin(true)
            setRol("Admin")
            //navigate("/admin/usuarios")
        }

        console.log(login, rol)
    }

    useEffect(() => {
        // Obtener el token del localstorage


        loadLogin()

    }, [])

    return (
        <>
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
                        <Routes>
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='*' element={<Navigate to={'/login'} />} />

                            {
                                adminRoutes.map((route, index) =>
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <ProtectedRoute>
                                                <NavBarLateral type='admin'>{route.element}</NavBarLateral>
                                            </ProtectedRoute>

                                        }
                                    />

                                )
                            }
                            {
                                clientRoutes.map((route, index) =>
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <ProtectedRoute>
                                                <NavBarLateral type='client'>{route.element}</NavBarLateral>
                                            </ProtectedRoute>

                                        }
                                    />
                                )
                            }
                        </Routes>
                    </Box>
                </ThemeProvider>
            </UserContextProvider>
        </>

    );
}