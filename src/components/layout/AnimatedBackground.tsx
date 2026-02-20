import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface AnimatedBackgroundProps {
  accentColor?: string;
}

export function AnimatedBackground({ accentColor = '#FFB347' }: AnimatedBackgroundProps) {
  // Генерируем случайные позиции для плавающих элементов
  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      size: Math.random() * 300 + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.1 + 0.03,
      xOffset: Math.random() * 100 - 50,
      yOffset: Math.random() * 100 - 50,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Базовый градиент */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, ${accentColor}11 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, ${accentColor}11 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0a0a0a 100%)
          `,
        }}
      />

      {/* Плавающие световые пятна */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${accentColor} ${orb.opacity * 100}%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, orb.xOffset, 0],
            y: [0, orb.yOffset, 0],
            scale: [1, 1.2, 1],
            opacity: [orb.opacity, orb.opacity * 1.5, orb.opacity],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Шум/зернистость для текстуры */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Виньетка */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}
