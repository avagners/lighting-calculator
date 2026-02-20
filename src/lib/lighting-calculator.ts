/**
 * Утилиты для расчета освещенности по СНиП 23-05-95
 * 
 * Основная формула:
 * Ф = (Е × S × K × Z) / (N × η × n)
 * 
 * Где:
 * Ф - световой поток одной лампы (лм)
 * Е - норма освещенности (лк)
 * S - площадь помещения (м²)
 * K - коэффициент запаса (1.2-1.5)
 * Z - коэффициент неравномерности (1.1-1.2)
 * N - количество светильников
 * η - коэффициент использования светового потока
 * n - количество ламп в светильнике
 */

import type { RoomType, BulbType } from '../types/lighting';
import { ROOM_TYPES, BULB_TYPES } from '../types/lighting';

// Коэффициент запаса (учитывает загрязнение и старение ламп)
const MAINTENANCE_FACTOR = 1.2;

// Коэффициент неравномерности освещения
const UNIFORMITY_FACTOR = 1.1;

/**
 * Расчет площади помещения
 */
export function calculateArea(length: number, width: number): number {
  return length * width;
}

/**
 * Расчет высоты подвеса светильника над рабочей поверхностью
 */
export function calculateMountingHeight(
  ceilingHeight: number,
  workSurfaceHeight: number = 0.8,
  fixtureDrop: number = 0.1
): number {
  return ceilingHeight - workSurfaceHeight - fixtureDrop;
}

/**
 * Расчет индекса помещения (для определения коэффициента использования)
 * i = S / (h × (a + b))
 */
export function calculateRoomIndex(
  area: number,
  length: number,
  width: number,
  mountingHeight: number
): number {
  if (mountingHeight <= 0) return 0;
  return area / (mountingHeight * (length + width));
}

/**
 * Расчет коэффициента использования светового потока (η)
 * На основе коэффициентов отражения поверхностей и индекса помещения
 */
export function calculateUtilizationFactor(
  roomIndex: number,
  ceilingReflection: number,
  wallReflection: number,
  floorReflection: number
): number {
  // Базовый коэффициент использования
  let baseUtilization = 0.3;

  // Влияние коэффициентов отражения
  const avgReflection = (ceilingReflection + wallReflection + floorReflection) / 3;
  
  // Корректировка по среднему отражению
  const reflectionBonus = avgReflection * 0.3;
  
  // Корректировка по индексу помещения
  let indexBonus = 0;
  if (roomIndex < 1) {
    indexBonus = roomIndex * 0.1;
  } else if (roomIndex < 2) {
    indexBonus = 0.1 + (roomIndex - 1) * 0.15;
  } else if (roomIndex < 3) {
    indexBonus = 0.25 + (roomIndex - 2) * 0.1;
  } else {
    indexBonus = 0.35;
  }

  baseUtilization = Math.min(0.8, baseUtilization + reflectionBonus + indexBonus);
  
  return baseUtilization;
}

/**
 * Расчет необходимого светового потока (люмен)
 * Ф = (Е × S × K × Z) / η
 */
export function calculateRequiredLumens(
  roomType: RoomType,
  area: number,
  utilizationFactor: number
): number {
  const roomData = ROOM_TYPES.find(r => r.id === roomType);
  if (!roomData) return 0;

  const requiredLux = roomData.lux;
  const requiredLumens = (requiredLux * area * MAINTENANCE_FACTOR * UNIFORMITY_FACTOR) / utilizationFactor;
  
  return Math.round(requiredLumens);
}

/**
 * Расчет количества светильников
 */
export function calculateNumberOfFixtures(
  requiredLumens: number,
  bulbLumens: number,
  lampsPerFixture: number = 1
): number {
  const lumensPerFixture = bulbLumens * lampsPerFixture;
  return Math.ceil(requiredLumens / lumensPerFixture);
}

/**
 * Расчет мощности одной лампы
 */
