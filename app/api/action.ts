"use server"

import { Metric, CumulativePnl, PnlDistribution, StrategyPerformance, TradeHistoryResponse } from '../lib/definitions';
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