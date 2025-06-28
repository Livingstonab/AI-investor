import React, { useState } from 'react';
import { GitCompare, TrendingUp, TrendingDown, Shield, Target, Loader, Info, AlertTriangle } from 'lucide-react';
import { generateAnalysis, AnalysisResult } from '../services/marketApi';

const AssetComparison = () => {
  const [asset1, setAsset1] = useState('');
  const [asset2, setAsset2] = useState('');
  const [comparison, setComparison] = useState<{
    asset1: AnalysisResult;
    asset2: AnalysisResult;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (asset1.trim() && asset2.trim()) {
      setLoading(true);
      setError(null);
      
      try {
        const [result1, result2] = await Promise.all([
          generateAnalysis(asset1.toUpperCase(), 'moderate'),
          generateAnalysis(asset2.toUpperCase(), 'moderate')
        ]);
        
        setComparison({
          asset1: result1,
          asset2: result2
        });
      } catch (err) {
        // With the new fallback system, this should never happen
        setError('Unable to compare these assets. Please try different symbols.');
      } finally {
        setLoading(false);
      }
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec.toLowerCase()) {
      case 'buy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'hold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'sell': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'high': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getBetterOption = () => {
    if (!comparison) return null;
    
    const { asset1: a1, asset2: a2 } = comparison;
    
    // Safety comparison
    const safer = a1.riskScore === 'low' && a2.riskScore !== 'low' ? a1 :
                  a2.riskScore === 'low' && a1.riskScore !== 'low' ? a2 :
                  a1.riskScore === 'medium' && a2.riskScore === 'high' ? a1 :
                  a2.riskScore === 'medium' && a1.riskScore === 'high' ? a2 : null;
    
    // Growth potential
    const higherGrowth = a1.marketData.changePercent24h > a2.marketData.changePercent24h ? a1 : a2;
    
    // Overall recommendation (considering data quality)
    let betterOverall: AnalysisResult;
    if (a1.dataQuality === 'complete' && a2.dataQuality !== 'complete') {
      betterOverall = a1;
    } else if (a2.dataQuality === 'complete' && a1.dataQuality !== 'complete') {
      betterOverall = a2;
    } else if (a1.recommendation === 'buy' && a2.recommendation !== 'buy') {
      betterOverall = a1;
    } else if (a2.recommendation === 'buy' && a1.recommendation !== 'buy') {
      betterOverall = a2;
    } else {
      betterOverall = a1.confidence > a2.confidence ? a1 : a2;
    }
    
    return { safer, higherGrowth, betterOverall };
  };

  const analysis = getBetterOption();
  const hasEstimatedData = comparison && (comparison.asset1.fallbackUsed || comparison.asset2.fallbackUsed);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Compare Assets</h1>
          <p className="text-gray-600 dark:text-gray-400">Side-by-side real-time analysis of two investment options</p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Asset
              </label>
              <input
                type="text"
                value={asset1}
                onChange={(e) => setAsset1(e.target.value)}
                placeholder="e.g., AAPL, Bitcoin, EUR/USD, XYZ Token"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Second Asset
              </label>
              <input
                type="text"
                value={asset2}
                onChange={(e) => setAsset2(e.target.value)}
                placeholder="e.g., TSLA, Ethereum, GBP/USD, ABC Coin"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled={loading}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleCompare}
              disabled={!asset1.trim() || !asset2.trim() || loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Analyzing Assets...</span>
                </>
              ) : (
                <>
                  <GitCompare className="h-5 w-5" />
                  <span>Compare Assets</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        {/* Comparison Results */}
        {comparison && (
          <div className="space-y-8">
            {/* Data Quality Notice */}
            {hasEstimatedData && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 dark:text-blue-200 font-medium">
                      Some data for {comparison.asset1.fallbackUsed ? comparison.asset1.marketData.name : comparison.asset2.marketData.name} is approximated based on similar {comparison.asset1.fallbackUsed ? comparison.asset1.marketData.type : comparison.asset2.marketData.type} assets.
                    </p>
                    <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                      Analysis confidence adjusted accordingly. Consider exploring suggested alternatives.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <GitCompare className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-Time Comparison</h3>
                <div className="flex items-center space-x-1 ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Live Data</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Asset 1 */}
                <div className={`border rounded-lg p-4 ${comparison.asset1.fallbackUsed ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-600'}`}>
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{comparison.asset1.marketData.name}</h4>
                    <span className="text-gray-600 dark:text-gray-400">{comparison.asset1.marketData.symbol}</span>
                    <div className="mt-1 flex items-center justify-center space-x-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm">
                        {comparison.asset1.marketData.type.toUpperCase()}
                      </span>
                      {comparison.asset1.fallbackUsed && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs">
                          ESTIMATED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Price:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${comparison.asset1.marketData.price.toFixed(comparison.asset1.marketData.type === 'forex' ? 4 : 2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">24h Change:</span>
                      <span className={`font-semibold ${comparison.asset1.marketData.changePercent24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {comparison.asset1.marketData.changePercent24h >= 0 ? '+' : ''}{comparison.asset1.marketData.changePercent24h.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Risk Score:</span>
                      <span className={`font-semibold ${getRiskColor(comparison.asset1.riskScore)}`}>
                        {comparison.asset1.riskScore.charAt(0).toUpperCase() + comparison.asset1.riskScore.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Recommendation:</span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getRecommendationColor(comparison.asset1.recommendation)}`}>
                        {comparison.asset1.recommendation.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{comparison.asset1.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Asset 2 */}
                <div className={`border rounded-lg p-4 ${comparison.asset2.fallbackUsed ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-600'}`}>
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{comparison.asset2.marketData.name}</h4>
                    <span className="text-gray-600 dark:text-gray-400">{comparison.asset2.marketData.symbol}</span>
                    <div className="mt-1 flex items-center justify-center space-x-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm">
                        {comparison.asset2.marketData.type.toUpperCase()}
                      </span>
                      {comparison.asset2.fallbackUsed && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs">
                          ESTIMATED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Price:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${comparison.asset2.marketData.price.toFixed(comparison.asset2.marketData.type === 'forex' ? 4 : 2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">24h Change:</span>
                      <span className={`font-semibold ${comparison.asset2.marketData.changePercent24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {comparison.asset2.marketData.changePercent24h >= 0 ? '+' : ''}{comparison.asset2.marketData.changePercent24h.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Risk Score:</span>
                      <span className={`font-semibold ${getRiskColor(comparison.asset2.riskScore)}`}>
                        {comparison.asset2.riskScore.charAt(0).toUpperCase() + comparison.asset2.riskScore.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Recommendation:</span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getRecommendationColor(comparison.asset2.recommendation)}`}>
                        {comparison.asset2.recommendation.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{comparison.asset2.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Summary */}
            {analysis && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Safety Analysis */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-5 w-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Safety Comparison</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="font-medium text-green-800 dark:text-green-200">Safer Option</div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        {analysis.safer ? analysis.safer.marketData.name : 'Both have similar risk profiles'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {analysis.safer 
                        ? `Based on risk scores and volatility analysis, ${analysis.safer.marketData.name} shows more stable characteristics.`
                        : 'Both assets show similar risk characteristics for your consideration.'
                      }
                    </p>
                  </div>
                </div>

                {/* Growth Potential */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Growth Potential</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="font-medium text-blue-800 dark:text-blue-200">Higher Growth</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        {analysis.higherGrowth.marketData.name}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This asset shows stronger recent momentum with {analysis.higherGrowth.marketData.changePercent24h.toFixed(2)}% 
                      24-hour performance, indicating higher short-term growth potential.
                    </p>
                  </div>
                </div>

                {/* Best Overall */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-5 w-5 text-purple-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Best Overall Fit</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="font-medium text-purple-800 dark:text-purple-200">Recommended</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">
                        {analysis.betterOverall.marketData.name}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Based on AI analysis, recommendation strength ({analysis.betterOverall.recommendation.toUpperCase()}) 
                      and {analysis.betterOverall.confidence}% confidence level{analysis.betterOverall.dataQuality === 'complete' ? ' with complete data' : ' with estimated data'}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Verdict */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Investment Summary</h4>
              <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                <p>
                  For a moderate risk investor, <strong>{analysis?.betterOverall.marketData.name}</strong> appears to be the better option 
                  based on current market analysis. This recommendation considers the {analysis?.betterOverall.recommendation} signal 
                  with {analysis?.betterOverall.confidence}% confidence{analysis?.betterOverall.dataQuality !== 'complete' ? ' (adjusted for estimated data)' : ''}, 
                  current price momentum, and risk characteristics.
                </p>
                <p className="mt-3">
                  <strong>{comparison.asset1.marketData.name}</strong> shows {comparison.asset1.riskScore} risk with 
                  {comparison.asset1.marketData.changePercent24h >= 0 ? ' positive' : ' negative'} momentum, while{' '}
                  <strong>{comparison.asset2.marketData.name}</strong> presents {comparison.asset2.riskScore} risk with 
                  {comparison.asset2.marketData.changePercent24h >= 0 ? ' upward' : ' downward'} movement.
                </p>
                <p className="mt-3">
                  Consider diversification across both assets if they complement your portfolio strategy, 
                  or focus on the recommended option based on your specific investment goals and risk tolerance.
                  {hasEstimatedData && ' Note that some analysis is based on estimated data for newer or less common assets.'}
                </p>
              </div>
            </div>

            {/* Similar Assets Suggestions */}
            {(comparison.asset1.similarAssets || comparison.asset2.similarAssets) && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-4">You Might Also Consider</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {comparison.asset1.similarAssets && (
                    <div>
                      <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                        Similar to {comparison.asset1.marketData.name}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {comparison.asset1.similarAssets.map((asset, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm">
                            {asset}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {comparison.asset2.similarAssets && (
                    <div>
                      <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                        Similar to {comparison.asset2.marketData.name}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {comparison.asset2.similarAssets.map((asset, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm">
                            {asset}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetComparison;