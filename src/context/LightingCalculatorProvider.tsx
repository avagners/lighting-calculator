import { LightingCalculatorContext } from './LightingCalculatorContext';
import { useLightingCalculator } from '../hooks/useLightingCalculator';

export function LightingCalculatorProvider({ children }: { children: React.ReactNode }) {
  const value = useLightingCalculator();

  return (
    <LightingCalculatorContext.Provider value={value}>
      {children}
    </LightingCalculatorContext.Provider>
  );
}
