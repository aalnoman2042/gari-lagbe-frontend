
import DriverEarnings from "@/pages/Driver/DriverEarnings";
import DriverHIstory from "@/pages/Driver/DriverHIstory";
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
       
      ],
    },
    
   
   
  
  ]