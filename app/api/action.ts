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
  revalidatePath('/templates');
  return result;
};