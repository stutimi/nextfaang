
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, TrendingUp, Calendar } from "lucide-react";
import { useVisitorStats } from "@/hooks/useVisitorStats";

export const VisitorStats = () => {
  const { totalVisitors, activeUsers, todayVisitors } = useVisitorStats();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="bg-blue-50/90 backdrop-blur-md border-2 border-blue-200/50 shadow-xl">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-900">Live Stats</span>
          </div>
          
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center gap-2 text-blue-800">
              <Users className="h-3 w-3" />
              <span className="font-medium">{activeUsers}</span>
              <span className="text-blue-600">active now</span>
            </div>
            
            <div className="flex items-center gap-2 text-blue-800">
              <Calendar className="h-3 w-3" />
              <span className="font-medium">{todayVisitors.toLocaleString()}</span>
              <span className="text-blue-600">today</span>
            </div>
            
            <div className="flex items-center gap-2 text-blue-800">
              <Eye className="h-3 w-3" />
              <span className="font-medium">{totalVisitors.toLocaleString()}</span>
              <span className="text-blue-600">total visits</span>
            </div>
          </div>
          
          <Badge variant="secondary" className="w-full justify-center bg-blue-100 text-blue-800 hover:bg-blue-200">
            <TrendingUp className="h-3 w-3 mr-1" />
            Growing Daily
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};
