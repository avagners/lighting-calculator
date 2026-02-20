import { useState, useEffect, useCallback } from 'react';
import type { RoomType, BulbType, SurfaceColor } from '../types/lighting';
import type { LightingCalculationResult } from '../lib/lighting-calculator';
import { performFullCalculation } from '../lib/lighting-calculator';

export interface CalculatorState {
  // Параметры комнаты
  length: number;
  width: number;
  ceilingHeight: number;
  workSurfaceHeight: number;

  // Тип помещения
  roomType: RoomType;

  // Тип ламп
  bulbType: BulbType;
  targetWattage: number;

  // Коэффициенты отражения
  ceilingColor: SurfaceColor;
  wallColor: SurfaceColor;
  floorColor: SurfaceColor;
}

export interface UseLightingCalculatorReturn {
  state: CalculatorState;
  result: LightingCalculationResult | null;
  updateState: <K extends keyof CalculatorState>(key: K, value: CalculatorState[K]) => void;
  generateShareUrl: () => string;
  copyShareUrl: () => Promise<boolean>;
  resetToDefaults: () => void;
}

const DEFAULT_STATE: CalculatorState = {
  length: 4,
  width: 3,
  ceilingHeight: 2.7,
  workSurfaceHeight: 0.8,
  roomType: 'living',
  bulbType: 'led-neutral',
  targetWattage: 10,
  ceilingColor: 'white',
  wallColor: 'light-beige',
  floorColor: 'gray',
};

const STORAGE_KEY = 'lighting-calculator-state';

export function useLightingCalculator(): UseLightingCalculatorReturn {
  const [state, setState] = useState<CalculatorState>(() => {
    // Попытка загрузки из localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
    return DEFAULT_STATE;
  });

  const [result, setResult] = useState<LightingCalculationResult | null>(null);

  // Загрузка из URL параметров
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlState: Partial<CalculatorState> = {};

    if (params.has('l')) urlState.length = parseFloat(params.get('l')!);
    if (params.has('w')) urlState.width = parseFloat(params.get('w')!);
    if (params.has('h')) urlState.ceilingHeight = parseFloat(params.get('h')!);
    if (params.has('rt')) urlState.roomType = params.get('rt') as RoomType;
    if (params.has('bt')) urlState.bulbType = params.get('bt') as BulbType;

    if (Object.keys(urlState).length > 0) {
      setState(prev => ({ ...prev, ...urlState }));
    }
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state]);

  // Расчет при изменении параметров
  useEffect(() => {
    const ceilingRef = getReflectionCoefficient(state.ceilingColor);
    const wallRef = getReflectionCoefficient(state.wallColor);
    const floorRef = getReflectionCoefficient(state.floorColor);

    const calculationResult = performFullCalculation(
      state.length,
      state.width,
      state.ceilingHeight,
      state.workSurfaceHeight,
      state.roomType,
      state.bulbType,
      ceilingRef,
      wallRef,
      floorRef,
      state.targetWattage
    );

    setResult(calculationResult);
  }, [state]);

  const updateState = useCallback(<K extends keyof CalculatorState>(
    key: K,
    value: CalculatorState[K]
  ) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  // Генерация shareable URL
  const generateShareUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.set('l', state.length.toString());
    params.set('w', state.width.toString());
    params.set('h', state.ceilingHeight.toString());
    params.set('rt', state.roomType);
    params.set('bt', state.bulbType);

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    return url;
  }, [state]);

  const copyShareUrl = useCallback(async () => {
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (e) {
      console.error('Failed to copy URL', e);
      return false;
    }
  }, [generateShareUrl]);

  const resetToDefaults = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return {
    state,
    result,
    updateState,
    generateShareUrl,
    copyShareUrl,
    resetToDefaults,
  };
}

// Helper для получения коэффициента отражения
function getReflectionCoefficient(color: SurfaceColor): number {
  const coefficients: Record<SurfaceColor, number> = {
    'white': 0.7,
    'light-beige': 0.5,
    'gray': 0.3,
    'dark': 0.1,
  };
  return coefficients[color];
}
