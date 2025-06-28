import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ProsAndConsProps {
  asset: string;
  recommendation: 'buy' | 'hold' | 'sell';
  reasons: string[];
}

const ProsAndCons: React.FC<ProsAndConsProps> = ({ asset, recommendation, reasons }) => {
  // Generate pros and cons based on recommendation and reasons
  const generateProsAndCons = () => {
    const basePros = [
      'Strong market fundamentals and growth potential',
      'Positive technical indicators and momentum',
      'Favorable market sentiment and news coverage',
      'Good liquidity and trading volume',
      'Solid performance track record'
    ];

    const baseCons = [
      'Market volatility and price fluctuations',
      'Regulatory uncertainty and compliance risks',
      'Competition from similar assets',
      'Economic factors affecting broader market',
      'Potential for short-term corrections'
    ];

    let pros: string[] = [];
    let cons: string[] = [];

    if (recommendation === 'buy') {
      pros = [
        ...reasons,
        'Strong upward price momentum',
        'Favorable risk-reward ratio',
        'Growing institutional interest'
      ].slice(0, 5);
      
      cons = [
        'Potential for short-term volatility',
        'Market correction risks',
        'Overvaluation concerns at current levels'
      ];
    } else if (recommendation === 'sell') {
      pros = [
        'Opportunity to realize gains',
        'Reduced exposure to downside risk',
        'Capital preservation strategy'
      ];
      
      cons = [
        ...reasons,
        'Declining price momentum',
        'Negative market sentiment',
        'Technical indicators showing weakness'
      ].slice(0, 5);
    } else {
      pros = [
        'Stable price action and low volatility',
        'Balanced risk-reward profile',
        'Good for portfolio diversification'
      ];
      
      cons = [
        'Limited upside potential in near term',
        'Mixed market signals',
        'Uncertain directional movement'
      ];
    }

    return { pros, cons };
  };

  const { pros, cons } = generateProsAndCons();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Investment Analysis</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pros */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-semibold text-green-800 dark:text-green-200">Strengths</h4>
          </div>
          <ul className="space-y-3">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h4 className="font-semibold text-red-800 dark:text-red-200">Risks</h4>
          </div>
          <ul className="space-y-3">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Balance Assessment:</strong> Based on current market analysis, this asset shows 
          {recommendation === 'buy' ? ' strong potential with manageable risks for investors with appropriate risk tolerance.' :
           recommendation === 'sell' ? ' concerning signals that suggest reducing exposure may be prudent.' :
           ' mixed signals requiring careful monitoring before making significant position changes.'}
        </p>
      </div>
    </div>
  );
};

export default ProsAndCons;