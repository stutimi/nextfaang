import React, { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export const InteractiveBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  const isLowPerformance = useRef<boolean>(false);
  const frameCount = useRef<number>(0);

  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const particles: Particle[] = [];
    // Reduce particle count on mobile/low-performance devices
    const baseCount = isLowPerformance.current ? 20 : 50;
    const particleCount = Math.min(baseCount, Math.floor(window.innerWidth / (isLowPerformance.current ? 50 : 30)));
    
    const colors = [
      "rgba(59, 130, 246, 0.6)",   // Blue
      "rgba(168, 85, 247, 0.6)",   // Purple
      "rgba(34, 197, 94, 0.6)",    // Green
      "rgba(249, 115, 22, 0.6)",   // Orange
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    particlesRef.current = particles;
  }, []);

  const drawParticles = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Performance monitoring
    frameCount.current++;
    if (frameCount.current % 60 === 0) {
      const fps = 1000 / (currentTime - lastFrameTime.current);
      if (fps < 30) {
        isLowPerformance.current = true;
      }
    }
    lastFrameTime.current = currentTime;

    // Skip frames on low performance
    if (isLowPerformance.current && frameCount.current % 2 !== 0) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

      // Mouse interaction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx -= (dx / distance) * force * 0.01;
        particle.vy -= (dy / distance) * force * 0.01;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Draw connections (optimized - skip on low performance or limit connections)
      if (!isLowPerformance.current || index % 2 === 0) {
        const maxConnections = isLowPerformance.current ? 2 : 5;
        let connectionCount = 0;
        
        for (let i = index + 1; i < particlesRef.current.length && connectionCount < maxConnections; i++) {
          const otherParticle = particlesRef.current[i];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            connectionCount++;
          }
        }
      }
    });
  }, []);

  const animate = useCallback((currentTime: number) => {
    drawParticles(currentTime);
    animationRef.current = requestAnimationFrame(animate);
  }, [drawParticles]);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle mouse updates to every 16ms (60fps max)
    if (Date.now() - lastFrameTime.current > 16) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastFrameTime.current = Date.now();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };


    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(animate);

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [createParticles, animate, handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ background: "transparent" }}
    />
  );
});