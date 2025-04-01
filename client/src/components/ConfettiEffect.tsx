import { useState, useEffect } from 'react';

interface ConfettiProps {
  duration?: number;
}

const ConfettiEffect = ({ duration = 2000 }: ConfettiProps) => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    // Generate random confetti particles
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const newParticles = [];
    
    for (let i = 0; i < 100; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const animationDuration = Math.random() * 2 + 1;
      const animationDelay = Math.random() * 0.5;
      
      newParticles.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${left}%`,
            top: `-${size}px`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            animation: `fall ${animationDuration}s linear ${animationDelay}s forwards`,
          }}
        />
      );
    }
    
    setParticles(newParticles);
    
    // Clean up after the duration
    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);
    
    return () => {
      clearTimeout(timer);
    };
  }, [duration]);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
      {particles}
    </div>
  );
};

export default ConfettiEffect;