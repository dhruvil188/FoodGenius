import { useCallback, useEffect, useRef, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

interface ConfettiExplosionProps {
  duration?: number;
  particleCount?: number;
  spread?: number;
  origin?: {
    x?: number;
    y?: number;
  };
}

const ConfettiExplosion = ({
  duration = 3000,
  particleCount = 200,
  spread = 100,
  origin = { x: 0.5, y: 0.5 }
}: ConfettiExplosionProps) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const confettiRef = useRef<any>(null);
  
  const getConfettiInstance = useCallback((instance: any) => {
    confettiRef.current = instance;
  }, []);
  
  const fireConfetti = useCallback(() => {
    if (!confettiRef.current) return;
    
    confettiRef.current({
      particleCount,
      spread,
      origin,
      disableForReducedMotion: true,
      gravity: 1.2,
      ticks: 300,
      colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3'],
      startVelocity: 30,
      scalar: 0.9
    });
  }, [particleCount, spread, origin]);
  
  useEffect(() => {
    fireConfetti();
    
    const timeout = setTimeout(() => {
      setIsAnimationComplete(true);
    }, duration);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [fireConfetti, duration]);
  
  if (isAnimationComplete) return null;
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <ReactCanvasConfetti
        // @ts-ignore
        refConfetti={getConfettiInstance}
        style={{ 
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 9999
        }}
      />
    </div>
  );
};

export default ConfettiExplosion;