import type { BulbType } from '../../types/lighting';
import { BULB_TYPES } from '../../types/lighting';
import { Select } from '../ui/Select';
import { Slider } from '../ui/Slider';
import { useLightingCalculator } from '../../context';

export function BulbTypeSelector() {
  const { state, updateState } = useLightingCalculator();

  const bulbOptions = BULB_TYPES.map(bulb => ({
    value: bulb.id,
    label: bulb.nameRu,
    description: `${bulb.lumensPerWatt} лм/Вт • ${bulb.description}`,
  }));

  return (
    <div className="space-y-4">
      <Select
        label="Тип ламп"
        value={state.bulbType}
        options={bulbOptions}
        onChange={(value) => updateState('bulbType', value as BulbType)}
        variant="dropdown"
      />
      
      <Slider
        label="Целевая мощность лампы"
        value={state.targetWattage}
        min={3}
        max={100}
        step={1}
        suffix=" Вт"
        onChange={(value) => updateState('targetWattage', value)}
        glow="cool"
      />
    </div>
  );
}
