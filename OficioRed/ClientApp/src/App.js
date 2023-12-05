import { useEffect, useState } from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { NavBarLateral } from './layouts/NavBarLateral';
import HomePage from "./pages/Private/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { UsuarioAdminPage } from "./pages/UsuarioAdminPage";
import { RubroAdminPage } from "./pages/RubroAdminPage";
import { RubroForm } from "./components/Rubro/RubroForm";
import { ProfesionalPage } from "./pages/ProfesionalPage";
import { MiPerfilProfesional } from "./pages/MiPerfilProfesional.jsx";
import { MiPerfilInteresado } from "./pages/MiPerfilInteresado.jsx";
import { MiPerfilAdmin } from "./pages/MiPerfilAdmin.jsx";
import PerfilProfesional from "./pages/PerfilProfesional";
import UsuarioForm from "./components/Usuario/UsuarioForm";
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './utilities/ProtectedRoute';
import { ProfesionalSignUp } from './pages/ProfesionalSignUp.jsx'
import { InteresadoSignUp } from './pages/InteresadoSignUp.jsx';
import FavoritePage from './pages/FavoritePage';
import HomeAdmin from "./pages/Private/HomeAdmin";
//import Comments from './pages/Comments/Comments.jsx';
import { Comentarios } from './pages/Comentarios/Comentarios.jsx';
import Swal from "sweetalert2";
import "./index.css";

const theme = createTheme();

const adminRoutes = [
    {
        path: '/admin/home',
        element: <HomeAdmin />
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
    {
        path: '/admin/:id/miPerfilAdmin',
        element: <MiPerfilAdmin />
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
        path: '/profesionales/:idRubro',
        element: <ProfesionalPage />
    },
    {
        path: '/:id/PerfilProfesional',
        element: <PerfilProfesional />
    },
    {
        path: '/Favoritos',
        element: <FavoritePage />
    },
    {
        path: '/:id/miPerfilProfesional',
        element: <MiPerfilProfesional />
    },
    {
        path: '/:id/miPerfilInteresado',
        element: <MiPerfilInteresado />
    },
    /*{
        path: '/:id/PerfilProfesional/Comentarios',
        element: <Comments
        commentsUrl="http://localhost:3004/comments"
        currentUserId="1"
      />
    },*/
    {
        path: '/:id/PerfilProfesional/Comentarios',
        element: <Comentarios />
    }
]

const getAcceso = () => {
    const local = window.localStorage.getItem("acceso");
    const data = JSON.parse(local);
    return data
}

export function App() {
    const [acceso, setAcceso] = useState(getAcceso())
    const navigate = useNavigate()

    const logout = () => {
        window.localStorage.removeItem("acceso");
        window.localStorage.removeItem("favoritos");
        Swal.fire({
            title: "¿Está seguro que quiero cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1b325f",
            cancelButtonColor: "#d33",
            confirmButtonText: "SÍ",
            cancelButtonText: "NO",
            reverseButtons: true,
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "¡Hasta luego!",
                    text: "Cierre de sesión exitoso!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setAcceso(null);
            }
        });
    };

    useEffect(() => {
        if (acceso) {
            if (acceso.idRol === 1) {
                navigate("/admin/home")
            }
            else {
                navigate("/home")
            }
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='/' element={<LoginPage setAcceso={setAcceso} />} />
                <Route path='/signup' element={<SignupPage setAcceso={setAcceso} />} />
                <Route path='/profesionalSignup' element={<ProfesionalSignUp />} />
                <Route path='/interesadoSignup' element={<InteresadoSignUp />} />
                <Route path='*' element={<Navigate to={'/'} />} />
                {
                    adminRoutes.map((route, index) =>
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <ProtectedRoute isAllowed={acceso && acceso.idRol === 1} >
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
                                <ProtectedRoute isAllowed={acceso && acceso.idRol !== 1} >
                                    <NavBarLateral type='client' logout={logout}>{route.element}</NavBarLateral>
                                </ProtectedRoute>
                            }
                        />
                    )
                }
            </Routes>
        </ThemeProvider>
    );
}