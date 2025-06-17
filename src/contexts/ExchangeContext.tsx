import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Currency } from '../types/commonTypes';
import type { ExchangeContextType } from './types';
import { ExchangeController } from '../controllers/exchange.controller';

const ExchangeContext = createContext<ExchangeContextType | undefined>(undefined);

export const ExchangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<Currency>('BTC');
  const [toCurrency, setToCurrency] = useState<Currency>('ETH');
  const [rates, setRates] = useState<Record<string, number>>({});

  const fetchRates = useCallback(async () => {
    const newRates = await ExchangeController.fetchRates();
    setRates(newRates);
  }, []);

  useEffect(() => {
    const result = ExchangeController.calculateAmount(
      fromAmount,
      fromCurrency,
      toCurrency,
      rates
    );
    setToAmount(result);
  }, [fromAmount, fromCurrency, toCurrency, rates]);

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <ExchangeContext.Provider
      value={{
        fromAmount,
        toAmount,
        fromCurrency,
        toCurrency,
        rates,
        setFromAmount,
        setFromCurrency,
        setToCurrency,
        swapCurrencies,
        fetchRates,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

export const useExchange = () => {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error('useExchange must be used within an ExchangeProvider');
  }
  return context;
}; 