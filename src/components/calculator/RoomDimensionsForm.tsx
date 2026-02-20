import { Input } from '../ui/Input';
import { Slider } from '../ui/Slider';
import { useLightingCalculator } from '../../context';

export function RoomDimensionsForm() {
  const { state, updateState } = useLightingCalculator();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Длина"
          type="number"
          min={1}
          max={20}
          step={0.1}
          value={state.length}
          onChange={(e) => updateState('length', parseFloat(e.target.value) || 0)}
          suffix="м"
        />
        <Input
          label="Ширина"
          type="number"
          min={1}
          max={20}
          step={0.1}
          value={state.width}
          onChange={(e) => updateState('width', parseFloat(e.target.value) || 0)}
          suffix="м"
        />
      </div>

      <Slider
        label="Высота потолка"
        value={state.ceilingHeight}
        min={2.2}
        max={4}
        step={0.1}
        suffix=" м"
        onChange={(value) => updateState('ceilingHeight', value)}
        glow="warm"
      />

      <Slider
        label="Высота рабочей поверхности"
        value={state.workSurfaceHeight}
        min={0}
        max={1.2}
        step={0.05}
        suffix=" м"
        onChange={(value) => updateState('workSurfaceHeight', value)}
        glow="cool"
      />
    </div>
  );
}
