import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfesionalesPage } from "./pages/ProfesionalesPage";
import { DashboardPage } from "./pages/Dashboard/Dashboard";
import { UsuarioAdminPage } from "./pages/UsuarioAdminPage";
import UsuarioForm from "./components/UsuarioForm";

export const AppRoutes = [
    {
        index: true,
        path: '/home',
        element: <HomePage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/profesionales',
        element: <ProfesionalesPage />
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
    }
];