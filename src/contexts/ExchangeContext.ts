import { createContext } from 'react';
import type { ExchangeContextType } from './types';

const ExchangeContext = createContext<ExchangeContextType | undefined>(undefined);

export default ExchangeContext; 