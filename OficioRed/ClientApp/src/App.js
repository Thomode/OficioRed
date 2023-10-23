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
import { RubroAdminPage } from "./pages/RubroAdminPage";
import { RubroForm } from "./components/Rubro/RubroForm";
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
        path: '/admin/rubros',
        element: <RubroAdminPage />
    },
    {
        path: '/admin/rubroForm',
        element: <RubroForm />
    },
    {
        path: '/admin/rubros/:id/edit',
        element: <RubroForm />
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

const getAcceso = () => {
    const local = window.localStorage.getItem("acceso");
    const data = JSON.parse(local)

    return data
}

export function App() {
    const [acceso, setAcceso] = useState(getAcceso())

    const navigate = useNavigate()
    
    const logout = () => {
        window.localStorage.removeItem("acceso");
        setAcceso(null)
        alert("Se elimino el acceso correctamente");
      };

    useEffect(() => {
        console.log("acceso:", acceso)

        if (acceso) {
            if (acceso.idRol === 2) {
                navigate("/admin/usuarios")
            }
            else {
                navigate("/home")
            }
        }

    }, [])

    return (
        <>
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
                        <Route path='/login' element={<LoginPage setAcceso={setAcceso} />} />
                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='*' element={<Navigate to={'/login'} />} />
                        

                        {
                            adminRoutes.map((route, index) =>
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <ProtectedRoute
                                            isAllowed={acceso && acceso.idRol === 2}
                                        >
                                            <NavBarLateral type='Admin' logout={logout}>{route.element}</NavBarLateral>
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
                                        <ProtectedRoute
                                            isAllowed={acceso && acceso.idRol !== 2}
                                        >
                                            <NavBarLateral type='client' logout={logout}>{route.element}</NavBarLateral>
                                        </ProtectedRoute>

                                    }
                                />
                            )
                        }
                    </Routes>
                </Box>
            </ThemeProvider>
        </>
    );
}