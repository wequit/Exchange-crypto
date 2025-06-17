import type { Currency, ExchangeBase } from '../types/commonTypes'

export interface ExchangeContextType extends ExchangeBase {
  rates: Record<string, number>
  setFromAmount: (amount: string) => void
  setFromCurrency: (currency: Currency) => void
  setToCurrency: (currency: Currency) => void
  swapCurrencies: () => void
  fetchRates: () => Promise<void>
} 