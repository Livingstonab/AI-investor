import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Info } from 'lucide-react';
import { ChartData } from '../services/marketApi';

interface TrendChartProps {
  chartData: ChartData[];
  asset: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ chartData, asset }) => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d'>('7d');

  // Check if data is estimated
  const hasEstimatedData = chartData.some(item => item.isEstimated);

  // Filter data based on timeframe
  const filteredData = timeframe === '7d' 
    ? chartData.slice(-7).map((item, index) => ({
        ...item,
        label: `Day ${index + 1}`,
        date: new Date(item.timestamp).toLocaleDateString()
      }))
    : chartData.map((item, index) => ({
        ...item,
        label: `${Math.floor(index / 7) + 1}w`,
        date: new Date(item.timestamp).toLocaleDateString()
      }));

  const currentPrice = filteredData[filteredData.length - 1]?.price || 0;
  const previousPrice = filteredData[0]?.price || 0;
  const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isPositive = changePercent >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Price Trend</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              timeframe === '7d'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
              timeframe === '30d'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Data Quality Notice */}
      {hasEstimatedData && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Chart data estimated from similar asset patterns and market trends. 
              Actual price movements may vary.
            </p>
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}% 
          <span className="text-gray-600 dark:text-gray-400 font-normal ml-2">
            ({timeframe === '7d' ? 'Past 7 days' : 'Past 30 days'})
            {hasEstimatedData && ' - Estimated'}
          </span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="label" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  const dataPoint = payload[0].payload;
                  return `${dataPoint.date}${dataPoint.isEstimated ? ' (Estimated)' : ''}`;
                }
                return label;
              }}
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#f9fafb'
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={hasEstimatedData ? "#60a5fa" : "#00bfff"}
              strokeWidth={3}
              strokeDasharray={hasEstimatedData ? "5 5" : "0"}
              dot={{ fill: hasEstimatedData ? "#60a5fa" : "#00bfff", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: hasEstimatedData ? "#60a5fa" : "#00bfff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Real-time indicator */}
      <div className="mt-4 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full animate-pulse ${hasEstimatedData ? 'bg-blue-500' : 'bg-green-500'}`}></div>
          <span>{hasEstimatedData ? 'Estimated data' : 'Real-time data'}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;