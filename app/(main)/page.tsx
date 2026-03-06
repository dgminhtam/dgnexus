import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMetrics, getCumulativePnl, getPnlDistribution, getStrategyPerformance, getTradeHistory } from "../api/action"
import { CumulativePnlChart } from "@/components/cumulative-pnl-chart"
import { PnlDistributionChart } from "@/components/pnl-distribution-chart"
import { StrategyTable } from "@/components/strategy-table"
import { StrategyPieChart } from "@/components/strategy-pie-chart"
import { TradeHistoryTable } from "@/components/trade-history-table"

export default async function Page() {
    const [
        metrics,
        cumulativePnlData,
        pnlDistributionData,
        strategyPerformanceData,
        tradeHistoryData
    ] = await Promise.all([
        getMetrics(),
        getCumulativePnl(),
        getPnlDistribution(),
        getStrategyPerformance(),
        getTradeHistory()
    ]);

    return (
        <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {/* ROW 1: Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
                <Card>
                    <CardHeader>
                        <CardDescription>Total Ticket</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {metrics?.total_trades_closed || 0}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardDescription>Win Rate</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {metrics?.win_rate || 0} %
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardDescription>Net Profit</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {metrics?.net_profit || 0} $
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* ROW 2: Cumulative Pnl & Pnl Distribution */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <CumulativePnlChart data={cumulativePnlData || []} />
                <PnlDistributionChart data={pnlDistributionData || []} />
            </div>

            {/* ROW 3: Strategy Performance */}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Strategy Overview</CardTitle>
                    <CardDescription>Performance breakdown by trading strategy</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <StrategyTable data={strategyPerformanceData || []} />
                        <StrategyPieChart data={strategyPerformanceData || []} />
                    </div>
                </CardContent>
            </Card>

            {/* ROW 4: Trade History */}
            <div className="grid grid-cols-1">
                <TradeHistoryTable data={tradeHistoryData?.data || []} />
            </div>
        </div>
    )
}
