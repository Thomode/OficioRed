import { useCallback, useContext } from "react";
import Context from "./UserContext";

export function useUser() {
  const { jwt, setJwt } = useContext(Context);

  const login = useCallback(() => {
    setJwt("test");
  }, [setJwt]);

  /*const logout = useCallback(() => {
    setJwt(null);
  }, [setJwt]);*/
  const logout = () => {
    // Eliminar el token del localStorage
    window.localStorage.removeItem("token");
    // Muestro que se elimino correctamente
    alert("Se elimino el token correctamente");

    // Realizar cualquier otra acción necesaria al cerrar sesión
    // ...
  };

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
  };
}
