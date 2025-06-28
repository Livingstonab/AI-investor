import React from 'react';
import { Italic as Crystal, TrendingUp, AlertTriangle } from 'lucide-react';
import { TechnicalIndicators } from '../services/marketApi';

interface PriceForecastProps {
  asset: string;
  currentPrice: number;
  technicalIndicators: TechnicalIndicators;
}

const PriceForecast: React.FC<PriceForecastProps> = ({ 
  asset, 
  currentPrice, 
  technicalIndicators 
}) => {
  // Generate forecasts based on technical indicators
  const generateForecast = (days: number) => {
    const volatility = Math.abs(technicalIndicators.macd) / 100 + 0.02;
    const trend = technicalIndicators.rsi > 50 ? 1 : -1;
    
    const baseChange = trend * volatility * days * 0.1;
    const target = currentPrice * (1 + baseChange);
    const range = currentPrice * volatility * days * 0.05;
    
    return {
      low: Math.max(0, target - range),
      high: target + range,
      target: target
    };
  };

  const forecast7d = generateForecast(7);
  const forecast30d = generateForecast(30);
  
  // Confidence based on technical indicator alignment
  const confidence = Math.min(95, Math.max(45, 
    65 + (technicalIndicators.rsi > 30 && technicalIndicators.rsi < 70 ? 10 : -10) +
    (Math.abs(technicalIndicators.macd) < 5 ? 10 : -5)
  ));

  const getChangeColor = (current: number, target: number) => {
    return target > current ? 'text-green-600' : target < current ? 'text-red-600' : 'text-gray-600';
  };

  const getChangePercent = (current: number, target: number) => {
    return ((target - current) / current * 100).toFixed(1);
  };

  const getForecastFactors = () => {
    const factors = [];
    
    if (technicalIndicators.rsi > 70) {
      factors.push({ icon: AlertTriangle, text: 'Overbought conditions may limit upside', type: 'warning' });
    } else if (technicalIndicators.rsi < 30) {
      factors.push({ icon: TrendingUp, text: 'Oversold conditions suggest potential recovery', type: 'positive' });
    } else {
      factors.push({ icon: TrendingUp, text: 'Balanced RSI indicates stable momentum', type: 'positive' });
    }
    
    if (technicalIndicators.macd > 0) {
      factors.push({ icon: TrendingUp, text: 'MACD shows positive momentum', type: 'positive' });
    } else {
      factors.push({ icon: AlertTriangle, text: 'MACD indicates bearish momentum', type: 'warning' });
    }
    
    if (currentPrice > technicalIndicators.sma20) {
      factors.push({ icon: TrendingUp, text: 'Price above 20-day moving average', type: 'positive' });
    } else {
      factors.push({ icon: AlertTriangle, text: 'Price below 20-day moving average', type: 'warning' });
    }
    
    return factors;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Crystal className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Price Forecast</h3>
        <div className="flex items-center space-x-1 ml-auto">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">AI-Generated</span>
        </div>
      </div>

      {/* Current Price */}
      <div className="text-center mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Price</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">${currentPrice.toFixed(2)}</div>
      </div>

      {/* Forecasts */}
      <div className="space-y-6 mb-6">
        {/* 7-Day Forecast */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-white">7-Day Forecast</h4>
            <span className={`font-semibold ${getChangeColor(currentPrice, forecast7d.target)}`}>
              {getChangePercent(currentPrice, forecast7d.target) > '0' ? '+' : ''}{getChangePercent(currentPrice, forecast7d.target)}%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Low</div>
              <div className="font-semibold text-red-600">${forecast7d.low.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Target</div>
              <div className={`font-semibold ${getChangeColor(currentPrice, forecast7d.target)}`}>
                ${forecast7d.target.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">High</div>
              <div className="font-semibold text-green-600">${forecast7d.high.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* 30-Day Forecast */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-white">30-Day Forecast</h4>
            <span className={`font-semibold ${getChangeColor(currentPrice, forecast30d.target)}`}>
              {getChangePercent(currentPrice, forecast30d.target) > '0' ? '+' : ''}{getChangePercent(currentPrice, forecast30d.target)}%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Low</div>
              <div className="font-semibold text-red-600">${forecast30d.low.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Target</div>
              <div className={`font-semibold ${getChangeColor(currentPrice, forecast30d.target)}`}>
                ${forecast30d.target.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">High</div>
              <div className="font-semibold text-green-600">${forecast30d.high.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Level */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Forecast Confidence</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
      </div>

      {/* Key Factors */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Forecast Factors</h5>
        <div className="space-y-2">
          {getForecastFactors().map((factor, index) => {
            const Icon = factor.icon;
            return (
              <div key={index} className="flex items-center space-x-2">
                <Icon className={`h-4 w-4 ${
                  factor.type === 'positive' ? 'text-green-600' : 'text-yellow-600'
                }`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">{factor.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Disclaimer:</strong> Price forecasts are speculative and based on technical analysis. 
            Actual market conditions may vary significantly from predictions. Use for educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceForecast;