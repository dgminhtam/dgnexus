import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMetrics } from "../api/action"

export default async function Page() {
    const metrics = await getMetrics();
    return (
        <>
            <div className="grid grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
                <Card>
                    <CardHeader>
                        <CardDescription>Total Tiket</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {metrics.total_trades_closed}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardDescription>Win Rate</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {metrics.win_rate} %
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardDescription>Net Profit</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {metrics.net_profit} $
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}
