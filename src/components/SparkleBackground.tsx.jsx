import React from 'react';

export default function SparkleBackground({ className = '' }) {
  const sparkles = Array.from({ length: 10 }, (_, i) => {
    const size = 2 + Math.random() * 4; // 2px-6px
    const colors = [
      'rgba(255, 255, 255, 0.35)',
      'rgba(230, 220, 255, 0.3)',
      'rgba(200, 230, 255, 0.25)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const blur = 0.3 + Math.random() * 0.5; // 0.3px-0.8px
    const duration = 1.8 + Math.random() * 1.4; // 1.8s-3.2s
    const delay = Math.random() * 6; // 0s-6s
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
          40% {
            opacity: 0.28;
            transform: scale(1.0);
          }
          60% {
            opacity: 0.35;
            transform: scale(1.05);
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
              boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}, 0 0 ${sparkle.size * 4}px ${sparkle.color.replace(/[\d.]+\)/, '0.15)')}`,
              transform: sparkle.isStarShape ? 'rotate(45deg)' : 'none'
            }}
          />
        ))}
      </div>
    </>
  );
}