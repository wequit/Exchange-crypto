import React, { useContext, useRef, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import ChartContext from '../../contexts/ChartContext/ChartContext'
import { buildChartData, CHART_COINS, CHART_PERIODS, getChartOptions } from '../../models/chart.model'
import { getPriceChangePercent } from '../../controllers/chart.controller'

export const ChartCard: React.FC = () => {
  const { currency, setCurrency, period, setPeriod, data, loading, error } = useContext(ChartContext)!
  const chartRef = useRef<any>(null)

  const chartData = useMemo(() => buildChartData(data, currency, chartRef), [data, currency])

  const priceChange = useMemo(() => getPriceChangePercent(data), [data])

  const options = useMemo(() => getChartOptions(period, currency), [period, currency])

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-2xl w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {CHART_COINS.find(c => c.symbol === currency)?.name} Price Chart
          </h2>
          {data && data.length > 0 && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-blue-400">
                ${data[data.length - 1].price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </span>
              {priceChange !== null && (
                <span className={`text-sm px-2 py-1 rounded ${priceChange >= 0 ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}% (24H)
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <select 
            value={currency} 
            onChange={e => setCurrency(e.target.value)} 
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors"
          >
            {CHART_COINS.map(c => (
              <option key={c.symbol} value={c.symbol} className="bg-gray-800">
                {c.name} ({c.symbol})
              </option>
            ))}
          </select>
          
          <div className="flex bg-gray-800 rounded-lg border border-gray-700 p-1">
            {CHART_PERIODS.map(p => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === p.value 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-[500px] w-full">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-10">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-full mb-2"></div>
              <span className="text-blue-400">Loading chart data...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-10">
            <div className="text-red-400 p-4 bg-red-900/30 rounded-lg">
              Error: {error}
            </div>
          </div>
        )}
        
        {data && (
          <div className="absolute inset-0">
            <Line 
              ref={chartRef} 
              data={chartData} 
              options={options}
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button 
            onClick={() => chartRef.current?.resetZoom()}
            className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 transition-colors"
          >
            Сбросить масштаб
          </button>
          <span className="text-xs text-gray-500 self-center">
            (Колесо мыши или выделите область)
          </span>
        </div>
      </div>
    </div>
  )
}