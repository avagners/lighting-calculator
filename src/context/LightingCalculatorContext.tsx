import { createContext, useContext } from 'react';
import type { UseLightingCalculatorReturn } from '../hooks/useLightingCalculator';

export const LightingCalculatorContext = createContext<UseLightingCalculatorReturn | null>(null);

export function useLightingCalculator() {
  const context = useContext(LightingCalculatorContext);
  if (!context) {
    throw new Error(
      'useLightingCalculator must be used within a LightingCalculatorProvider'
    );
  }
  return context;
}
