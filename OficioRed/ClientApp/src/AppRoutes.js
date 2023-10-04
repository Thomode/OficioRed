import CardProfesional from "./components/Card";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { ProfesionalesPage } from "./pages/ProfesionalesPage";

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
        path: '/profesionales',
        element: <ProfesionalesPage />
    },
];

export default AppRoutes;