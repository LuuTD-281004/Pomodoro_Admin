"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Database, Mail, Save, RefreshCw } from "lucide-react"

export function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription className="text-muted-foreground">Basic application configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-name" className="text-card-foreground">
                Application Name
              </Label>
              <Input id="app-name" defaultValue="Admin Dashboard" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-description" className="text-card-foreground">
                Description
              </Label>
              <Textarea
                id="app-description"
                defaultValue="Comprehensive admin dashboard for managing users, rooms, and transactions"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-card-foreground">
                Timezone
              </Label>
              <Select defaultValue="utc">
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="cet">Central European Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription className="text-muted-foreground">Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Transaction Alerts</Label>
                <p className="text-sm text-muted-foreground">Alert for failed transactions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">System Maintenance</Label>
                <p className="text-sm text-muted-foreground">Maintenance notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription className="text-muted-foreground">Security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
              <Badge variant="outline" className="border-chart-3 text-chart-3">
                Enabled
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Session Timeout</Label>
                <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-24 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Login Attempts</Label>
                <p className="text-sm text-muted-foreground">Max failed login attempts</p>
              </div>
              <Select defaultValue="5">
                <SelectTrigger className="w-16 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Database className="h-5 w-5" />
              Database
            </CardTitle>
            <CardDescription className="text-muted-foreground">Database configuration and maintenance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Auto Backup</Label>
                <p className="text-sm text-muted-foreground">Automatic database backups</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Backup Frequency</Label>
                <p className="text-sm text-muted-foreground">How often to backup</p>
              </div>
              <Select defaultValue="daily">
                <SelectTrigger className="w-24 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Data Retention</Label>
                <p className="text-sm text-muted-foreground">Keep data for</p>
              </div>
              <Select defaultValue="1year">
                <SelectTrigger className="w-24 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="2years">2 years</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="w-full border-border text-card-foreground hover:bg-muted bg-transparent"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Backup Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Email Configuration */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Mail className="h-5 w-5" />
            Email Configuration
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure email server settings for notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtp-server" className="text-card-foreground">
                SMTP Server
              </Label>
              <Input id="smtp-server" placeholder="smtp.example.com" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port" className="text-card-foreground">
                Port
              </Label>
              <Input id="smtp-port" placeholder="587" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-username" className="text-card-foreground">
                Username
              </Label>
              <Input id="smtp-username" placeholder="your-email@example.com" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password" className="text-card-foreground">
                Password
              </Label>
              <Input
                id="smtp-password"
                type="password"
                placeholder="••••••••"
                className="bg-background border-border"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch />
              <Label className="text-card-foreground">Enable SSL/TLS</Label>
            </div>
            <Button variant="outline" className="border-border text-card-foreground hover:bg-muted bg-transparent">
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" className="border-border text-card-foreground hover:bg-muted bg-transparent">
          Reset to Defaults
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
