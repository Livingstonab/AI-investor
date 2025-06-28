import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, Shield, BarChart3, PieChart, Zap, ArrowRight, ChevronDown } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">AI Investor Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                to="/dashboard"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Smarter Investment Decisions,
            <span className="text-blue-500 block">Powered by AI</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get real-time insights, comprehensive risk analysis, and intelligent buy/hold/sell recommendations 
            for stocks, cryptocurrencies, and forex pairs. Make informed investment decisions based on your risk tolerance 
            and live market conditions.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Analyzing Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <div className="mt-6 flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Real-time market data • No registration required</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Three simple steps to smarter investing</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-200">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Input Any Asset</h3>
              <p className="text-gray-600 dark:text-gray-400">Enter any stock, cryptocurrency, or forex pair name or symbol you want to analyze</p>
            </div>
            <div className="text-center group">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-200">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">Our AI scans real-time market trends, news sentiment, and technical indicators</p>
            </div>
            <div className="text-center group">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-200">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Get Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-400">Receive personalized recommendations with detailed breakdowns and confidence levels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need for intelligent investment decisions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <Shield className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Risk Assessment</h3>
              <p className="text-gray-600 dark:text-gray-400">Comprehensive risk scoring based on volatility, market correlation, and real-time data</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <TrendingUp className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Live Market Trends</h3>
              <p className="text-gray-600 dark:text-gray-400">Real-time trend analysis with interactive charts and technical indicators</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <BarChart3 className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">News Sentiment</h3>
              <p className="text-gray-600 dark:text-gray-400">AI-powered news analysis with real-time sentiment scoring and impact assessment</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <PieChart className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Portfolio Fit</h3>
              <p className="text-gray-600 dark:text-gray-400">Understand how assets fit into your portfolio based on risk tolerance and diversification</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <Zap className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Instant Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">Get comprehensive investment insights in seconds with real-time market data</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <Brain className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">AI Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-400">Smart buy/hold/sell suggestions with confidence levels tailored to your investment profile</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Get answers to common questions about our platform</p>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">How do you generate Buy/Sell/Hold recommendations?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-3">Our AI analyzes real-time market trends, news sentiment, technical indicators, and risk factors to provide personalized recommendations based on your risk tolerance.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Do I need an account to use this?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-3">No account needed! You can start analyzing investments immediately with real-time data without any registration or login requirements.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">What assets can I analyze?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-3">Analyze stocks (AAPL, TSLA), cryptocurrencies (BTC, ETH), and forex pairs (EUR/USD, GBP/JPY) with real-time market data and comprehensive insights.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/faq"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">AI Investor Assistant</span>
            </div>
            <p className="text-gray-400 mb-6">Making investment decisions smarter with real-time AI analysis.</p>
            <div className="flex justify-center space-x-8 text-gray-400 mb-6">
              <Link to="/faq" className="hover:text-white transition-colors duration-200">FAQ</Link>
              <Link to="/dashboard" className="hover:text-white transition-colors duration-200">Dashboard</Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm mb-2">
                © 2025 AI Investor Assistant. Real-time market analysis for educational purposes only. Not financial advice.
              </p>
              <p className="text-gray-600 text-xs">
                Sponsored by <span className="text-blue-400 font-medium">Bolt</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;