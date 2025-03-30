import { motion } from 'framer-motion';

export function Logo({ size = 'medium', animated = true }: { size?: 'small' | 'medium' | 'large', animated?: boolean }) {
  const sizes = {
    small: {
      container: 'w-10 h-10',
      icon: 'w-8 h-8',
      text: 'text-lg'
    },
    medium: {
      container: 'w-14 h-14',
      icon: 'w-10 h-10',
      text: 'text-xl'
    },
    large: {
      container: 'w-18 h-18',
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

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const plateVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const lensVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.3,
        duration: 0.5,
        type: "spring"
      }
    }
  };

  const Wrapper = animated ? motion.div : 'div';
  
  return (
    <div className="flex items-center gap-3">
      <Wrapper 
        className={`${sizes[size].container} rounded-full bg-gradient-to-br from-emerald-400 to-primary text-white flex items-center justify-center shadow-md overflow-hidden relative`}
        variants={animated ? containerVariants : undefined}
        initial={animated ? "initial" : undefined}
        animate={animated ? "animate" : undefined}
      >
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-2">
          {/* Plate base */}
          <motion.ellipse 
            cx="30" cy="30" rx="22" ry="22" 
            fill="white" 
            strokeWidth="2"
            variants={animated ? plateVariants : undefined}
          />
          
          {/* Plate inner rim */}
          <motion.ellipse 
            cx="30" cy="30" rx="18" ry="18" 
            fill="none" 
            stroke="rgba(203, 213, 225, 0.6)" 
            strokeWidth="0.8"
            variants={animated ? plateVariants : undefined}
          />

          {/* Fork and knife */}
          <motion.g 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5"
            variants={animated ? itemVariants : undefined}
          >
            {/* Fork */}
            <path d="M24,18 L24,30 M20,20 L20,26 M28,20 L28,26" />
            
            {/* Knife */}
            <path d="M36,18 C36,18 40,20 40,22 L40,30" />
          </motion.g>
          
          {/* Magnifying glass */}
          <motion.g 
            variants={animated ? lensVariants : undefined}
            transform="translate(38, 38) scale(0.8)"
          >
            <circle 
              cx="0" cy="0" r="8" 
              fill="rgba(5, 150, 105, 0.2)" 
              stroke="currentColor" 
              strokeWidth="2" 
            />
            <line 
              x1="6" y1="6" x2="10" y2="10" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
          </motion.g>
        </svg>
      </Wrapper>
      <div className={`font-bold ${sizes[size].text} tracking-tight`}>
        <span className="bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent">Dish</span>
        <span className="text-slate-800">Detective</span>
      </div>
    </div>
  );
}

export default Logo;