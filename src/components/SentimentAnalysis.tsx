import React from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { NewsItem } from '../services/marketApi';

interface SentimentAnalysisProps {
  news: NewsItem[];
  asset: string;
  marketData: any;
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ news, asset, marketData }) => {
  // Calculate sentiment aggregation score (0-100)
  const calculateSentimentScore = () => {
    if (news.length === 0) return 50; // Neutral default
    
    const sentimentValues = news.map(item => {
      switch (item.sentiment) {
        case 'positive': return 80;
        case 'negative': return 20;
        default: return 50;
      }
    });
    
    const average = sentimentValues.reduce((sum, val) => sum + val, 0) / sentimentValues.length;
    
    // Add some market momentum influence
    const momentumBoost = marketData.changePercent24h > 0 ? 5 : -5;
    
    return Math.max(0, Math.min(100, Math.round(average + momentumBoost)));
  };

  const sentimentScore = calculateSentimentScore();
  
  const getSentimentLabel = (score: number) => {
    if (score <= 40) return { label: 'Negative', color: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200' };
    if (score <= 60) return { label: 'Neutral', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200' };
    return { label: 'Positive', color: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200' };
  };

  const sentiment = getSentimentLabel(sentimentScore);

  const getSentimentIcon = () => {
    if (sentimentScore <= 40) return <TrendingDown className="h-5 w-5 text-red-600" />;
    if (sentimentScore <= 60) return <Minus className="h-5 w-5 text-yellow-600" />;
    return <TrendingUp className="h-5 w-5 text-green-600" />;
  };

  const getScoreColor = () => {
    if (sentimentScore <= 40) return 'bg-red-500';
    if (sentimentScore <= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sentiment Analysis</h3>
        <div className="flex items-center space-x-1 ml-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Last 48 Hours</span>
        </div>
      </div>

      {/* Sentiment Score Display */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          {getSentimentIcon()}
          <span className={`px-4 py-2 rounded-full text-lg font-semibold ${sentiment.color}`}>
            {sentiment.label}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{sentimentScore}/100</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${getScoreColor()}`}
              style={{ width: `${sentimentScore}%` }}
            ></div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Based on recent sentiment analysis (last 48 hours), overall mood around {asset} is: 
          <strong className="text-gray-900 dark:text-white"> {sentiment.label} (Score: {sentimentScore})</strong>
        </p>
      </div>

      {/* Sentiment Breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{news.filter(n => n.sentiment === 'positive').length}</div>
          <div className="text-sm text-green-700 dark:text-green-300">Positive</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{news.filter(n => n.sentiment === 'neutral').length}</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Neutral</div>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{news.filter(n => n.sentiment === 'negative').length}</div>
          <div className="text-sm text-red-700 dark:text-red-300">Negative</div>
        </div>
      </div>

      {/* Market Impact */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">Market Impact Assessment</h5>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          {sentimentScore > 60 
            ? `Strong positive sentiment is likely supporting ${asset}'s price momentum and investor confidence. This favorable environment may continue to drive demand.`
            : sentimentScore < 40
            ? `Negative sentiment is creating headwinds for ${asset}, potentially limiting upside and increasing volatility. Monitor for sentiment shifts.`
            : `Mixed sentiment suggests a balanced market view of ${asset}. Price movements may be driven more by technical factors than news sentiment.`
          }
        </p>
      </div>
    </div>
  );
};

export default SentimentAnalysis;