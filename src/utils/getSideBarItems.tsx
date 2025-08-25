import { role } from "@/constants/role";
import { adminSideBarItems } from "@/routes/AdminSidebarItems";
import { DriverSideBarItems } from "@/routes/DriverSidebarItems";
import { RiderSideBarItems } from "@/routes/RiderSidebarItems";
import { TRole } from "@/types/sideBarTypes";
// import { adminSideBarItems } from "@/routes/adminSideBar";
// import { userSideBarItems } from "@/routes/userSidebar";
// import type { TRole } from "@/types";

export const getSideBarItems = (userRole :TRole) =>{

    switch (userRole) {
        case role.superAdmin:
            
            return [...adminSideBarItems]
            
    case role.admin:
        return [...adminSideBarItems]
            
    case role.rider:
        return [...RiderSideBarItems]
    case role.driver:
        return [...DriverSideBarItems]
        default:
            return []
        
    }
}