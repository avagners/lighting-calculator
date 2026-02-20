import { describe, it, expect } from 'vitest';
import {
  ROOM_TYPES,
  BULB_TYPES,
  SURFACE_COLORS,
  STANDARD_BULB_WATTAGES,
} from '../types/lighting';

describe('Lighting Types & Constants', () => {
  describe('ROOM_TYPES', () => {
    it('должен содержать все типы помещений', () => {
      expect(ROOM_TYPES).toHaveLength(6);
      
      const ids = ROOM_TYPES.map(r => r.id);
      expect(ids).toContain('bedroom');
      expect(ids).toContain('living');
      expect(ids).toContain('kitchen');
      expect(ids).toContain('office');
      expect(ids).toContain('bathroom');
      expect(ids).toContain('nursery');
    });

    it('должен иметь правильные нормы освещенности', () => {
      const bedroom = ROOM_TYPES.find(r => r.id === 'bedroom');
      const kitchen = ROOM_TYPES.find(r => r.id === 'kitchen');
      const office = ROOM_TYPES.find(r => r.id === 'office');

      expect(bedroom?.lux).toBe(150);
      expect(kitchen?.lux).toBe(300);
      expect(office?.lux).toBe(300);
    });

    it('должен иметь цветовые температуры', () => {
      ROOM_TYPES.forEach(room => {
        expect(room.colorTemp).toBeGreaterThan(0);
        expect(room.colorTemp).toBeLessThanOrEqual(10000);
      });
    });

    it('должен иметь акцентные цвета', () => {
      ROOM_TYPES.forEach(room => {
        expect(room.accentColor).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('должен иметь русские названия', () => {
      ROOM_TYPES.forEach(room => {
        expect(room.nameRu).toBeTruthy();
        expect(room.nameRu.length).toBeGreaterThan(0);
      });
    });

    it('должен иметь описания', () => {
      ROOM_TYPES.forEach(room => {
        expect(room.description).toBeTruthy();
        expect(room.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('BULB_TYPES', () => {
    it('должен содержать все типы ламп', () => {
      expect(BULB_TYPES).toHaveLength(5);
      
      const ids = BULB_TYPES.map(b => b.id);
      expect(ids).toContain('led-warm');
      expect(ids).toContain('led-neutral');
      expect(ids).toContain('led-cold');
      expect(ids).toContain('fluorescent');
      expect(ids).toContain('incandescent');
    });

    it('должен иметь правильную эффективность для LED', () => {
      const ledTypes = BULB_TYPES.filter(b => b.id.startsWith('led'));
      ledTypes.forEach(led => {
        expect(led.lumensPerWatt).toBe(100);
      });
    });

    it('должен иметь правильную эффективность для люминесцентных', () => {
      const fluorescent = BULB_TYPES.find(b => b.id === 'fluorescent');
      expect(fluorescent?.lumensPerWatt).toBe(60);
    });

    it('должен иметь правильную эффективность для ламп накаливания', () => {
      const incandescent = BULB_TYPES.find(b => b.id === 'incandescent');
      expect(incandescent?.lumensPerWatt).toBe(15);
    });

    it('должен иметь цветовые температуры', () => {
      const warmLed = BULB_TYPES.find(b => b.id === 'led-warm');
      const neutralLed = BULB_TYPES.find(b => b.id === 'led-neutral');
      const coldLed = BULB_TYPES.find(b => b.id === 'led-cold');

      expect(warmLed?.colorTemp).toBe(2700);
      expect(neutralLed?.colorTemp).toBe(4000);
      expect(coldLed?.colorTemp).toBe(6500);
    });

    it('должен иметь русские названия', () => {
      BULB_TYPES.forEach(bulb => {
        expect(bulb.nameRu).toBeTruthy();
        expect(bulb.nameRu.length).toBeGreaterThan(0);
      });
    });

    it('должен иметь описания', () => {
      BULB_TYPES.forEach(bulb => {
        expect(bulb.description).toBeTruthy();
        expect(bulb.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('SURFACE_COLORS', () => {
    it('должен содержать все цвета поверхностей', () => {
      expect(SURFACE_COLORS).toHaveLength(4);
      
      const ids = SURFACE_COLORS.map(s => s.id);
      expect(ids).toContain('white');
      expect(ids).toContain('light-beige');
      expect(ids).toContain('gray');
      expect(ids).toContain('dark');
    });

    it('должен иметь правильные коэффициенты отражения', () => {
      const white = SURFACE_COLORS.find(s => s.id === 'white');
      const dark = SURFACE_COLORS.find(s => s.id === 'dark');

      expect(white?.reflectionCoefficient).toBe(0.7);
      expect(dark?.reflectionCoefficient).toBe(0.1);
    });

    it('должен иметь коэффициенты отражения в порядке убывания', () => {
      const coefficients = SURFACE_COLORS.map(s => s.reflectionCoefficient);
      expect(coefficients).toEqual([0.7, 0.5, 0.3, 0.1]);
    });

    it('должен иметь HEX цвета', () => {
      SURFACE_COLORS.forEach(color => {
        expect(color.color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('должен иметь русские названия', () => {
      SURFACE_COLORS.forEach(color => {
        expect(color.nameRu).toBeTruthy();
        expect(color.nameRu.length).toBeGreaterThan(0);
      });
    });
  });

  describe('STANDARD_BULB_WATTAGES', () => {
    it('должен содержать стандартные мощности', () => {
      expect(STANDARD_BULB_WATTAGES).toEqual([
        3, 5, 7, 9, 11, 15, 18, 20, 25, 30, 40, 60, 75, 100
      ]);
    });

    it('должен быть отсортирован по возрастанию', () => {
      const sorted = [...STANDARD_BULB_WATTAGES].sort((a, b) => a - b);
      expect(STANDARD_BULB_WATTAGES).toEqual(sorted);
    });

    it('должен содержать минимальную мощность 3 Вт', () => {
      expect(STANDARD_BULB_WATTAGES[0]).toBe(3);
    });

    it('должен содержать максимальную мощность 100 Вт', () => {
      expect(STANDARD_BULB_WATTAGES[STANDARD_BULB_WATTAGES.length - 1]).toBe(100);
    });

    it('должен содержать популярные мощности', () => {
      expect(STANDARD_BULB_WATTAGES).toContain(11);
      expect(STANDARD_BULB_WATTAGES).toContain(60);
      expect(STANDARD_BULB_WATTAGES).toContain(75);
    });
  });

  describe('Cross-validation', () => {
    it('должен иметь согласованные цветовые температуры между ROOM_TYPES и BULB_TYPES', () => {
      const roomColorTemps = ROOM_TYPES.map(r => r.colorTemp);
      const bulbColorTemps = BULB_TYPES.map(b => b.colorTemp);
      
      // Проверяем что есть пересечения
      const hasOverlap = roomColorTemps.some(temp => 
        bulbColorTemps.includes(temp)
      );
      expect(hasOverlap).toBe(true);
    });

    it('все коэффициенты отражения должны быть в диапазоне 0-1', () => {
      SURFACE_COLORS.forEach(color => {
        expect(color.reflectionCoefficient).toBeGreaterThanOrEqual(0);
        expect(color.reflectionCoefficient).toBeLessThanOrEqual(1);
      });
    });

    it('все нормы освещенности должны быть положительными', () => {
      ROOM_TYPES.forEach(room => {
        expect(room.lux).toBeGreaterThan(0);
        expect(room.lux).toBeLessThan(1000);
      });
    });

    it('все эффективности ламп должны быть положительными', () => {
      BULB_TYPES.forEach(bulb => {
        expect(bulb.lumensPerWatt).toBeGreaterThan(0);
        expect(bulb.lumensPerWatt).toBeLessThan(200);
      });
    });
  });
});
