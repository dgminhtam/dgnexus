export interface Metric {
  total_trades_closed: number;
  win_rate: number;
  net_profit: number;
}

export interface CumulativePnl {
  time: string;
  cumulative_profit: number;
}

export interface PnlDistribution {
  ticket: string;
  profit: number;
  is_win: boolean;
}

export interface StrategyPerformance {
  strategy: string;
  total_trades: number;
  win_rate: number;
  total_profit: number;
}

export interface TradeHistoryItem {
  ticket: string;
  open_time: string;
  close_time: string;
  symbol: string;
  order_type: string;
  strategy: string;
  volume: number;
  open_price: number;
  sl: number;
  tp: number;
  close_price: number;
  profit: number;
  close_reason: string;
}

export interface TradeHistoryResponse {
  meta: {
    current_page: number;
    total_pages: number;
    total_records: number;
    limit: number;
  };
  data: TradeHistoryItem[];
}

export interface SystemPrompt {
  id: string;
  content: string;
  description: string | null;
  updated_at: string;
}

export interface PromptUpdatePayload {
  content: string;
}
