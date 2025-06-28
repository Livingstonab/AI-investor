import React from 'react';
import { Activity, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { TechnicalIndicators as TechData } from '../services/marketApi';

interface TechnicalIndicatorsProps {
  indicators: TechData;
  currentPrice: number;
  asset: string;
}

const TechnicalIndicators: React.FC<TechnicalIndicatorsProps> = ({ indicators, currentPrice, asset }) => {
  const getRSISignal = (rsi: number) => {
    if (rsi > 70) return { signal: 'Overbought', color: 'text-red-600', description: 'Could be due for correction' };
    if (rsi < 30) return { signal: 'Oversold', color: 'text-green-600', description: 'Potential buying opportunity' };
    return { signal: 'Neutral', color: 'text-gray-600', description: 'Balanced momentum' };
  };

  const getMACDSignal = (macd: number) => {
    if (macd > 2) return { signal: 'Bullish', color: 'text-green-600', description: 'Strong upward momentum' };
    if (macd < -2) return { signal: 'Bearish', color: 'text-red-600', description: 'Strong downward momentum' };
    return { signal: 'Neutral', color: 'text-gray-600', description: 'Weak momentum signals' };
  };

  const getMASignal = (price: number, ma: number, period: number) => {
    const diff = ((price - ma) / ma) * 100;
    if (diff > 2) return { signal: 'Above', color: 'text-green-600', description: `${diff.toFixed(1)}% above ${period}-day average` };
    if (diff < -2) return { signal: 'Below', color: 'text-red-600', description: `${Math.abs(diff).toFixed(1)}% below ${period}-day average` };
    return { signal: 'Near', color: 'text-gray-600', description: `Close to ${period}-day average` };
  };

  const rsiSignal = getRSISignal(indicators.rsi);
  const macdSignal = getMACDSignal(indicators.macd);
  const sma20Signal = getMASignal(currentPrice, indicators.sma20, 20);
  const sma50Signal = getMASignal(currentPrice, indicators.sma50, 50);

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'Bullish':
      case 'Above':
      case 'Oversold':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'Bearish':
      case 'Below':
      case 'Overbought':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Technical Indicators</h3>
        {indicators.isEstimated && (
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
            ESTIMATED
          </span>
        )}
      </div>

      {/* Estimation Notice */}
      {indicators.isEstimated && (
        <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {indicators.estimationNote || 'Technical indicators estimated from similar asset patterns and market trends.'}
            </p>
          </div>
        </div>
      )}

      {/* Indicators Grid */}
      <div className="space-y-6">
        {/* RSI */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {getSignalIcon(rsiSignal.signal)}
              <h4 className="font-semibold text-gray-900 dark:text-white">Relative Strength Index (RSI)</h4>
            </div>
            <span className={`font-bold text-lg ${rsiSignal.color}`}>{indicators.rsi.toFixed(1)}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${indicators.rsi}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className={`font-medium ${rsiSignal.color}`}>{rsiSignal.signal}</span> — {rsiSignal.description}
          </p>
        </div>

        {/* MACD */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {getSignalIcon(macdSignal.signal)}
              <h4 className="font-semibold text-gray-900 dark:text-white">MACD</h4>
            </div>
            <span className={`font-bold text-lg ${macdSignal.color}`}>{indicators.macd.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className={`font-medium ${macdSignal.color}`}>{macdSignal.signal}</span> — {macdSignal.description}
          </p>
        </div>

        {/* Moving Averages */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getSignalIcon(sma20Signal.signal)}
                <h4 className="font-semibold text-gray-900 dark:text-white">20-Day MA</h4>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">${indicators.sma20.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className={`font-medium ${sma20Signal.color}`}>{sma20Signal.signal}</span> — {sma20Signal.description}
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getSignalIcon(sma50Signal.signal)}
                <h4 className="font-semibold text-gray-900 dark:text-white">50-Day MA</h4>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">${indicators.sma50.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className={`font-medium ${sma50Signal.color}`}>{sma50Signal.signal}</span> — {sma50Signal.description}
            </p>
          </div>
        </div>

        {/* Bollinger Bands */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Bollinger Bands</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Upper</div>
              <div className="font-semibold text-gray-900 dark:text-white">${indicators.bollinger.upper.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Middle</div>
              <div className="font-semibold text-blue-600">${indicators.bollinger.middle.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lower</div>
              <div className="font-semibold text-gray-900 dark:text-white">${indicators.bollinger.lower.toFixed(2)}</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Current price: ${currentPrice.toFixed(2)} — 
            {currentPrice > indicators.bollinger.upper ? ' Above upper band (potential resistance)' :
             currentPrice < indicators.bollinger.lower ? ' Below lower band (potential support)' :
             ' Within normal trading range'}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technical Summary</h5>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Technical indicators show {rsiSignal.signal.toLowerCase()} RSI conditions, {macdSignal.signal.toLowerCase()} MACD momentum, 
          and price is {sma20Signal.signal.toLowerCase()} the 20-day moving average. 
          {indicators.isEstimated && ' Analysis based on estimated data and similar asset patterns.'}
        </p>
      </div>
    </div>
  );
};

export default TechnicalIndicators;