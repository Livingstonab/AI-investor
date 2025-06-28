import React from 'react';
import { PieChart, Users, Target } from 'lucide-react';
import { MarketData } from '../services/marketApi';

interface PortfolioFitProps {
  asset: string;
  riskTolerance: string;
  marketData: MarketData;
  riskScore: 'low' | 'medium' | 'high';
}

const PortfolioFit: React.FC<PortfolioFitProps> = ({ 
  asset, 
  riskTolerance, 
  marketData, 
  riskScore 
}) => {
  // Calculate diversification score based on asset type and market cap
  const getDiversificationScore = () => {
    let score = 50; // Base score
    
    // Asset type diversification
    if (marketData.type === 'crypto') score += 20; // High diversification
    if (marketData.type === 'forex') score += 15; // Medium diversification
    if (marketData.type === 'stock') score += 10; // Lower diversification
    
    // Market cap consideration
    if (marketData.marketCap && marketData.marketCap > 1e12) score += 15; // Large cap
    else if (marketData.marketCap && marketData.marketCap > 1e11) score += 10; // Mid cap
    else score += 5; // Small cap
    
    return Math.min(100, score);
  };

  const diversificationScore = getDiversificationScore();
  
  // Calculate recommended portfolio weight
  const getPortfolioWeight = () => {
    let weight = 10; // Base weight
    
    if (riskTolerance === 'aggressive') weight += 10;
    else if (riskTolerance === 'conservative') weight -= 5;
    
    if (riskScore === 'low') weight += 5;
    else if (riskScore === 'high') weight -= 5;
    
    if (marketData.type === 'crypto') weight = Math.min(weight, 15); // Cap crypto allocation
    
    return Math.max(3, Math.min(25, weight));
  };

  const portfolioWeight = getPortfolioWeight();

  const getRiskProfile = () => {
    switch (riskTolerance) {
      case 'conservative':
        return {
          name: 'Conservative Investor',
          description: 'Prefers stability and capital preservation',
          suitability: riskScore === 'low' ? 'Excellent Fit' : riskScore === 'medium' ? 'Moderate Fit' : 'Poor Fit',
          recommendation: `Consider as a ${riskScore === 'low' ? 'core' : 'small'} holding with ${portfolioWeight}% allocation`
        };
      case 'moderate':
        return {
          name: 'Moderate Investor',
          description: 'Balanced approach to risk and growth',
          suitability: 'Good Fit',
          recommendation: `Suitable for balanced portfolio with ${portfolioWeight}% allocation`
        };
      case 'aggressive':
        return {
          name: 'Aggressive Investor',
          description: 'Willing to accept higher risk for growth potential',
          suitability: riskScore === 'high' ? 'Excellent Fit' : 'Good Fit',
          recommendation: `Can be part of growth allocation with up to ${portfolioWeight}% maximum`
        };
      default:
        return {
          name: 'Balanced Investor',
          description: 'Moderate risk approach',
          suitability: 'Good Fit',
          recommendation: 'Consider balanced allocation'
        };
    }
  };

  const profile = getRiskProfile();

  const getSuitabilityColor = (suitability: string) => {
    if (suitability.includes('Excellent')) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    if (suitability.includes('Good')) return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
    if (suitability.includes('Moderate')) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
  };

  const portfolioTypes = [
    {
      type: 'Beginner Portfolio',
      fit: marketData.type === 'stock' && riskScore === 'low' ? 'Excellent' : 
           marketData.type === 'stock' ? 'Good' : 'Moderate',
      description: marketData.type === 'stock' ? 'Good for learning with manageable risk' : 'Consider after gaining experience',
      allocation: `${Math.max(3, portfolioWeight - 5)}-${portfolioWeight}%`
    },
    {
      type: 'Growth Portfolio',
      fit: riskScore === 'medium' || riskScore === 'high' ? 'Excellent' : 'Good',
      description: 'Aligns with growth objectives and risk tolerance',
      allocation: `${portfolioWeight}-${portfolioWeight + 5}%`
    },
    {
      type: 'Income Portfolio',
      fit: marketData.type === 'stock' && riskScore === 'low' ? 'Good' : 'Low',
      description: marketData.type === 'stock' ? 'May provide dividend potential' : 'Limited income generation',
      allocation: `${Math.max(2, portfolioWeight - 7)}-${Math.max(5, portfolioWeight - 3)}%`
    },
    {
      type: 'Balanced Portfolio',
      fit: 'Good',
      description: 'Provides diversification benefits across asset classes',
      allocation: `${Math.max(5, portfolioWeight - 2)}-${portfolioWeight + 3}%`
    }
  ];

  const getFitColor = (fit: string) => {
    switch (fit.toLowerCase()) {
      case 'excellent':
        return 'text-green-600 dark:text-green-400';
      case 'good':
      case 'moderate':
        return 'text-blue-600 dark:text-blue-400';
      case 'low':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <PieChart className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio Fit Analysis</h3>
      </div>

      {/* Risk Profile Match */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">{profile.name}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSuitabilityColor(profile.suitability)}`}>
            {profile.suitability}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{profile.description}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{profile.recommendation}</p>
      </div>

      {/* Diversification Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Diversification Impact</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{diversificationScore}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${diversificationScore}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {diversificationScore >= 70 
            ? 'Adds significant diversification to your portfolio'
            : diversificationScore >= 50
            ? 'Provides moderate diversification benefits'
            : 'Limited diversification impact'
          }
        </p>
      </div>

      {/* Portfolio Type Fit */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Portfolio Type Compatibility</h4>
        <div className="space-y-3">
          {portfolioTypes.map((type, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">{type.type}</span>
                  <span className={`text-sm font-medium ${getFitColor(type.fit)}`}>{type.fit}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{type.allocation}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">suggested</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asset-Specific Considerations */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
          {marketData.type.charAt(0).toUpperCase() + marketData.type.slice(1)} Considerations
        </h5>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          {marketData.type === 'stock' && 
            'Stocks provide ownership in companies and potential for dividends. Consider sector exposure and company fundamentals.'
          }
          {marketData.type === 'crypto' && 
            'Cryptocurrencies offer high growth potential but with increased volatility. Limit allocation to manage risk.'
          }
          {marketData.type === 'forex' && 
            'Forex pairs provide currency exposure and hedging opportunities. Consider economic factors and interest rate differentials.'
          }
        </p>
      </div>

      {/* Recommended Action */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="flex items-start space-x-2">
          <Target className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Portfolio Recommendation:</strong> Based on your {riskTolerance} risk tolerance and this asset's 
            {' '}{riskScore} risk profile, consider allocating {portfolioWeight}% of your portfolio to this position. 
            This provides balanced exposure while maintaining appropriate risk management for your investment goals.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioFit;