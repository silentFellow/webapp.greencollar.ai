// import { checkPermissions } from "@/lib/utils"; // TODO: make visible by checkPermissions
import { AiOutlineLine } from "react-icons/ai";
import { LuUsers2, LuLayoutDashboard } from "react-icons/lu";
import { LiaStoreAltSolid } from "react-icons/lia";
import { BiTestTube } from "react-icons/bi";
import { LiaCubesSolid } from "react-icons/lia";
import { IconType } from "react-icons/lib";
import { SidebarStateKeys } from "@/zustand";
import { FaFileCsv } from "react-icons/fa6";

interface BaseRoute {
  visible: boolean;
}

interface LinkRoute extends BaseRoute {
  name: string;
  type: "link";
  navigate: string;
  active: RegExp[];
  icon: IconType;
}

interface CollapseRoute extends BaseRoute {
  name: keyof SidebarStateKeys;
  type: "collapse";
  sublinks: LinkRoute[];
}

type Route = LinkRoute | CollapseRoute;

export const sidebarRoutes: Route[] = [
  {
    name: "general",
    type: "collapse",
    visible: true,
    sublinks: [
      {
        name: "Dashboard",
        icon: LuLayoutDashboard,
        navigate: "/dashboard",
        active: [/\/dashboard/i],
        type: "link",
        visible: true,
      },
      {
        name: "Organization",
        icon: LuLayoutDashboard,
        navigate: "/org",
        active: [/\/org/i],
        type: "link",
        visible: true,
      },
      {
        name: "Tests",
        icon: BiTestTube,
        navigate: "/",
        active: [/^\/test.*$/i, /^\/$/],
        type: "link",
        visible: true,
      },
      {
        name: "Users",
        icon: LuUsers2,
        navigate: "/users",
        active: [/^\/users*/i, /^\/user*/i],
        type: "link",
        visible: true,
      },
      {
        name: "Kiosk",
        icon: LiaStoreAltSolid,
        navigate: "/kiosk",
        active: [/\/kiosk*/i],
        type: "link",
        visible: true,
      },
      {
        name: "Models",
        icon: LiaCubesSolid,
        navigate: "/models",
        active: [/\/models*/i, /\/model*/i],
        type: "link",
        visible: true,
      },
      {
        name: "Cost",
        icon: LiaCubesSolid,
        navigate: "/cost",
        active: [/\/cost/i],
        type: "link",
        visible: true,
      },
    ],
  },
  {
    name: "settings",
    type: "collapse",
    visible: true,
    sublinks: [
      {
        name: "Crop",
        icon: AiOutlineLine,
        navigate: "/settings/crop",
        active: [/\/settings\/crop/i],
        type: "link",
        visible: true,
      },
      {
        name: "User",
        icon: LuUsers2,
        navigate: "/settings/user",
        active: [/\/settings\/user/i],
        type: "link",
        visible: true,
      },
    ],
  },
  {
    name: "tools",
    type: "collapse",
    visible: true,
    sublinks: [
      {
        name: "CSV Sample",
        icon: FaFileCsv,
        navigate: "tools/csv-sample",
        active: [/\/tools\/csv-sample/i],
        type: "link",
        visible: true,
      },
    ],
  },
];

export const excludedRoutes: RegExp[] = [/\/login/i];
