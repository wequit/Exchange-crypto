import type { ExchangeRate, Currency } from '../types/commonTypes'
import { symbolToIdMap } from '../types/commonTypes'

export class ExchangeService {
  static async fetchRates(ids: string[], vsCurrency: string = 'usd'): Promise<ExchangeRate> {
    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=${vsCurrency}`;
      const res = await fetch(url)
      return await res.json()
    } catch (err) {
      console.error('Ошибка загрузки курсов:', err)
      return {}
    }
  }

  static calculateAmount(
    fromAmount: string,
    fromCurrency: Currency,
    toCurrency: Currency,
    rates: ExchangeRate
  ): string {
    const fromId = symbolToIdMap[fromCurrency]
    const toId = symbolToIdMap[toCurrency]
    const fromRate = rates[fromId]?.usd
    const toRate = rates[toId]?.usd

    const amount = parseFloat(fromAmount)
    if (!fromRate || !toRate || isNaN(amount)) {
      return ''
    }

    const converted = (amount * fromRate) / toRate
    if (isNaN(converted) || !isFinite(converted)) {
      return ''
    }
    return converted.toFixed(6)
  }
}