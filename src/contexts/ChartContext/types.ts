export interface ChartContextType {
    currency: string
    setCurrency: (currency: string) => void
    period: number
    setPeriod: (period: number) => void
    data: any
    loading: boolean
    error: string | null
    fetchChartData: (currency?: string, period?: number) => Promise<void>
  }