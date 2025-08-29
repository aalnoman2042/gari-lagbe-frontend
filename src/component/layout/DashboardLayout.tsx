import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import { OnlineToggle } from "../common/onlineToggle"
import { useUserInfoQuery } from "@/redux/auth.api"
import Loading from "../common/loading"
// import OnlineToggle from "../common/onlineToggle"

export default function DashboardLayout() {

  const { data: userData, isLoading } = useUserInfoQuery(undefined);

if (isLoading) return <Loading></Loading>;

const driverId = userData?.data?._id;
console.log(driverId);

const onlineStatus = userData?.data?.onlineStatus || false;

  return (
    <SidebarProvider className="bg-[#175C4F]">
      <AppSidebar   />
      <SidebarInset className=""> 
     <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
  <SidebarTrigger className="-ml-1" />
  <Separator
    orientation="vertical"
    className="mr-2 data-[orientation=vertical]:h-4"
  />
  <h1 className="text-[#175C4F] font-extrabold">Hi {userData?.data?.name}</h1>
</header>

        <div className="flex flex-1 flex-col gap-4 p-4">
  {userData?.data?.role === "driver" && (
    <OnlineToggle
      driverId={driverId}
      currentStatus={onlineStatus}
    />
  )}
          <Outlet></Outlet>
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
