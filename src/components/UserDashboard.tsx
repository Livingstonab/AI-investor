import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, Target, Clock, RefreshCw, Download } from 'lucide-react';
import { userAnalytics, UserStats } from '../services/userAnalytics';

const UserDashboard = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setStats(userAnalytics.getStats());
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const assetTypeData = [
    { name: 'Stocks', value: stats.assetTypeBreakdown.stocks, color: '#00bfff' },
    { name: 'Crypto', value: stats.assetTypeBreakdown.crypto, color: '#10b981' },
    { name: 'Forex', value: stats.assetTypeBreakdown.forex, color: '#f59e0b' }
  ];

  const recommendationData = [
    { name: 'Buy', value: stats.recommendationBreakdown.buy, color: '#10b981' },
    { name: 'Hold', value: stats.recommendationBreakdown.hold, color: '#f59e0b' },
    { name: 'Sell', value: stats.recommendationBreakdown.sell, color: '#ef4444' }
  ];

  const getRecommendationColor = (rec: string) => {
    switch (rec.toLowerCase()) {
      case 'buy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'hold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'sell': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your investment analysis activity and insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={loadStats}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Analyses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAnalyses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Buy Signals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.recommendationBreakdown.buy}</p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {stats.totalAnalyses > 0 ? Math.round((stats.recommendationBreakdown.buy / stats.totalAnalyses) * 100) : 0}% of total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Target className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hold Signals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.recommendationBreakdown.hold}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                  {stats.totalAnalyses > 0 ? Math.round((stats.recommendationBreakdown.hold / stats.totalAnalyses) * 100) : 0}% of total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sell Signals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.recommendationBreakdown.sell}</p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  {stats.totalAnalyses > 0 ? Math.round((stats.recommendationBreakdown.sell / stats.totalAnalyses) * 100) : 0}% of total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Asset Type Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Asset Type Analysis</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stats.totalAnalyses} total
              </div>
            </div>
            {stats.totalAnalyses > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetTypeData.filter(item => item.value > 0)}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {assetTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No analysis data yet
              </div>
            )}
            {stats.totalAnalyses > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{stats.assetTypeBreakdown.stocks}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Stocks</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{stats.assetTypeBreakdown.crypto}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Crypto</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">{stats.assetTypeBreakdown.forex}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Forex</div>
                </div>
              </div>
            )}
          </div>

          {/* Recommendation Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recommendation History</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last {stats.recentAnalyses.length} analyses
              </div>
            </div>
            {stats.totalAnalyses > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={recommendationData.filter(item => item.value > 0)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" fill="#00bfff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No recommendation data yet
              </div>
            )}
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Analyses</h3>
            {stats.recentAnalyses.length > 0 && (
              <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 text-sm">
                <Download className="h-4 w-4" />
                <span>Export All</span>
              </button>
            )}
          </div>
          {stats.recentAnalyses.length > 0 ? (
            <div className="space-y-4">
              {stats.recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{analysis.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{analysis.symbol}</span>
                        <span>•</span>
                        <span className="capitalize">{analysis.type}</span>
                        <span>•</span>
                        <span>${analysis.price.toFixed(analysis.type === 'forex' ? 4 : 2)}</span>
                        <span>•</span>
                        <span className="capitalize">{analysis.riskTolerance} risk</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(analysis.recommendation)}`}>
                      {analysis.recommendation.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(analysis.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No analyses yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Start analyzing assets to see your activity here</p>
            </div>
          )}
        </div>

        {/* Quick Stats Summary */}
        {stats.totalAnalyses > 0 && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">Your Analysis Summary</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-blue-800 dark:text-blue-300">
                <strong>Most Active:</strong> {
                  stats.assetTypeBreakdown.stocks >= stats.assetTypeBreakdown.crypto && stats.assetTypeBreakdown.stocks >= stats.assetTypeBreakdown.forex ? 'Stocks' :
                  stats.assetTypeBreakdown.crypto >= stats.assetTypeBreakdown.forex ? 'Crypto' : 'Forex'
                } analysis
              </div>
              <div className="text-blue-800 dark:text-blue-300">
                <strong>Recommendation Trend:</strong> {
                  stats.recommendationBreakdown.buy >= stats.recommendationBreakdown.hold && stats.recommendationBreakdown.buy >= stats.recommendationBreakdown.sell ? 'Bullish' :
                  stats.recommendationBreakdown.sell >= stats.recommendationBreakdown.hold ? 'Bearish' : 'Neutral'
                } outlook
              </div>
              <div className="text-blue-800 dark:text-blue-300">
                <strong>Total Insights:</strong> {stats.totalAnalyses} comprehensive {stats.totalAnalyses === 1 ? 'analysis' : 'analyses'} completed
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;