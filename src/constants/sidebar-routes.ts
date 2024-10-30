import { checkPermissions } from "@/lib/utils";
import { AiOutlineLine } from "react-icons/ai";
import { LuUsers2, LuLayoutDashboard } from "react-icons/lu";
import { LiaStoreAltSolid } from "react-icons/lia";
import { IoMdSettings } from "react-icons/io";
import { BiTestTube } from "react-icons/bi";
import { LiaCubesSolid } from "react-icons/lia";
import { IconType } from "react-icons/lib";

interface Route {
  name: string;
  icon: IconType;
  navigate: string;
  active: RegExp[];
  type: "link" | "collapse";
  visible: boolean;
  sublinks?: Route[];
}

export const sidebarRoutes: Route[] = [
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
  {
    name: "Settings",
    icon: IoMdSettings,
    navigate: "/settings",
    active: [/\/settings/i],
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
];

export const excludedRoutes: RegExp[] = [/\/login/i];
