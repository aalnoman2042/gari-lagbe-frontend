
// import RequestRide from "@/pages/Rider/RequestRide";
// import RiderHistory from "@/pages/Rider/RiderHistory";
// import updateProfile from "@/pages/UpdateProfile";
import OngoingRide from "@/pages/Driver/OngoingRide";
import SOSContactUpdate from "@/pages/SOS/SOSContactUpdate";

import { lazy } from "react";

// Lazy load Rider components
const RequestRide = lazy(() => import("@/pages/Rider/RequestRide"));
const RiderHistory = lazy(() => import("@/pages/Rider/RiderHistory"));
const updateProfile = lazy(() => import("@/pages/UpdateProfile"));



export const RiderSideBarItems = [
    {
      title: "your Dashboard",
      url: "#",
      items: [
        {
            component: RiderHistory,
          title: "rider-history",
          url: "/rider/rider-history",
        
        },
        {
            component: RequestRide,
          title: "Call For Ride",
          url: "/rider/request-ride",
        
        },
                {
                    component: updateProfile,
                  title: "Update My Profile",
                  url: "/rider/updateProfile",
                
                },
                {
                    component: OngoingRide,
                  title: "ride on going",
                  url: "/rider/ride-ongoing",
                
                },
                  {
            component: SOSContactUpdate,
          title: "SOS Contact Update",
          url: "/rider/sos-update",
        
        },
       
      ],
    },
    
   
   
  
  ]