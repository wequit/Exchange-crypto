import type { Currency, ExchangeBase, ExchangeRate } from '../types/commonTypes'

export interface ExchangeContextType extends ExchangeBase {
  rates: ExchangeRate
  setFromAmount: (amount: string) => void
  setFromCurrency: (currency: Currency) => void
  setToCurrency: (currency: Currency) => void
  swapCurrencies: () => void
  fetchRates: () => Promise<void>
} 