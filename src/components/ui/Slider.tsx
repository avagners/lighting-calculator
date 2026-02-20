import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SliderProps {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
  className?: string;
  glow?: 'warm' | 'cool' | 'none';
}

export function Slider({ 
  label, 
  value, 
  min, 
  max, 
  step = 0.1, 
  suffix,
  onChange,
  className,
  glow = 'warm',
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex justify-between items-center">
        {label && (
          <label className="text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <motion.span 
          className="text-sm font-semibold text-primary-warm"
          key={value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {value}{suffix}
        </motion.span>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full">
        <motion.div
          className={cn(
            'absolute h-full rounded-full',
            glow === 'warm' 
              ? 'bg-gradient-to-r from-primary-warm to-amber-300' 
              : 'bg-gradient-to-r from-primary-cool to-blue-300'
          )}
          style={{ width: `${percentage}%` }}
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <motion.div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-lg border-2 border-white',
            glow === 'warm' 
              ? 'bg-gradient-to-br from-primary-warm to-amber-300 shadow-glow-warm' 
              : 'bg-gradient-to-br from-primary-cool to-blue-300 shadow-glow-cool'
          )}
          style={{ left: `calc(${percentage}% - 10px)` }}
          initial={false}
          animate={{ left: `calc(${percentage}% - 10px)` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}
