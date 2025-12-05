import React, { useEffect, useState } from 'react';

export const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; opacity: number }>>([]);

  useEffect(() => {
    // Generate static snowflakes to avoid continuous re-renders/heavy JS animation
    const flakes = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 bg-white rounded-full animate-fall"
          style={{
            left: flake.left,
            width: '4px',
            height: '4px',
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration} linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};