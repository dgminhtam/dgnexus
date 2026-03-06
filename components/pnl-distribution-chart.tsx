"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

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
import { PnlDistribution } from "@/app/lib/definitions"

const chartConfig = {
    profit: {
        label: "Profit",
    },
} satisfies ChartConfig

interface PnlDistributionChartProps {
    data: PnlDistribution[]
}

export function PnlDistributionChart({ data }: PnlDistributionChartProps) {
    return (
        <Card className="flex flex-col w-full h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>PnL Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0 mt-4">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[300px] w-full"
                >
                    <BarChart data={data} margin={{ left: 12, right: 12, top: 10, bottom: 10 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="ticket"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            hide
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <ChartTooltip
                            cursor={{ fill: 'var(--accent)' }}
                            content={<ChartTooltipContent
                                hideLabel={false}
                                labelFormatter={(value) => `Ticket: ${value}`}
                            />}
                        />
                        <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? "#22c55e" : "#ef4444"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
