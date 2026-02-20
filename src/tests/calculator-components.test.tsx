import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { RoomDimensionsForm } from '../components/calculator/RoomDimensionsForm';
import { BulbTypeSelector } from '../components/calculator/BulbTypeSelector';
import { SurfaceColorsForm } from '../components/calculator/SurfaceColorsForm';
import { LightingCalculatorProvider } from '../context/LightingCalculatorProvider';

// Мокаем хук useLightingCalculator
vi.mock('../hooks/useLightingCalculator', () => ({
  useLightingCalculator: () => ({
    state: {
      length: 4,
      width: 3,
      ceilingHeight: 2.7,
      workSurfaceHeight: 0.8,
      bulbType: 'led-neutral',
      targetWattage: 10,
      ceilingColor: 'white',
      wallColor: 'light-beige',
      floorColor: 'gray',
      roomType: 'living',
    },
    updateState: vi.fn(),
    result: {
      area: 12,
      mountingHeight: 1.8,
      roomIndex: 1.5,
      utilizationFactor: 0.5,
      requiredLumens: 5000,
      numberOfFixtures: 5,
      bulbWattage: 10,
      standardWattage: 11,
      totalPower: 55,
    },
    generateShareUrl: vi.fn(),
    copyShareUrl: vi.fn(),
    resetToDefaults: vi.fn(),
  }),
}));

function renderWithProvider(component: ReactElement) {
  return render(
    <LightingCalculatorProvider>
      {component}
    </LightingCalculatorProvider>
  );
}

describe('Calculator Components', () => {
  describe('RoomDimensionsForm', () => {
    it('должен рендерить поля длины и ширины', () => {
      renderWithProvider(<RoomDimensionsForm />);
      
      // Ищем input по типу и значению, так как label не связан через htmlFor
      const lengthInput = screen.getByDisplayValue('4');
      const widthInput = screen.getByDisplayValue('3');
      
      expect(lengthInput).toBeInTheDocument();
      expect(widthInput).toBeInTheDocument();
    });

    it('должен рендерить слайдер высоты потолка', () => {
      renderWithProvider(<RoomDimensionsForm />);
      
      expect(screen.getByText(/высота потолка/i)).toBeInTheDocument();
    });

    it('должен рендерить слайдер высоты рабочей поверхности', () => {
      renderWithProvider(<RoomDimensionsForm />);
      
      expect(screen.getByText(/высота рабочей поверхности/i)).toBeInTheDocument();
    });

    it('должен отображать значения с суффиксом "м"', () => {
      renderWithProvider(<RoomDimensionsForm />);
      
      expect(screen.getAllByText('м')).toHaveLength(2);
    });

    it('должен отображать значения с суффиксом " м" для слайдеров', () => {
      renderWithProvider(<RoomDimensionsForm />);
      
      expect(screen.getAllByText(/м$/)).toHaveLength(4); // 2 input + 2 slider
    });
  });

  describe('BulbTypeSelector', () => {
    it('должен рендерить селект типа ламп', () => {
      renderWithProvider(<BulbTypeSelector />);
      
      expect(screen.getByText(/тип ламп/i)).toBeInTheDocument();
    });

    it('должен рендерить слайдер целевой мощности', () => {
      renderWithProvider(<BulbTypeSelector />);
      
      expect(screen.getByText(/целевая мощность/i)).toBeInTheDocument();
    });

    it('должен отображать LED опции', () => {
      renderWithProvider(<BulbTypeSelector />);
      
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      const options = Array.from(select.options).map(o => o.text);
      
      expect(options.some(o => o.includes('LED'))).toBe(true);
      expect(options.some(o => o.includes('Теплый'))).toBe(true);
      expect(options.some(o => o.includes('Нейтральный'))).toBe(true);
      expect(options.some(o => o.includes('Холодный'))).toBe(true);
    });

    it('должен отображать значения мощности с суффиксом " Вт"', () => {
      renderWithProvider(<BulbTypeSelector />);
      
      expect(screen.getByText('10 Вт')).toBeInTheDocument();
    });
  });

  describe('SurfaceColorsForm', () => {
    it('должен рендерить пикеры для потолка, стен и пола', () => {
      renderWithProvider(<SurfaceColorsForm />);
      
      expect(screen.getByText(/потолок/i)).toBeInTheDocument();
      expect(screen.getByText(/стены/i)).toBeInTheDocument();
      expect(screen.getByText(/пол/i)).toBeInTheDocument();
    });

    it('должен рендерить все цветовые опции', () => {
      renderWithProvider(<SurfaceColorsForm />);
      
      // Используем getAllByTitle так как есть несколько кнопок с одинаковым title
      const whiteButtons = screen.getAllByTitle('Белый (70%)');
      expect(whiteButtons).toHaveLength(3); // по одному для каждой поверхности
      
      const beigeButtons = screen.getAllByTitle('Светло-бежевый (50%)');
      expect(beigeButtons).toHaveLength(3);
      
      const grayButtons = screen.getAllByTitle('Серый (30%)');
      expect(grayButtons).toHaveLength(3);
      
      const darkButtons = screen.getAllByTitle('Темный (10%)');
      expect(darkButtons).toHaveLength(3);
    });

    it('должен отображать коэффициенты отражения в title', () => {
      renderWithProvider(<SurfaceColorsForm />);
      
      // Проверяем что в title есть проценты
      const allButtons = screen.getAllByRole('button');
      const titles = allButtons.map(btn => btn.getAttribute('title'));
      
      expect(titles.some(t => t?.includes('70%'))).toBe(true);
      expect(titles.some(t => t?.includes('50%'))).toBe(true);
      expect(titles.some(t => t?.includes('30%'))).toBe(true);
      expect(titles.some(t => t?.includes('10%'))).toBe(true);
    });
  });
});
