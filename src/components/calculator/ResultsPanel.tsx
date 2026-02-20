import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { useLightingCalculator } from '../../context';
import { BULB_TYPES } from '../../types/lighting';
import { Lightbulb, Zap, Grid3X3, Copy, Check } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ value, duration = 1.5, suffix = '', prefix = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (ease-out-cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export function ResultsPanel() {
  const { result, state, copyShareUrl } = useLightingCalculator();
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const bulbData = BULB_TYPES.find((b) => b.id === state.bulbType);

  const handleCopyShare = async () => {
    const success = await copyShareUrl();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="space-y-6" variant="glow-warm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Результаты расчета</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyShare}
          className="glass px-3 py-1.5 rounded-lg text-xs text-white/70 hover:text-white flex items-center gap-2"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Скопировано' : 'Поделиться'}
        </motion.button>
      </div>

      {/* Основной результат */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-4 text-center"
        >
          <Lightbulb className="w-6 h-6 mx-auto mb-2 text-primary-warm" />
          <div className="text-3xl font-bold text-white mb-1">
            <AnimatedCounter value={result.requiredLumens} suffix=" лм" />
          </div>
          <div className="text-xs text-white/50">Световой поток</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-4 text-center"
        >
          <Grid3X3 className="w-6 h-6 mx-auto mb-2 text-primary-cool" />
          <div className="text-3xl font-bold text-white mb-1">
            <AnimatedCounter value={result.numberOfFixtures} suffix=" шт" />
          </div>
          <div className="text-xs text-white/50">Светильников</div>
        </motion.div>
      </div>

      {/* Детали */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center py-2 border-b border-white/10"
        >
          <span className="text-sm text-white/60">Площадь комнаты</span>
          <span className="text-sm font-medium text-white">
            {result.area.toFixed(1)} м²
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center py-2 border-b border-white/10"
        >
          <span className="text-sm text-white/60">Мощность одной лампы</span>
          <span className="text-sm font-medium text-white">
            {result.standardWattage} Вт
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center py-2 border-b border-white/10"
        >
          <span className="text-sm text-white/60">Общая мощность</span>
          <span className="text-sm font-medium text-white">
            {result.totalPower} Вт
          </span>
        </motion.div>

        {bulbData && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-between items-center py-2"
          >
            <span className="text-sm text-white/60 flex items-center gap-2">
              <Zap size={14} />
              Эффективность
            </span>
            <span className="text-sm font-medium text-white">
              {bulbData.lumensPerWatt} лм/Вт
            </span>
          </motion.div>
        )}
      </div>

      {/* Рекомендация */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-xl p-4 bg-gradient-to-r from-primary-warm/10 to-primary-cool/10"
      >
        <div className="text-sm text-white/80">
          <span className="font-medium text-white">Рекомендация:</span>{' '}
          Разместите {result.numberOfFixtures} светильника с LED лампами по {result.standardWattage} Вт 
          равномерно по потолку для оптимального освещения.
        </div>
      </motion.div>
    </Card>
  );
}
