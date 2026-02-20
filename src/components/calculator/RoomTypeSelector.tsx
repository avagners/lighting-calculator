import { motion } from 'framer-motion';
import type { RoomType } from '../../types/lighting';
import { ROOM_TYPES } from '../../types/lighting';
import { Select } from '../ui/Select';
import { useLightingCalculator } from '../../context';

export function RoomTypeSelector() {
  const { state, updateState } = useLightingCalculator();

  const roomOptions = ROOM_TYPES.map(room => ({
    value: room.id,
    label: room.nameRu,
    description: `${room.lux} лк • ${room.description}`,
  }));

  const selectedRoom = ROOM_TYPES.find(r => r.id === state.roomType);

  return (
    <div className="space-y-4">
      <Select
        label="Тип помещения"
        value={state.roomType}
        options={roomOptions}
        onChange={(value) => updateState('roomType', value as RoomType)}
        variant="cards"
      />
      
      {selectedRoom && (
        <motion.div
          key={state.roomType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 border-l-4"
          style={{ borderLeftColor: selectedRoom.accentColor }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedRoom.accentColor, boxShadow: `0 0 10px ${selectedRoom.accentColor}` }}
            />
            <div>
              <div className="text-sm font-medium text-white">
                Норма освещенности: {selectedRoom.lux} лк
              </div>
              <div className="text-xs text-white/50">
                Рекомендуемая температура: {selectedRoom.colorTemp}K
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
