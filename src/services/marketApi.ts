// Enhanced API service with intelligent fallback systems
export interface MarketData {
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'forex';
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap?: number;
  volume24h: number;
  sector?: string;
  lastUpdated: string;
  dataQuality: 'live' | 'estimated' | 'historical';
  estimationNote?: string;
}

export interface NewsItem {
  headline: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  source: string;
  publishedAt: string;
  url: string;
  isEstimated?: boolean;
}

export interface ChartData {
  timestamp: number;
  price: number;
  volume: number;
  isEstimated?: boolean;
}

export interface TechnicalIndicators {
  rsi: number;
  sma20: number;
  sma50: number;
  macd: number;
  bollinger: {
    upper: number;
    middle: number;
    lower: number;
  };
  isEstimated?: boolean;
  estimationNote?: string;
}

export interface AnalysisResult {
  marketData: MarketData;
  news: NewsItem[];
  chartData: ChartData[];
  technicalIndicators: TechnicalIndicators;
  recommendation: 'buy' | 'hold' | 'sell';
  confidence: number;
  riskScore: 'low' | 'medium' | 'high';
  reasons: string[];
  dataQuality: 'complete' | 'partial' | 'estimated';
  fallbackUsed?: boolean;
  similarAssets?: string[];
}

// Simulated real-time data with realistic fluctuations
const generateRealtimePrice = (basePrice: number, volatility: number = 0.02) => {
  const randomChange = (Math.random() - 0.5) * 2 * volatility;
  return basePrice * (1 + randomChange);
};

const generateChartData = (basePrice: number, days: number = 30, isEstimated: boolean = false): ChartData[] => {
  const data: ChartData[] = [];
  let currentPrice = basePrice;
  const now = Date.now();
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - (i * 24 * 60 * 60 * 1000);
    currentPrice = generateRealtimePrice(currentPrice, isEstimated ? 0.05 : 0.03);
    data.push({
      timestamp,
      price: currentPrice,
      volume: Math.random() * 1000000 + 500000,
      isEstimated
    });
  }
  
  return data;
};

