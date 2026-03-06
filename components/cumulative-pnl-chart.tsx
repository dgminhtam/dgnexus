"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { format } from "date-fns"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { CumulativePnl } from "@/app/lib/definitions"

const chartConfig = {
    cumulative_profit: {
        label: "Cumulative Profit",
        color: "#3b82f6", // Xanh dương
    },
} satisfies ChartConfig

interface CumulativePnlChartProps {
    data: CumulativePnl[]
}

export function CumulativePnlChart({ data }: CumulativePnlChartProps) {
    return (
        <Card className="flex flex-col w-full h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Cumulative PnL</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0 mt-4">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[300px] w-full"
                >
                    <AreaChart data={data} margin={{ left: 12, right: 12, top: 10, bottom: 10 }}>
                        <defs>
                            <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-cumulative_profit)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-cumulative_profit)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return format(date, "MMM dd, HH:mm")
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return format(new Date(value), "MMM dd, yyyy HH:mm")
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="cumulative_profit"
                            type="natural"
                            fill="url(#fillProfit)"
                            stroke="var(--color-cumulative_profit)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
