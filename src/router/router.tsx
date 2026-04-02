import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "../components/protectedRoutes";
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Analytics from "../pages/analytics";
import PatientPage from "../pages/patient";
import Error from "../pages/error";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "../pages/dashboard";

export const router = createBrowserRouter([

    {
        element: <ProtectedRoutes />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                        errorElement: <Error />
                    },
                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                        errorElement: <Error />
                    },
                    {
                        path: "/analytics",
                        element: <Analytics />,
                        errorElement: <Error /> 
                    },
                    {
                        path: "/patient",
                        element: <PatientPage />,
                        errorElement: <Error /> 
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error />
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <Error />
    }
])

export default router;
  