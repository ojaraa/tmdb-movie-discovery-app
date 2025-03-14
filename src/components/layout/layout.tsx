import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";

const Layout = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col h-screen overflow-auto w-full relative ">
          <SidebarTrigger  className="absolute left-5 top-5 "/>
          <div className="">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;