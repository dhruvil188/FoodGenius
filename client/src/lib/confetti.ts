import confetti from 'canvas-confetti';

/**
 * Trigger a confetti animation for recipe completion celebrations
 * @param options Additional confetti options
 */
export function triggerConfetti(options?: confetti.Options) {
  const defaults: confetti.Options = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#22c55e', '#16a34a', '#4ade80', '#86efac', '#dcfce7'],
    disableForReducedMotion: true,
  };

  confetti({
    ...defaults,
    ...options,
  });
}

/**
 * Show a special confetti animation for recipe completion
 * Fires multiple bursts of confetti in sequence
 */
export function celebrateRecipeCompletion() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  let timeoutId: NodeJS.Timeout | undefined;

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  // Create a canvas element for the confetti if it doesn't exist
  let canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '100';
    document.body.appendChild(canvas);
  }

  // Create confetti instance with the canvas
  const myConfetti = confetti.create(canvas);

  // Clear any previous animations
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // Initial burst with circles
  myConfetti({
    particleCount: 25,
    spread: 160,
    shapes: ['circle'],
    colors: ['#22c55e', '#16a34a', '#4ade80'],
    origin: { y: 0.7 },
  });

  // Main animation loop
  const frame = () => {
    const timeLeft = animationEnd - Date.now();
    
    if (timeLeft <= 0) {
      // Clean up when animation is complete
      return setTimeout(() => {
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }, 1000);
    }
    
    // Two confetti animations with different settings for variety
    myConfetti({
      particleCount: 2,
      angle: randomInRange(45, 135),
      spread: randomInRange(50, 80),
      origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.3, 0.4) },
      colors: ['#22c55e', '#16a34a', '#dcfce7'],
      shapes: ['square'],
      scalar: randomInRange(0.8, 1.2),
    });
    
    myConfetti({
      particleCount: 2,
      angle: randomInRange(45, 135),
      spread: randomInRange(50, 70),
      origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.3, 0.4) },
      colors: ['#4ade80', '#15803d', '#86efac'],
      shapes: ['circle'],
      scalar: randomInRange(0.8, 1.2),
    });
    
    // Continue animation loop
    timeoutId = setTimeout(frame, 50);
  };
  
  // Start animation
  frame();
}

/**
 * Fire confetti from a specific element in a specific direction
 * Useful for smaller targeted animations (e.g., completing a recipe step)
 * @param sourceElement The element to use as the origin point
 */
export function fireConfettiFromElement(sourceElement: HTMLElement) {
  const rect = sourceElement.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;
  
  confetti({
    particleCount: 30,
    spread: 40,
    startVelocity: 20,
    origin: { x, y },
    colors: ['#22c55e', '#16a34a', '#4ade80'],
    ticks: 200,
    disableForReducedMotion: true,
  });
}