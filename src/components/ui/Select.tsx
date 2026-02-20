import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  color?: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
  variant?: 'dropdown' | 'cards' | 'chips';
}

export function Select({ 
  label, 
  value, 
  options, 
  onChange,
  className,
  variant = 'dropdown',
}: SelectProps) {
  const selectedOption = options.find(o => o.value === value);

  if (variant === 'cards') {
    return (
      <div className={cn('space-y-3', className)}>
        {label && (
          <label className="text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => onChange(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'p-4 rounded-xl text-left transition-all duration-300 border',
                value === option.value
                  ? 'bg-primary-warm/20 border-primary-warm/50 shadow-glow-warm'
                  : 'glass border-white/10 hover:border-white/20'
              )}
            >
              <div className="font-medium text-white">{option.label}</div>
              {option.description && (
                <div className="text-xs text-white/50 mt-1">{option.description}</div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'chips') {
    return (
      <div className={cn('space-y-3', className)}>
        {label && (
          <label className="text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => onChange(option.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                value === option.value
                  ? 'bg-gradient-to-r from-primary-warm to-primary-cool text-white shadow-glow-warm'
                  : 'glass text-white/70 hover:text-white hover:bg-white/10'
              )}
              style={option.color ? { borderColor: option.color } : {}}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-base appearance-none cursor-pointer pr-10"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {selectedOption?.description && (
        <p className="text-xs text-white/40">{selectedOption.description}</p>
      )}
    </div>
  );
}
