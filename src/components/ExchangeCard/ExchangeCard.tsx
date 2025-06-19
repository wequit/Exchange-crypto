import React from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import type { ExchangeCardProps } from './types'
import type { Currency } from '../../types/commonTypes'
import { SearchCoin } from './parts/SearchCoin'
import { useContext } from 'react'
import ExchangeContext from '../../contexts/ExchangeContext/ExchangeContext'

export const ExchangeCard: React.FC<ExchangeCardProps> = ({
  fromAmount,
  toAmount,
  onFromChange,
  onSwap,
  fromCurrency,
  toCurrency,
  onFromCurrencyChange,
  onToCurrencyChange,
  onTransfer,
}) => {
  const { getRate } = useContext(ExchangeContext)!;
  const rate = getRate();

  return (
    <div className=" bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl w-96 text-white shadow-2xl border border-gray-700 backdrop-blur-sm">
      <h2 className="text-2xl mb-6 text-center font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Crypto Exchange
      </h2>

      <div className="space-y-6">
        {/* Первая валюта */}
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-all">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-400">You pay</label>
          </div>
          <div className="flex items-center gap-3">
            <Input
              value={fromAmount}
              onChange={(e) => onFromChange(e.target.value)}
              className="text-2xl font-medium bg-transparent border-none focus:ring-0 p-0"
              placeholder="0.0"
            />
            <SearchCoin
              value={fromCurrency}
              onSelect={(coin) => onFromCurrencyChange(coin.symbol as Currency)}
            />
          </div>
        </div>

        {/* Свап */}
        <button
          onClick={onSwap}
          className="mx-auto flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-cyan-500/10 border border-gray-600 hover:border-cyan-400/50 text-cyan-400 hover:text-cyan-300 transition-all"
          aria-label="Swap currencies"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>

        {/* Вторая валют */}
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-blue-400/30 transition-all">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-400">You receive</label>
          </div>
          <div className="flex items-center gap-3">
            <Input
              value={toAmount}
              readOnly
              className="text-2xl font-medium bg-transparent border-none focus:ring-0 p-0 text-blue-400"
              placeholder="0.0"
            />
            <SearchCoin
              value={toCurrency}
              onSelect={(coin) => onToCurrencyChange(coin.symbol as Currency)}
            />
          </div>
        </div>
      </div>

      <Button 
        onClick={onTransfer}
        className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-cyan-500/20 transition-all"
      >
        Exchange Now
      </Button>

      <div className="mt-4 text-center text-xs text-gray-500">
        {rate && (
          <p>1 {fromCurrency} ≈ {rate} {toCurrency}</p>
        )}
      </div>
    </div>
  )
}