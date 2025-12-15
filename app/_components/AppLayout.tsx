"use client";

import { AppSidebar } from "@/app/_components/AppSiderbar";
import { SidebarInset, SidebarProvider } from "@/app/_components/ui/sidebar";
import { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
