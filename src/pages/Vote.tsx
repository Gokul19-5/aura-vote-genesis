import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Lock, Unlock, CheckCircle, User } from "lucide-react";
import Scene3D from "@/components/3d/Scene3D";
import { useToast } from "@/hooks/use-toast";

const Vote = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const { toast } = useToast();

  const candidates = [
    { id: "1", name: "Alex Johnson", party: "Progressive Alliance", color: "from-blue-500 to-cyan-400" },
    { id: "2", name: "Maria Rodriguez", party: "Unity Coalition", color: "from-purple-500 to-pink-400" },
    { id: "3", name: "David Chen", party: "Innovation Party", color: "from-green-500 to-emerald-400" },
    { id: "4", name: "Sarah Williams", party: "Future Forward", color: "from-orange-500 to-yellow-400" },
  ];

  const handleFaceVerification = () => {
    setVerificationStep(1);
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationStep(2);
      setTimeout(() => {
        setIsVerified(true);
        toast({
          title: "Verification Successful!",
          description: "Face recognition completed. You may now cast your vote.",
        });
      }, 1500);
    }, 2000);
  };

  const handleVote = () => {
    if (!selectedCandidate) return;
    
    setIsVoting(true);
    
    // Simulate voting process
    setTimeout(() => {
      setVoteSubmitted(true);
      toast({
        title: "Vote Cast Successfully!",
        description: "Your vote has been securely recorded and encrypted.",
      });
      setIsVoting(false);
    }, 2000);
  };

  const LockAnimation = () => (
    <div className="relative">
      {!isVerified ? (
        <Lock className="w-24 h-24 neon-cyan animate-pulse" />
      ) : (
        <Unlock className="w-24 h-24 neon-green animate-bounce" />
      )}
      <div className="absolute inset-0 w-24 h-24 border-4 border-primary rounded-full animate-spin opacity-30"></div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden pt-24">
      {/* 3D Background */}
      <Scene3D cameraPosition={[0, 1, 8]}>
        {/* Animated lock in 3D space */}
        <mesh position={[0, 2, -3]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1, 1.2, 0.3]} />
          <meshStandardMaterial 
            color={isVerified ? "#00ff7f" : "#00bfff"} 
            transparent 
            opacity={0.6}
            emissive={isVerified ? "#00ff7f" : "#00bfff"}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Floating voting ballots */}
        {candidates.map((_, index) => (
          <mesh 
            key={index}
            position={[
              Math.cos((index / candidates.length) * Math.PI * 2) * 4,
              Math.sin((index / candidates.length) * Math.PI * 2) * 2,
              -2
            ]}
            rotation={[0.5, index, 0]}
          >
            <planeGeometry args={[0.8, 1.2]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1}
              emissive="#ffffff"
              emissiveIntensity={0.05}
            />
          </mesh>
        ))}
      </Scene3D>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-['Orbitron'] mb-4">
              <span className="neon-cyan">Secure</span> <span className="neon-purple">Voting</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Cast your vote with confidence and security
            </p>
          </div>

          {!voteSubmitted ? (
            <>
              {/* Face Verification Section */}
              {!isVerified && (
                <Card className="glass-panel p-8 mb-8">
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <LockAnimation />
                    </div>
                    
                    <h2 className="text-2xl font-bold font-['Orbitron']">Identity Verification Required</h2>
                    
                    {verificationStep === 0 && (
                      <>
                        <p className="text-lg text-muted-foreground">
                          Please verify your identity using face recognition to proceed with voting
                        </p>
                        <Button onClick={handleFaceVerification} variant="neon" size="lg">
                          <Camera className="w-5 h-5 mr-2" />
                          Start Face Verification
                        </Button>
                      </>
                    )}
                    
                    {verificationStep === 1 && (
                      <div className="space-y-4">
                        <div className="w-48 h-48 mx-auto border-4 border-primary rounded-full relative overflow-hidden">
                          <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
                          <div className="absolute inset-4 border-2 border-primary rounded-full animate-ping"></div>
                          <div className="flex items-center justify-center h-full">
                            <Camera className="w-16 h-16 neon-cyan animate-pulse" />
                          </div>
                        </div>
                        <p className="text-lg neon-cyan">Scanning face...</p>
                      </div>
                    )}
                    
                    {verificationStep === 2 && (
                      <div className="space-y-4">
                        <CheckCircle className="w-16 h-16 neon-green mx-auto animate-bounce" />
                        <p className="text-lg neon-green">Verification successful!</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Voting Section */}
              {isVerified && (
                <Card className="glass-panel p-8">
                  <div className="text-center mb-8">
                    <Unlock className="w-16 h-16 neon-green mx-auto mb-4 animate-bounce" />
                    <h2 className="text-2xl font-bold font-['Orbitron']">Select Your Candidate</h2>
                    <p className="text-muted-foreground">Choose one candidate to cast your vote</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {candidates.map((candidate) => (
                      <Card
                        key={candidate.id}
                        className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          selectedCandidate === candidate.id
                            ? 'border-primary border-2 shadow-lg shadow-primary/30'
                            : 'glass-panel hover:border-glow'
                        }`}
                        onClick={() => setSelectedCandidate(candidate.id)}
                      >
                        <div className="text-center space-y-4">
                          <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${candidate.color} flex items-center justify-center`}>
                            <User className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold font-['Orbitron']">{candidate.name}</h3>
                            <p className="text-muted-foreground">{candidate.party}</p>
                          </div>
                          {selectedCandidate === candidate.id && (
                            <CheckCircle className="w-8 h-8 neon-green mx-auto" />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <Button
                      onClick={handleVote}
                      variant="neon"
                      size="lg"
                      disabled={!selectedCandidate || isVoting}
                      className="px-12 py-4 text-lg"
                    >
                      {isVoting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Casting Vote...
                        </>
                      ) : (
                        'Cast My Vote'
                      )}
                    </Button>
                    
                    {selectedCandidate && (
                      <p className="text-sm text-muted-foreground mt-4">
                        You selected: <span className="neon-green font-semibold">
                          {candidates.find(c => c.id === selectedCandidate)?.name}
                        </span>
                      </p>
                    )}
                  </div>
                </Card>
              )}
            </>
          ) : (
            /* Vote Submitted Success */
            <Card className="glass-panel p-12 text-center">
              <CheckCircle className="w-32 h-32 neon-green mx-auto mb-6 animate-bounce" />
              <h2 className="text-3xl font-bold font-['Orbitron'] neon-green mb-4">
                Vote Successfully Cast!
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your vote has been securely recorded and encrypted. Thank you for participating in the democratic process.
              </p>
              
              <div className="space-y-4">
                <div className="glass-panel p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Vote ID</p>
                  <p className="font-mono text-lg neon-cyan">VT-{Date.now().toString(36).toUpperCase()}</p>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button variant="neon" size="lg" onClick={() => window.location.href = '/leaderboard'}>
                    View Results
                  </Button>
                  <Button variant="glass" size="lg" onClick={() => window.location.href = '/'}>
                    Return Home
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vote;