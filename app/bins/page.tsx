import { Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BinsList } from "@/components/bins/bins-list"
import { AddBinDialog } from "@/components/bins/add-bin-dialog"
import React from "react"

export default function BinsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Waste Bins</h1>
            <p className="text-muted-foreground">Manage and monitor all waste bins in the system</p>
          </div>
          <AddBinDialog />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input placeholder="Search bins..." />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Waste Bins Status</CardTitle>
            <CardDescription>Overview of all waste bins in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <BinsList />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

