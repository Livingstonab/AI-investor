import React, { useState } from 'react';
import AssetInput from './AssetInput';
import AssetOverview from './AssetOverview';
import TrendChart from './TrendChart';
import NewsSummary from './NewsSummary';
import ProsAndCons from './ProsAndCons';
import RiskAnalysis from './RiskAnalysis';
import Recommendation from './Recommendation';
import MacroMarketCheck from './MacroMarketCheck';
import PriceForecast from './PriceForecast';
import PortfolioFit from './PortfolioFit';
import SentimentAnalysis from './SentimentAnalysis';
import TechnicalIndicators from './TechnicalIndicators';
import FundamentalScore from './FundamentalScore';
import VolatilityTracker from './VolatilityTracker';
import { generateAnalysis, AnalysisResult } from '../services/marketApi';
import { userAnalytics } from '../services/userAnalytics';
import { AlertTriangle, Info } from 'lucide-react';

const AssetAnalysis = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [riskTolerance, setRiskTolerance] = useState<string>('');

  const handleAnalysis = async (asset: string, symbol: string, riskToleranceValue: string) => {
    setIsLoading(true);
    setError(null);
    setRiskTolerance(riskToleranceValue);
    
    try {
      const result = await generateAnalysis(symbol, riskToleranceValue);
      setAnalysisData(result);
      
      // Save to user analytics
      userAnalytics.saveAnalysis({
        symbol: result.marketData.symbol,
        name: result.marketData.name,
        type: result.marketData.type,
        recommendation: result.recommendation,
        riskTolerance: riskToleranceValue,
        price: result.marketData.price
      });
    } catch (err) {
      // This should never happen with the new fallback system, but just in case
      setError('Unable to analyze this asset. Please try a different symbol or check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Asset Analysis Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Get comprehensive AI-powered investment insights for any stock, cryptocurrency, or forex pair</p>
        </div>

        <AssetInput onAnalyze={handleAnalysis} isLoading={isLoading} />

        {error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Analyzing real-time market data and generating insights...</p>
          </div>
        )}

        {analysisData && !isLoading && (
          <div className="mt-8 space-y-8">
            {/* Data Quality Notice */}
            {analysisData.fallbackUsed && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 dark:text-blue-200 font-medium">
                      {analysisData.marketData.estimationNote}
                    </p>
                    {analysisData.similarAssets && (
                      <p className="text-blue-700 dark:text-blue-300 text-sm mt-2">
                        You might also want to explore: {analysisData.similarAssets.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <AssetOverview marketData={analysisData.marketData} />
            
            {/* Enhanced Analysis Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              <TrendChart chartData={analysisData.chartData} asset={analysisData.marketData.name} />
              <SentimentAnalysis 
                news={analysisData.news} 
                asset={analysisData.marketData.name}
                marketData={analysisData.marketData}
              />
            </div>

            {/* Technical Analysis Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              <TechnicalIndicators 
                indicators={analysisData.technicalIndicators}
                currentPrice={analysisData.marketData.price}
                asset={analysisData.marketData.name}
              />
              <VolatilityTracker 
                chartData={analysisData.chartData}
                asset={analysisData.marketData.name}
                currentPrice={analysisData.marketData.price}
              />
            </div>

            {/* Fundamental Analysis (Stocks Only) */}
            <FundamentalScore marketData={analysisData.marketData} />

            <div className="grid lg:grid-cols-2 gap-8">
              <NewsSummary news={analysisData.news} asset={analysisData.marketData.name} />
              <ProsAndCons 
                asset={analysisData.marketData.name} 
                recommendation={analysisData.recommendation}
                reasons={analysisData.reasons}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <RiskAnalysis 
                asset={analysisData.marketData.name} 
                riskTolerance={riskTolerance}
                riskScore={analysisData.riskScore}
                technicalIndicators={analysisData.technicalIndicators}
              />
              <MacroMarketCheck 
                asset={analysisData.marketData.name} 
                type={analysisData.marketData.type}
                marketData={analysisData.marketData}
              />
            </div>

            <Recommendation 
              asset={analysisData.marketData.name} 
              riskTolerance={riskTolerance}
              recommendation={analysisData.recommendation}
              confidence={analysisData.confidence}
              reasons={analysisData.reasons}
              dataQuality={analysisData.dataQuality}
            />

            <div className="grid lg:grid-cols-2 gap-8">
              <PriceForecast 
                asset={analysisData.marketData.name}
                currentPrice={analysisData.marketData.price}
                technicalIndicators={analysisData.technicalIndicators}
              />
              <PortfolioFit 
                asset={analysisData.marketData.name} 
                riskTolerance={riskTolerance}
                marketData={analysisData.marketData}
                riskScore={analysisData.riskScore}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetAnalysis;