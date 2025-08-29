
// import AvailableRidesNow from "@/pages/Driver/availableRidesNow";
// import DriverEarnings from "@/pages/Driver/DriverEarnings";
// import DriverHIstory from "@/pages/Driver/DriverHIstory";
// import OngoingRide from "@/pages/Driver/OngoingRide";
// import updateProfile from "@/pages/UpdateProfile";
// import SOSContactUpdate from "@/pages/SOS/SOSContactUpdate";
import { lazy } from "react";

// Lazy load components
const AvailableRidesNow = lazy(() => import("@/pages/Driver/availableRidesNow"));
const DriverEarnings = lazy(() => import("@/pages/Driver/DriverEarnings"));
const DriverHIstory = lazy(() => import("@/pages/Driver/DriverHIstory"));
const OngoingRide = lazy(() => import("@/pages/Driver/OngoingRide"));
const updateProfile = lazy(() => import("@/pages/UpdateProfile"));
const SOSContactUpdate = lazy(() => import("@/pages/SOS/SOSContactUpdate"));





export const DriverSideBarItems = [
    {
      title: "Driver Dashboard",
      url: "#",
      items: [
        {
            component: DriverEarnings,
          title: "Driver-earnings",
          url: "/driver/driver-earnings",
        
        },
        {
            component: DriverHIstory,
          title: "Driver-history",
          url: "/driver/driver-history",
        
        },
        {
            component: updateProfile,
          title: "Update My Profile",
          url: "/driver/updateProfile",
        
        },
        {
            component: AvailableRidesNow,
          title: "available rides Now",
          url: "/driver/available-ride",
        
        },
        {
            component: OngoingRide,
          title: "OnGoing Ride",
          url: "/driver/ongoing",
        
        },
        {
            component: SOSContactUpdate,
          title: "SOS Contact Update",
          url: "/driver/sos-update",
        
        },
       
      ],
    },
    
   
   
  
  ]