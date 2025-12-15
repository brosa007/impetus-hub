"use client";

import { NavMain } from "@/app/_components/sidebar/NavMain";
import { NavUser } from "@/app/_components/sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { createClient } from "@/app/_lib/supabase/client";
import { Home, Zap } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";

type User = {
  id: string;
  email?: string;
} | null;

type Profile = {
  name: string | null;
  email: string | null;
  avatar_url: string | null;
} | null;

const navItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Automations", url: "/automations", icon: Zap },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<User>(null);
  const [profile, setProfile] = useState<Profile>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("name, email, avatar_url")
          .eq("user_id", user.id)
          .single();

        setProfile(
          profileData
            ? {
                name: profileData.name,
                email: profileData.email,
                avatar_url: profileData.avatar_url,
              }
            : null,
        );
      }
    };

    getUser();
  }, []);

  const getAvatarUrl = (path: string | null | undefined) => {
    if (!path) return "/avatars/shadcn.jpg";
    if (path.startsWith("http")) return path;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1/object/public/avatars/${path}`;
  };

  const navUserData = {
    name: profile?.name || user?.email?.split("@")[0] || "Usuário",
    email: profile?.email || user?.email || "",
    avatar: getAvatarUrl(profile?.avatar_url),
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                  <Zap className="text-primary-foreground h-4 w-4" />
                </div>
                <span className="text-base font-semibold">Impetus Hub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={navUserData} />
      </SidebarFooter>
    </Sidebar>
  );
}
