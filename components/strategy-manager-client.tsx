"use client";

import { useState, useTransition } from "react";
import { StrategyConfig, updateStrategy } from "@/app/api/action";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function StrategyManagerClient({ strategies }: { strategies: StrategyConfig[] }) {
  const [isPending, startTransition] = useTransition();
  const [localStrategies, setLocalStrategies] = useState(strategies);

  const handleToggle = (id: number, checked: boolean) => {
    setLocalStrategies(prev => prev.map(s => s.id === id ? { ...s, is_enabled: checked } : s));
    startTransition(async () => {
      try {
        await updateStrategy(id, { is_enabled: checked });
      } catch (error) {
        console.error("Failed to update strategy enabled state", error);
      }
    });
  };

  const handleSave = (id: number, payload: Partial<StrategyConfig>) => {
    setLocalStrategies(prev => prev.map(s => s.id === id ? { ...s, ...payload } : s));
    startTransition(async () => {
      try {
        await updateStrategy(id, payload);
      } catch (error) {
        console.error("Failed to update strategy params", error);
      }
    });
  };

  if (localStrategies.length === 0) {
    return <div className="p-4 text-muted-foreground">Không có chiến lược nào.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {localStrategies.map((strategy) => (
        <Card key={strategy.id} className="flex flex-col shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1 pr-4">
              <CardTitle className="text-xl">{strategy.name}</CardTitle>
              <CardDescription className="line-clamp-2" title={strategy.description}>
                {strategy.description}
              </CardDescription>
            </div>
            <Switch
              checked={strategy.is_enabled}
              onCheckedChange={(checked) => handleToggle(strategy.id, checked)}
              disabled={isPending}
            />
          </CardHeader>
          <CardContent className="space-y-4 pt-4 flex-grow">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Risk Percent (%)
              </label>
              <Input
                type="number"
                step="0.01"
                defaultValue={strategy.risk_percent}
                disabled={!strategy.is_enabled || isPending}
                id={`risk-${strategy.id}`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Stop Loss Distance
              </label>
              <Input
                type="number"
                step="0.00001"
                defaultValue={strategy.sl_distance}
                disabled={!strategy.is_enabled || isPending}
                id={`sl-${strategy.id}`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Take Profit Distance
              </label>
              <Input
                type="number"
                step="0.00001"
                defaultValue={strategy.tp_distance}
                disabled={!strategy.is_enabled || isPending}
                id={`tp-${strategy.id}`}
              />
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button
              className="w-full"
              disabled={!strategy.is_enabled || isPending}
              onClick={(e) => {
                const parent = e.currentTarget.closest('.flex-col'); // Card
                if (parent) {
                  const riskInput = parent.querySelector(`#risk-${strategy.id}`) as HTMLInputElement;
                  const slInput = parent.querySelector(`#sl-${strategy.id}`) as HTMLInputElement;
                  const tpInput = parent.querySelector(`#tp-${strategy.id}`) as HTMLInputElement;
                  
                  if (riskInput && slInput && tpInput) {
                    const payload = {
                      risk_percent: parseFloat(riskInput.value),
                      sl_distance: parseFloat(slInput.value),
                      tp_distance: parseFloat(tpInput.value)
                    };
                    handleSave(strategy.id, payload);
                  }
                }
              }}
            >
              Lưu Cấu Hình
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
