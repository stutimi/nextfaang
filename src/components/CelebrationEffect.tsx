import { useEffect, useState } from 'react';
import { Sparkles, Star, Zap } from 'lucide-react';

interface CelebrationEffectProps {
  show: boolean;
  onComplete: () => void;
}

export const CelebrationEffect = ({ show, onComplete }: CelebrationEffectProps) => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, icon: any, color: string}>>([]);

  useEffect(() => {
    if (show) {
      // Play welcome sound
      const playWelcomeSound = () => {
        const utterance = new SpeechSynthesisUtterance("Welcome to NextFang! Your competitive programming journey begins now!");
        utterance.rate = 1;
        utterance.pitch = 1.2;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      };

      playWelcomeSound();

      // Create celebration particles
      const icons = [Sparkles, Star, Zap];
      const colors = ['text-yellow-400', 'text-blue-400', 'text-purple-400', 'text-green-400', 'text-red-400'];
      
      const newParticles = Array.from({length: 20}, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: icons[Math.floor(Math.random() * icons.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      
      setParticles(newParticles);

      // Auto complete after 3 seconds
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Rainbow background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-yellow-500/20 via-green-500/20 via-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
      
      {/* Celebration text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary-foreground mb-4 animate-bounce">
            🎉 Welcome to NextFang! 🎉
          </h1>
          <p className="text-2xl text-primary-foreground/80 animate-pulse">
            Your coding adventure starts now!
          </p>
        </div>
      </div>

      {/* Floating particles */}
      {particles.map(particle => {
        const IconComponent = particle.icon;
        return (
          <IconComponent
            key={particle.id}
            className={`absolute w-8 h-8 ${particle.color} animate-ping`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        );
      })}

      {/* Confetti effect */}
      <div className="absolute inset-0">
        {Array.from({length: 50}).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${0.5 + Math.random() * 1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};