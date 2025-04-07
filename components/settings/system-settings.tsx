"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function SystemSettings() {
  const [systemSettings, setSystemSettings] = useState({
    criticalThreshold: 80,
    moderateThreshold: 60,
    autoSchedule: true,
    routeOptimization: true,
    dataRetention: "90",
    backupFrequency: "daily",
    maintenanceWindow: "weekend",
  })

  const handleSwitchChange = (field: string) => {
    setSystemSettings((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setSystemSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSliderChange = (field: string, value: number[]) => {
    setSystemSettings((prev) => ({ ...prev, [field]: value[0] }))
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Bin Thresholds</CardTitle>
          <CardDescription>Configure bin fill level thresholds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="critical-threshold">Critical Threshold (%)</Label>
              <span>{systemSettings.criticalThreshold}%</span>
            </div>
            <Slider
              id="critical-threshold"
              min={50}
              max={100}
              step={1}
              value={[systemSettings.criticalThreshold]}
              onValueChange={(value) => handleSliderChange("criticalThreshold", value)}
            />
            <p className="text-xs text-muted-foreground">
              Bins above this threshold will be marked as critical and prioritized for collection
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="moderate-threshold">Moderate Threshold (%)</Label>
              <span>{systemSettings.moderateThreshold}%</span>
            </div>
            <Slider
              id="moderate-threshold"
              min={30}
              max={80}
              step={1}
              value={[systemSettings.moderateThreshold]}
              onValueChange={(value) => handleSliderChange("moderateThreshold", value)}
            />
            <p className="text-xs text-muted-foreground">Bins above this threshold will be marked as moderate</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Automation Settings</CardTitle>
          <CardDescription>Configure system automation features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-schedule">Automatic Scheduling</Label>
              <p className="text-xs text-muted-foreground">
                Automatically schedule collections based on bin fill levels
              </p>
            </div>
            <Switch
              id="auto-schedule"
              checked={systemSettings.autoSchedule}
              onCheckedChange={() => handleSwitchChange("autoSchedule")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="route-optimization">Route Optimization</Label>
              <p className="text-xs text-muted-foreground">Automatically optimize collection routes for efficiency</p>
            </div>
            <Switch
              id="route-optimization"
              checked={systemSettings.routeOptimization}
              onCheckedChange={() => handleSwitchChange("routeOptimization")}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
          <CardDescription>Configure system maintenance settings</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="data-retention">Data Retention Period</Label>
            <Select
              value={systemSettings.dataRetention}
              onValueChange={(value) => handleSelectChange("dataRetention", value)}
            >
              <SelectTrigger id="data-retention">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backup-frequency">Backup Frequency</Label>
            <Select
              value={systemSettings.backupFrequency}
              onValueChange={(value) => handleSelectChange("backupFrequency", value)}
            >
              <SelectTrigger id="backup-frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maintenance-window">Maintenance Window</Label>
            <Select
              value={systemSettings.maintenanceWindow}
              onValueChange={(value) => handleSelectChange("maintenanceWindow", value)}
            >
              <SelectTrigger id="maintenance-window">
                <SelectValue placeholder="Select window" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekday">Weekday Nights</SelectItem>
                <SelectItem value="weekend">Weekend</SelectItem>
                <SelectItem value="custom">Custom Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-3">
            <Button>Save System Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

