import type { Currency, ExchangeRate } from '../types/commonTypes'
import { ExchangeService } from '../services/exchange.service'

export class ExchangeController {
  static async fetchRates(): Promise<ExchangeRate> {
    return ExchangeService.fetchRates()
  }
  
  static calculateAmount(
    fromAmount: string,
    fromCurrency: Currency,
    toCurrency: Currency,
    rates: ExchangeRate
  ): string {
    return ExchangeService.calculateAmount(
      fromAmount,
      fromCurrency,
      toCurrency,
      rates
    )
  }
}