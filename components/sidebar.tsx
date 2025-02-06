"use client";

import { cn } from "@/lib/utils";
import { CodeXml, ImageIcon, LayoutDashboard, MessagesSquare, Settings, VenetianMaskIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-400",
    disabled: false,
  },
  {
    label: "Conversation",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-violet-400",
    disabled: false,
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-400",
    disabled: false,
  },
  {
    label: "Vision Ai",
    icon: VenetianMaskIcon,
    href: "/vision",
    color: "text-emerald-400",
    disabled: true,
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-400",
    disabled: true,
  },
  {
    label: "Code Generation",
    icon: CodeXml,
    href: "/code",
    color: "text-green-700",
    disabled: true,
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    disabled: true,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full bg-gray-800 text-white shadow-lg border-r border-gray-700 transition-all duration-300 ease-in-out transform">
      {/* Logo Only */}
      <div className="px-6 py-6 flex items-center space-x-4">
        <div className="relative w-10 h-10">
          <Image
            src="/logo-colorful.svg" // Displaying your colorful logo
            alt="Logo"
            width={40} // Adjust the width to fit the sidebar
            height={40} // Adjust the height to fit the sidebar
          />
        </div>
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col space-y-4 py-6 px-4">
        {routes.map((route) => (
          <Link
            href={route.disabled ? "#" : route.href}
            key={route.href}
            className={cn(
              "flex items-center px-4 py-3 w-full text-sm font-medium rounded-lg transition-all duration-300 ease-in-out",
              pathname === route.href
                ? "bg-blue-800 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white transform hover:scale-105",
              route.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
