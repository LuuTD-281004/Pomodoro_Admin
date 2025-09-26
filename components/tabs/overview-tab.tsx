"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Home, CreditCard, TrendingUp } from "lucide-react"

export function OverviewTab() {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-chart-1",
    },
    {
      title: "Active Rooms",
      value: "156",
      change: "+8.2%",
      icon: Home,
      color: "text-chart-2",
    },
    {
      title: "Transactions",
      value: "$45,231",
      change: "+23.1%",
      icon: CreditCard,
      color: "text-chart-3",
    },
    {
      title: "Revenue",
      value: "$12,234",
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-chart-3">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              {[
                { user: "John Doe", action: "Created new room", time: "2 minutes ago" },
                { user: "Jane Smith", action: "Completed transaction", time: "5 minutes ago" },
                { user: "Mike Johnson", action: "Updated profile", time: "10 minutes ago" },
                { user: "Sarah Wilson", action: "Joined room #123", time: "15 minutes ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-card-foreground">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Quick Stats</CardTitle>
            <CardDescription className="text-muted-foreground">System performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-card-foreground">Active Sessions</span>
                <span className="text-sm font-medium text-chart-1">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-card-foreground">Server Load</span>
                <span className="text-sm font-medium text-chart-2">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-card-foreground">Database Size</span>
                <span className="text-sm font-medium text-chart-3">2.4 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-card-foreground">Uptime</span>
                <span className="text-sm font-medium text-chart-4">99.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
