"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { createClient } from "@/app/_lib/supabase/client";
import { cn } from "@/app/_lib/utils";
import type { User } from "@supabase/supabase-js";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText,
  FolderKanban,
  Home,
  Lock,
  LogOut,
  Server,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSidebarContext } from "./AppLayout";

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  active: boolean;
  maintenance?: boolean;
}

const navItems: NavItem[] = [
  { title: "Home", icon: Home, href: "/dashboard", active: true },
  { title: "Automations", icon: Zap, href: "/automations", active: true },
  {
    title: "AI Creators",
    icon: Sparkles,
    href: "#",
    active: false,
    maintenance: true,
  },
  {
    title: "Backend",
    icon: Server,
    href: "#",
    active: false,
    maintenance: true,
  },
  {
    title: "Audio Visual",
    icon: Video,
    href: "#",
    active: false,
    maintenance: true,
  },
  {
    title: "Copy",
    icon: FileText,
    href: "#",
    active: false,
    maintenance: true,
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    href: "#",
    active: false,
    maintenance: true,
  },
  {
    title: "Projetos",
    icon: FolderKanban,
    href: "#",
    active: false,
    maintenance: true,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href) && href !== "#";
  };

  return (
    <aside
      className={cn(
        "bg-sidebar border-sidebar-border fixed top-0 left-0 z-40 h-screen border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="border-sidebar-border flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Zap className="text-primary-foreground h-4 w-4" />
            </div>
            <span className="text-sidebar-foreground font-semibold">
              Impetus Ops
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Zap className="text-primary-foreground h-4 w-4" />
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          if (item.maintenance) {
            return (
              <Tooltip key={item.title} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm opacity-50 transition-colors",
                      collapsed && "justify-center px-2",
                    )}
                  >
                    <Icon className="text-sidebar-muted h-5 w-5 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="text-sidebar-muted flex-1">
                          {item.title}
                        </span>
                        <Lock className="text-sidebar-muted h-3.5 w-3.5" />
                      </>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-popover border">
                  <p className="text-sm">Em breve</p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  active ? "text-sidebar-primary" : "text-sidebar-muted",
                )}
              />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="absolute right-0 bottom-4 left-0 flex flex-col gap-2 px-3">
        {user && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className={cn(
                  "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 w-full justify-center",
                  collapsed && "px-2",
                )}
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && <span className="ml-2">Sair</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-popover border">
                <p className="text-sm">Sair</p>
              </TooltipContent>
            )}
          </Tooltip>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "text-sidebar-muted hover:text-sidebar-foreground w-full justify-center",
            collapsed && "px-2",
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-2">Recolher</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