// Comprehensive market database with fallback categories
const marketDatabase: Record<string, Partial<MarketData>> = {
  // Major Stocks
  'AAPL': { name: 'Apple Inc.', type: 'stock', sector: 'Technology', marketCap: 2800000000000 },
  'TSLA': { name: 'Tesla Inc.', type: 'stock', sector: 'Electric Vehicles', marketCap: 789200000000 },
  'MSFT': { name: 'Microsoft Corporation', type: 'stock', sector: 'Technology', marketCap: 2900000000000 },
  'GOOGL': { name: 'Alphabet Inc.', type: 'stock', sector: 'Technology', marketCap: 1700000000000 },
  'AMZN': { name: 'Amazon.com Inc.', type: 'stock', sector: 'E-commerce', marketCap: 1500000000000 },
  'META': { name: 'Meta Platforms Inc.', type: 'stock', sector: 'Social Media', marketCap: 800000000000 },
  'NVDA': { name: 'NVIDIA Corporation', type: 'stock', sector: 'Semiconductors', marketCap: 1800000000000 },
  'NFLX': { name: 'Netflix Inc.', type: 'stock', sector: 'Streaming', marketCap: 180000000000 },
  'AMD': { name: 'Advanced Micro Devices', type: 'stock', sector: 'Semiconductors', marketCap: 240000000000 },
  'INTC': { name: 'Intel Corporation', type: 'stock', sector: 'Semiconductors', marketCap: 200000000000 },
  
  // Major Cryptocurrencies
  'BTC': { name: 'Bitcoin', type: 'crypto', sector: 'Digital Currency', marketCap: 847200000000 },
  'ETH': { name: 'Ethereum', type: 'crypto', sector: 'Smart Contracts', marketCap: 318500000000 },
  'BNB': { name: 'Binance Coin', type: 'crypto', sector: 'Exchange Token', marketCap: 85000000000 },
  'ADA': { name: 'Cardano', type: 'crypto', sector: 'Smart Contracts', marketCap: 45000000000 },
  'SOL': { name: 'Solana', type: 'crypto', sector: 'Smart Contracts', marketCap: 78000000000 },
  'XRP': { name: 'Ripple', type: 'crypto', sector: 'Payment Protocol', marketCap: 35000000000 },
  'DOT': { name: 'Polkadot', type: 'crypto', sector: 'Interoperability', marketCap: 12000000000 },
  'AVAX': { name: 'Avalanche', type: 'crypto', sector: 'Smart Contracts', marketCap: 15000000000 },
  'MATIC': { name: 'Polygon', type: 'crypto', sector: 'Layer 2', marketCap: 8000000000 },
  'LINK': { name: 'Chainlink', type: 'crypto', sector: 'Oracle Network', marketCap: 9000000000 },
  
  // Major Forex Pairs
  'EURUSD': { name: 'Euro / US Dollar', type: 'forex', sector: 'Major Pairs' },
  'GBPUSD': { name: 'British Pound / US Dollar', type: 'forex', sector: 'Major Pairs' },
  'USDJPY': { name: 'US Dollar / Japanese Yen', type: 'forex', sector: 'Major Pairs' },
  'USDCHF': { name: 'US Dollar / Swiss Franc', type: 'forex', sector: 'Major Pairs' },
  'AUDUSD': { name: 'Australian Dollar / US Dollar', type: 'forex', sector: 'Major Pairs' },
  'USDCAD': { name: 'US Dollar / Canadian Dollar', type: 'forex', sector: 'Major Pairs' },
  'NZDUSD': { name: 'New Zealand Dollar / US Dollar', type: 'forex', sector: 'Major Pairs' },
  'EURGBP': { name: 'Euro / British Pound', type: 'forex', sector: 'Cross Pairs' }
};

// Fallback categories for unknown assets
const fallbackCategories = {
  stock: {
    technology: { basePrice: 150, volatility: 0.03, marketCap: 500000000000 },
    healthcare: { basePrice: 120, volatility: 0.025, marketCap: 300000000000 },
    finance: { basePrice: 80, volatility: 0.035, marketCap: 200000000000 },
    energy: { basePrice: 90, volatility: 0.04, marketCap: 150000000000 },
    retail: { basePrice: 60, volatility: 0.03, marketCap: 100000000000 }
  },
  crypto: {
    'defi': { basePrice: 25, volatility: 0.08, marketCap: 2000000000 },
    'layer1': { basePrice: 45, volatility: 0.06, marketCap: 5000000000 },
    'layer2': { basePrice: 15, volatility: 0.07, marketCap: 1500000000 },
    'meme': { basePrice: 0.05, volatility: 0.15, marketCap: 500000000 },
    'gaming': { basePrice: 8, volatility: 0.09, marketCap: 800000000 }
  },
  forex: {
    major: { basePrice: 1.1, volatility: 0.01 },
    minor: { basePrice: 0.85, volatility: 0.015 },
    exotic: { basePrice: 15.5, volatility: 0.025 }
  }
};

const basePrices: Record<string, number> = {
  'AAPL': 175.84, 'TSLA': 248.50, 'MSFT': 378.85, 'GOOGL': 142.56, 'AMZN': 155.89,
  'META': 485.22, 'NVDA': 875.28, 'NFLX': 425.67, 'AMD': 145.23, 'INTC': 48.92,
  'BTC': 43250.00, 'ETH': 2650.00, 'BNB': 315.45, 'ADA': 0.52, 'SOL': 98.75,
  'XRP': 0.63, 'DOT': 7.85, 'AVAX': 38.92, 'MATIC': 0.89, 'LINK': 15.67,
  'EURUSD': 1.0875, 'GBPUSD': 1.2654, 'USDJPY': 149.85, 'USDCHF': 0.8756,
  'AUDUSD': 0.6589, 'USDCAD': 1.3456, 'NZDUSD': 0.6123, 'EURGBP': 0.8598
};

