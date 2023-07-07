import AdminDashboard from "../pages/AdminDashboard";
import Forget from "../pages/Forget";
import Login from "../pages/Login";

export const RouteData = [
  {
    id: 1,
    protected: false,
    path: "/",
    component: <Login />,
  },
  {
    id: 2,
    protected: false,
    path: "/dashboard",
    component: <AdminDashboard />,
  },

  {
    id: 3,
    protected: false,
    path: "/forget",
    component: <Forget />,
  },
];
