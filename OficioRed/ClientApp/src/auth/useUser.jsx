import { useCallback, useContext } from "react";
import Context from "./UserContext";

export function useUser() {
  const { jwt, setJwt } = useContext(Context);

  const login = useCallback(() => {
    setJwt("test");
  }, [setJwt]);

  const logout = useCallback(() => {
    setJwt(null);
  }, [setJwt]);

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
  };
}
