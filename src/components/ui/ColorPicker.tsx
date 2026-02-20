import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ColorOption {
  id: string;
  name: string;
  color: string;
  coefficient?: number;
}

interface ColorPickerProps {
  label?: string;
  value: string;
  options: ColorOption[];
  onChange: (value: string) => void;
  className?: string;
  variant?: 'circles' | 'squares';
}

export function ColorPicker({ 
  label, 
  value, 
  options, 
  onChange,
  className,
  variant = 'circles',
}: ColorPickerProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <label className="text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <div className="flex gap-3">
        {options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => onChange(option.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              'relative transition-all duration-300',
              variant === 'circles' ? 'w-12 h-12 rounded-full' : 'w-14 h-14 rounded-lg',
              value === option.id 
                ? 'ring-2 ring-white ring-offset-2 ring-offset-background scale-110' 
                : 'hover:scale-105'
            )}
            style={{ backgroundColor: option.color }}
            title={`${option.name}${option.coefficient ? ` (${Math.round(option.coefficient * 100)}%)` : ''}`}
          >
            {value === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-3 h-3 rounded-full bg-white/80" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
