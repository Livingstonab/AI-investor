import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowLeft, ChevronDown } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const FAQ = () => {
  const faqs = [
    {
      question: "How do you generate the Buy/Sell/Hold recommendation?",
      answer: "Our AI analyzes multiple real-time factors including market trends, news sentiment, technical indicators (RSI, MACD, moving averages), historical volatility, and your selected risk tolerance. The algorithm weighs these factors using machine learning to provide a personalized recommendation with a confidence score that aligns with your investment profile."
    },
    {
      question: "What is a risk score and how is it calculated?",
      answer: "The risk score is a rating (Low, Medium, High) that evaluates an asset's potential volatility and uncertainty. It considers real-time factors like price volatility, market correlation, news sentiment, technical indicators, and historical performance. Cryptocurrencies typically have higher risk scores due to their inherent volatility, while established stocks may have lower scores."
    },
    {
      question: "Can I trust these predictions and recommendations?",
      answer: "Our analysis is based on comprehensive real-time data and advanced AI algorithms, but it's important to remember that all investment predictions are speculative. Market conditions can change rapidly due to unexpected events. This tool is for educational purposes only and should not be considered financial advice. Always conduct your own research and consult with financial professionals before making investment decisions."
    },
    {
      question: "Do I need an account to use this?",
      answer: "No! Our platform is designed for instant access with real-time market data. You can start analyzing investments immediately without creating an account, providing personal information, or going through any registration process. Simply enter an asset name and begin your analysis with live market data."
    },
    {
      question: "What sources do you use for real-time data?",
      answer: "Our AI aggregates real-time data from multiple reliable sources including major market data providers, financial news outlets, social media sentiment analysis, technical analysis indicators, and live market feeds. We continuously update our data sources to ensure accuracy and relevance, providing you with the most current market information available."
    },
    {
      question: "How accurate are the price forecasts?",
      answer: "Price forecasts are speculative and based on current market trends, technical indicators, and AI analysis of historical patterns. While our algorithms are sophisticated and use real-time data, market conditions can change rapidly due to unexpected events, news, or economic factors. Use forecasts as one factor among many in your decision-making process, not as a guarantee of future performance."
    },
    {
      question: "What's the difference between stocks, crypto, and forex analysis?",
      answer: "While all use similar analytical frameworks with real-time data, each asset class has unique considerations: Crypto analysis considers blockchain adoption, regulatory developments, and higher volatility patterns. Stock analysis focuses on company fundamentals, earnings, and traditional market indicators. Forex analysis examines central bank policies, economic indicators, and currency correlations."
    },
    {
      question: "How often is the data updated?",
      answer: "Market data, prices, and news sentiment are updated in real-time throughout trading hours. Our AI models continuously process new information to provide the most current analysis possible. Technical indicators and deeper analytical components are recalculated with each new data point, ensuring you always have the latest market insights."
    },
    {
      question: "Can I export my analysis results?",
      answer: "Yes! You can export your complete real-time analysis as a PDF report or generate a shareable link. The export includes all sections of your analysis including live market data, recommendations, risk assessment, technical indicators, and market insights for future reference or sharing with advisors."
    },
    {
      question: "What assets can I analyze?",
      answer: "Our database includes thousands of assets with real-time data: Major stocks (AAPL, TSLA, MSFT, GOOGL), cryptocurrencies (BTC, ETH, BNB, ADA), and forex pairs (EUR/USD, GBP/USD, USD/JPY). Try searching by both name and symbol. If you can't find a specific asset, it may be a very new listing, delisted security, or not yet supported by our real-time data providers."
    },
    {
      question: "How does the theme toggle work?",
      answer: "The theme toggle (Thoogle) in the top-right corner switches between light and dark modes. Your preference is automatically saved and will be remembered for future visits. Dark mode is easier on the eyes during extended analysis sessions, while light mode provides a clean, professional appearance for sharing screens or presentations."
    },
    {
      question: "What makes your AI analysis different?",
      answer: "Our AI combines real-time market data with advanced sentiment analysis, technical indicators, and risk assessment algorithms. Unlike static analysis tools, we provide live updates, confidence scores, and personalized recommendations based on your risk tolerance. The system learns from market patterns and continuously improves its accuracy with each analysis."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">FAQ</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                to="/dashboard"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to know about AI Investor Assistant</p>
          <div className="mt-4 flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Real-time market data • Live AI analysis</span>
          </div>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start using our platform with real-time market data and explore the features hands-on. 
            Most questions are answered through direct experience with live analysis tools.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Real-Time Analysis Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;