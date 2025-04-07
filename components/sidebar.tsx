"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Map, Settings, Trash2, Truck } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import React from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  const links = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Waste Bins", href: "/bins", icon: Trash2 },
    { name: "Collection Routes", href: "/routes", icon: Truck },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  // Return a placeholder with the same dimensions during SSR
  if (!mounted) {
    return (
      <div className="w-64 border-r bg-background">
        <div className="h-14 border-b" />
        <div className="py-4">
          <div className="grid gap-1 px-2">
            {links.map((link) => (
              <div key={link.href} className="h-9" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col border-r bg-background", expanded ? "w-64" : "w-16")}>
      <div className="flex h-14 items-center border-b px-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
          {expanded ? "←" : "→"}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="grid gap-1 px-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <link.icon className="h-5 w-5" />
                {expanded && <span>{link.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

