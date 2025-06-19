export class ChartService {
  static symbolToId: Record<string, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    BNB: 'binancecoin',
    SOL: 'solana',
  }

  static async fetchHistoricalRates(currency: string, period: number) {
    const id = this.symbolToId[currency.toUpperCase()] || currency.toLowerCase()
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${period}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Ошибка загрузки данных с CoinGecko')
    return res.json()
  }
}