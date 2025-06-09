import React from 'react';

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: any;
  glProps?: any;
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({
  id = "goo-filter",
  strength = 10,
}) => {
  return (
    <svg className="absolute overflow-hidden z-1">
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={strength}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = (x: number) => x,
  canvasProps = {},
  glProps = {},
  gooeyFilter,
  color = "#ffffff",
  className = "",
}: PixelTrailProps) {
  // Создаем упрощенную версию компонента без Three.js
  return (
    <>
      {gooeyFilter && (
        <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />
      )}
      <div 
        className={`absolute z-1 ${className}`}
        style={{
          width: '100%',
          height: '100%',
          ...(gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {}),
        }}
      >
        {/* Упрощенная версия без Three.js */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
            opacity: 0.5,
          }}
        />
      </div>
    </>
  );
}
