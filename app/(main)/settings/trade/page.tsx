export const dynamic = "force-dynamic";

import React from "react";
import { getSystemConfigs } from "@/app/api/action";
import { TradeConfigClient } from "@/components/trade-config-client";

export default async function TradeConfigPage() {
  const configs = await getSystemConfigs();

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý Cấu hình Bot Trade</h1>
        <p className="text-muted-foreground">
          Cấu hình các tham số chiến lược, quản lý rủi ro và các hệ thống khác của Bot.
        </p>
      </div>
      
      <div className="mt-4">
        <TradeConfigClient configs={configs || []} />
      </div>
    </div>
  );
}
