import React, { useState, useCallback } from 'react'
import ChartContext from './ChartContext'
import { ChartController } from '../../controllers/chart.controller'

export const ChartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('BTC')
  const [period, setPeriod] = useState<number>(7)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchChartData = useCallback(async (cur = currency, per = period) => {
    setLoading(true)
    setError(null)
    try {
      const chartData = await ChartController.fetchChartData(cur, per)
      setData(chartData)
    } catch (e: any) {
      setError(e.message || 'Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }, [currency, period])

  React.useEffect(() => {
    fetchChartData()
  }, [currency, period, fetchChartData])

  return (
    <ChartContext.Provider value={{
      currency,
      setCurrency,
      period,
      setPeriod,
      data,
      loading,
      error,
      fetchChartData
    }}>
      {children}
    </ChartContext.Provider>
  )
} 