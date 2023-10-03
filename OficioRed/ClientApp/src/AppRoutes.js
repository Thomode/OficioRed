import { Inicio } from "./components/Inicio/Inicio";
import { Login } from "./components/Login/Login";
import { SearchComponent } from "./components/SearchComponent";

const AppRoutes = [
    {
        index: true,
        element: <Inicio />
    },
    {
        path: '/Login',
        element: <Login />
    },
    {
        path: '/searchComponent',
        element: <SearchComponent />
    },
];

export default AppRoutes;