import { Routes, Route } from "react-router-dom";

export function RoutesWithNotFound({ children }) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
}
