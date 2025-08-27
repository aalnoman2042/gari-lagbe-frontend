// import AllDrivers from "@/pages/Admin/AllDrivers";
// import AllRiders from "@/pages/Admin/AllRiders";
// import AllRides from "@/pages/Admin/AllRides";
// import AllUser from "@/pages/Admin/AllUser";
// import UpdateProfile from "@/pages/UpdateProfile";
// import Analytics from "@/pages/Admin/Analytics";
import { lazy } from "react";



const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const AllUser = lazy(() => import("@/pages/Admin/AllUser"));
const AllDrivers = lazy(() => import("@/pages/Admin/AllDrivers"));
const AllRiders = lazy(() => import("@/pages/Admin/AllRiders"));
const AllRides = lazy(() => import("@/pages/Admin/AllRides"));
const UpdateProfile = lazy(() => import("@/pages/UpdateProfile"));



export const adminSideBarItems = [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
            component: Analytics,
          title: "Analytics",
          url: "/admin/analytics",
        
        },
       
      ],
    },
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "All-Users",
          url: "/admin/all-users",
        component: AllUser,
        },
        {
          title: "All-Riders",
          url: "/admin/all-riders",
        component: AllRiders,
        },
        {
          title: "All-Drivers",
          url: "/admin/all-Drivers",
        component: AllDrivers,
        },
        {
          title: "All-Rides",
          url: "/admin/all-rides",
        component: AllRides,
        },
                {
            component: UpdateProfile,
          title: "Update My Profile",
          url: "/admin/updateProfile",
        
        },

       
      ],
    },
   
   
  
  ]