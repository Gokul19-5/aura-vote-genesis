import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Vote, UserCheck, BarChart3 } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: Shield },
    { name: "Register", path: "/register", icon: UserCheck },
    { name: "Vote", path: "/vote", icon: Vote },
    { name: "Leaderboard", path: "/leaderboard", icon: BarChart3 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-glow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary animate-glow-pulse" />
              <div className="absolute inset-0 w-8 h-8 border-2 border-primary rounded-full animate-ping opacity-20"></div>
            </div>
            <span className="text-2xl font-bold font-['Orbitron'] neon-cyan">SecureVote</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "neon" : "glass"}
                    className={`flex items-center space-x-2 px-6 py-3 ${
                      isActive ? "scale-105" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "neon" : "glass"}
                    size="icon"
                    className={isActive ? "scale-105" : ""}
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;