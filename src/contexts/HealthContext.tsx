
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface StatusRatings {
  energy: number;
  happiness: number;
  productivity: number;
  stress: number;
}

interface HealthStats {
  heartRate: number;
  steps: number;
}

interface HealthContextType {
  statusRatings: StatusRatings;
  healthStats: HealthStats;
  updateRating: (category: keyof StatusRatings, value: number) => void;
  refreshHealthStats: () => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [statusRatings, setStatusRatings] = useState<StatusRatings>({
    energy: 3,
    happiness: 3,
    productivity: 3,
    stress: 3,
  });

  const [healthStats, setHealthStats] = useState<HealthStats>({
    heartRate: 72,
    steps: 5280,
  });

  const updateRating = (category: keyof StatusRatings, value: number) => {
    setStatusRatings(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  const refreshHealthStats = () => {
    // This is a mock implementation
    // In a real app, this would fetch from a health API or device
    const newHeartRate = 65 + Math.floor(Math.random() * 20);
    const newSteps = 4000 + Math.floor(Math.random() * 6000);
    
    setHealthStats({
      heartRate: newHeartRate,
      steps: newSteps,
    });
  };

  return (
    <HealthContext.Provider value={{ statusRatings, healthStats, updateRating, refreshHealthStats }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = (): HealthContextType => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
