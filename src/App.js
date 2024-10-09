import "./global.css";
import Login from "./pages/Login";
import TwoFactor from "./pages/TwoFactor"
import { useRoutes } from "react-router-dom"; 
import WorkHours from "./pages/WorkHours";
import 'bootstrap/dist/css/bootstrap.min.css';


function AppRoutes()
{
  let routes = useRoutes([
    {path: "/", element: <Login/>},
    {path: "/two_factor", element: <TwoFactor/>},
    {path: "/work_hours", element: <WorkHours/>}
  ])
  return routes;
}

export default function App() {
  return (
    <div>
      <AppRoutes/>
    </div>
  );
}


