import React from 'react';
import { Shield, AlertTriangle, Activity } from 'lucide-react';
import { TechnicalIndicators } from '../services/marketApi';

interface RiskAnalysisProps {
  asset: string;
  riskTolerance: string;
  riskScore: 'low' | 'medium' | 'high';
  technicalIndicators: TechnicalIndicators;
}

const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ 
  asset, 
  riskTolerance, 
  riskScore, 
  technicalIndicators 
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getToleranceMatch = () => {
    const risk = riskScore.toLowerCase();
    switch (riskTolerance) {
      case 'conservative':
        return risk === 'low' ? 'Excellent Match' : risk === 'medium' ? 'Moderate Match' : 'Poor Match';
      case 'moderate':
        return risk === 'medium' ? 'Excellent Match' : 'Good Match';
      case 'aggressive':
        return risk === 'high' ? 'Excellent Match' : risk === 'medium' ? 'Good Match' : 'Moderate Match';
      default:
        return 'Good Match';
    }
  };

  const getMatchColor = (match: string) => {
    if (match.includes('Excellent')) return 'text-green-600 dark:text-green-400';
    if (match.includes('Good')) return 'text-blue-600 dark:text-blue-400';
    if (match.includes('Moderate')) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Calculate volatility score based on technical indicators
  const volatilityScore = Math.min(100, Math.max(0, technicalIndicators.rsi));
  const correlationScore = 75; // Mock correlation with market

  const getRiskFactors = () => {
    const factors = [];
    
    if (technicalIndicators.rsi > 70) {
      factors.push('Overbought conditions detected');
    } else if (technicalIndicators.rsi < 30) {
      factors.push('Oversold conditions present');
    }
    
    if (Math.abs(technicalIndicators.macd) > 5) {
      factors.push('High momentum divergence');
    }
    
    if (riskScore === 'high') {
      factors.push('Elevated price volatility');
      factors.push('Market uncertainty factors');
    }
    
    return factors.length > 0 ? factors : ['Normal market conditions'];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Risk Analysis</h3>
      </div>

      {/* Risk Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Risk Score</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskScore)}`}>
            {riskScore.charAt(0).toUpperCase() + riskScore.slice(1)} Risk
          </span>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">RSI Volatility</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{technicalIndicators.rsi.toFixed(1)}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${technicalIndicators.rsi}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Market Correlation</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{correlationScore}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${correlationScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Risk Tolerance Match */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Tolerance Match</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Your Profile: {riskTolerance.charAt(0).toUpperCase() + riskTolerance.slice(1)}
          </span>
          <span className={`text-sm font-medium ${getMatchColor(getToleranceMatch())}`}>
            {getToleranceMatch()}
          </span>
        </div>
      </div>

      {/* Technical Indicators */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Technical Indicators</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">RSI:</span>
            <span className="font-medium text-gray-900 dark:text-white">{technicalIndicators.rsi.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">MACD:</span>
            <span className="font-medium text-gray-900 dark:text-white">{technicalIndicators.macd.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">SMA 20:</span>
            <span className="font-medium text-gray-900 dark:text-white">${technicalIndicators.sma20.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">SMA 50:</span>
            <span className="font-medium text-gray-900 dark:text-white">${technicalIndicators.sma50.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Key Risk Factors:</strong>
            <ul className="mt-1 space-y-1">
              {getRiskFactors().map((factor, index) => (
                <li key={index}>• {factor}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;