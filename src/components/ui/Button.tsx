import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: 'warm' | 'cool' | 'none';
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md',
  glow = 'none',
  children, 
  ...props 
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
        variant === 'primary' && 'bg-gradient-to-r from-primary-warm to-primary-cool text-white shadow-lg hover:shadow-glow-strong',
        variant === 'secondary' && 'glass text-white hover:bg-white/10',
        variant === 'ghost' && 'text-white/70 hover:text-white hover:bg-white/5',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        glow === 'warm' && 'hover:shadow-glow-warm',
        glow === 'cool' && 'hover:shadow-glow-cool',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
