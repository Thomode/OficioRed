import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/Dashboard/Dashboard";
import { UsuarioAdminPage } from "./pages/UsuarioAdminPage";

import UsuarioForm from "./components/UsuarioForm";


export const AppRoutes = [
    {
        path: '/home',
        element: <HomePage />
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
        path: '/dashboard',
        element: <DashboardPage />
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
];