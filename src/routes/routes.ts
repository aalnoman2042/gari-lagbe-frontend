import { createBrowserRouter } from "react-router";
import App from "../App";

// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import DashboardLayout from "@/component/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSideBarItems } from "./AdminSidebarItems";
import { RiderSideBarItems } from "./RiderSidebarItems";
import { DriverSideBarItems } from "./DriverSidebarItems";
import { TRole } from "@/types/sideBarTypes";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";

import { lazy } from "react";

// Lazy load pages
const RequestRide = lazy(() => import("@/pages/Rider/RequestRide"));
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const unauthorized = lazy(() => import("@/pages/unauthorized"));
const ContactForm = lazy(() => import("@/pages/ContactForm"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Payment = lazy(() => import("@/pages/Rider/payment"));
const DriverEarnings = lazy(() => import("@/pages/Driver/DriverEarnings"));
const DashboardLayout = lazy(() => import("@/component/layout/DashboardLayout"));


// Auth Pages
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export const router = createBrowserRouter([
       {
        // element: <App></App>
        Component: App,
        path: "/",
        children:[
        
        ]
    },
        {
         Component: Login,
                path: "/login"

    },
        {
         Component: NotFound,
                path: "*"

    },
    {
         Component: Register,
                path: "/register"

    },
    {
         Component: unauthorized,
                path: "/unauthorized"

    },
    {
         Component: Payment,
                path: "/rider/ride-ongoing/payment"

    },
      {
            Component: ContactForm,
            path: "/contact"
          },
        {
     
        Component: withAuth(DashboardLayout, role.admin as TRole),
        path: "/admin",
        children:[
            { index: true, Component: Analytics },
           ...generateRoutes(adminSideBarItems)
        ]
    },
    {
     
        Component: withAuth(DashboardLayout, role.rider as TRole),
        path: "/rider",
        children:[
            { index: true, Component: RequestRide },
          ...generateRoutes(RiderSideBarItems)
        ]
    },
    {
     
        Component: withAuth(DashboardLayout, role.driver as TRole),
        path: "/driver",
        children:[
            { index: true, Component: DriverEarnings },
          ...generateRoutes(DriverSideBarItems)
        ]
    },
])