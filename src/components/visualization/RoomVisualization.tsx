import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { calculateOptimalFixtureLayout } from '../../lib/lighting-calculator';
import { useLightingCalculator } from '../../context';
import { ROOM_TYPES } from '../../types/lighting';

export function RoomVisualization() {
  const { state, result } = useLightingCalculator();

  const { positions, rows, cols } = useMemo(() => {
    if (!result) return { positions: [], rows: 0, cols: 0 };
    return calculateOptimalFixtureLayout(
      state.length,
      state.width,
      result.numberOfFixtures
    );
  }, [state.length, state.width, result?.numberOfFixtures]);

  const selectedRoom = ROOM_TYPES.find((r) => r.id === state.roomType);
  const accentColor = selectedRoom?.accentColor || '#FFB347';

  // SVG viewBox настройки
  const padding = 50;
  const viewBoxWidth = 500;
  const viewBoxHeight = 380;
  const innerWidth = viewBoxWidth - padding * 2;
  const innerHeight = viewBoxHeight - padding * 2;

  // Масштабирование координат комнаты
  const roomAspectRatio = state.length / state.width;
  let drawWidth = innerWidth;
  let drawHeight = innerHeight;
  
  if (roomAspectRatio > innerWidth / innerHeight) {
    drawHeight = drawWidth / roomAspectRatio;
  } else {
    drawWidth = drawHeight * roomAspectRatio;
  }

  const scaleX = drawWidth / state.length;
  const scaleY = drawHeight / state.width;

  const offsetX = padding + (innerWidth - drawWidth) / 2;
  const offsetY = padding + (innerHeight - drawHeight) / 2;

  // Преобразование координат
  const toSvgCoords = (x: number, y: number) => ({
    x: offsetX + x * scaleX,
    y: offsetY + y * scaleY,
  });

  return (
    <div className="relative w-full aspect-[4/3] glass rounded-2xl overflow-hidden">
      {/* Фоновый градиент */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${accentColor}22 0%, transparent 70%)`,
        }}
      />
      
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-full"
      >
        {/* Пол комнаты */}
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          x={offsetX}
          y={offsetY}
          width={drawWidth}
          height={drawHeight}
          rx={8}
          fill="url(#floorGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={2}
        />

        {/* Градиенты */}
        <defs>
          <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          
          <radialGradient id="lightGlow">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Световые пятна от светильников */}
        {positions.map((pos, index) => {
          const svgPos = toSvgCoords(pos.x, pos.y);
          const glowRadius = Math.min(drawWidth, drawHeight) / 4;
          
          return (
            <motion.circle
              key={`glow-${index}`}
              initial={{ opacity: 0, r: 0 }}
              animate={{ opacity: 0.3, r: glowRadius }}
              transition={{
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 2 + Math.random(),
              }}
              cx={svgPos.x}
              cy={svgPos.y}
              r={glowRadius}
              fill="url(#lightGlow)"
            />
          );
        })}

        {/* Светильники */}
        {positions.map((pos, index) => {
          const svgPos = toSvgCoords(pos.x, pos.y);
          
          return (
            <g key={`fixture-${index}`}>
              {/* Внешнее кольцо */}
              <motion.circle
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 200,
                }}
                cx={svgPos.x}
                cy={svgPos.y}
                r={12}
                fill="rgba(255,255,255,0.1)"
                stroke={accentColor}
                strokeWidth={2}
              />
              
              {/* Внутренний круг (лампа) */}
              <motion.circle
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                cx={svgPos.x}
                cy={svgPos.y}
                r={6}
                fill={accentColor}
              />
              
              {/* Пульсация */}
              <motion.circle
                initial={{ opacity: 0.5, r: 8 }}
                animate={{ opacity: 0, r: 20 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 2,
                  repeat: Infinity,
                }}
                cx={svgPos.x}
                cy={svgPos.y}
                r={8}
                stroke={accentColor}
                strokeWidth={1}
                fill="none"
              />
            </g>
          );
        })}

        {/* Размерные линии */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Длина */}
          <line
            x1={offsetX}
            y1={offsetY + drawHeight + 25}
            x2={offsetX + drawWidth}
            y2={offsetY + drawHeight + 25}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={1}
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={offsetX + drawWidth / 2}
            y={offsetY + drawHeight + 40}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize={state.length >= 10 ? 10 : 12}
          >
            {state.length} м
          </text>

          {/* Ширина */}
          <line
            x1={offsetX - 25}
            y1={offsetY}
            x2={offsetX - 25}
            y2={offsetY + drawHeight}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={1}
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={offsetX - 35}
            y={offsetY + drawHeight / 2}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize={state.width >= 10 ? 10 : 12}
            transform={`rotate(-90, ${offsetX - 35}, ${offsetY + drawHeight / 2})`}
          >
            {state.width} м
          </text>
        </motion.g>

        {/* Стрелки для размерных линий */}
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
          >
            <path
              d="M0,0 L10,5 L0,10 L2,5 Z"
              fill="rgba(255,255,255,0.3)"
            />
          </marker>
        </defs>

        {/* Легенда */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <rect
            x={padding}
            y={viewBoxHeight - padding - 60}
            width={140}
            height={50}
            rx={8}
            fill="rgba(0,0,0,0.3)"
            stroke="rgba(255,255,255,0.1)"
          />
          <circle
            cx={padding + 20}
            cy={viewBoxHeight - padding - 35}
            r={6}
            fill={accentColor}
          />
          <text
            x={padding + 35}
            y={viewBoxHeight - padding - 32}
            fill="rgba(255,255,255,0.7)"
            fontSize={11}
          >
            Светильник
          </text>
          <text
            x={padding + 20}
            y={viewBoxHeight - padding - 18}
            fill="rgba(255,255,255,0.5)"
            fontSize={10}
          >
            {result?.numberOfFixtures || 0} шт • {rows}×{cols}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
