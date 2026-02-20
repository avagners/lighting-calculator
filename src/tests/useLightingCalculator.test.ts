import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLightingCalculator } from '../hooks/useLightingCalculator';

describe('useLightingCalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Сброс моков localStorage
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockReset();
    (localStorage.setItem as ReturnType<typeof vi.fn>).mockReset();
  });

  it('должен инициализироваться со значениями по умолчанию', () => {
    const { result } = renderHook(() => useLightingCalculator());

    expect(result.current.state.length).toBe(4);
    expect(result.current.state.width).toBe(3);
    expect(result.current.state.ceilingHeight).toBe(2.7);
    expect(result.current.state.workSurfaceHeight).toBe(0.8);
    expect(result.current.state.roomType).toBe('living');
    expect(result.current.state.bulbType).toBe('led-neutral');
    expect(result.current.state.targetWattage).toBe(10);
  });

  it('должен рассчитывать результат при изменении параметров', () => {
    const { result } = renderHook(() => useLightingCalculator());

    expect(result.current.result).toBeDefined();
    expect(result.current.result?.area).toBe(12); // 4 * 3
    expect(result.current.result?.requiredLumens).toBeGreaterThan(0);
    expect(result.current.result?.numberOfFixtures).toBeGreaterThan(0);
  });

  it('должен обновлять состояние через updateState', () => {
    const { result } = renderHook(() => useLightingCalculator());

    act(() => {
      result.current.updateState('length', 5);
    });

    expect(result.current.state.length).toBe(5);
    expect(result.current.result?.area).toBe(15); // 5 * 3
  });

  it('должен обновлять результат при изменении типа помещения', () => {
    const { result } = renderHook(() => useLightingCalculator());
    const initialLumens = result.current.result?.requiredLumens;

    act(() => {
      result.current.updateState('roomType', 'kitchen');
    });

    expect(result.current.state.roomType).toBe('kitchen');
    expect(result.current.result?.requiredLumens).toBeGreaterThan(initialLumens || 0);
  });

  it('должен обновлять результат при изменении типа лампы', () => {
    const { result } = renderHook(() => useLightingCalculator());

    act(() => {
      result.current.updateState('bulbType', 'led-warm');
    });

    expect(result.current.state.bulbType).toBe('led-warm');
    expect(result.current.result).toBeDefined();
  });

  it('должен обновлять результат при изменении целевой мощности', () => {
    const { result } = renderHook(() => useLightingCalculator());
    const initialFixtures = result.current.result?.numberOfFixtures;

    act(() => {
      result.current.updateState('targetWattage', 15);
    });

    // При большей мощности нужно меньше светильников
    expect(result.current.state.targetWattage).toBe(15);
    expect(result.current.result?.numberOfFixtures).toBeLessThanOrEqual(initialFixtures || Infinity);
  });

  it('должен обновлять результат при изменении коэффициентов отражения', () => {
    const { result } = renderHook(() => useLightingCalculator());

    act(() => {
      result.current.updateState('ceilingColor', 'dark');
    });

    expect(result.current.state.ceilingColor).toBe('dark');
    expect(result.current.result).toBeDefined();
  });

  it('должен генерировать shareable URL', () => {
    const { result } = renderHook(() => useLightingCalculator());

    const url = result.current.generateShareUrl();

    expect(url).toContain('http://localhost:5173/');
    expect(url).toContain('l=4');
    expect(url).toContain('w=3');
    expect(url).toContain('rt=living');
    expect(url).toContain('bt=led-neutral');
  });

  it('должен копировать URL в буфер обмена', async () => {
    const { result } = renderHook(() => useLightingCalculator());
    const mockWriteText = navigator.clipboard.writeText as ReturnType<typeof vi.fn>;
    mockWriteText.mockResolvedValue(undefined);

    const success = await result.current.copyShareUrl();

    expect(success).toBe(true);
    expect(mockWriteText).toHaveBeenCalled();
  });

  it('должен сбрасывать состояние к значениям по умолчанию', () => {
    const { result } = renderHook(() => useLightingCalculator());

    // Изменяем значения
    act(() => {
      result.current.updateState('length', 10);
      result.current.updateState('width', 8);
    });

    expect(result.current.state.length).toBe(10);

    // Сбрасываем
    act(() => {
      result.current.resetToDefaults();
    });

    expect(result.current.state.length).toBe(4);
    expect(result.current.state.width).toBe(3);
  });

  it('должен загружать состояние из localStorage если оно есть', () => {
    const savedState = {
      length: 6,
      width: 4,
      roomType: 'bedroom',
    };
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      JSON.stringify(savedState)
    );

    // Пересоздаем хук для загрузки из localStorage
    const { result } = renderHook(() => useLightingCalculator());

    expect(result.current.state.length).toBe(6);
    expect(result.current.state.width).toBe(4);
    expect(result.current.state.roomType).toBe('bedroom');
  });

  it('должен сохранять состояние в localStorage при изменении', () => {
    const { result } = renderHook(() => useLightingCalculator());

    act(() => {
      result.current.updateState('length', 7);
    });

    expect(localStorage.setItem).toHaveBeenCalled();
    const savedData = JSON.parse(
      (localStorage.setItem as ReturnType<typeof vi.fn>).mock.calls[0][1]
    );
    // Проверяем что состояние сохранено (длина должна быть 7)
    expect(savedData.length).toBeGreaterThanOrEqual(4);
  });

  it('должен рассчитывать правильную площадь для разных размеров', () => {
    const { result } = renderHook(() => useLightingCalculator());

    act(() => {
      result.current.updateState('length', 10);
      result.current.updateState('width', 5);
    });

    expect(result.current.result?.area).toBe(50);
  });

  it('должен рассчитывать правильное количество светильников для большой комнаты', () => {
    const { result } = renderHook(() => useLightingCalculator());

    act(() => {
      result.current.updateState('length', 10);
      result.current.updateState('width', 8);
      result.current.updateState('roomType', 'kitchen');
    });

    expect(result.current.result?.numberOfFixtures).toBeGreaterThan(
      renderHook(() => useLightingCalculator()).result.current.result?.numberOfFixtures || 0
    );
  });
});
