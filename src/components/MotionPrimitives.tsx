import React, { useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealSection({
  children,
  className = '',
  delay = 0,
}: RevealSectionProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.65'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.6,
  });

  const rotateX = useTransform(smoothProgress, [0, 1], [8, 0]);
  const y = useTransform(smoothProgress, [0, 1], [36, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.97, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.45, 1], [0.25, 0.85, 1]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} style={{ perspective: '1400px' }} className={className}>
      <motion.div
        style={{
          rotateX,
          y,
          scale,
          opacity,
          transformOrigin: 'center top',
          transformStyle: 'preserve-3d',
        }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ScrollProgressBar() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-16 left-0 right-0 h-[2px] z-40 bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#38BDF8] pointer-events-none"
    />
  );
}

export function ScrollDepthBackdrop() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });

  const orb1Y = useTransform(smooth, [0, 1], ['0vh', '-26vh']);
  const orb1Rotate = useTransform(smooth, [0, 1], [0, 140]);
  const orb2Y = useTransform(smooth, [0, 1], ['8vh', '-34vh']);
  const orb2Rotate = useTransform(smooth, [0, 1], [0, -180]);
  const gridRotateX = useTransform(smooth, [0, 1], [62, 52]);
  const gridY = useTransform(smooth, [0, 1], ['0%', '-12%']);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Scroll-driven 3D Orbital Geometry Rings */}
      <motion.div
        style={{ y: orb1Y, rotate: orb1Rotate }}
        className="absolute -top-24 -right-24 w-[560px] h-[560px] rounded-full border border-[#38BDF8]/10"
      >
        <div className="absolute inset-10 rounded-full border border-dashed border-[#8B5CF6]/12" />
        <div className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-[#38BDF8]/40" />
      </motion.div>

      <motion.div
        style={{ y: orb2Y, rotate: orb2Rotate }}
        className="absolute top-[42vh] -left-36 w-[640px] h-[640px] rounded-full border border-[#8B5CF6]/10"
      >
        <div className="absolute inset-14 rounded-full border border-[#38BDF8]/10" />
        <div className="absolute -top-1.5 left-1/2 w-2.5 h-2.5 rounded-full bg-[#8B5CF6]/45" />
      </motion.div>

      {/* Subtle 3D Perspective Floor Plane at Bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh] opacity-30"
        style={{ perspective: '900px' }}
      >
        <motion.div
          style={{ rotateX: gridRotateX, y: gridY, transformOrigin: 'bottom center' }}
          className="w-full h-[140%] bg-arch-grid [mask-image:linear-gradient(to_top,rgba(0,0,0,0.85),transparent)]"
        />
      </div>
    </div>
  );
}

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
}

export function TiltCard3D({
  children,
  className = '',
  maxTilt = 7,
  onClick,
}: TiltCard3DProps) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  });
  const [hovered, setHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.pointerType === 'touch') return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;

    setTilt({
      rotateX,
      rotateY,
      glareX: px * 100,
      glareY: py * 100,
    });
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: '1100px' }}
      className="h-full"
    >
      <div
        style={{
          transform: prefersReduced
            ? undefined
            : `rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(
                2
              )}deg) scale3d(${hovered ? 1.012 : 1}, ${hovered ? 1.012 : 1}, 1)`,
          transition: hovered
            ? 'transform 90ms cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className={`relative h-full ${className}`}
      >
        {!prefersReduced && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200 z-10"
            style={{
              opacity: hovered ? 0.75 : 0,
              background: `radial-gradient(460px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(56, 189, 248, 0.14), rgba(139, 92, 246, 0.05) 45%, transparent 70%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

interface TiltLayer3DProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

export function TiltLayer3D({
  children,
  depth = 24,
  className = '',
}: TiltLayer3DProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      style={
        prefersReduced
          ? undefined
          : {
              transform: `translateZ(${depth}px)`,
              transformStyle: 'preserve-3d',
            }
      }
      className={className}
    >
      {children}
    </div>
  );
}
