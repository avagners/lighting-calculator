import { motion } from 'framer-motion';
import { X, Book, Ruler, Lightbulb, CheckCircle } from 'lucide-react';
import { version } from '../../version.json';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 glass rounded-t-2xl p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Book className="w-6 h-6 text-primary-warm" />
            <h2 className="text-xl font-bold text-white">О калькуляторе</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Методика расчёта */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-primary-cool" />
              Методика расчёта
            </h3>
            <div className="glass rounded-xl p-4 space-y-3">
              <p className="text-white/80 text-sm leading-relaxed">
                Расчёт производится по формуле светотехнического расчёта согласно 
                <strong className="text-white"> СНиП 23-05-95</strong> «Естественное и искусственное освещение»:
              </p>
              <div className="glass rounded-lg p-4 font-mono text-sm text-center text-primary-warm">
                Φ = (Е × S × K × Z) / η
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                <div><strong className="text-white">Φ</strong> — световой поток (лм)</div>
                <div><strong className="text-white">Е</strong> — освещённость (лк)</div>
                <div><strong className="text-white">S</strong> — площадь (м²)</div>
                <div><strong className="text-white">K</strong> — коэффициент запаса</div>
                <div><strong className="text-white">Z</strong> — коэффициент неравномерности</div>
                <div><strong className="text-white">η</strong> — коэффициент использования</div>
              </div>
            </div>
          </section>

          {/* Нормы освещённости */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary-warm" />
              Нормы освещённости (СНиП)
            </h3>
            <div className="grid gap-2">
              {[
                { room: 'Спальня', lux: 150, desc: 'Уютный свет для отдыха' },
                { room: 'Гостиная', lux: 200, desc: 'Общий свет для приёма гостей' },
                { room: 'Кухня', lux: 300, desc: 'Яркое рабочее освещение' },
                { room: 'Офис/Кабинет', lux: 300, desc: 'Свет для работы без бликов' },
                { room: 'Ванная', lux: 250, desc: 'Яркий свет для влажной зоны' },
                { room: 'Детская', lux: 200, desc: 'Мягкий рассеянный свет' },
              ].map((item) => (
                <div
                  key={item.room}
                  className="glass rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="text-white font-medium">{item.room}</div>
                    <div className="text-xs text-white/50">{item.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-warm">{item.lux}</div>
                    <div className="text-xs text-white/50">люкс</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Коэффициенты */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4">Коэффициенты</h3>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between glass rounded-lg p-3">
                <span>Коэффициент запаса (K)</span>
                <span className="text-primary-cool font-mono">1.2</span>
              </div>
              <div className="flex justify-between glass rounded-lg p-3">
                <span>Коэффициент неравномерности (Z)</span>
                <span className="text-primary-cool font-mono">1.1</span>
              </div>
            </div>
            <p className="text-xs text-white/50 mt-3">
              * Коэффициент запаса учитывает загрязнение и старение ламп со временем
            </p>
          </section>

          {/* Преимущества */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4">Преимущества</h3>
            <div className="grid gap-2">
              {[
                'Бесплатный онлайн-расчёт без регистрации',
                'Соответствие строительным нормам (СНиП)',
                'Визуализация расстановки светильников',
                'Сохранение результатов в браузере',
                'Адаптивный дизайн для мобильных',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 glass rounded-lg p-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 glass rounded-b-2xl p-4 border-t border-white/10">
          <p className="text-xs text-white/40 text-center">
            Версия приложения: v{version} • Расчёт по СНиП 23-05-95
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
