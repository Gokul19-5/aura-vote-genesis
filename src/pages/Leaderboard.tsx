import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Users, BarChart3, RefreshCw } from "lucide-react";
import Scene3D from "@/components/3d/Scene3D";

const Leaderboard = () => {
  const [votes, setVotes] = useState([
    { id: "1", name: "Alex Johnson", party: "Progressive Alliance", votes: 15420, color: "#00bfff", percentage: 35.2 },
    { id: "2", name: "Maria Rodriguez", party: "Unity Coalition", votes: 12890, color: "#ff00ff", percentage: 29.4 },
    { id: "3", name: "David Chen", party: "Innovation Party", votes: 9876, color: "#00ff7f", percentage: 22.6 },
    { id: "4", name: "Sarah Williams", party: "Future Forward", votes: 5543, color: "#ffa500", percentage: 12.8 },
  ]);

  const [isAnimating, setIsAnimating] = useState(false);
  const totalVotes = votes.reduce((sum, candidate) => sum + candidate.votes, 0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVotes(prev => prev.map(candidate => ({
        ...candidate,
        votes: candidate.votes + Math.floor(Math.random() * 5),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Recalculate percentages when votes change
  useEffect(() => {
    const newTotal = votes.reduce((sum, candidate) => sum + candidate.votes, 0);
    setVotes(prev => prev.map(candidate => ({
      ...candidate,
      percentage: (candidate.votes / newTotal) * 100,
    })));
  }, [votes.map(v => v.votes).join(',')]);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const Bar3D = ({ candidate, index, maxVotes }: { candidate: any, index: number, maxVotes: number }) => {
    const height = (candidate.votes / maxVotes) * 4;
    const position: [number, number, number] = [index * 2 - 3, height / 2, 0];
    
    return (
      <group position={position}>
        <mesh>
          <boxGeometry args={[0.8, height, 0.8]} />
          <meshStandardMaterial
            color={candidate.color}
            transparent
            opacity={0.7}
            emissive={candidate.color}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Glowing outline */}
        <mesh>
          <boxGeometry args={[0.9, height + 0.1, 0.9]} />
          <meshBasicMaterial
            color={candidate.color}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
        
        {/* Floating particles around the bar */}
        {[...Array(5)].map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const radius = 1.2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                height + Math.sin(Date.now() * 0.001 + i) * 0.5,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial
                color={candidate.color}
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}
      </group>
    );
  };

  const maxVotes = Math.max(...votes.map(c => c.votes));

  return (
    <div className="min-h-screen relative overflow-hidden pt-24">
      {/* 3D Background with animated bars */}
      <Scene3D cameraPosition={[0, 3, 10]}>
        {votes.map((candidate, index) => (
          <Bar3D 
            key={candidate.id} 
            candidate={candidate} 
            index={index} 
            maxVotes={maxVotes}
          />
        ))}
      </Scene3D>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-['Orbitron'] mb-4">
              <span className="neon-cyan">Live</span> <span className="neon-purple">Results</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Real-time election results with advanced analytics
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Button onClick={handleRefresh} variant="neon" className="flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-panel p-6 text-center">
              <Users className="w-12 h-12 neon-cyan mx-auto mb-4" />
              <h3 className="text-2xl font-bold font-['Orbitron'] neon-cyan">{totalVotes.toLocaleString()}</h3>
              <p className="text-muted-foreground">Total Votes Cast</p>
            </Card>
            
            <Card className="glass-panel p-6 text-center">
              <TrendingUp className="w-12 h-12 neon-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold font-['Orbitron'] neon-green">78.4%</h3>
              <p className="text-muted-foreground">Voter Turnout</p>
            </Card>
            
            <Card className="glass-panel p-6 text-center">
              <BarChart3 className="w-12 h-12 neon-purple mx-auto mb-4" />
              <h3 className="text-2xl font-bold font-['Orbitron'] neon-purple">4</h3>
              <p className="text-muted-foreground">Candidates</p>
            </Card>
          </div>

          {/* Results Table */}
          <Card className="glass-panel p-8 mb-8">
            <h2 className="text-2xl font-bold font-['Orbitron'] mb-6 text-center">
              Election Results
            </h2>
            
            <div className="space-y-6">
              {votes
                .sort((a, b) => b.votes - a.votes)
                .map((candidate, index) => (
                  <div key={candidate.id} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Trophy className="w-6 h-6 text-yellow-400" />}
                          <span className="text-2xl font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-['Orbitron']" style={{ color: candidate.color }}>
                            {candidate.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{candidate.party}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold font-['Orbitron']" style={{ color: candidate.color }}>
                          {candidate.votes.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {candidate.percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-card/30 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out relative"
                        style={{
                          width: `${candidate.percentage}%`,
                          background: `linear-gradient(90deg, ${candidate.color}80, ${candidate.color})`
                        }}
                      >
                        <div 
                          className="absolute inset-0 bg-white/20 animate-pulse"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          {/* Winner Announcement */}
          {votes.length > 0 && (
            <Card className="glass-panel p-8 text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold font-['Orbitron'] mb-2">
                <span style={{ color: votes[0].color }}>
                  {votes.sort((a, b) => b.votes - a.votes)[0].name}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                Leading with {votes.sort((a, b) => b.votes - a.votes)[0].percentage.toFixed(1)}% of votes
              </p>
              <p className="text-sm text-muted-foreground">
                Results are updated in real-time • Last update: {new Date().toLocaleTimeString()}
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          >
            <BarChart3 
              className="w-8 h-8 opacity-20"
              style={{ color: votes[i % votes.length]?.color || '#00bfff' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;