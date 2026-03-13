export const dynamic = "force-dynamic";

import React from "react";
import { getStrategies } from "@/app/api/action";
import { StrategyManagerClient } from "@/components/strategy-manager-client";

export default async function StrategiesPage() {
  const strategies = await getStrategies();

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý Chiến lược Giao dịch</h1>
        <p className="text-muted-foreground">
          Bật tắt các chiến lược và cấu hình các thông số rủi ro, chốt lời, cắt lỗ.
        </p>
      </div>
      
      <div className="mt-4">
        <StrategyManagerClient strategies={strategies || []} />
      </div>
    </div>
  );
}
