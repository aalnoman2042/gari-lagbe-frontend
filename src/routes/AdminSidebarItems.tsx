import AllUser from "@/pages/Admin/AllUser";
import Analytics from "@/pages/Admin/Analytics";




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
          title: "add-tour",
          url: "/admin/all-users",
        component: AllUser,
        },

       
      ],
    },
   
   
  
  ]