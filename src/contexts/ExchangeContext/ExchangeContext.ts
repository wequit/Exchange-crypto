import { createContext, useContext } from 'react';
import type { ExchangeContextType } from './types';

const ExchangeContext = createContext<ExchangeContextType | undefined>(undefined);

export default ExchangeContext;

export function useExchange() {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error('useExchange must be used within an ExchangeProvider');
  }
  return context;
}