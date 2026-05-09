import { useRef, useState } from 'react';

interface DistortedImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * CSS-based image distortion using an inline SVG feTurbulence filter.
 * Produces a wave/ripple distortion on hover without WebGL — so no CORS issues
 * with external image URLs.
 */
const DistortedImage = ({ src, alt, className = '' }: DistortedImageProps) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Unique ID per instance so multiple images don't share the same filter
  const filterId = useRef(`distort-${Math.random().toString(36).slice(2, 8)}`).current;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // Turbulence values: calm → active on hover
  const baseFreq = hovered ? '0.015 0.025' : '0.000 0.000';
  const numOctaves = 3;
  const scale = hovered ? 6 : 0;

  return (
    <div
      ref={containerRef}
      className={`distorted-image-container ${className}`}
      style={{ position: 'relative', overflow: 'hidden', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Inline SVG filter — no external resource, zero CORS */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="turbulence"
              baseFrequency={baseFreq}
              numOctaves={numOctaves}
              seed={Math.round(mousePos.x * 10 + mousePos.y * 10)}
              result="noise"
              style={{ transition: 'all 0.4s ease' }}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="distorted"
            />
          </filter>
        </defs>
      </svg>

      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          filter: hovered ? `url(#${filterId})` : 'none',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.4s ease, brightness 0.4s ease',
          willChange: 'transform, filter',
        }}
      />

      {/* Chromatic abberation overlay on hover */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)`,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  );
};

export default DistortedImage;
