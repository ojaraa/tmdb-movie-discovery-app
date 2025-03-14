import { Home, SearchIcon, Square, Tv, VideoIcon } from "lucide-react";
import { IoLogoBuffer } from "react-icons/io5";
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
} from "../ui/sidebar";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  return (
    <Sidebar className=" pl-8">
      <SidebarHeader className=" pt-10">
        <div className="text-center">
          <Link to={`/`}>
            <h1 className="text-2xl font-bold tracking-[-2px] cursor-pointer text-primary ">
              <IoLogoBuffer className="flex items-center justify-center" />
              trend
            </h1>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>For You</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.slice(0, 2).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

const items = [
  {
    title: "Home",
    url: "",
    icon: Home,
  },
  {
    title: "Movies",
    url: "movies",
    icon: VideoIcon,
  },
  {
    title: "TV Shows",
    url: "tv",
    icon: Tv,
  },
  {
    title: "Genres",
    url: "genres",
    icon: Square,
  },
  {
    title: "Search",
    url: "search",
    icon: SearchIcon,
  },
];
