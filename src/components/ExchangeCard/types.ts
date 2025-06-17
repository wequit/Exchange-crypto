import type { Currency, ExchangeBase, ExchangeRate } from '../../types/commonTypes'

export interface ExchangeCardProps extends ExchangeBase {
  onFromChange: (value: string) => void
  onSwap: () => void
  currencies: Currency[]
  onFromCurrencyChange: (value: Currency) => void
  onToCurrencyChange: (value: Currency) => void
  onTransfer: () => void
  rates: ExchangeRate
} 