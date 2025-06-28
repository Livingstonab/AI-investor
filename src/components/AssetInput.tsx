import React, { useState } from 'react';
import { Search, TrendingUp, Lightbulb } from 'lucide-react';
import { searchAssets, MarketData } from '../services/marketApi';

interface AssetInputProps {
  onAnalyze: (asset: string, symbol: string, riskTolerance: string) => void;
  isLoading: boolean;
}

const AssetInput: React.FC<AssetInputProps> = ({ onAnalyze, isLoading }) => {
  const [asset, setAsset] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [suggestions, setSuggestions] = useState<MarketData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (asset.trim()) {
      const symbol = asset.toUpperCase().includes(' ') ? 
        asset.split(' ')[0].toUpperCase() : 
        asset.toUpperCase();
      onAnalyze(asset, symbol, riskTolerance);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = async (value: string) => {
    setAsset(value);
    
    if (value.length >= 2) {
      try {
        const results = await searchAssets(value);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: MarketData) => {
    setAsset(suggestion.name);
    setShowSuggestions(false);
    onAnalyze(suggestion.name, suggestion.symbol, riskTolerance);
  };

  const popularAssets = [
    { name: 'Apple Inc.', symbol: 'AAPL', type: 'stock' },
    { name: 'Tesla Inc.', symbol: 'TSLA', type: 'stock' },
    { name: 'Bitcoin', symbol: 'BTC', type: 'crypto' },
    { name: 'Ethereum', symbol: 'ETH', type: 'crypto' },
    { name: 'Euro / US Dollar', symbol: 'EURUSD', type: 'forex' },
    { name: 'Microsoft', symbol: 'MSFT', type: 'stock' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stock': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'crypto': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'forex': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analyze Any Asset</h2>
      </div>

      {/* Smart Analysis Notice */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-800 dark:text-blue-200 font-medium">Smart Analysis Technology</p>
            <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
              Our AI can analyze any asset, even new or uncommon ones. If live data is limited, 
              we'll use intelligent estimation based on similar assets and market patterns.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="asset" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter any stock, crypto, forex pair, or new token
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="asset"
              value={asset}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="e.g., Apple, AAPL, Bitcoin, BTC, EUR/USD, XYZ Token"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={isLoading}
            />
          </div>
          
          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.symbol}
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{suggestion.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {suggestion.symbol}
                      {suggestion.dataQuality === 'estimated' && (
                        <span className="ml-2 text-blue-600 dark:text-blue-400">(Estimated)</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(suggestion.type)}`}>
                      {suggestion.type.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ${suggestion.price.toFixed(suggestion.type === 'forex' ? 4 : 2)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="risk" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Risk Tolerance
          </label>
          <select
            id="risk"
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isLoading}
          >
            <option value="conservative">Conservative - Lower risk, steady returns</option>
            <option value="moderate">Moderate - Balanced risk and growth</option>
            <option value="aggressive">Aggressive - Higher risk, higher potential returns</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!asset.trim() || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Asset'}
        </button>
      </form>

      {/* Popular Assets */}
      <div className="mt-8">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Popular Assets</p>
        <div className="flex flex-wrap gap-2">
          {popularAssets.map((popularAsset) => (
            <button
              key={popularAsset.symbol}
              onClick={() => setAsset(popularAsset.name)}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200 flex items-center space-x-1"
              disabled={isLoading}
            >
              <span>{popularAsset.name} ({popularAsset.symbol})</span>
              <span className={`px-1.5 py-0.5 rounded text-xs ${getTypeColor(popularAsset.type)}`}>
                {popularAsset.type}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Try Anything Notice */}
      <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <p className="text-sm text-green-800 dark:text-green-200">
          <strong>Try anything!</strong> Enter any asset name, even new tokens or uncommon symbols. 
          Our AI will provide intelligent analysis using the best available data and market patterns.
        </p>
      </div>
    </div>
  );
};

export default AssetInput;