// Intelligent asset type detection
const detectAssetType = (symbol: string): 'stock' | 'crypto' | 'forex' => {
  const upperSymbol = symbol.toUpperCase();
  
  // Forex patterns
  if (upperSymbol.length === 6 && /^[A-Z]{6}$/.test(upperSymbol)) return 'forex';
  if (upperSymbol.includes('USD') || upperSymbol.includes('EUR') || upperSymbol.includes('GBP')) return 'forex';
  
  // Crypto patterns
  if (upperSymbol.includes('COIN') || upperSymbol.includes('TOKEN')) return 'crypto';
  if (['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP', 'DOT', 'AVAX', 'MATIC', 'LINK'].includes(upperSymbol)) return 'crypto';
  
  // Default to stock
  return 'stock';
};

// Generate fallback data for unknown assets
const generateFallbackData = (symbol: string, name?: string): Partial<MarketData> => {
  const type = detectAssetType(symbol);
  const upperSymbol = symbol.toUpperCase();
  
  let category: string;
  let fallbackData: any;
  
  switch (type) {
    case 'stock':
      category = 'technology'; // Default category
      if (name?.toLowerCase().includes('health') || name?.toLowerCase().includes('pharma')) category = 'healthcare';
      if (name?.toLowerCase().includes('bank') || name?.toLowerCase().includes('finance')) category = 'finance';
      if (name?.toLowerCase().includes('energy') || name?.toLowerCase().includes('oil')) category = 'energy';
      fallbackData = fallbackCategories.stock[category];
      break;
      
    case 'crypto':
      category = 'defi'; // Default category
      if (name?.toLowerCase().includes('game') || name?.toLowerCase().includes('nft')) category = 'gaming';
      if (name?.toLowerCase().includes('meme') || name?.toLowerCase().includes('dog')) category = 'meme';
      if (name?.toLowerCase().includes('layer') || name?.toLowerCase().includes('chain')) category = 'layer1';
      fallbackData = fallbackCategories.crypto[category];
      break;
      
    case 'forex':
      category = 'major';
      if (!upperSymbol.includes('USD')) category = 'minor';
      fallbackData = fallbackCategories.forex[category];
      break;
  }
  
  return {
    name: name || `${upperSymbol} ${type === 'forex' ? 'Currency Pair' : type === 'crypto' ? 'Token' : 'Corporation'}`,
    type,
    sector: category.charAt(0).toUpperCase() + category.slice(1),
    marketCap: fallbackData.marketCap
  };
};

