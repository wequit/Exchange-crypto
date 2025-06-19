import React, { useState, useCallback, useEffect } from 'react';
import type { Currency, ExchangeRate } from '../../types/commonTypes';
import ExchangeContext from './ExchangeContext';
import { ExchangeController } from '../../controllers/exchange.controller';
import { topCryptos } from '../../models/crypto-list.model';

const LOCAL_STORAGE_KEY = 'exchange_prefs';

function savePrefs(prefs: { fromCurrency: Currency; toCurrency: Currency; fromAmount: string }) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefs));
}

function loadPrefs(): { fromCurrency?: Currency; toCurrency?: Currency; fromAmount?: string } {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export const ExchangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefs = loadPrefs();
  const [fromAmount, setFromAmountState] = useState<string>(prefs.fromAmount || '');
  const [toAmount, setToAmount] = useState<string>('');
  const [fromCurrency, setFromCurrencyState] = useState<Currency>(prefs.fromCurrency || 'BTC');
  const [toCurrency, setToCurrencyState] = useState<Currency>(prefs.toCurrency || 'ETH');
  const [rates, setRates] = useState<ExchangeRate>({});

  const setFromAmount = (amount: string) => {
    setFromAmountState(amount);
    savePrefs({ fromCurrency, toCurrency, fromAmount: amount });
  };

  const setFromCurrency = (currency: Currency) => {
    setFromCurrencyState(currency);
    savePrefs({ fromCurrency: currency, toCurrency, fromAmount });
  };

  const setToCurrency = (currency: Currency) => {
    setToCurrencyState(currency);
    savePrefs({ fromCurrency, toCurrency: currency, fromAmount });
  };

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

  const getRate = () => {
    const fromRate = rates[fromCurrency]?.usd;
    const toRate = rates[toCurrency]?.usd;
    return fromRate && toRate ? (fromRate / toRate).toFixed(6) : null;
  };

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
        getRate,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
}; 