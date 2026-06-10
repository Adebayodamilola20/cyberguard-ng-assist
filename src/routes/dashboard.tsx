import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronRight, LogOut, Search } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · CyberGuard NG" },
      { name: "description", content: "Your CyberGuard NG security console." },
    ],
  }),
  component: DashboardLayout,
});

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/scam-detector": "AI Scam Detector",
  "/dashboard/breach-monitor": "Breach Monitor",
  "/dashboard/alerts": "Account Protection Alerts",
  "/dashboard/training": "Employee Awareness Training",
  "/dashboard/compliance": "NDPA Compliance",
  "/dashboard/reports": "Reports Center",
  "/dashboard/assistant": "AI Assistant",
  "/dashboard/settings": "Settings",
};

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = titles[pathname] ?? "Dashboard";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
              <Link to="/dashboard" className="hover:text-foreground">Console</Link>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-foreground">{title}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search alerts, employees, reports…" className="h-9 w-72 pl-9" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-danger" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border border-border bg-card px-1.5 py-1 pr-3 text-sm hover:bg-accent">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-primary/20 text-primary">AO</AvatarFallback>
                    </Avatar>
                    <span className="hidden font-medium md:inline">Amaka</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>Amaka Obi</div>
                    <div className="text-xs font-normal text-muted-foreground">Acme Medical Ltd</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/">Back to website</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/auth"><LogOut className="mr-2 size-4" /> Sign out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
          <Toaster />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}