// Enhanced news generation with fallback
const generateNews = (symbol: string, type: string, isEstimated: boolean = false): NewsItem[] => {
  const newsTemplates = {
    stock: [
      {
        headline: `${symbol} Shows Strong Performance in Current Market Conditions`,
        summary: 'Recent market analysis indicates positive momentum and investor confidence',
        sentiment: 'positive' as const,
        source: 'MarketWatch'
      },
      {
        headline: `Analysts Update ${symbol} Price Targets Following Market Trends`,
        summary: 'Market dynamics and sector performance drive updated analyst outlook',
        sentiment: 'positive' as const,
        source: 'Reuters'
      },
      {
        headline: `Market Volatility Affects ${symbol} Trading Patterns`,
        summary: 'Broader market conditions influence individual asset performance',
        sentiment: 'neutral' as const,
        source: 'CNBC'
      },
      {
        headline: `${symbol} Faces Market Headwinds Amid Economic Uncertainty`,
        summary: 'Economic factors create challenges for asset performance',
        sentiment: 'negative' as const,
        source: 'Financial Times'
      }
    ],
    crypto: [
      {
        headline: `${symbol} Gains Traction in Digital Asset Market`,
        summary: 'Growing adoption and market interest drive positive sentiment',
        sentiment: 'positive' as const,
        source: 'CoinDesk'
      },
      {
        headline: `${symbol} Network Activity Shows Increased Usage`,
        summary: 'On-chain metrics indicate growing user adoption and activity',
        sentiment: 'positive' as const,
        source: 'CoinTelegraph'
      },
      {
        headline: `Regulatory Developments Impact ${symbol} Market Dynamics`,
        summary: 'Policy discussions create market uncertainty and volatility',
        sentiment: 'negative' as const,
        source: 'CryptoNews'
      },
      {
        headline: `${symbol} Trading Volume Reflects Market Interest`,
        summary: 'Market activity signals continued investor engagement',
        sentiment: 'neutral' as const,
        source: 'Decrypt'
      }
    ],
    forex: [
      {
        headline: `${symbol} Exchange Rate Influenced by Economic Data`,
        summary: 'Economic indicators and policy decisions drive currency movement',
        sentiment: 'neutral' as const,
        source: 'ForexFactory'
      },
      {
        headline: `Central Bank Policies Affect ${symbol} Outlook`,
        summary: 'Monetary policy decisions impact currency pair dynamics',
        sentiment: 'positive' as const,
        source: 'FXStreet'
      },
      {
        headline: `Global Economic Trends Impact ${symbol} Volatility`,
        summary: 'International economic conditions influence currency flows',
        sentiment: 'negative' as const,
        source: 'DailyFX'
      }
    ]
  };

  const templates = newsTemplates[type] || newsTemplates.stock;
  return templates.slice(0, 4).map((template, index) => ({
    ...template,
    publishedAt: new Date(Date.now() - (index + 1) * 2 * 60 * 60 * 1000).toISOString(),
    url: `https://example.com/news/${symbol.toLowerCase()}-${index + 1}`,
    isEstimated
  }));
};

// Enhanced market data fetching with intelligent fallback
export const fetchMarketData = async (symbol: string): Promise<MarketData> => {
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  const upperSymbol = symbol.toUpperCase();
  let baseData = marketDatabase[upperSymbol];
  let basePrice = basePrices[upperSymbol];
  let dataQuality: 'live' | 'estimated' | 'historical' = 'live';
  let estimationNote: string | undefined;
  
  // If asset not found, generate intelligent fallback
  if (!baseData || !basePrice) {
    const detectedType = detectAssetType(symbol);
    baseData = generateFallbackData(symbol);
    
    // Generate realistic price based on asset type and category
    const category = baseData.sector?.toLowerCase() || 'technology';
    const fallbackInfo = detectedType === 'stock' ? fallbackCategories.stock[category] || fallbackCategories.stock.technology :
                        detectedType === 'crypto' ? fallbackCategories.crypto.defi :
                        fallbackCategories.forex.major;
    
    basePrice = fallbackInfo.basePrice * (0.8 + Math.random() * 0.4);
    dataQuality = 'estimated';
    estimationNote = `Live data limited — using ${detectedType === 'crypto' ? 'DeFi sector' : detectedType === 'forex' ? 'currency pair' : 'technology sector'} averages and AI estimation`;
  }
  
  const currentPrice = generateRealtimePrice(basePrice, dataQuality === 'estimated' ? 0.05 : 0.01);
  const yesterdayPrice = generateRealtimePrice(basePrice, dataQuality === 'estimated' ? 0.06 : 0.02);
  const change24h = currentPrice - yesterdayPrice;
  const changePercent24h = (change24h / yesterdayPrice) * 100;
  
  return {
    symbol: upperSymbol,
    name: baseData.name!,
    type: baseData.type!,
    price: currentPrice,
    change24h,
    changePercent24h,
    marketCap: baseData.marketCap,
    volume24h: Math.random() * 100000000 + 10000000,
    sector: baseData.sector,
    lastUpdated: new Date().toISOString(),
    dataQuality,
    estimationNote
  };
};

