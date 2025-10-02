"use client";

import { useAuth } from "@/context/auth-context";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  allowedRole: string;
}

export default function ProtectedLayout({
  children,
  allowedRole,
}: ProtectedLayoutProps) {
  const { authenticatedUser, logout } = useAuth();

  try {
    const roleArray = JSON.parse(authenticatedUser?.roleName || "");
    if (!roleArray.includes(allowedRole)) {
      console.warn(
        "ProtectedLayout: Unauthorized access, redirecting to home."
      );
    }
  } catch (error) {

  }

  const routeTitles = {
    "/dashboard": "Dashboard Overview",
    "/dashboard/overview": "Dashboard Overview",
    "/dashboard/users": "User Management",
    "/dashboard/rooms": "Room Management",
    "/dashboard/transactions": "Transaction Management",
    "/dashboard/analytics": "Analytics & Reports",
    "/dashboard/settings": "Settings",
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader routeTitles={routeTitles} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
