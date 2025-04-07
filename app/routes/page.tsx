import { Filter, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RoutesList } from "@/components/routes/routes-list"

export default function RoutesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Collection Routes</h1>
            <p className="text-muted-foreground">Manage and optimize waste collection routes</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Route
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input placeholder="Search routes..." />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Collection Routes</CardTitle>
            <CardDescription>Overview of all waste collection routes</CardDescription>
          </CardHeader>
          <CardContent>
            <RoutesList />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