export const fetchNews = async (symbol: string): Promise<NewsItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
  
  const upperSymbol = symbol.toUpperCase();
  const assetData = marketDatabase[upperSymbol];
  const isEstimated = !assetData;
  
  const type = assetData?.type || detectAssetType(symbol);
  return generateNews(upperSymbol, type, isEstimated);
};

export const fetchChartData = async (symbol: string, period: '7d' | '30d' = '30d'): Promise<ChartData[]> => {
  await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));
  
  const upperSymbol = symbol.toUpperCase();
  let basePrice = basePrices[upperSymbol];
  let isEstimated = false;
  
  if (!basePrice) {
    const type = detectAssetType(symbol);
    const fallbackInfo = type === 'stock' ? fallbackCategories.stock.technology :
                        type === 'crypto' ? fallbackCategories.crypto.defi :
                        fallbackCategories.forex.major;
    basePrice = fallbackInfo.basePrice * (0.8 + Math.random() * 0.4);
    isEstimated = true;
  }
  
  const days = period === '7d' ? 7 : 30;
  return generateChartData(basePrice, days, isEstimated);
};

export const fetchTechnicalIndicators = async (symbol: string): Promise<TechnicalIndicators> => {
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 400));
  
  const upperSymbol = symbol.toUpperCase();
  let basePrice = basePrices[upperSymbol];
  let isEstimated = false;
  let estimationNote: string | undefined;
  
  if (!basePrice) {
    const type = detectAssetType(symbol);
    const fallbackInfo = type === 'stock' ? fallbackCategories.stock.technology :
                        type === 'crypto' ? fallbackCategories.crypto.defi :
                        fallbackCategories.forex.major;
    basePrice = fallbackInfo.basePrice * (0.8 + Math.random() * 0.4);
    isEstimated = true;
    estimationNote = `Indicators estimated from similar ${type} assets`;
  }
  
  return {
    rsi: Math.random() * 100,
    sma20: basePrice * (0.95 + Math.random() * 0.1),
    sma50: basePrice * (0.90 + Math.random() * 0.2),
    macd: (Math.random() - 0.5) * 10,
    bollinger: {
      upper: basePrice * 1.05,
      middle: basePrice,
      lower: basePrice * 0.95
    },
    isEstimated,
    estimationNote
  };
};

