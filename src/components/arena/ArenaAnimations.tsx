import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParticleProps {
  color: string;
  size: number;
  duration: number;
  x: number;
  y: number;
  delay: number;
}

const Particle = ({ color, size, duration, x, y, delay }: ParticleProps) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        x,
        y,
        opacity: 0,
      }}
      animate={{
        y: y - 100 - Math.random() * 100,
        x: x + (Math.random() - 0.5) * 100,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    />
  );
};

export const VictoryAnimation = ({ isVisible }: { isVisible: boolean }) => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  useEffect(() => {
    if (isVisible) {
      const newParticles = [];
      const colors = ["#FFD700", "#FF6B6B", "#4CD964", "#5AC8FA", "#007AFF"];
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 10 + 5,
          duration: Math.random() * 2 + 1,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
          delay: Math.random() * 0.5,
        });
      }
      
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2
          className="text-5xl font-bold rainbow-text"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Victory!
        </motion.h2>
      </motion.div>
    </div>
  );
};

export const BattleAnimation = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-full"
          animate={{ scale: [1, 2, 3], opacity: [0.7, 0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="text-5xl font-bold rainbow-text"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          Battle Start!
        </motion.div>
      </motion.div>
    </div>
  );
};

export const CountdownAnimation = ({ count, isVisible }: { count: number, isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black/50">
      <motion.div
        key={count}
        initial={{ scale: 3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="text-8xl font-bold text-primary"
      >
        {count}
      </motion.div>
    </div>
  );
};