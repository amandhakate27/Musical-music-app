import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Favourite from "../pages/Favourite";
import Login from "../pages/Login";
import ArtistDashboard from "../pages/ArtistDashboard";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import Protected from "./Protected";
import Public from "./Public";
import ArtistGuard from "./ArtistGuard";
const AppRoutes = () => {
    let router = createBrowserRouter([
        {
            path: "/",
            element: <Public />,
            children:
                [
                    {
                        path: "",
                        element: <AuthLayout />,
                        children: [
                            {
                                path: "",
                                element: <Login />
                            },
                            {
                                path: "register",
                                element: <Register />
                            }
                        ]
                    }
                ]
        },
        {
            path: "/main",
            element: <Protected />,
            children: [
                {
                    path: "",
                    element: <MainLayout />,
                    children: [
                        {
                            path: "",
                            element: <Home />
                        },
                        {
                            path: "favourite",
                            element: <Favourite />
                        },
                        {
                            element: <ArtistGuard />,
                            children: [
                                {
                                    path: "artist-dashboard",
                                    element: <ArtistDashboard />
                                }
                            ]
                        },

                    ]
                }
            ]
        }
    ]);
    return <RouterProvider router={router} />
}

export default AppRoutes