import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe } from 'lucide-react';
import { MarketData } from '../services/marketApi';

interface AssetOverviewProps {
  marketData: MarketData;
}

const AssetOverview: React.FC<AssetOverviewProps> = ({ marketData }) => {
  const isPositive = marketData.changePercent24h >= 0;

  const formatPrice = (price: number, type: string) => {
    if (type === 'forex') {
      return price.toFixed(4);
    }
    return price.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const formatMarketCap = (marketCap?: number) => {
    if (!marketCap) return 'N/A';
    
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(1)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(1)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(1)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(1)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(1)}M`;
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stock': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'crypto': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'forex': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{marketData.name}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-gray-600 dark:text-gray-400">{marketData.symbol}</span>
            <span className={`px-2 py-1 rounded text-sm font-medium ${getTypeColor(marketData.type)}`}>
              {marketData.type.toUpperCase()}
            </span>
            {marketData.sector && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm">
                {marketData.sector}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${formatPrice(marketData.price, marketData.type)}
          </div>
          <div className={`flex items-center justify-end ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span className="font-medium">
              {isPositive ? '+' : ''}{marketData.change24h.toFixed(2)} ({isPositive ? '+' : ''}{marketData.changePercent24h.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {marketData.marketCap && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap</p>
              <p className="font-semibold text-gray-900 dark:text-white">{formatMarketCap(marketData.marketCap)}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume</p>
            <p className="font-semibold text-gray-900 dark:text-white">{formatVolume(marketData.volume24h)}</p>
          </div>
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data</span>
        </div>
        <span>Last updated: {new Date(marketData.lastUpdated).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default AssetOverview;