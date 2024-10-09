// src/App.js
import "./global.css";
import Login from "./pages/Login";
import TwoFactor from "./pages/TwoFactor";
import { useRoutes, useLocation } from "react-router-dom"; 
import WorkHours from "./pages/WorkHours";
import Wastes from "./pages/Wastes";
import CustomNavbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import CollectPoints from "./pages/CollectPoints";

function AppRoutes() {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/two_factor", element: <TwoFactor /> },
    { path: "/work_hours", element: <WorkHours /> },
    { path: "/wastes", element: <Wastes /> },
    { path: "/collect_points", element: <CollectPoints /> },
  ]);
  return routes;
}

export default function App() {
  const location = useLocation(); // Para verificar a rota atual

  return (
    <div>
      {/* Exibir Navbar exceto nas rotas "/" e "/two_factor" */}
      {location.pathname !== "/" && location.pathname !== "/two_factor" && (
        <CustomNavbar />
      )}
      <AppRoutes />
    </div>
  );
}
