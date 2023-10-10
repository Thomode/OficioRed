import  HomePage  from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { UsuarioAdminPage } from "./pages/UsuarioAdminPage";
import { OficioAdminPage } from "./pages/OficioAdminPage";
import { OficioForm } from "./components/Oficio/OficioForm";
import { ProfesionalPage } from "./pages/ProfesionalPage";
import UsuarioForm from "./components/Usuario/UsuarioForm";


export const AppRoutes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/profesionales',
        element: <ProfesionalPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/signup',
        element: <SignupPage />
    },
    {
        path: '/usuarios',
        element: <UsuarioAdminPage/>
    },
    {
        path: '/usuariosForm',
        element: <UsuarioForm />
    },
    {
        path: '/usuarios/:id/edit',
        element: <UsuarioForm />
    },
    {
        path: '/oficios',
        element: <OficioAdminPage />
    },
    {
        path: '/oficioForm',
        element: <OficioForm />
    },
    {
        path: '/oficios/:id/edit',
        element: <OficioForm />
    },
];