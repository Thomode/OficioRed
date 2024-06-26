import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../../guards/routes";
import { RoutesWithNotFound } from "../../utilities/RoutesWithNotFound";
import { Dashboard } from "./Dashboard";
import HomePage from "./HomePage";
import { NavBarLateral } from "../../layouts/NavBarLateral";
import { SignupPage } from "../SignupPage";
import { ProfesionalPage } from "../ProfesionalPage";
import { UsuarioAdminPage } from "../UsuarioAdminPage";
import { RubroAdminPage } from "../RubroAdminPage";
import { RubroForm } from "../../components/Rubro/RubroForm";

export function Private() {
  return (
    <NavBarLateral>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        <Route path={PrivateRoutes.HOME} element={<HomePage />} />
        <Route path={PrivateRoutes.SIGNUP} element={<SignupPage />} />
        <Route
          path={PrivateRoutes.PROFESIONALES}
          element={<ProfesionalPage />}
        />
        <Route path={PrivateRoutes.USUARIOS} element={<UsuarioAdminPage />} />
        <Route path={PrivateRoutes.RUBROS} element={<RubroAdminPage />} />
        <Route path="/rubroForm" element={<RubroForm />} />
      </RoutesWithNotFound>
    </NavBarLateral>
  );
}
