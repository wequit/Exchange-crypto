export interface CryptoCurrency {
    id: string;    
    symbol: string; 
    name: string;  
  }
  
  export const topCryptos: CryptoCurrency[] = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    { id: 'tether', symbol: 'USDT', name: 'Tether' },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
    { id: 'solana', symbol: 'SOL', name: 'Solana' },
    { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP' },
    { id: 'staked-ether', symbol: 'STETH', name: 'Lido Staked Ether' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
    { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
    { id: 'tron', symbol: 'TRX', name: 'TRON' },
    { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
    { id: 'wrapped-bitcoin', symbol: 'WBTC', name: 'Wrapped Bitcoin' },
    { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
    { id: 'matic-network', symbol: 'MATIC', name: 'Polygon' },
    { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
    { id: 'internet-computer', symbol: 'ICP', name: 'Internet Computer' },
    { id: 'dai', symbol: 'DAI', name: 'Dai' },
    { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
    { id: 'leo-token', symbol: 'LEO', name: 'LEO Token' },
    { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
    { id: 'aptos', symbol: 'APT', name: 'Aptos' },
    { id: 'first-digital-usd', symbol: 'FDUSD', name: 'First Digital USD' },
    { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
    { id: 'okb', symbol: 'OKB', name: 'OKB' },
    { id: 'monero', symbol: 'XMR', name: 'Monero' },
    { id: 'filecoin', symbol: 'FIL', name: 'Filecoin' },
    { id: 'lido-dao', symbol: 'LDO', name: 'Lido DAO' },
    { id: 'bittensor', symbol: 'TAO', name: 'Bittensor' },
    { id: 'arbitrum', symbol: 'ARB', name: 'Arbitrum' },
    { id: 'crypto-com-chain', symbol: 'CRO', name: 'Cronos' },
    { id: 'mantle', symbol: 'MNT', name: 'Mantle' },
    { id: 'vechain', symbol: 'VET', name: 'VeChain' },
    { id: 'render-token', symbol: 'RNDR', name: 'Render' },
    { id: 'maker', symbol: 'MKR', name: 'Maker' },
    { id: 'injective-protocol', symbol: 'INJ', name: 'Injective' },
    { id: 'the-graph', symbol: 'GRT', name: 'The Graph' }
  ];