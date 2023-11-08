import React, { useEffect, useState } from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { CssBaseline, Box, createTheme, ThemeProvider } from '@mui/material';
import backgroundImage from './assets/armarios-formas-geometricas.jpg';
import { NavBarLateral } from './layouts/NavBarLateral';
import HomePage from "./pages/Private/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { UsuarioAdminPage } from "./pages/UsuarioAdminPage";
import { RubroAdminPage } from "./pages/RubroAdminPage";
import { RubroForm } from "./components/Rubro/RubroForm";
import { ProfesionalPage } from "./pages/ProfesionalPage";
import { MiPerfil } from "./pages/MiPerfil";
import UsuarioForm from "./components/Usuario/UsuarioForm";
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './utilities/ProtectedRoute';
import { ProfesionalSignUp } from './pages/ProfesionalSignUp.jsx'
import { InteresadoSignUp } from './pages/InteresadoSignUp.jsx';
import HomeAdmin from "./pages/Private/HomeAdmin";

const theme = createTheme();

const adminRoutes = [
    {
        path: '/admin/home',
        element: <HomeAdmin/>
    },
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
    },
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
    {
        path: '/:id/miPerfil',
        element: <MiPerfil />
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
                <Box>
                    <Routes>
                        <Route path='/' element={<LoginPage setAcceso={setAcceso} />} />
                        <Route path='/signup' element={<SignupPage setAcceso={setAcceso} />} />
                        <Route path='/profesionalSignup' element={<ProfesionalSignUp setAcceso={setAcceso} />} />
                        <Route path='/interesadoSignup' element={<InteresadoSignUp setAcceso={setAcceso} />} />
                        <Route path='*' element={<Navigate to={'/'} />} />
                        

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