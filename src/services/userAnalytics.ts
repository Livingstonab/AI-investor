export interface UserAnalysis {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'forex';
  recommendation: 'buy' | 'hold' | 'sell';
  riskTolerance: string;
  timestamp: string;
  price: number;
}

export interface UserStats {
  totalAnalyses: number;
  assetTypeBreakdown: {
    stocks: number;
    crypto: number;
    forex: number;
  };
  riskProfileBreakdown: {
    conservative: number;
    moderate: number;
    aggressive: number;
  };
  recommendationBreakdown: {
    buy: number;
    hold: number;
    sell: number;
  };
  recentAnalyses: UserAnalysis[];
}

class UserAnalyticsService {
  private storageKey = 'ai-investor-analytics';

  saveAnalysis(analysis: Omit<UserAnalysis, 'id' | 'timestamp'>): void {
    const userAnalysis: UserAnalysis = {
      ...analysis,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };

    const existing = this.getAnalyses();
    existing.unshift(userAnalysis);
    
    // Keep only last 50 analyses
    const limited = existing.slice(0, 50);
    localStorage.setItem(this.storageKey, JSON.stringify(limited));
  }

  getAnalyses(): UserAnalysis[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  getStats(): UserStats {
    const analyses = this.getAnalyses();
    
    const assetTypeBreakdown = {
      stocks: analyses.filter(a => a.type === 'stock').length,
      crypto: analyses.filter(a => a.type === 'crypto').length,
      forex: analyses.filter(a => a.type === 'forex').length
    };

    const riskProfileBreakdown = {
      conservative: analyses.filter(a => a.riskTolerance === 'conservative').length,
      moderate: analyses.filter(a => a.riskTolerance === 'moderate').length,
      aggressive: analyses.filter(a => a.riskTolerance === 'aggressive').length
    };

    const recommendationBreakdown = {
      buy: analyses.filter(a => a.recommendation === 'buy').length,
      hold: analyses.filter(a => a.recommendation === 'hold').length,
      sell: analyses.filter(a => a.recommendation === 'sell').length
    };

    return {
      totalAnalyses: analyses.length,
      assetTypeBreakdown,
      riskProfileBreakdown,
      recommendationBreakdown,
      recentAnalyses: analyses.slice(0, 5)
    };
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const userAnalytics = new UserAnalyticsService();