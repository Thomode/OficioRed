/* authGuard se ejecuta cada vez que se intenta acceder a una ruta */

import { Outlet, Navigate } from "react-router-dom";
import { PublicRoutes } from "./routes";

export const AuthGuard = () => {
  // Obtener el token del localstorage
  const token = window.localStorage.getItem("token");
  // Si el token existe, devolver el componente Outlet, sino devolver el componente Navigate
  return token ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
};

// ¿Que es el Outlet?
// El componente Outlet es un componente especial que se utiliza como
// un marcador de posición para renderizar el contenido de la ruta secundaria anidada (Ruta privada)
