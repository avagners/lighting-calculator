import { motion } from 'framer-motion';
import { Lightbulb, Info } from 'lucide-react';

interface HeaderProps {
  onOpenAbout: () => void;
}

export function Header({ onOpenAbout }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 py-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 179, 71, 0.3)',
                '0 0 40px rgba(255, 179, 71, 0.6)',
                '0 0 20px rgba(255, 179, 71, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-warm to-primary-cool flex items-center justify-center"
          >
            <Lightbulb className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-gradient">Калькулятор света</span>
            </h1>
            <p className="text-sm text-white/50">Расчёт по СНиП 23-05-95</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenAbout}
          className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">О проекте</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
