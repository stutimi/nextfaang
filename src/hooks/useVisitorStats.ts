
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
    const fetchVisitorStats = async () => {
      try {
        // Get total visitors count
        const { count: totalCount } = await supabase
          .from('visitor_logs')
          .select('*', { count: 'exact', head: true });

        // Get today's visitors count
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const { count: todayCount } = await supabase
          .from('visitor_logs')
          .select('*', { count: 'exact', head: true })
          .gte('visited_at', today.toISOString());

        setStats({
          totalVisitors: totalCount || 0,
          activeUsers: Math.floor(Math.random() * 50) + 200, // Simulated active users
          todayVisitors: todayCount || 0
        });
      } catch (error) {
        console.error('Error fetching visitor stats:', error);
        // Fallback to default values
        setStats({
          totalVisitors: 15847,
          activeUsers: 234,
          todayVisitors: 1247
        });
      }
    };

    fetchVisitorStats();

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
