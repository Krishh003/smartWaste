"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
  const [emailSettings, setEmailSettings] = useState({
    criticalAlerts: true,
    dailyReports: true,
    weeklyReports: true,
    maintenanceAlerts: true,
    systemUpdates: false,
  })

  const [pushSettings, setPushSettings] = useState({
    criticalAlerts: true,
    binCollections: true,
    routeUpdates: true,
    maintenanceAlerts: false,
    systemUpdates: false,
  })

  const [emailAddress, setEmailAddress] = useState("john.doe@example.com")

  const handleEmailToggle = (setting: string) => {
    setEmailSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }))
  }

  const handlePushToggle = (setting: string) => {
    setPushSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }))
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure which email notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-address">Email Address</Label>
            <Input id="email-address" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-critical">Critical Alerts</Label>
                <p className="text-xs text-muted-foreground">Receive alerts when bins reach critical levels</p>
              </div>
              <Switch
                id="email-critical"
                checked={emailSettings.criticalAlerts}
                onCheckedChange={() => handleEmailToggle("criticalAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-daily">Daily Reports</Label>
                <p className="text-xs text-muted-foreground">Receive daily summary reports</p>
              </div>
              <Switch
                id="email-daily"
                checked={emailSettings.dailyReports}
                onCheckedChange={() => handleEmailToggle("dailyReports")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-weekly">Weekly Reports</Label>
                <p className="text-xs text-muted-foreground">Receive weekly analytics reports</p>
              </div>
              <Switch
                id="email-weekly"
                checked={emailSettings.weeklyReports}
                onCheckedChange={() => handleEmailToggle("weeklyReports")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-maintenance">Maintenance Alerts</Label>
                <p className="text-xs text-muted-foreground">Receive alerts about maintenance issues</p>
              </div>
              <Switch
                id="email-maintenance"
                checked={emailSettings.maintenanceAlerts}
                onCheckedChange={() => handleEmailToggle("maintenanceAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-system">System Updates</Label>
                <p className="text-xs text-muted-foreground">Receive notifications about system updates</p>
              </div>
              <Switch
                id="email-system"
                checked={emailSettings.systemUpdates}
                onCheckedChange={() => handleEmailToggle("systemUpdates")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Configure which push notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-critical">Critical Alerts</Label>
              <p className="text-xs text-muted-foreground">Receive alerts when bins reach critical levels</p>
            </div>
            <Switch
              id="push-critical"
              checked={pushSettings.criticalAlerts}
              onCheckedChange={() => handlePushToggle("criticalAlerts")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-collections">Bin Collections</Label>
              <p className="text-xs text-muted-foreground">Receive notifications when bins are collected</p>
            </div>
            <Switch
              id="push-collections"
              checked={pushSettings.binCollections}
              onCheckedChange={() => handlePushToggle("binCollections")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-routes">Route Updates</Label>
              <p className="text-xs text-muted-foreground">Receive notifications about route changes</p>
            </div>
            <Switch
              id="push-routes"
              checked={pushSettings.routeUpdates}
              onCheckedChange={() => handlePushToggle("routeUpdates")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-maintenance">Maintenance Alerts</Label>
              <p className="text-xs text-muted-foreground">Receive alerts about maintenance issues</p>
            </div>
            <Switch
              id="push-maintenance"
              checked={pushSettings.maintenanceAlerts}
              onCheckedChange={() => handlePushToggle("maintenanceAlerts")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-system">System Updates</Label>
              <p className="text-xs text-muted-foreground">Receive notifications about system updates</p>
            </div>
            <Switch
              id="push-system"
              checked={pushSettings.systemUpdates}
              onCheckedChange={() => handlePushToggle("systemUpdates")}
            />
          </div>

          <Button className="w-full mt-4">Save Notification Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}

