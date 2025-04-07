import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WasteAnalytics } from "@/components/analytics/waste-analytics"
import { RecyclingRates } from "@/components/analytics/recycling-rates"
import { CostAnalysis } from "@/components/analytics/cost-analysis"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analytics and reporting for waste management</p>
        </div>

        <Tabs defaultValue="waste">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="waste">Waste Analytics</TabsTrigger>
            <TabsTrigger value="recycling">Recycling</TabsTrigger>
            <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="waste" className="pt-4">
            <WasteAnalytics />
          </TabsContent>
          <TabsContent value="recycling" className="pt-4">
            <RecyclingRates />
          </TabsContent>
          <TabsContent value="cost" className="pt-4">
            <CostAnalysis />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

