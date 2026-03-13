"use server"

import { revalidatePath } from 'next/cache';
import { Metric, CumulativePnl, PnlDistribution, StrategyPerformance, TradeHistoryResponse, SystemPrompt } from '../lib/definitions';
import { fetchAuthenticated } from './auth/action';

export const getMetrics = async () =>
  fetchAuthenticated<Metric>(`/dashboard/metrics`);

export const getCumulativePnl = async () =>
  fetchAuthenticated<CumulativePnl[]>(`/dashboard/charts/cumulative-pnl`);

export const getPnlDistribution = async () =>
  fetchAuthenticated<PnlDistribution[]>(`/dashboard/charts/pnl-distribution`);

export const getStrategyPerformance = async () =>
  fetchAuthenticated<StrategyPerformance[]>(`/dashboard/strategy-performance`);

export const getTradeHistory = async (page: number = 1, limit: number = 50) =>
  fetchAuthenticated<TradeHistoryResponse>(`/trades/history?page=${page}&limit=${limit}`);

export const getSystemPrompts = async () =>
  fetchAuthenticated<SystemPrompt[]>('/prompts');

export const updateSystemPrompt = async (promptId: string, content: string) => {
  const result = await fetchAuthenticated<any>(`/prompts/${promptId}`, {
    method: 'PUT',
    body: JSON.stringify({ content })
  });
  revalidatePath('/promts');
  return result;
};

export const getMessageTemplates = async () =>
  fetchAuthenticated<SystemPrompt[]>('/templates');

export const updateMessageTemplate = async (templateId: string, content: string) => {
  const result = await fetchAuthenticated<any>(`/templates/${templateId}`, {
    method: 'PUT',
    body: JSON.stringify({ content })
  });
  revalidatePath('/telegram');
  revalidatePath('/wordpress');
  return result;
};

export type SystemConfig = {
  key: string;
  value: string;
  value_type: string;
  group_name: string;
  description: string;
};

export const getSystemConfigs = async () =>
  fetchAuthenticated<SystemConfig[]>('/configs');

export const updateSystemConfig = async (key: string, value: string) => {
  const result = await fetchAuthenticated<any>(`/configs/${key}`, {
    method: 'PUT',
    body: JSON.stringify({ value })
  });
  revalidatePath('/settings/trade');
  return result;
};

export interface StrategyConfig {
  id: number;
  name: string;
  description: string;
  is_enabled: boolean;
  risk_percent: number;
  sl_distance: number;
  tp_distance: number;
  extra_params: any;
}

export const getStrategies = async () =>
  fetchAuthenticated<StrategyConfig[]>('/strategies');

export const updateStrategy = async (id: number, payload: Partial<StrategyConfig>) => {
  const result = await fetchAuthenticated<any>(`/strategies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  revalidatePath('/strategies');
  return result;
};