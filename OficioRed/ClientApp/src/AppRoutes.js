import  HomePage  from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { UsuarioAdminPage } from "./pages/UsuarioAdminPage";
import { RubroAdminPage } from "./pages/RubroAdminPage";
import { RubroForm } from "./components/Rubro/RubroForm";
import { ProfesionalPage } from "./pages/ProfesionalPage";
import UsuarioForm from "./components/Usuario/UsuarioForm";


export const AppRoutes = [
    // Si pone cualquier otra ruta que lo navege a la raiz
    {
        path: '*',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <LoginPage />
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
        path: '/home',
        element: <HomePage />
    },
    {
        path: '/profesionales',
        element: <ProfesionalPage />
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
        path: '/rubros',
        element: <RubroAdminPage />
    },
    {
        path: '/rubroForm',
        element: <RubroForm />
    },
    {
        path: '/rubros/:id/edit',
        element: <RubroForm />
    }
];