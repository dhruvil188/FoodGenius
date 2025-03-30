import { motion } from 'framer-motion';

export function Logo({ size = 'medium', animated = true }: { size?: 'small' | 'medium' | 'large', animated?: boolean }) {
  const sizes = {
    small: {
      container: 'w-8 h-8',
      icon: 'w-6 h-6',
      text: 'text-lg'
    },
    medium: {
      container: 'w-12 h-12',
      icon: 'w-8 h-8',
      text: 'text-xl'
    },
    large: {
      container: 'w-16 h-16',
      icon: 'w-12 h-12',
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

  const Wrapper = animated ? motion.div : 'div';
  const Item = animated ? motion.div : 'div';

  return (
    <div className="flex items-center gap-2">
      <Wrapper 
        className={`${sizes[size].container} rounded-lg bg-primary text-white flex items-center justify-center shadow-md`}
        variants={animated ? containerVariants : undefined}
        initial={animated ? "initial" : undefined}
        animate={animated ? "animate" : undefined}
      >
        <Item variants={animated ? itemVariants : undefined} className="relative">
          <i className="fas fa-utensils text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
          <i className="fas fa-magnifying-glass text-white absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/4 text-xs"></i>
        </Item>
      </Wrapper>
      <div className={`font-bold ${sizes[size].text} tracking-tight text-slate-800`}>
        <span className="text-primary">Dish</span>Detective
      </div>
    </div>
  );
}

export default Logo;