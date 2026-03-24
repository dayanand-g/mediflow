import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <div>Dashboard</div>,
      },
      {
        path: "patients",
        element: <div>Patients</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <div>Login Page</div>,
  },
]);