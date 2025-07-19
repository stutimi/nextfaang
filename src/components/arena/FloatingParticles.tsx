import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = [];
    const colors = [
      "rgba(56, 189, 248, 0.6)", // Primary color
      "rgba(232, 121, 249, 0.5)", // Pink
      "rgba(52, 211, 153, 0.5)", // Green
      "rgba(251, 191, 36, 0.4)", // Yellow
    ];
    
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: "blur(1px)"
          }}
          animate={{
            x: [
              0,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              0
            ],
            y: [
              0,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              0
            ],
            opacity: [0.7, 0.9, 0.7, 0.5]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};