import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PiSignOutBold } from "react-icons/pi";
import { sidebarRoutes, excludedRoutes } from "@/constants";
import { Link, useLocation } from "react-router-dom";
import { checkRegex } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useSidebarStore } from "@/zustand";

const AppSidebar = () => {
  const { state, toggleState } = useSidebarStore();

  const { pathname } = useLocation();

  if (excludedRoutes.map(route => checkRegex(route, pathname)).includes(true)) return null;

  return (
    <Sidebar className="bg-[rgb(33,33,33)] text-white">
      <SidebarHeader>
        <div className="center p-2 gap-2 bg-[#2c2c2c] rounded-lg">
          <div className="h-16 rounded-lg">
            <img src="/assets/taramlogo.png" alt="Logo" className="full" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl uppercase font-medium">gca_admin</h1>
            <h1 className="text-sm text-gray-300">gca_admin</h1>
            <h1 className="text-sm text-gray-300">kiosk1</h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="full flex px-3 my-3">
        <SidebarMenu>
          {sidebarRoutes.map(route =>
            route.type === "link" ? (
              <SidebarMenuItem
                key={route.name}
                className={`p-1 rounded-md ${route.active.map(active => checkRegex(active, pathname)).includes(true) && "bg-[#877EFF] text-[#2c2c2c]"}`}
              >
                <SidebarMenuButton asChild className="flex gap-5 text-md">
                  <Link to={route.navigate}>
                    <route.icon />
                    <span className="font-bold">{route.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              <Collapsible
                defaultOpen={state[route.name]}
                onOpenChange={() => toggleState(route.name)}
                className="group/collapsible"
              >
                <SidebarGroup key={route.name}>
                  <SidebarGroupLabel asChild className="p-1 text-sm">
                    <CollapsibleTrigger>
                      <span className="uppercase font-extrabold">{route.name}</span>
                      <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarMenu>
                      {route.sublinks?.map(sublink => (
                        <SidebarMenuItem
                          key={sublink.name}
                          className={`p-1 rounded-md ${sublink.active.map(active => checkRegex(active, pathname)).includes(true) && "bg-[#877EFF] text-[#2c2c2c]"}`}
                        >
                          <SidebarMenuButton asChild className="flex gap-5 text-md">
                            <Link to={sublink.navigate}>
                              <sublink.icon />
                              <span className="font-bold">{sublink.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ),
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <Button className="p-3 flex gap-3">
          <PiSignOutBold />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
