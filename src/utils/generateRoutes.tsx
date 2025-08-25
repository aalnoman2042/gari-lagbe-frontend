// import type { ISidebarItems } from "@/types"

import { ISidebarItems } from "@/types/sideBarTypes"

export const generateRoutes = (sidebarItems : ISidebarItems[])=>{
    return sidebarItems.flatMap((section)=> section.items.map((route) =>({
        path : route.url,
        Component: route.component
    })))
}