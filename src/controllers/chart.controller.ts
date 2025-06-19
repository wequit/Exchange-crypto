import { ChartService } from '../services/chart.service'
import { ChartModel } from '../models/chart.model'

export class ChartController {
  static async fetchChartData(currency: string, period: number) {
    const rawData = await ChartService.fetchHistoricalRates(currency, period)
    return ChartModel.transform(rawData)
  }
}

export function getPriceChangePercent(data: any[]): number | null {
  if (!data || data.length < 2) return null
  const first = data[0].price
  const last = data[data.length - 1].price
  return ((last - first) / first) * 100
}