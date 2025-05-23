"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mic, Menu, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent as SidebarContentComponent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainNav = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  const SidebarContent = (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <Mic className="h-6 w-6 text-purple-600" />
          <span className="font-bold text-lg">Rezum</span>
        </div>
      </SidebarHeader>
      <SidebarContentComponent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContentComponent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link href="/dashboard/profile" className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                    US
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">User</span>
                  <span className="text-xs text-gray-500">
                    user@example.com
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar variant="floating" collapsible="icon">
          {SidebarContent}
        </Sidebar>

        <div className="flex-1 flex flex-col w-full overflow-hidden">
          <header className="border-b bg-white px-4 py-2 flex items-center justify-between md:hidden w-full">
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-purple-600" />
              <span className="font-bold">Rezum</span>
            </div>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                {SidebarContent}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetContent>
            </Sheet>
          </header>

          <main className="flex-1 overflow-auto w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
