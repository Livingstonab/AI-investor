import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import UserDashboard from '../components/UserDashboard';
import AssetAnalysis from '../components/AssetAnalysis';
import AssetComparison from '../components/AssetComparison';
import ExportResults from '../components/ExportResults';

type ActivePage = 'dashboard' | 'analysis' | 'compare' | 'export';

const Dashboard = () => {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <UserDashboard />;
      case 'analysis':
        return <AssetAnalysis />;
      case 'compare':
        return <AssetComparison />;
      case 'export':
        return <ExportResults />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;