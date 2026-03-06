"use client"

import * as React from "react"
import { format } from "date-fns"
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
import { Badge } from "@/components/ui/badge"
import { TradeHistoryItem } from "@/app/lib/definitions"

interface TradeHistoryTableProps {
    data: TradeHistoryItem[]
}

export function TradeHistoryTable({ data }: TradeHistoryTableProps) {
    return (
        <Card className="flex flex-col w-full h-full xl:col-span-2">
            <CardHeader>
                <CardTitle>Trade History Details</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ticket</TableHead>
                            <TableHead>Open Time</TableHead>
                            <TableHead>Close Time</TableHead>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Strategy</TableHead>
                            <TableHead className="text-right">Vol</TableHead>
                            <TableHead className="text-right">Entry</TableHead>
                            <TableHead className="text-right">SL</TableHead>
                            <TableHead className="text-right">TP</TableHead>
                            <TableHead className="text-right">Exit</TableHead>
                            <TableHead className="text-right">Profit</TableHead>
                            <TableHead>Reason</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((trade) => (
                            <TableRow key={trade.ticket}>
                                <TableCell className="font-medium">{trade.ticket}</TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {format(new Date(trade.open_time), "yyyy/MM/dd HH:mm")}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {format(new Date(trade.close_time), "yyyy/MM/dd HH:mm")}
                                </TableCell>
                                <TableCell>{trade.symbol}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{trade.order_type}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{trade.strategy}</Badge>
                                </TableCell>
                                <TableCell className="text-right">{trade.volume.toFixed(2)}</TableCell>
                                <TableCell className="text-right">{trade.open_price}</TableCell>
                                <TableCell className="text-right">{trade.sl}</TableCell>
                                <TableCell className="text-right">{trade.tp}</TableCell>
                                <TableCell className="text-right">{trade.close_price}</TableCell>
                                <TableCell
                                    className={`text-right font-bold whitespace-nowrap ${trade.profit >= 0 ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {trade.profit >= 0 ? "+" : "-"}${Math.abs(trade.profit).toFixed(2)}
                                </TableCell>
                                <TableCell>{trade.close_reason}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
