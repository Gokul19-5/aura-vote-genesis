import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Users, BarChart3, ArrowRight } from "lucide-react";
import Scene3D from "@/components/3d/Scene3D";
import HolographicBallotBox from "@/components/3d/HolographicBallotBox";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Face recognition & document verification",
      color: "neon-cyan"
    },
    {
      icon: Lock,
      title: "Tamper-Proof Voting",
      description: "Blockchain-inspired security protocols",
      color: "neon-purple"
    },
    {
      icon: Users,
      title: "One Person, One Vote",
      description: "Guaranteed unique voter identification",
      color: "neon-green"
    },
    {
      icon: BarChart3,
      title: "Real-time Results",
      description: "Live vote counting and analytics",
      color: "neon-cyan"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <Scene3D>
        <HolographicBallotBox position={[0, 0, 0]} />
        <HolographicBallotBox position={[-4, 1, -2]} />
        <HolographicBallotBox position={[4, -1, -3]} />
      </Scene3D>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 py-20">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold font-['Orbitron'] mb-6 floating">
              <span className="neon-cyan">Secure</span>
              <span className="neon-purple">Vote</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Experience the future of democratic participation with our 
              <span className="neon-green font-semibold"> next-generation voting platform</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button variant="neon" size="lg" className="text-lg px-8 py-4">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/vote">
                <Button variant="holographic" size="lg" className="text-lg px-8 py-4">
                  Cast Your Vote
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="glass-panel p-6 text-center hover:scale-105 transition-transform duration-300 floating"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full border-2 border-glow">
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-['Orbitron']">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-['Orbitron'] mb-4">
                Ready to <span className="neon-green">Revolutionize</span> Democracy?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Join thousands of voters who trust SecureVote for transparent, 
                secure, and verifiable elections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="neon" size="lg">
                    Register Now
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="glass" size="lg">
                    View Results
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-60 particle-drift"
            style={{
              background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;