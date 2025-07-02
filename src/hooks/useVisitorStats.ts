
import { useState, useEffect } from 'react';

interface VisitorStats {
  totalVisitors: number;
  activeUsers: number;
  todayVisitors: number;
}

export const useVisitorStats = () => {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 0,
    activeUsers: 0,
    todayVisitors: 0
  });

  useEffect(() => {
    // Initialize stats from localStorage or default values
    const savedStats = localStorage.getItem('nextfang-visitor-stats');
    const initialStats = savedStats ? JSON.parse(savedStats) : {
      totalVisitors: 15847,
      activeUsers: 234,
      todayVisitors: 1247
    };

    // Increment total visitors on first load
    if (!sessionStorage.getItem('visited')) {
      initialStats.totalVisitors += 1;
      initialStats.todayVisitors += 1;
      sessionStorage.setItem('visited', 'true');
    }

    setStats(initialStats);
    localStorage.setItem('nextfang-visitor-stats', JSON.stringify(initialStats));

    // Simulate real-time active users fluctuation
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 50) + 200 // Random between 200-250
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return stats;
};
