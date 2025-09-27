"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ChevronDown } from "lucide-react";
import { UserTokenData } from "@/types/token";
import { useState } from "react";
import { useEffect } from "react";

interface UserDropdownProps {
  user: UserTokenData;
  onLogout: () => void;
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    if (user && user.roleName) {
      try {
        const roles = JSON.parse(user.roleName);
        setUserRoles(roles);
      } catch (error) {
        console.error("Failed to parse user roles:", error);
      }
    }
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 h-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {user.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 dark:bg-gray-800 dark:border-gray-700"
      >
        <DropdownMenuLabel className="dark:text-white">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-gray-700" />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
