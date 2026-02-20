'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './components/ui/Card';
import { RoomDimensionsForm } from './components/calculator/RoomDimensionsForm';
import { RoomTypeSelector } from './components/calculator/RoomTypeSelector';
import { BulbTypeSelector } from './components/calculator/BulbTypeSelector';
import { SurfaceColorsForm } from './components/calculator/SurfaceColorsForm';
import { RoomVisualization } from './components/visualization/RoomVisualization';
import { ResultsPanel } from './components/calculator/ResultsPanel';
import { Header } from './components/layout/Header';
import { AnimatedBackground } from './components/layout/AnimatedBackground';
import { LightingCalculatorProvider, useLightingCalculator } from './context';
import { ROOM_TYPES } from './types/lighting';

function AppContent() {
  const { state } = useLightingCalculator();

  // Получаем акцентный цвет текущего типа помещения
  const accentColor = useMemo(() => {
    const room = ROOM_TYPES.find(r => r.id === state.roomType);
    return room?.accentColor || '#FFB347';
  }, [state.roomType]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Живой фон */}
      <AnimatedBackground accentColor={accentColor} />
      
      {/* Контент */}
      <div className="relative z-10 container mx-auto px-4 pb-12">
        <Header />
        
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Левая колонка - Параметры */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <Card>
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary-warm rounded-full" />
                Параметры комнаты
              </h2>
              <RoomDimensionsForm />
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary-cool rounded-full" />
                Тип помещения
              </h2>
              <RoomTypeSelector />
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary-warm to-primary-cool rounded-full" />
                Освещение
              </h2>
              <BulbTypeSelector />
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-white/50 rounded-full" />
                Поверхности
              </h2>
              <SurfaceColorsForm />
            </Card>
          </motion.div>

          {/* Правая колонка - Визуализация и результаты */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 order-1 lg:order-2 lg:sticky lg:top-6 lg:self-start"
          >
            <Card className="overflow-hidden">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary-cool to-primary-warm rounded-full" />
                Схема комнаты
              </h2>
              <RoomVisualization />
            </Card>

            <AnimatePresence mode="wait">
              <ResultsPanel />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Футер */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-white/30 text-sm"
        >
          <p>Расчет производится по СНиП 23-05-95 «Естественное и искусственное освещение»</p>
        </motion.footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <LightingCalculatorProvider>
      <AppContent />
    </LightingCalculatorProvider>
  );
}

export default App;
