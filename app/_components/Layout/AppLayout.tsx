"use client";

import { AppTopbar } from "@/app/_components/Layout/AppTopbar";
import { createContext, ReactNode, useContext, useState } from "react";
import { AppSidebar } from "./AppSiderbar";

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useSidebarContext = () => useContext(SidebarContext);

export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="bg-background min-h-screen">
        <AppSidebar />
        <div
          className="transition-all duration-300"
          style={{ marginLeft: collapsed ? "4rem" : "16rem" }}
        >
          <AppTopbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
