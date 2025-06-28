import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Home, 
  Search, 
  GitCompare, 
  Download, 
  HelpCircle,
  ArrowLeft,
  BarChart3
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: 'dashboard' | 'analysis' | 'compare' | 'export') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'analysis', label: 'Asset Analysis', icon: Search },
    { id: 'compare', label: 'Compare Assets', icon: GitCompare },
    { id: 'export', label: 'Export Results', icon: Download },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">AI Investor</span>
        </div>
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id as 'dashboard' | 'analysis' | 'compare' | 'export')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activePage === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/faq"
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="font-medium">FAQ</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;