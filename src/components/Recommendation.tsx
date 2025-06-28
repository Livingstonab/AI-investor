import React from 'react';
import { Target, TrendingUp, Minus, TrendingDown, Info } from 'lucide-react';

interface RecommendationProps {
  asset: string;
  riskTolerance: string;
  recommendation: 'buy' | 'hold' | 'sell';
  confidence: number;
  reasons: string[];
  dataQuality?: 'complete' | 'partial' | 'estimated';
}

const Recommendation: React.FC<RecommendationProps> = ({ 
  asset, 
  riskTolerance, 
  recommendation, 
  confidence, 
  reasons,
  dataQuality = 'complete'
}) => {
  const getRecommendationColor = (rec: string) => {
    switch (rec.toLowerCase()) {
      case 'buy':
        return 'bg-green-500 text-white border-green-500';
      case 'hold':
        return 'bg-yellow-500 text-white border-yellow-500';
      case 'sell':
        return 'bg-red-500 text-white border-red-500';
      default:
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec.toLowerCase()) {
      case 'buy':
        return <TrendingUp className="h-6 w-6" />;
      case 'hold':
        return <Minus className="h-6 w-6" />;
      case 'sell':
        return <TrendingDown className="h-6 w-6" />;
      default:
        return <Target className="h-6 w-6" />;
    }
  };

  const getExplanation = () => {
    const risk = riskTolerance.toLowerCase();
    const dataNote = dataQuality === 'estimated' ? ' (based on estimated data and similar assets)' : '';
    
    switch (recommendation.toLowerCase()) {
      case 'buy':
        return `Strong fundamentals and positive market sentiment make this an attractive opportunity for ${risk} investors${dataNote}. Current market conditions provide a favorable entry point.`;
      case 'hold':
        return `Stable performance with mixed signals suggest maintaining current position${dataNote}. Monitor market developments before making significant changes.`;
      case 'sell':
        return `Risk factors and negative indicators suggest reducing exposure${dataNote}. Consider taking profits or limiting potential losses.`;
      default:
        return `Recommendation based on current market analysis and your risk profile${dataNote}.`;
    }
  };

  const factors = [
    { factor: 'Technical Analysis', weight: 25, positive: recommendation === 'buy' },
    { factor: 'News Sentiment', weight: 20, positive: recommendation !== 'sell' },
    { factor: 'Market Trends', weight: 25, positive: recommendation === 'buy' },
    { factor: 'Risk Assessment', weight: 30, positive: recommendation !== 'sell' }
  ];

  const getConfidenceColor = () => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-blue-500';
    if (confidence >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Recommendation</h3>
        <div className="flex items-center space-x-1 ml-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Real-time</span>
        </div>
      </div>

      {/* Data Quality Notice */}
      {dataQuality === 'estimated' && (
        <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This recommendation is based on estimated data and analysis of similar assets. 
              Confidence level has been adjusted accordingly.
            </p>
          </div>
        </div>
      )}

      {/* Main Recommendation */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl border-2 ${getRecommendationColor(recommendation)} mb-4`}>
          {getRecommendationIcon(recommendation)}
          <span className="text-2xl font-bold">{recommendation.toUpperCase()}</span>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Confidence Level {dataQuality === 'estimated' && '(Adjusted for Estimated Data)'}
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getConfidenceColor()}`}
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{confidence}%</span>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {getExplanation()}
        </p>
      </div>

      {/* Why This Recommendation */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Why this recommendation?</h4>
        <ul className="space-y-2">
          {reasons.map((reason, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contributing Factors */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Analysis Factors</h4>
        <div className="space-y-3">
          {factors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${factor.positive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{factor.factor}</span>
                {dataQuality === 'estimated' && factor.factor === 'Technical Analysis' && (
                  <span className="text-xs text-blue-600 dark:text-blue-400">(estimated)</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{factor.weight}%</span>
                <div className={`text-xs px-2 py-1 rounded ${
                  factor.positive 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {factor.positive ? 'Positive' : 'Negative'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Market Conditions */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">Current Market Conditions</h5>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Market sentiment is {recommendation === 'buy' ? 'favorable' : recommendation === 'sell' ? 'cautious' : 'mixed'} 
          with {recommendation === 'buy' ? 'strong momentum indicators' : recommendation === 'sell' ? 'concerning signals' : 'balanced technical readings'}. 
          Economic factors are {recommendation === 'buy' ? 'supportive' : 'creating uncertainty'} for this asset class.
          {dataQuality === 'estimated' && ' Analysis includes estimated data where live information is limited.'}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Disclaimer:</strong> This recommendation is for educational purposes only and should not be considered financial advice. 
          {dataQuality === 'estimated' && ' Some analysis is based on estimated data and similar asset patterns. '}
          Always conduct your own research and consult with financial professionals before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default Recommendation;