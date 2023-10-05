import CardProfesional from "./components/Card";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { ProfesionalesPage } from "./pages/ProfesionalesPage";
import { DashboardPage } from "./pages/Dashboard/Dashboard";

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
    {
        path: '/dashboard',
        element: <DashboardPage />
    },
];

export default AppRoutes;