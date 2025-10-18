"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Bell, User, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  routeTitles: Record<string, string>;
}

export function DashboardHeader({ routeTitles }: DashboardHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const title = routeTitles[pathname] || "Dashboard";

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-card-foreground">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
