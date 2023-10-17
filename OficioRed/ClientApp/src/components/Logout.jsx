import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../guards/routes";

export function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem("token");
    alert("Se elimino el token correctamente");
    navigate("/login", { replace: true });
  };
  return <button onClick={logout}>Logout</button>;
}
