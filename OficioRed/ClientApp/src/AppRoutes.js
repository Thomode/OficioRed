import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/Dashboard/Dashboard";
import { UsuarioAdminPage } from "./pages/UsuarioAdminPage";
import UsuarioForm from "./components/UsuarioForm";

const AppRoutes = [
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
    }
];

export default AppRoutes;