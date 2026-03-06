"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { StrategyPerformance } from "@/app/lib/definitions"

interface StrategyTableProps {
    data: StrategyPerformance[]
}

export function StrategyTable({ data }: StrategyTableProps) {
    return (
        <Card className="flex flex-col w-full h-full">
            <CardHeader>
                <CardTitle>Strategy Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Strategy</TableHead>
                            <TableHead className="text-right">Total Trades</TableHead>
                            <TableHead className="text-right">Win Rate</TableHead>
                            <TableHead className="text-right">Total Profit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((strategy) => (
                            <TableRow key={strategy.strategy}>
                                <TableCell className="font-medium">{strategy.strategy}</TableCell>
                                <TableCell className="text-right">{strategy.total_trades}</TableCell>
                                <TableCell className="text-right">{strategy.win_rate.toFixed(2)}%</TableCell>
                                <TableCell className={`text-right font-semibold ${strategy.total_profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    ${strategy.total_profit.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
