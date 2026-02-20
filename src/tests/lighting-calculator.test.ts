import { describe, it, expect } from 'vitest';
import {
  calculateArea,
  calculateMountingHeight,
  calculateRoomIndex,
  calculateUtilizationFactor,
  calculateRequiredLumens,
  calculateNumberOfFixtures,
  calculateBulbWattage,
  getBulbLumens,
  findNearestStandardWattage,
  performFullCalculation,
  calculateOptimalFixtureLayout,
} from '../lib/lighting-calculator';

describe('lighting-calculator', () => {
  describe('calculateArea', () => {
    it('должен правильно рассчитывать площадь комнаты', () => {
      expect(calculateArea(4, 3)).toBe(12);
      expect(calculateArea(5, 5)).toBe(25);
      expect(calculateArea(3.5, 2.5)).toBe(8.75);
    });

    it('должен возвращать 0 для нулевых значений', () => {
      expect(calculateArea(0, 5)).toBe(0);
      expect(calculateArea(5, 0)).toBe(0);
    });
  });

  describe('calculateMountingHeight', () => {
    it('должен правильно рассчитывать высоту подвеса', () => {
      // ceilingHeight - workSurfaceHeight - fixtureDrop
      expect(calculateMountingHeight(2.7, 0.8, 0.1)).toBeCloseTo(1.8, 1);
      expect(calculateMountingHeight(3.0, 0.75, 0.1)).toBeCloseTo(2.15, 1);
    });

    it('должен использовать значение по умолчанию для workSurfaceHeight', () => {
      expect(calculateMountingHeight(2.7)).toBeCloseTo(1.8, 1);
    });
  });

  describe('calculateRoomIndex', () => {
    it('должен правильно рассчитывать индекс помещения', () => {
      // i = S / (h × (a + b))
      const area = 12; // 4x3
      const length = 4;
      const width = 3;
      const mountingHeight = 1.8;
      
      const expected = area / (mountingHeight * (length + width));
      expect(calculateRoomIndex(area, length, width, mountingHeight)).toBeCloseTo(expected, 2);
    });

    it('должен возвращать 0 для нулевой высоты подвеса', () => {
      expect(calculateRoomIndex(12, 4, 3, 0)).toBe(0);
    });
  });

  describe('calculateUtilizationFactor', () => {
    it('должен возвращать базовый коэффициент для средних значений', () => {
      const factor = calculateUtilizationFactor(1.5, 0.5, 0.5, 0.3);
      expect(factor).toBeGreaterThan(0.3);
      expect(factor).toBeLessThan(0.8);
    });

    it('должен увеличиваться с ростом коэффициентов отражения', () => {
      const lowReflect = calculateUtilizationFactor(1.5, 0.1, 0.1, 0.1);
      const highReflect = calculateUtilizationFactor(1.5, 0.7, 0.7, 0.7);
      expect(highReflect).toBeGreaterThan(lowReflect);
    });

    it('должен увеличиваться с ростом индекса помещения', () => {
      const lowIndex = calculateUtilizationFactor(0.5, 0.5, 0.5, 0.3);
      const highIndex = calculateUtilizationFactor(3.0, 0.5, 0.5, 0.3);
      expect(highIndex).toBeGreaterThan(lowIndex);
    });

    it('не должен превышать 0.8', () => {
      const factor = calculateUtilizationFactor(5, 0.7, 0.7, 0.7);
      expect(factor).toBeLessThanOrEqual(0.8);
    });
  });

  describe('calculateRequiredLumens', () => {
    it('должен правильно рассчитывать световой поток для спальни', () => {
      // 150 lux × area × maintenance × uniformity / utilization
      const lumens = calculateRequiredLumens('bedroom', 12, 0.5);
      expect(lumens).toBeGreaterThan(0);
    });

    it('должен возвращать больше люмен для кухни чем для спальни', () => {
      const bedroomLumens = calculateRequiredLumens('bedroom', 12, 0.5);
      const kitchenLumens = calculateRequiredLumens('kitchen', 12, 0.5);
      expect(kitchenLumens).toBeGreaterThan(bedroomLumens);
    });

    it('должен возвращать 0 для несуществующего типа помещения', () => {
      // @ts-expect-error - тест для невалидного значения
      expect(calculateRequiredLumens('invalid', 12, 0.5)).toBe(0);
    });
  });

  describe('calculateNumberOfFixtures', () => {
    it('должен правильно рассчитывать количество светильников', () => {
      expect(calculateNumberOfFixtures(3000, 1000, 1)).toBe(3);
      expect(calculateNumberOfFixtures(2500, 1000, 1)).toBe(3); // округление вверх
      expect(calculateNumberOfFixtures(2000, 1000, 1)).toBe(2);
    });

    it('должен учитывать количество ламп в светильнике', () => {
      expect(calculateNumberOfFixtures(3000, 1000, 2)).toBe(2);
      expect(calculateNumberOfFixtures(6000, 1000, 3)).toBe(2);
    });
  });

  describe('calculateBulbWattage', () => {
    it('должен правильно рассчитывать мощность для LED', () => {
      // LED: 100 lm/W
      const wattage = calculateBulbWattage('led-neutral', 1000);
      expect(wattage).toBe(10);
    });

    it('должен правильно рассчитывать мощность для ламп накаливания', () => {
      // Incandescent: 15 lm/W
      const wattage = calculateBulbWattage('incandescent', 150);
      expect(wattage).toBe(10);
    });

    it('должен возвращать 0 для несуществующего типа лампы', () => {
      // @ts-expect-error - тест для невалидного значения
      expect(calculateBulbWattage('invalid', 1000)).toBe(0);
    });
  });

  describe('getBulbLumens', () => {
    it('должен правильно рассчитывать световой поток для LED', () => {
      expect(getBulbLumens('led-neutral', 10)).toBe(1000);
      expect(getBulbLumens('led-warm', 15)).toBe(1500);
    });

    it('должен правильно рассчитывать световой поток для люминесцентных', () => {
      // Fluorescent: 60 lm/W
      expect(getBulbLumens('fluorescent', 10)).toBe(600);
    });

    it('должен возвращать 0 для несуществующего типа лампы', () => {
      // @ts-expect-error - тест для невалидного значения
      expect(getBulbLumens('invalid', 10)).toBe(0);
    });
  });

  describe('findNearestStandardWattage', () => {
    it('должен находить ближайшую стандартную мощность', () => {
      expect(findNearestStandardWattage(8)).toBe(9);
      expect(findNearestStandardWattage(12)).toBe(15);
      expect(findNearestStandardWattage(50)).toBe(60);
    });

    it('должен возвращать ближайшую стандартную мощность для значений в списке', () => {
      // Функция возвращает значение >= входного, поэтому 10 -> 11 (следующее после 9)
      expect(findNearestStandardWattage(10)).toBe(11);
      expect(findNearestStandardWattage(60)).toBe(60);
    });

    it('должен возвращать максимальное значение для очень больших чисел', () => {
      expect(findNearestStandardWattage(500)).toBe(100);
    });

    it('должен возвращать минимальное значение для очень маленьких чисел', () => {
      expect(findNearestStandardWattage(1)).toBe(3);
    });
  });

  describe('performFullCalculation', () => {
    it('должен выполнять полный расчет освещения', () => {
      const result = performFullCalculation(
        4, // length
        3, // width
        2.7, // ceilingHeight
        0.8, // workSurfaceHeight
        'living', // roomType
        'led-neutral', // bulbType
        0.7, // ceilingReflection
        0.5, // wallReflection
        0.3, // floorReflection
        10 // targetWattage
      );

      expect(result.area).toBe(12);
      expect(result.requiredLumens).toBeGreaterThan(0);
      expect(result.numberOfFixtures).toBeGreaterThan(0);
      expect(result.standardWattage).toBeGreaterThan(0);
      expect(result.totalPower).toBeGreaterThan(0);
    });

    it('должен возвращать больше светильников для кухни чем для спальни', () => {
      const bedroomResult = performFullCalculation(
        4, 3, 2.7, 0.8, 'bedroom', 'led-neutral',
        0.7, 0.5, 0.3, 10
      );
      const kitchenResult = performFullCalculation(
        4, 3, 2.7, 0.8, 'kitchen', 'led-neutral',
        0.7, 0.5, 0.3, 10
      );

      expect(kitchenResult.requiredLumens).toBeGreaterThan(bedroomResult.requiredLumens);
    });
  });

  describe('calculateOptimalFixtureLayout', () => {
    it('должен рассчитывать оптимальное расположение светильников', () => {
      const layout = calculateOptimalFixtureLayout(4, 3, 4);

      expect(layout.rows).toBeGreaterThan(0);
      expect(layout.cols).toBeGreaterThan(0);
      expect(layout.positions).toHaveLength(4);
      expect(layout.rows * layout.cols).toBeGreaterThanOrEqual(4);
    });

    it('должен располагать светильники равномерно', () => {
      const layout = calculateOptimalFixtureLayout(5, 5, 9);

      expect(layout.positions).toHaveLength(9);
      // Все позиции должны быть в пределах комнаты
      layout.positions.forEach(pos => {
        expect(pos.x).toBeGreaterThan(0);
        expect(pos.y).toBeGreaterThan(0);
        expect(pos.x).toBeLessThan(5);
        expect(pos.y).toBeLessThan(5);
      });
    });

    it('должен обрабатывать случай с одним светильником', () => {
      const layout = calculateOptimalFixtureLayout(4, 3, 1);

      expect(layout.positions).toHaveLength(1);
      expect(layout.rows).toBe(1);
      expect(layout.cols).toBe(1);
    });
  });
});
