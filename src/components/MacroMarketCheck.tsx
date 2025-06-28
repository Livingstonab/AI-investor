import React from 'react';
import { Globe, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketData } from '../services/marketApi';

interface MacroMarketCheckProps {
  asset: string;
  type: 'stock' | 'crypto' | 'forex';
  marketData: MarketData;
}

const MacroMarketCheck: React.FC<MacroMarketCheckProps> = ({ asset, type, marketData }) => {
  // Mock benchmark data that would come from real APIs
  const benchmarkData = {
    stock: [
      { name: 'S&P 500', value: 4756.50, change: 1.25 },
      { name: 'NASDAQ', value: 14840.20, change: -0.85 }
    ],
    crypto: [
      { name: 'Bitcoin', value: 43250.00, change: 2.15 },
      { name: 'Ethereum', value: 2650.00, change: -1.20 }
    ],
    forex: [
      { name: 'DXY (Dollar Index)', value: 103.45, change: 0.35 },
      { name: 'VIX (Volatility)', value: 18.75, change: -2.10 }
    ]
  };

  const benchmarks = benchmarkData[type];
  const marketSentiment = marketData.changePercent24h > 0 ? 'Bullish' : 'Bearish';
  const correlation = 0.75; // Mock correlation coefficient

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'bullish':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'bearish':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default:
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getCorrelationStrength = (corr: number) => {
    const abs = Math.abs(corr);
    if (abs >= 0.8) return 'Very Strong';
    if (abs >= 0.6) return 'Strong';
    if (abs >= 0.4) return 'Moderate';
    if (abs >= 0.2) return 'Weak';
    return 'Very Weak';
  };

  const getMarketContext = () => {
    switch (type) {
      case 'stock':
        return 'Stock market indices show mixed performance with sector rotation continuing.';
      case 'crypto':
        return 'Cryptocurrency markets are experiencing increased institutional adoption.';
      case 'forex':
        return 'Foreign exchange markets are influenced by central bank policy decisions.';
      default:
        return 'Market conditions are showing typical volatility patterns.';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Globe className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Overview</h3>
        <div className="flex items-center space-x-1 ml-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Market Sentiment</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(marketSentiment)}`}>
            {marketSentiment}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {getMarketContext()}
        </p>
      </div>

      {/* Benchmark Comparison */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {type === 'stock' ? 'Market Indices' : type === 'crypto' ? 'Crypto Leaders' : 'Key Indicators'}
        </h4>
        <div className="space-y-3">
          {benchmarks.map((benchmark, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-white">{benchmark.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-300">{benchmark.value.toLocaleString()}</span>
                <div className={`flex items-center ${benchmark.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {benchmark.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {benchmark.change >= 0 ? '+' : ''}{benchmark.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Correlation Analysis */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Market Correlation</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{(correlation * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.abs(correlation) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>{getCorrelationStrength(correlation)}</strong> correlation with market - 
          {correlation > 0 
            ? ' tends to move in the same direction as the broader market.'
            : ' tends to move independently or opposite to market trends.'
          }
        </p>
      </div>

      {/* Market Impact */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Market Impact on {asset}</h5>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current {marketSentiment.toLowerCase()} market conditions are 
          {marketSentiment === 'Bullish' ? ' supportive' : ' challenging'} 
          for this asset. {correlation > 0.5 
            ? 'Strong market correlation means broader trends significantly influence price movement.'
            : 'Lower market correlation provides some insulation from broader market volatility.'
          }
        </p>
      </div>
    </div>
  );
};

export default MacroMarketCheck;