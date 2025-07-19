import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, ChevronRight } from "lucide-react";

interface Participant {
  id: string;
  handle: string;
  country: string;
  rating: number;
}

interface Match {
  id: string;
  round: number;
  position: number;
  participant1?: Participant;
  participant2?: Participant;
  winner?: string;
  score?: string;
  status: 'upcoming' | 'live' | 'completed';
  scheduledTime?: string;
}

interface TournamentBracketProps {
  tournamentId: string;
  tournamentName: string;
  matches: Match[];
}

export const TournamentBracket = ({ tournamentId, tournamentName, matches }: TournamentBracketProps) => {
  const [highlightedMatch, setHighlightedMatch] = useState<string | null>(null);
  
  // Group matches by round
  const roundsMap = matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {} as Record<number, Match[]>);
  
  // Sort rounds
  const rounds = Object.keys(roundsMap)
    .map(Number)
    .sort((a, b) => a - b);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'completed': return 'Completed';
      default: return 'Upcoming';
    }
  };

  return (
    <Card className="magical-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          {tournamentName} Bracket
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-[800px] p-2">
            {rounds.map((round) => (
              <div key={round} className="flex-1">
                <div className="text-center mb-4">
                  <Badge variant="outline" className="bg-primary/10">
                    {round === Math.max(...rounds) ? 'Final' : 
                     round === Math.max(...rounds) - 1 ? 'Semi-Finals' : 
                     round === Math.max(...rounds) - 2 ? 'Quarter-Finals' : 
                     `Round ${round}`}
                  </Badge>
                </div>
                
                <div className="space-y-6">
                  {roundsMap[round].map((match) => (
                    <motion.div
                      key={match.id}
                      className={`border rounded-lg p-3 ${
                        highlightedMatch === match.id ? 'border-primary' : 'border-border/50'
                      } transition-colors`}
                      onMouseEnter={() => setHighlightedMatch(match.id)}
                      onMouseLeave={() => setHighlightedMatch(null)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Match #{match.position}</span>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(match.status)}
                        >
                          {getStatusText(match.status)}
                        </Badge>
                      </div>
                      
                      {/* Participant 1 */}
                      <div className={`flex items-center justify-between p-2 rounded-md ${
                        match.winner === match.participant1?.id ? 'bg-green-500/10' : ''
                      }`}>
                        <div className="flex items-center gap-2">
                          {match.participant1 ? (
                            <>
                              <span className="text-sm">{match.participant1.country}</span>
                              <span className="font-medium">{match.participant1.handle}</span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">TBD</span>
                          )}
                        </div>
                        {match.score && (
                          <span className="font-mono">{match.score.split('-')[0]}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-center my-1">
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      {/* Participant 2 */}
                      <div className={`flex items-center justify-between p-2 rounded-md ${
                        match.winner === match.participant2?.id ? 'bg-green-500/10' : ''
                      }`}>
                        <div className="flex items-center gap-2">
                          {match.participant2 ? (
                            <>
                              <span className="text-sm">{match.participant2.country}</span>
                              <span className="font-medium">{match.participant2.handle}</span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">TBD</span>
                          )}
                        </div>
                        {match.score && (
                          <span className="font-mono">{match.score.split('-')[1]}</span>
                        )}
                      </div>
                      
                      {match.scheduledTime && match.status !== 'completed' && (
                        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {match.scheduledTime}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};