// Enhanced analysis generation with fallback logic
export const generateAnalysis = async (symbol: string, riskTolerance: string): Promise<AnalysisResult> => {
  const [marketData, news, chartData, technicalIndicators] = await Promise.all([
    fetchMarketData(symbol),
    fetchNews(symbol),
    fetchChartData(symbol),
    fetchTechnicalIndicators(symbol)
  ]);
  
  const fallbackUsed = marketData.dataQuality === 'estimated';
  const dataQuality = fallbackUsed ? 'estimated' : 'complete';
  
  // Generate recommendation based on multiple factors
  const priceChange = marketData.changePercent24h;
  const newsPositive = news.filter(n => n.sentiment === 'positive').length;
  const newsNegative = news.filter(n => n.sentiment === 'negative').length;
  const rsiOverbought = technicalIndicators.rsi > 70;
  const rsiOversold = technicalIndicators.rsi < 30;
  
  let recommendation: 'buy' | 'hold' | 'sell';
  let confidence: number;
  let riskScore: 'low' | 'medium' | 'high';
  let reasons: string[] = [];
  
  // Determine recommendation
  const bullishSignals = [
    priceChange > 2,
    newsPositive > newsNegative,
    rsiOversold,
    marketData.price > technicalIndicators.sma20
  ].filter(Boolean).length;
  
  const bearishSignals = [
    priceChange < -2,
    newsNegative > newsPositive,
    rsiOverbought,
    marketData.price < technicalIndicators.sma50
  ].filter(Boolean).length;
  
  if (bullishSignals >= 3) {
    recommendation = 'buy';
    confidence = fallbackUsed ? 65 + Math.random() * 15 : 75 + Math.random() * 20;
    reasons = [
      fallbackUsed ? 'Estimated positive price momentum based on sector trends' : 'Strong positive price momentum',
      fallbackUsed ? 'Favorable market sentiment for similar assets' : 'Favorable news sentiment',
      'Technical indicators suggest potential upside'
    ];
  } else if (bearishSignals >= 3) {
    recommendation = 'sell';
    confidence = fallbackUsed ? 60 + Math.random() * 20 : 70 + Math.random() * 25;
    reasons = [
      fallbackUsed ? 'Estimated negative price trend based on market conditions' : 'Negative price trend',
      fallbackUsed ? 'Market uncertainty affecting similar assets' : 'Concerning news developments',
      'Technical indicators suggest potential downside'
    ];
  } else {
    recommendation = 'hold';
    confidence = fallbackUsed ? 55 + Math.random() * 15 : 60 + Math.random() * 20;
    reasons = [
      fallbackUsed ? 'Mixed signals based on sector analysis' : 'Mixed market signals',
      'Balanced sentiment and technical indicators',
      'Neutral market conditions suggest patience'
    ];
  }
  
  // Determine risk score
  const volatility = Math.abs(priceChange);
  if (volatility > 5 || marketData.type === 'crypto') {
    riskScore = 'high';
  } else if (volatility > 2) {
    riskScore = 'medium';
  } else {
    riskScore = 'low';
  }
  
  // Adjust confidence for estimated data
  if (fallbackUsed) {
    confidence = Math.max(50, confidence - 10);
  }
  
  // Generate similar assets suggestions for fallback cases
  const similarAssets = fallbackUsed ? getSimilarAssets(marketData.type, marketData.sector) : undefined;
  
  return {
    marketData,
    news,
    chartData,
    technicalIndicators,
    recommendation,
    confidence: Math.round(confidence),
    riskScore,
    reasons,
    dataQuality,
    fallbackUsed,
    similarAssets
  };
};

// Get similar assets for suggestions
const getSimilarAssets = (type: string, sector?: string): string[] => {
  const suggestions: Record<string, string[]> = {
    'stock-technology': ['AAPL', 'MSFT', 'GOOGL', 'NVDA'],
    'stock-healthcare': ['JNJ', 'PFE', 'UNH', 'ABBV'],
    'stock-finance': ['JPM', 'BAC', 'WFC', 'GS'],
    'crypto-defi': ['UNI', 'AAVE', 'COMP', 'MKR'],
    'crypto-layer1': ['ETH', 'SOL', 'ADA', 'DOT'],
    'forex-major': ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF']
  };
  
  const key = `${type}-${sector?.toLowerCase()}`;
  return suggestions[key] || suggestions[`${type}-technology`] || ['BTC', 'ETH', 'AAPL', 'MSFT'];
};

export const searchAssets = async (query: string): Promise<MarketData[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const results: MarketData[] = [];
  const searchTerm = query.toLowerCase();
  
  // Search known assets first
  for (const [symbol, data] of Object.entries(marketDatabase)) {
    if (
      symbol.toLowerCase().includes(searchTerm) ||
      data.name?.toLowerCase().includes(searchTerm)
    ) {
      try {
        const marketData = await fetchMarketData(symbol);
        results.push(marketData);
      } catch (error) {
        // Skip assets that can't be fetched
      }
    }
  }
  
  // If no results found, generate intelligent suggestions
  if (results.length === 0 && query.length >= 2) {
    const type = detectAssetType(query);
    const fallbackData = generateFallbackData(query, `${query} ${type === 'crypto' ? 'Token' : type === 'forex' ? 'Pair' : 'Corp'}`);
    
    try {
      const marketData = await fetchMarketData(query);
      results.push(marketData);
    } catch (error) {
      // Even fallback failed, but we should never reach here with the new system
    }
  }
  
  return results.slice(0, 10);
};