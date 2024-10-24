import "./global.css";
import Login from "./pages/Login";
import TwoFactor from "./pages/TwoFactor";
import { useRoutes, useLocation, Navigate } from "react-router-dom"; 
import WorkHours from "./pages/WorkHours";
import Wastes from "./pages/Wastes";
import CustomNavbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import CollectPoints from "./pages/CollectPoints";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"; // Importando NotFound
import Points from "./pages/Points";
import CollectUser from "./pages/CollectUser";
import Contact from "./pages/Contact";

function AppRoutes() {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/account", element: <Login /> },
    { path: "/two_factor", element: <TwoFactor /> },
    { path: "/work_hours", element: <WorkHours /> },
    { path: "/wastes", element: <Wastes /> },
    { path: "/collect_points", element: <CollectPoints /> },
    { path: "/points", element: <Points /> },
    { path: "/collect_user", element: <CollectUser /> },
    { path: "/contact", element: <Contact /> },
    { path: "/404", element: <NotFound /> },  // Rota 404 explícita
    { path: "*", element: <Navigate to="/404" /> },  // Redireciona rotas inexistentes para 404
  ]);
  return routes;
}

export default function App() {
  const location = useLocation(); // Para verificar a rota atual

  // Array de rotas onde a Navbar NÃO deve ser exibida
  const hideNavbarRoutes = ["/", "/account", "/contact", "/two_factor", "/404", "/points", "/collect_user"];

  // Verifica se a rota atual está no array de rotas para esconder a Navbar
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {/* Exibir Navbar apenas se a rota não estiver no array */}
      {!shouldHideNavbar && (
        <CustomNavbar />
      )}
      <AppRoutes />
    </div>
  );
}
