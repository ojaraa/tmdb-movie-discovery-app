import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";
import { useEffect, useRef } from "react";
import Footer from "../shared/footer";

const Layout = () => {
  const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.scrollTo({ top: 0, behavior: "auto" });
  //   }, 1000);
  // }, [pathname]);

  // const contentRef = useRef(null);
  const contentRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "auto" }); 
    }
  }, [pathname]);
  
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col h-screen w-full relative overflow-auto bg-[rgb(14,14,14)] "  ref={contentRef} >
          <SidebarTrigger className="absolute left-5 top-5 " />
          <div className="">
            <Outlet />
          </div>
          <Footer/>
        </main>
      </SidebarProvider>
      {/* <Outlet /> */}
    </div>
  );
};

export default Layout;
