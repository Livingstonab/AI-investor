import React from 'react';
import { Newspaper, TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';
import { NewsItem } from '../services/marketApi';

interface NewsSummaryProps {
  news: NewsItem[];
  asset: string;
}

const NewsSummary: React.FC<NewsSummaryProps> = ({ news, asset }) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'negative':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-800';
    }
  };

  const sentimentCounts = news.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const overallSentiment = sentimentCounts.positive > sentimentCounts.negative 
    ? 'Positive' 
    : sentimentCounts.negative > sentimentCounts.positive 
    ? 'Negative' 
    : 'Mixed';

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Newspaper className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market News</h3>
        <div className="flex items-center space-x-1 ml-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
        </div>
      </div>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{sentimentCounts.positive || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Positive</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{sentimentCounts.neutral || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Neutral</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{sentimentCounts.negative || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Negative</div>
        </div>
      </div>

      {/* News Items */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {news.map((item, index) => (
          <div
            key={index}
            className={`border-l-4 p-4 rounded-r-lg ${getSentimentColor(item.sentiment)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getSentimentIcon(item.sentiment)}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.source} • {formatTimeAgo(item.publishedAt)}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1 leading-tight">{item.headline}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>News Sentiment:</strong> {overallSentiment} - 
          Recent news shows {overallSentiment === 'Positive' ? 
          'favorable market conditions and investor confidence' : 
          overallSentiment === 'Negative' ? 
          'some concerns but balanced coverage' : 
          'balanced coverage with mixed signals'}.
        </p>
      </div>
    </div>
  );
};

export default NewsSummary;