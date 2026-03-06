"use server"

import { Metric } from '../lib/definitions';
import { fetchAuthenticated } from './auth/action';


export const getMetrics = async () =>
  fetchAuthenticated<Metric>(`/dashboard/metrics`);