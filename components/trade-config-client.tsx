"use client";

import { useState, useTransition } from "react";
import { SystemConfig, updateSystemConfig } from "@/app/api/action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="w-full">
      <Tabs defaultValue={groups[0]} className="w-full">
        <TabsList className="mb-6 flex flex-wrap h-auto gap-2 p-1 bg-muted/50 rounded-xl">
          {groups.map(group => (
            <TabsTrigger key={group} value={group} className="capitalize rounded-lg">
              {group.toLowerCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {groups.map(group => (
          <TabsContent key={group} value={group} className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localConfigs[group].map(config => (
                <div key={config.key} className="p-5 border rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foreground leading-none">
                      {config.key}
                    </label>
                    <p className="text-xs text-muted-foreground line-clamp-2" title={config.description}>
                      {config.description}
                    </p>
                  </div>

                  {config.value_type === "bool" ? (
                    <div className="flex items-center space-x-3 pt-1">
                      <Switch
                        checked={config.value === "true" || config.value === "1" || config.value.toLowerCase() === "yes"}
                        onCheckedChange={(checked) => handleToggle(group, config.key, checked)}
                        disabled={isPending}
                      />
                      <span className="text-sm font-medium text-muted-foreground">
                        {(config.value === "true" || config.value === "1" || config.value.toLowerCase() === "yes") ? "Đang bật" : "Đã tắt"}
                      </span>
                    </div>
                  ) : (config.value_type === "float" || config.value_type === "int") ? (
                    <div className="flex space-x-2 pt-1 items-center">
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
                        className="w-full focus-visible:ring-1"
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
                        className="px-3"
                      >
                        Lưu
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-1 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/50 p-2 rounded-md border border-amber-200 dark:border-amber-900/50">
                      Loại cấu hình không được hỗ trợ sửa đổi trực tiếp: <span className="font-semibold">{config.value_type}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
