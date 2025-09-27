"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { UserDropdown } from "./user-dropdown";

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
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Marketplace
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Goods Exchange Application
              </p>
            </Link>
            <div className="flex gap-4">
              {authenticatedUser && (
                <UserDropdown user={authenticatedUser} onLogout={logout} />
              )}
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
