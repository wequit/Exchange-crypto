export type Currency = 'BTC' | 'ETH' | 'SOL'

export interface ExchangeRate {
  [key: string]: { usd?: number }
}

export interface ExchangeBase {
  fromAmount: string
  toAmount: string
  fromCurrency: Currency
  toCurrency: Currency
}

export const symbolToIdMap: Record<Currency, string> = {
  BTC: 'bitcoin',
  SOL: 'solana',
  ETH: 'ethereum',
}