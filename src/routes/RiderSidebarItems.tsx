
import RequestRide from "@/pages/Rider/RequestRide";
import RiderHistory from "@/pages/Rider/RiderHistory";
import updateProfile from "@/pages/UpdateProfile";




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
       
      ],
    },
    
   
   
  
  ]