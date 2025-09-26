"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { OverviewTab } from "@/components/tabs/overview-tab";
import { UsersTab } from "@/components/tabs/users-tab";
import { RoomsTab } from "@/components/tabs/rooms-tab";
import { TransactionsTab } from "@/components/tabs/transactions-tab";
import { AnalyticsTab } from "@/components/tabs/analytics-tab";
import { SettingsTab } from "@/components/tabs/settings-tab";

const tabTitles = {
  overview: "Dashboard Overview",
  users: "User Management",
  rooms: "Room Management",
  transactions: "Transaction Management",
  analytics: "Analytics & Reports",
  settings: "Settings",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "users":
        return <UsersTab />;
      case "rooms":
        return <RoomsTab />;
      case "transactions":
        return <TransactionsTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title={tabTitles[activeTab as keyof typeof tabTitles]}
        />
        <main className="flex-1 overflow-auto p-6">{renderTabContent()}</main>
      </div>
    </div>
  );
}
