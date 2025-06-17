import type { ExchangeRate, Currency } from '../types/commonTypes'
import { symbolToIdMap } from '../types/commonTypes'

export class ExchangeService {
  static async fetchRates(): Promise<ExchangeRate> {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana,ethereum&vs_currencies=usd'
      )
      const data = await res.json()

      return {
        bitcoin: data.bitcoin.usd,
        solana: data.solana.usd,
        ethereum: data.ethereum.usd,
      } 
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
    const fromRate = rates[fromId]
    const toRate = rates[toId]

    const amount = parseFloat(fromAmount)
    if (!fromRate || !toRate || isNaN(amount)) {
      return '0'
    }

    const converted = (amount * fromRate) / toRate
    return converted.toFixed(6)
  }
}