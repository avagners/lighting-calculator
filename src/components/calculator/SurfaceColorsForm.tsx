import type { SurfaceColor } from '../../types/lighting';
import { SURFACE_COLORS } from '../../types/lighting';
import { ColorPicker } from '../ui/ColorPicker';
import { useLightingCalculator } from '../../context';

export function SurfaceColorsForm() {
  const { state, updateState } = useLightingCalculator();

  const colorOptions = SURFACE_COLORS.map(color => ({
    id: color.id,
    name: color.nameRu,
    color: color.color,
    coefficient: color.reflectionCoefficient,
  }));

  return (
    <div className="space-y-4">
      <ColorPicker
        label="Потолок"
        value={state.ceilingColor}
        options={colorOptions}
        onChange={(value) => updateState('ceilingColor', value as SurfaceColor)}
        variant="circles"
      />
      
      <ColorPicker
        label="Стены"
        value={state.wallColor}
        options={colorOptions}
        onChange={(value) => updateState('wallColor', value as SurfaceColor)}
        variant="circles"
      />
      
      <ColorPicker
        label="Пол"
        value={state.floorColor}
        options={colorOptions}
        onChange={(value) => updateState('floorColor', value as SurfaceColor)}
        variant="circles"
      />
    </div>
  );
}
