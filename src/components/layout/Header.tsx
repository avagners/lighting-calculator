import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 py-8"
    >
      <div className="flex items-center justify-center gap-4 mb-4">
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
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
        <span className="text-gradient">Калькулятор света</span>
      </h1>
      
      <p className="text-center text-white/50 text-lg max-w-md mx-auto">
        Рассчитайте идеальное освещение для вашей комнаты
      </p>
    </motion.header>
  );
}
