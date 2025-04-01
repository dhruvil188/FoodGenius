import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  duration?: number;
}

export function Confetti({ duration = 3000 }: ConfettiProps) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isActive) {
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#64c664', '#32a852', '#1e8c3c', '#84e786', '#32a884']
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#64c664', '#32a852', '#1e8c3c', '#84e786', '#32a884']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();

      // Cleanup after duration
      setTimeout(() => {
        setIsActive(false);
      }, duration);
    }
  }, [duration, isActive]);

  return null;
}