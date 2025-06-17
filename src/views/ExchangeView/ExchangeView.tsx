import React from 'react';
import { ExchangeCard } from '../../components/ExchangeCard/ExchangeCard';
import { useExchange } from '../../contexts/ExchangeContext';
import type { Currency } from '../../types/commonTypes';
import { currencies } from '../../models/exchange.model';

export const ExchangeView: React.FC = () => {
  const {
      fromAmount,
      toAmount,
      fromCurrency,
      toCurrency,
    setFromAmount,
    setFromCurrency,
    setToCurrency,
    swapCurrencies,
    fetchRates,
    rates
  } = useExchange();

  React.useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const handleFromChange = (value: string) => {
    setFromAmount(value);
  };

  const handleFromCurrencyChange = (value: Currency) => {
    setFromCurrency(value);
  };

  const handleToCurrencyChange = (value: Currency) => {
    setToCurrency(value);
  };

  const handleSwap = () => {
    swapCurrencies();
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <ExchangeCard
        fromAmount={fromAmount}
        toAmount={toAmount}
        onFromChange={handleFromChange}
        onSwap={handleSwap}
        currencies={currencies}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onFromCurrencyChange={handleFromCurrencyChange}
        onToCurrencyChange={handleToCurrencyChange}
        onTransfer={() => {}}
        rates={rates}
      />
    </div>
  );
};

