import { createContext } from 'react'
import type { ChartContextType } from './types'

const ChartContext = createContext<ChartContextType | undefined>(undefined)

export default ChartContext 