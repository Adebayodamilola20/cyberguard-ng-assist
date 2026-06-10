import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  Brain,
  FileText,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Shield,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "AI Scam Detector", url: "/dashboard/scam-detector", icon: Brain },
  { title: "Breach Monitor", url: "/dashboard/breach-monitor", icon: KeyRound },
  { title: "Account Alerts", url: "/dashboard/alerts", icon: Bell },
];

const programItems = [
  { title: "Employee Training", url: "/dashboard/training", icon: GraduationCap },
  { title: "NDPA Compliance", url: "/dashboard/compliance", icon: ShieldCheck },
  { title: "Reports Center", url: "/dashboard/reports", icon: FileText },
];

const assistantItems = [
  { title: "AI Assistant", url: "/dashboard/assistant", icon: Bot },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) =>
    url === "/dashboard" ? pathname === url : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-2">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="size-4" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-display text-sm font-bold tracking-tight">
                CyberGuard <span className="text-primary">NG</span>
              </div>
              <div className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
                Security Console
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Protection</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Programs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {programItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {assistantItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed ? (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
            <div className="mb-1 flex items-center gap-2 font-semibold text-primary">
              <ShieldCheck className="size-3.5" /> Pro plan
            </div>
            <p className="text-muted-foreground">
              24 seats · NDPA audit due Dec 12
            </p>
          </div>
        ) : (
          <div className="grid size-8 place-items-center rounded-md bg-primary/10 text-primary">
            <ShieldCheck className="size-4" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}