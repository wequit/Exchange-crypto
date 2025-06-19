export class ChartModel {
  static transform(rawData: any) {
    if (!rawData.prices) return []
    return rawData.prices.map(([timestamp, price]: [number, number]) => ({
      timestamp,
      date: new Date(timestamp).toLocaleDateString(),
      price
    }))
  }
}

export function getGradient(ctx: CanvasRenderingContext2D, area: any): CanvasGradient {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0)')
  gradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.2)')
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0.4)')
  return gradient
}

export function buildChartData(data: any[], currency: string, chartRef: any) {
  if (!data || !chartRef.current) return { labels: [], datasets: [] }
  const ctx = chartRef.current.ctx
  const area = chartRef.current.chartArea
  return {
    labels: data.map((point: any) => point.timestamp),
    datasets: [
      {
        label: `${currency} Price`,
        data: data.map((point: any) => point.price),
        borderColor: '#3b82f6',
        backgroundColor: area ? getGradient(ctx, area) : 'rgba(59,130,246,0.2)',
        pointRadius: 0,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  }
} 

export const CHART_COINS = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'XRP', name: 'Ripple' },
  { symbol: 'ADA', name: 'Cardano' },
]

export const CHART_PERIODS = [
  { value: 1, label: '24H' },
  { value: 7, label: '7D' },
  { value: 30, label: '1M' },
  { value: 90, label: '3M' },
  { value: 365, label: '1Y' },
]

export function getChartOptions(period: number, currency: string) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#94a3b8',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (ctx: any) => {
            const price = ctx.parsed.y.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 6
            })
            return `${currency}: ${price}`
          },
          title: (items: any) => {
            const date = new Date(items[0].label)
            return date.toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy' as const,
          modifierKey: 'shift' as const,
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy' as const,
          drag: {
            enabled: true,
            backgroundColor: 'rgba(59, 130, 246, 0.3)',
            borderColor: 'rgba(59, 130, 246, 0.7)',
            borderWidth: 1,
          },
        },
        limits: {
          x: { min: 'original' as const, max: 'original' as const },
          y: { min: 'original' as const, max: 'original' as const },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: (period <= 1 ? 'hour' : 'day') as 'hour' | 'day',
          tooltipFormat: period <= 1 ? 'HH:mm, dd.MM' : 'dd.MM.yyyy',
          displayFormats: {
            hour: 'HH:mm',
            day: 'MMM dd',
          },
        },
        grid: { 
          color: 'rgba(30, 41, 59, 0.5)',
          drawTicks: false,
        },
        ticks: {
          color: '#64748b',
        },
        border: {
          color: 'rgba(30, 41, 59, 0.8)',
        }
      },
      y: {
        position: 'right' as const,
        grid: { 
          color: 'rgba(30, 41, 59, 0.5)',
          drawTicks: false,
        },
        ticks: {
          color: '#64748b',
          callback: (value: any) => {
            if (value >= 1) {
              return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 2 })
            }
            return '$' + value.toFixed(6).replace(/\.?0+$/, '')
          },
        },
        border: {
          color: 'rgba(30, 41, 59, 0.8)',
        }
      },
    },
  }
} 