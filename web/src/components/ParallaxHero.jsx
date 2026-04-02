import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxHero — floating CSS shapes that respond to scroll.
 * Claymorphism version: no emojis, uses styled geometric shapes.
 */

/* ── Shape configs ── */
const shapes = {
  circle: { type: 'circle' },
  diamond: { type: 'diamond' },
  note: { type: 'note' },
  square: { type: 'square' },
  ring: { type: 'ring' },
};

const homeElements = [
  { shape: 'note', size: 24, top: '10%', left: '8%', speed: 0.2, delay: 0, opacity: 0.2, color: '#818CF8' },
  { shape: 'circle', size: 18, top: '22%', left: '85%', speed: 0.35, delay: 0.5, opacity: 0.15, color: '#22C55E' },
  { shape: 'diamond', size: 14, top: '15%', left: '45%', speed: 0.25, delay: 0.3, opacity: 0.12, color: '#F59E0B' },
  { shape: 'ring', size: 20, top: '70%', left: '90%', speed: 0.3, delay: 0.8, opacity: 0.12, color: '#818CF8' },
  { shape: 'note', size: 20, top: '42%', left: '92%', speed: 0.18, delay: 1.2, opacity: 0.15, color: '#4F46E5' },
  { shape: 'square', size: 12, top: '55%', left: '18%', speed: 0.28, delay: 0.6, opacity: 0.1, color: '#F472B6' },
  { shape: 'diamond', size: 16, top: '8%', left: '72%', speed: 0.32, delay: 0.2, opacity: 0.12, color: '#22C55E' },
  { shape: 'circle', size: 14, top: '82%', left: '32%', speed: 0.22, delay: 1.0, opacity: 0.12, color: '#F59E0B' },
  { shape: 'ring', size: 12, top: '35%', left: '55%', speed: 0.38, delay: 0.9, opacity: 0.08, color: '#4F46E5' },
  { shape: 'square', size: 14, top: '62%', left: '6%', speed: 0.15, delay: 1.4, opacity: 0.1, color: '#818CF8' },
  { shape: 'note', size: 16, top: '78%', left: '68%', speed: 0.26, delay: 0.7, opacity: 0.12, color: '#22C55E' },
  { shape: 'diamond', size: 10, top: '48%', left: '38%', speed: 0.3, delay: 1.1, opacity: 0.08, color: '#F472B6' },
];

const universeElements = [
  { shape: 'circle', size: 28, top: '15%', left: '10%', speed: 0.25, delay: 0, opacity: 0.2, color: '#4F46E5' },
  { shape: 'diamond', size: 22, top: '20%', left: '80%', speed: 0.5, delay: 0.4, opacity: 0.18, color: '#22C55E' },
  { shape: 'note', size: 26, top: '65%', left: '6%', speed: 0.2, delay: 0.8, opacity: 0.18, color: '#F59E0B' },
  { shape: 'square', size: 16, top: '30%', left: '50%', speed: 0.45, delay: 0.2, opacity: 0.14, color: '#818CF8' },
  { shape: 'ring', size: 24, top: '70%', left: '88%', speed: 0.35, delay: 1, opacity: 0.18, color: '#4F46E5' },
  { shape: 'diamond', size: 18, top: '10%', left: '60%', speed: 0.55, delay: 0.6, opacity: 0.14, color: '#F472B6' },
  { shape: 'note', size: 22, top: '50%', left: '90%', speed: 0.3, delay: 1.3, opacity: 0.2, color: '#22C55E' },
  { shape: 'circle', size: 20, top: '80%', left: '25%', speed: 0.4, delay: 0.5, opacity: 0.14, color: '#F59E0B' },
  { shape: 'square', size: 14, top: '45%', left: '18%', speed: 0.6, delay: 1.1, opacity: 0.1, color: '#818CF8' },
  { shape: 'ring', size: 16, top: '88%', left: '65%', speed: 0.35, delay: 0.7, opacity: 0.16, color: '#4F46E5' },
  { shape: 'circle', size: 20, top: '5%', left: '35%', speed: 0.28, delay: 0.15, opacity: 0.15, color: '#22C55E' },
  { shape: 'note', size: 18, top: '25%', left: '95%', speed: 0.48, delay: 0.55, opacity: 0.16, color: '#F59E0B' },
  { shape: 'diamond', size: 22, top: '58%', left: '15%', speed: 0.32, delay: 1.2, opacity: 0.14, color: '#F472B6' },
  { shape: 'square', size: 14, top: '72%', left: '42%', speed: 0.52, delay: 0.35, opacity: 0.12, color: '#4F46E5' },
  { shape: 'ring', size: 24, top: '38%', left: '72%', speed: 0.22, delay: 0.9, opacity: 0.18, color: '#22C55E' },
];

const ShapeElement = ({ type, size, color }) => {
  const s = size;
  if (type === 'circle') {
    return (
      <div style={{
        width: s, height: s,
        borderRadius: '50%',
        background: color,
      }} />
    );
  }
  if (type === 'diamond') {
    return (
      <div style={{
        width: s * 0.7, height: s * 0.7,
        background: color,
        transform: 'rotate(45deg)',
        borderRadius: s * 0.12,
      }} />
    );
  }
  if (type === 'square') {
    return (
      <div style={{
        width: s * 0.8, height: s * 0.8,
        background: color,
        borderRadius: s * 0.2,
      }} />
    );
  }
  if (type === 'ring') {
    return (
      <div style={{
        width: s, height: s,
        borderRadius: '50%',
        border: `${Math.max(2, s * 0.15)}px solid ${color}`,
        background: 'transparent',
      }} />
    );
  }
  if (type === 'note') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={color} opacity="1">
        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
      </svg>
    );
  }
  return null;
};

const ParallaxHero = ({ variant = 'home' }) => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const elements = variant === 'universe' ? universeElements : homeElements;

  return (
    <div className="parallax-hero-layer" ref={containerRef} aria-hidden="true">
      {elements.map((el, i) => (
        <span
          key={i}
          className="parallax-hero-layer__item"
          style={{
            position: 'absolute',
            top: el.top,
            left: el.left,
            opacity: el.opacity,
            transform: `translateY(${scrollY * el.speed * -1}px) rotate(${scrollY * el.speed * 0.1}deg)`,
            animationDelay: `${el.delay}s`,
            willChange: 'transform',
            transition: 'transform 0.1s linear',
          }}
        >
          <ShapeElement type={el.shape} size={el.size} color={el.color} />
        </span>
      ))}

      <style>{`
        .parallax-hero-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .parallax-hero-layer__item {
          display: inline-block;
          animation: parallaxFloat 12s ease-in-out infinite;
          filter: blur(0.5px);
          user-select: none;
        }

        @keyframes parallaxFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default ParallaxHero;
