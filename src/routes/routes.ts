import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "@/component/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSideBarItems } from "./AdminSidebarItems";
import { RiderSideBarItems } from "./RiderSidebarItems";

import { DriverSideBarItems } from "./DriverSidebarItems";

export const router = createBrowserRouter([
       {
        // element: <App></App>
        Component: App,
        path: "/",
        children:[
            {
                Component: About,
                path: "about"
            }
        ]
    },
        {
         Component: Login,
                path: "/login"

    },
    {
         Component: Register,
                path: "/register"

    },
        {
     
        Component: DashboardLayout,
        path: "/admin",
        children:[
           ...generateRoutes(adminSideBarItems)
        ]
    },
    {
     
        Component: DashboardLayout,
        path: "/rider",
        children:[
          ...generateRoutes(RiderSideBarItems)
        ]
    },
    {
     
        Component: DashboardLayout,
        path: "/driver",
        children:[
          ...generateRoutes(DriverSideBarItems)
        ]
    },
])