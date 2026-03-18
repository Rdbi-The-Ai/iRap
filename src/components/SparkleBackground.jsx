import React from 'react';

export default function SparkleBackground({ className = '' }) {
  const sparkles = Array.from({ length: 16 }, (_, i) => {
    const size = 2 + Math.random() * 4; // 2px-6px
    const colors = [
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#E9D7FF'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const blur = 0.4 + Math.random() * 0.4; // 0.4px-0.8px
    const duration = 2.5 + Math.random() * 2; // 2.5s-4.5s
    const delay = Math.random() * 8; // 0s-8s
    const isStarShape = Math.random() > 0.6;

    return {
      id: i,
      size,
      color,
      blur,
      duration,
      delay,
      isStarShape,
      left: 10 + Math.random() * 80, // 10%-90%
      top: 10 + Math.random() * 80    // 10%-90%
    };
  });

  return (
    <>
      <style>{`
        @keyframes luxury-sparkle-breathe {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          35% {
            opacity: 0.45;
            transform: scale(1.0);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.06);
          }
          65% {
            opacity: 0.35;
            transform: scale(1.0);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .luxury-sparkle {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
      
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: 0 }}>
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="luxury-sparkle absolute"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              backgroundColor: sparkle.color,
              borderRadius: sparkle.isStarShape ? '0' : '50%',
              filter: `blur(${sparkle.blur}px)`,
              animation: `luxury-sparkle-breathe ${sparkle.duration}s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
              boxShadow: `0 0 3px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.55), 0 0 ${sparkle.size * 6}px ${sparkle.color === '#FFFFFF' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(233, 215, 255, 0.2)'}`,
              transform: sparkle.isStarShape ? 'rotate(45deg)' : 'none'
            }}
          />
        ))}
      </div>
    </>
  );
}