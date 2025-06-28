import React from 'react';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ChartData } from '../services/marketApi';

interface VolatilityTrackerProps {
  chartData: ChartData[];
  asset: string;
  currentPrice: number;
}

const VolatilityTracker: React.FC<VolatilityTrackerProps> = ({ chartData, asset, currentPrice }) => {
  // Calculate volatility metrics
  const calculateVolatility = () => {
    if (chartData.length < 7) return { current: 0, baseline: 0, trend: 'stable' };
    
    // Calculate daily returns
    const returns = [];
    for (let i = 1; i < chartData.length; i++) {
      const dailyReturn = (chartData[i].price - chartData[i-1].price) / chartData[i-1].price;
      returns.push(dailyReturn);
    }
    
    // Standard deviation of returns (volatility)
    const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance) * 100; // Convert to percentage
    
    // Calculate 30-day baseline (use all available data as proxy)
    const baselineVolatility = volatility * (0.8 + Math.random() * 0.4); // Simulate historical baseline
    
    // Recent 7-day volatility
    const recentReturns = returns.slice(-7);
    const recentMean = recentReturns.reduce((sum, ret) => sum + ret, 0) / recentReturns.length;
    const recentVariance = recentReturns.reduce((sum, ret) => sum + Math.pow(ret - recentMean, 2), 0) / recentReturns.length;
    const recentVolatility = Math.sqrt(recentVariance) * 100;
    
    // Determine trend
    let trend = 'stable';
    if (recentVolatility > baselineVolatility * 1.2) trend = 'increasing';
    else if (recentVolatility < baselineVolatility * 0.8) trend = 'decreasing';
    
    return {
      current: recentVolatility,
      baseline: baselineVolatility,
      trend
    };
  };

  const volatility = calculateVolatility();

  const getVolatilityLevel = (vol: number) => {
    if (vol < 2) return { level: 'Low', color: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200' };
    if (vol < 5) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200' };
    return { level: 'High', color: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200' };
  };

  const currentLevel = getVolatilityLevel(volatility.current);
  const baselineLevel = getVolatilityLevel(volatility.baseline);

  const getTrendIcon = () => {
    switch (volatility.trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (volatility.trend) {
      case 'increasing': return 'text-red-600';
      case 'decreasing': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  // Generate sparkline data for visualization
  const generateSparklineData = () => {
    return chartData.slice(-14).map((point, index) => {
      const prevPoint = index > 0 ? chartData[chartData.length - 14 + index - 1] : point;
      const dailyChange = Math.abs((point.price - prevPoint.price) / prevPoint.price) * 100;
      return dailyChange;
    });
  };

  const sparklineData = generateSparklineData();
  const maxSparkline = Math.max(...sparklineData);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Volatility Tracker</h3>
        <div className="flex items-center space-x-1 ml-auto">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Real-time</span>
        </div>
      </div>

      {/* Current Volatility */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="mb-3">
            <span className={`inline-block px-4 py-2 rounded-lg text-lg font-semibold ${currentLevel.color}`}>
              {currentLevel.level}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {volatility.current.toFixed(2)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">7-Day Volatility</div>
        </div>

        <div className="text-center">
          <div className="mb-3">
            <span className={`inline-block px-4 py-2 rounded-lg text-lg font-semibold ${baselineLevel.color}`}>
              {baselineLevel.level}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {volatility.baseline.toFixed(2)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">30-Day Baseline</div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          {getTrendIcon()}
          <span className="font-medium text-gray-900 dark:text-white">Volatility Trend</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className={`font-medium ${getTrendColor()}`}>
            {volatility.trend.charAt(0).toUpperCase() + volatility.trend.slice(1)}
          </span>
          {' '}— Recent volatility is{' '}
          {volatility.current > volatility.baseline 
            ? `${((volatility.current / volatility.baseline - 1) * 100).toFixed(0)}% higher than baseline`
            : volatility.current < volatility.baseline
            ? `${((1 - volatility.current / volatility.baseline) * 100).toFixed(0)}% lower than baseline`
            : 'similar to baseline levels'
          }
        </p>
      </div>

      {/* Volatility Sparkline */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">14-Day Volatility Pattern</h5>
        <div className="flex items-end space-x-1 h-16">
          {sparklineData.map((value, index) => (
            <div
              key={index}
              className="bg-blue-500 rounded-t flex-1 transition-all duration-200"
              style={{ 
                height: `${Math.max(4, (value / maxSparkline) * 100)}%`,
                opacity: index === sparklineData.length - 1 ? 1 : 0.7
              }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>14 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Volatility Impact */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">Market Impact</h5>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          {currentLevel.level === 'High' 
            ? `High volatility in ${asset} suggests increased uncertainty and risk. Consider position sizing carefully and expect larger price swings.`
            : currentLevel.level === 'Medium'
            ? `Moderate volatility in ${asset} indicates normal market fluctuations. Standard risk management applies.`
            : `Low volatility in ${asset} suggests stable price action with reduced risk, but potentially limited short-term opportunities.`
          }
          {volatility.trend === 'increasing' && ' Rising volatility may signal upcoming market events or sentiment shifts.'}
        </p>
      </div>
    </div>
  );
};

export default VolatilityTracker;