import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glow-warm' | 'glow-cool';
  glass?: boolean;
}

export function Card({ 
  className, 
  variant = 'default', 
  glass = true,
  children, 
  ...props 
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'rounded-2xl p-6',
        glass && 'bg-surfaceGlass backdrop-blur-xl border border-white/10',
        variant === 'glow-warm' && 'shadow-glow-warm',
        variant === 'glow-cool' && 'shadow-glow-cool',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
