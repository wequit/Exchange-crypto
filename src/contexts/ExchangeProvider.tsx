import React, { useState, useCallback, useEffect } from 'react';
import type { Currency, ExchangeRate } from '../types/commonTypes';
import ExchangeContext from './ExchangeContext';
import { ExchangeController } from '../controllers/exchange.controller';
import { topCryptos } from '../models/crypto-list.model';

export const ExchangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<Currency>('BTC');
  const [toCurrency, setToCurrency] = useState<Currency>('ETH');
  const [rates, setRates] = useState<ExchangeRate>({});

  const getIds = () => {
    const from = topCryptos.find(c => c.symbol === fromCurrency)?.id;
    const to = topCryptos.find(c => c.symbol === toCurrency)?.id;
    const ids = Array.from(new Set([from, to].filter((v): v is string => Boolean(v))));
    return ids;
  };

  const fetchRates = useCallback(async () => {
    const ids = getIds();
    if (ids.length === 0) return;
    const newRates = await ExchangeController.fetchRates(ids);
    setRates(newRates);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

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