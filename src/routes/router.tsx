import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/CommonPages/Error";
import MainLayout from "../layOuts/MainLayout";
import { generateRoute } from "../utils/generateRoute";
import { NavItemsPath } from "../lib/routerAndNavItemsPath";
// import Registration from "../pages/CommonPages/Registration";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: generateRoute(NavItemsPath)
    },

])

export default router