import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
// import Logo from "@/assets/icons/Logo"
import { Link } from "react-router"

import { getSideBarItems } from "@/utils/getSideBarItems"
import { useUserInfoQuery } from "@/redux/auth.api"
// import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import logo from ".././assets/Gari-lagbe.png"
// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data : userData} = useUserInfoQuery(undefined)


  console.log(userData);
  


  const data = {

  navMain: getSideBarItems(userData?.data?.role)
}
  return (
    <Sidebar  {...props}>
      <SidebarHeader className="bg-[#175C4F]">
        {/* <Logo></Logo> */}
        <h1><Link to={"/"}>
        <img src={logo} alt="" className="bg-white w-[150px] h-[80px]" />
        </Link></h1>
      </SidebarHeader>
      <SidebarContent className="bg-[#175C4F]">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
