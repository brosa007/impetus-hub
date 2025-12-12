"use client"

import { Button } from "@/app/_components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip"
import { cn } from "@/app/_lib/utils"
import {
    ChevronLeft,
    ChevronRight,
    DollarSign,
    FileText,
    FolderKanban,
    Home,
    Lock,
    Server,
    Sparkles,
    Video,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebarContext } from "./AppLayout"

interface NavItem {
  title: string
  icon: React.ElementType
  href: string
  active: boolean
  maintenance?: boolean
}

const navItems: NavItem[] = [
  { title: "Home", icon: Home, href: "/dashboard", active: true },
  { title: "Automations", icon: Zap, href: "/automations", active: true },
  { title: "AI Creators", icon: Sparkles, href: "#", active: false, maintenance: true },
  { title: "Backend", icon: Server, href: "#", active: false, maintenance: true },
  { title: "Audio Visual", icon: Video, href: "#", active: false, maintenance: true },
  { title: "Copy", icon: FileText, href: "#", active: false, maintenance: true },
  { title: "Financeiro", icon: DollarSign, href: "#", active: false, maintenance: true },
  { title: "Projetos", icon: FolderKanban, href: "#", active: false, maintenance: true },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { collapsed, setCollapsed } = useSidebarContext()

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href) && href !== "#"
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">
              Impetus Ops
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          if (item.maintenance) {
            return (
              <Tooltip key={item.title} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors cursor-not-allowed opacity-50",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <Icon className="h-5 w-5 text-sidebar-muted shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sidebar-muted">{item.title}</span>
                        <Lock className="h-3.5 w-3.5 text-sidebar-muted" />
                      </>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-popover border">
                  <p className="text-sm">Em breve</p>
                </TooltipContent>
              </Tooltip>
            )
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
                collapsed && "justify-center px-2"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  active ? "text-sidebar-primary" : "text-sidebar-muted"
                )}
              />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Button */}
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full justify-center text-sidebar-muted hover:text-sidebar-foreground",
            collapsed && "px-2"
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
  )
}
