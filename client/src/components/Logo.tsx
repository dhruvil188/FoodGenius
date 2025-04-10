import { motion } from 'framer-motion';
import logoSvg from '@/assets/logo.svg';

export function Logo({ size = 'medium', animated = true }: { size?: 'small' | 'medium' | 'large', animated?: boolean }) {
  const sizes = {
    small: {
      container: 'w-10 h-10',
      icon: 'w-8 h-8',
      text: 'text-lg'
    },
    medium: {
      container: 'w-12 h-12',
      icon: 'w-10 h-10',
      text: 'text-xl'
    },
    large: {
      container: 'w-16 h-16',
      icon: 'w-14 h-14',
      text: 'text-2xl'
    }
  };

  const containerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const Wrapper = animated ? motion.div : 'div';
  
  return (
    <div className="flex items-center gap-3">
      <Wrapper 
        className={`${sizes[size].container} rounded-full flex items-center justify-center relative`}
        variants={animated ? containerVariants : undefined}
        initial={animated ? "initial" : undefined}
        animate={animated ? "animate" : undefined}
      >
        <img src={logoSvg} alt="Image2Recipe Logo" className="w-full h-full" />
      </Wrapper>
      <div className="flex flex-col">
        <span className="font-bold text-white text-lg md:text-xl">image2recipe.com</span>
        <span className="text-slate-400 text-xs md:text-sm">http://image2recipe.com</span>
      </div>
    </div>
  );
}

export default Logo;