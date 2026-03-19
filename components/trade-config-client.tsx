"use client";

import { useState, useTransition } from "react";
import { SystemConfig, updateSystemConfig } from "@/app/api/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function formatGroupName(group: string) {
  switch (group) {
    case 'GLOBAL': return 'Cấu Hình Chung';
    case 'REPORT_STRATEGY': return 'Chiến Lược Báo Cáo AI';
    case 'NEWS_STRATEGY': return 'Chiến Lược Tin Tức';
    case 'SNIPER_STRATEGY': return 'Chiến Lược Sniper';
    case 'GRID_STRATEGY': return 'Chiến Lược Lưới (Grid)';
    case 'MARTINGALE_STRATEGY': return 'Chiến Lược Martingale';
    case 'WEEKEND_GAP_STRATEGY': return 'Chiến Lược Gap Cuối Tuần';
    default: return group;
  }
}

export function TradeConfigClient({ configs }: { configs: Record<string, SystemConfig[]> }) {
  const [isPending, startTransition] = useTransition();
  const [localConfigs, setLocalConfigs] = useState<Record<string, SystemConfig[]>>(configs);

  const groups = Object.keys(localConfigs);

  const handleToggle = (group: string, key: string, checked: boolean) => {
    // Optimistic update
    setLocalConfigs(prev => ({
      ...prev,
      [group]: prev[group].map(c => c.key === key ? { ...c, value: checked ? "true" : "false" } : c)
    }));
    startTransition(async () => {
      try {
        await updateSystemConfig(key, checked ? "true" : "false");
      } catch (error) {
        console.error("Failed to update config", error);
      }
    });
  };

  const handleNumberSave = (group: string, key: string, value: string) => {
    setLocalConfigs(prev => ({
      ...prev,
      [group]: prev[group].map(c => c.key === key ? { ...c, value } : c)
    }));
    startTransition(async () => {
      try {
        await updateSystemConfig(key, value);
      } catch (error) {
        console.error("Failed to update config", error);
      }
    });
  };

  if (groups.length === 0) {
    return <div className="p-4 text-muted-foreground">Không có cấu hình nào.</div>;
  }

  return (
    <div className="w-full space-y-6">
      {groups.map(group => (
        <Card key={group} className="overflow-hidden shadow-sm">
          <CardHeader className="bg-muted/30 border-b pb-4 pt-5 px-6">
            <CardTitle className="text-xl text-foreground font-semibold">
              {formatGroupName(group)}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {localConfigs[group].map((config, index) => (
                <div 
                  key={config.key} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 px-6 gap-4 sm:gap-6 hover:bg-muted/10 transition-colors ${
                    index !== localConfigs[group].length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[15px] font-semibold text-foreground leading-none">
                      {config.key}
                    </label>
                    <p className="text-sm text-muted-foreground mr-4">
                      {config.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center shrink-0">
                    {config.value_type === "bool" ? (
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-muted-foreground w-16 text-right">
                          {(config.value === "true" || config.value === "1" || config.value.toLowerCase() === "yes") ? "Đang bật" : "Đã tắt"}
                        </span>
                        <Switch
                          checked={config.value === "true" || config.value === "1" || config.value.toLowerCase() === "yes"}
                          onCheckedChange={(checked) => handleToggle(group, config.key, checked)}
                          disabled={isPending}
                        />
                      </div>
                    ) : (config.value_type === "float" || config.value_type === "int") ? (
                      <div className="flex items-center space-x-2 w-full sm:w-[220px]">
                        <Input
                          type="number"
                          defaultValue={config.value}
                          step={config.value_type === "float" ? "0.01" : "1"}
                          onBlur={(e) => {
                            if (e.target.value !== config.value && e.target.value !== "") {
                              handleNumberSave(group, config.key, e.target.value);
                            }
                          }}
                          disabled={isPending}
                          className="flex-1 focus-visible:ring-1 bg-background"
                        />
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          disabled={isPending}
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input && input.value !== config.value && input.value !== "") {
                              handleNumberSave(group, config.key, input.value);
                            }
                          }}
                          className="px-4"
                        >
                          Lưu
                        </Button>
                      </div>
                    ) : (
                      <div className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-md border border-amber-200 dark:border-amber-900/50">
                        Loại: <span className="font-semibold">{config.value_type}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
