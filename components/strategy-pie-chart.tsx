"use client"

import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { StrategyPerformance } from "@/app/lib/definitions"

interface StrategyPieChartProps {
    data: StrategyPerformance[]
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308']

export function StrategyPieChart({ data }: StrategyPieChartProps) {
    const profitableData = data.filter(item => item.total_profit > 0)

    const chartConfig: ChartConfig = profitableData.reduce((config, item, index) => {
        config[item.strategy] = {
            label: item.strategy,
            color: COLORS[index % COLORS.length]
        }
        return config
    }, {} as ChartConfig)

    return (
        <Card className="flex flex-col w-full h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Profitable Strategies</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0 mt-4 h-[300px]">
                {profitableData.length > 0 ? (
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square h-[300px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={profitableData}
                                dataKey="total_profit"
                                nameKey="strategy"
                                innerRadius={60}
                                strokeWidth={5}
                                label
                            >
                                {profitableData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                ) : (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground text-sm">
                        No profitable strategies found.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
