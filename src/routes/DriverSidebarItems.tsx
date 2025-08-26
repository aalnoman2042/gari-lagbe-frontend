
import AvailableRidesNow from "@/pages/Driver/availableRidesNow";
import DriverEarnings from "@/pages/Driver/DriverEarnings";
import DriverHIstory from "@/pages/Driver/DriverHIstory";
import OngoingRide from "@/pages/Driver/OngoingRide";
import updateProfile from "@/pages/UpdateProfile";





export const DriverSideBarItems = [
    {
      title: "History",
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
       
      ],
    },
    
   
   
  
  ]