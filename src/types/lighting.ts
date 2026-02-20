// Типы помещений с нормами освещенности по СНиП (люкс)
export type RoomType = 'bedroom' | 'living' | 'kitchen' | 'office' | 'bathroom' | 'nursery';

export interface RoomTypeData {
  id: RoomType;
  name: string;
  nameRu: string;
  lux: number; // Норма освещенности (люкс)
  description: string;
  colorTemp: number; // Рекомендуемая цветовая температура (K)
  accentColor: string;
}

export const ROOM_TYPES: RoomTypeData[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    nameRu: 'Спальня',
    lux: 150,
    description: 'Уютный теплый свет для отдыха',
    colorTemp: 2700,
    accentColor: '#FFB347',
  },
  {
    id: 'living',
    name: 'Living Room',
    nameRu: 'Гостиная',
    lux: 200,
    description: 'Яркий общий свет для приема гостей',
    colorTemp: 3000,
    accentColor: '#FFA726',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    nameRu: 'Кухня',
    lux: 300,
    description: 'Очень яркое рабочее освещение',
    colorTemp: 4000,
    accentColor: '#FF7043',
  },
  {
    id: 'office',
    name: 'Office',
    nameRu: 'Офис/Кабинет',
    lux: 300,
    description: 'Средний свет без бликов для работы',
    colorTemp: 4000,
    accentColor: '#4A90E2',
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    nameRu: 'Ванная',
    lux: 250,
    description: 'Яркий свет для влажной зоны',
    colorTemp: 3500,
    accentColor: '#26C6DA',
  },
  {
    id: 'nursery',
    name: 'Nursery',
    nameRu: 'Детская',
    lux: 200,
    description: 'Мягкий рассеянный свет',
    colorTemp: 3000,
    accentColor: '#AB47BC',
  },
];

// Типы ламп
export type BulbType = 'led-warm' | 'led-neutral' | 'led-cold' | 'fluorescent' | 'incandescent';

export interface BulbTypeData {
  id: BulbType;
  name: string;
  nameRu: string;
  lumensPerWatt: number; // Эффективность (люмен на ватт)
  colorTemp: number; // Цветовая температура (K)
  description: string;
}

export const BULB_TYPES: BulbTypeData[] = [
  {
    id: 'led-warm',
    name: 'LED Warm',
    nameRu: 'LED Теплый (2700K)',
    lumensPerWatt: 110, // Современные LED: 100-120 лм/Вт
    colorTemp: 2700,
    description: 'Теплый уютный свет',
  },
  {
    id: 'led-neutral',
    name: 'LED Neutral',
    nameRu: 'LED Нейтральный (4000K)',
    lumensPerWatt: 110, // Современные LED: 100-120 лм/Вт
    colorTemp: 4000,
    description: 'Естественный дневной свет',
  },
  {
    id: 'led-cold',
    name: 'LED Cold',
    nameRu: 'LED Холодный (6500K)',
    lumensPerWatt: 110, // Современные LED: 100-120 лм/Вт
    colorTemp: 6500,
    description: 'Холодный яркий свет',
  },
  {
    id: 'fluorescent',
    name: 'Fluorescent',
    nameRu: 'Люминесцентные',
    lumensPerWatt: 65, // Люминесцентные: 60-80 лм/Вт
    colorTemp: 4000,
    description: 'Энергосберегающие лампы',
  },
  {
    id: 'incandescent',
    name: 'Incandescent',
    nameRu: 'Лампы накаливания',
    lumensPerWatt: 12, // Лампы накаливания: 10-15 лм/Вт
    colorTemp: 2700,
    description: 'Классический теплый свет',
  },
];

// Коэффициенты отражения поверхностей
export type SurfaceColor = 'white' | 'light-beige' | 'gray' | 'dark';

export interface SurfaceColorData {
  id: SurfaceColor;
  name: string;
  nameRu: string;
  reflectionCoefficient: number; // Коэффициент отражения (0-1)
  color: string;
}

export const SURFACE_COLORS: SurfaceColorData[] = [
  {
    id: 'white',
    name: 'White',
    nameRu: 'Белый',
    reflectionCoefficient: 0.7,
    color: '#FFFFFF',
  },
  {
    id: 'light-beige',
    name: 'Light Beige',
    nameRu: 'Светло-бежевый',
    reflectionCoefficient: 0.5,
    color: '#F5E6D3',
  },
  {
    id: 'gray',
    name: 'Gray',
    nameRu: 'Серый',
    reflectionCoefficient: 0.3,
    color: '#808080',
  },
  {
    id: 'dark',
    name: 'Dark',
    nameRu: 'Темный',
    reflectionCoefficient: 0.1,
    color: '#2D2D2D',
  },
];

// Стандартные мощности ламп (ватты)
export const STANDARD_BULB_WATTAGES = [3, 5, 7, 9, 11, 15, 18, 20, 25, 30, 40, 60, 75, 100];