export function calculateBulbWattage(
  bulbType: BulbType,
  lumens: number
): number {
  const bulbData = BULB_TYPES.find(b => b.id === bulbType);
  if (!bulbData) return 0;

  return Math.round(lumens / bulbData.lumensPerWatt);
}

/**
 * Получение светового потока для стандартной лампы
 */
export function getBulbLumens(bulbType: BulbType, wattage: number): number {
  const bulbData = BULB_TYPES.find(b => b.id === bulbType);
  if (!bulbData) return 0;

  return bulbData.lumensPerWatt * wattage;
}

/**
 * Поиск ближайшей стандартной мощности лампы
 */
export function findNearestStandardWattage(wattage: number): number {
  const wattages = [3, 5, 7, 9, 11, 15, 18, 20, 25, 30, 40, 60, 75, 100];
  
  // Найти ближайшую мощность (в большую сторону)
  const nearest = wattages.find(w => w >= wattage);
  return nearest || wattages[wattages.length - 1];
}

/**
 * Полный расчет освещения
 */
export interface LightingCalculationResult {
  area: number;
  mountingHeight: number;
  roomIndex: number;
  utilizationFactor: number;
  requiredLumens: number;
  numberOfFixtures: number;
  bulbWattage: number;
  standardWattage: number;
  totalPower: number; // Общая мощность всех ламп
}

export function performFullCalculation(
  length: number,
  width: number,
  ceilingHeight: number,
  workSurfaceHeight: number,
  roomType: RoomType,
  bulbType: BulbType,
  ceilingReflection: number,
  wallReflection: number,
  floorReflection: number,
  targetWattage: number = 10
): LightingCalculationResult {
  const area = calculateArea(length, width);
  const mountingHeight = calculateMountingHeight(ceilingHeight, workSurfaceHeight);
  const roomIndex = calculateRoomIndex(area, length, width, mountingHeight);
  const utilizationFactor = calculateUtilizationFactor(
    roomIndex,
    ceilingReflection,
    wallReflection,
    floorReflection
  );
  
  const requiredLumens = calculateRequiredLumens(roomType, area, utilizationFactor);
  
  // Получаем световой поток для целевой мощности
  const bulbLumens = getBulbLumens(bulbType, targetWattage);
  const numberOfFixtures = calculateNumberOfFixtures(requiredLumens, bulbLumens);
  
  // Расчет мощности одной лампы
  const bulbWattage = calculateBulbWattage(bulbType, requiredLumens / numberOfFixtures);
  const standardWattage = findNearestStandardWattage(bulbWattage);
  
  // Общая мощность
  const totalPower = standardWattage * numberOfFixtures;
  
  return {
    area,
    mountingHeight,
    roomIndex,
    utilizationFactor,
    requiredLumens,
    numberOfFixtures,
    bulbWattage,
    standardWattage,
    totalPower,
  };
}

/**
 * Расчет оптимального количества светильников для равномерного освещения
 */
export function calculateOptimalFixtureLayout(
  length: number,
  width: number,
  numberOfFixtures: number
): { rows: number; cols: number; positions: { x: number; y: number }[] } {
  // Определяем оптимальное расположение (близкое к квадрату)
  const aspectRatio = length / width;
  const sqrtFixtures = Math.sqrt(numberOfFixtures);
  
  let cols = Math.round(sqrtFixtures * Math.sqrt(aspectRatio));
  let rows = Math.ceil(numberOfFixtures / cols);
  
  // Корректируем, если нужно
  if (rows * cols < numberOfFixtures) {
    cols = Math.ceil(numberOfFixtures / rows);
  }
  
  // Расчет позиций светильников
  const positions: { x: number; y: number }[] = [];
  const margin = 0.5; // Отступ от стен (м)
  
  const stepX = (length - 2 * margin) / Math.max(cols, 1);
  const stepY = (width - 2 * margin) / Math.max(rows, 1);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (positions.length < numberOfFixtures) {
        positions.push({
          x: margin + col * stepX + stepX / 2,
          y: margin + row * stepY + stepY / 2,
        });
      }
    }
  }
  
  return { rows, cols, positions };
}
