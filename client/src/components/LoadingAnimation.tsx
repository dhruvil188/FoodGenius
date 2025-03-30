import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  return (
    <motion.section 
      className="max-w-2xl mx-auto text-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <motion.div 
          className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="space-y-3">
          <motion.h3 
            className="text-xl font-semibold font-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Analyzing Your Dish
          </motion.h3>
          
          <motion.p 
            className="text-slate-600 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Our AI is working its culinary magic to identify your food and find the perfect recipes...
          </motion.p>
        </div>
        
        <motion.div 
          className="flex justify-center space-x-8 text-primary-dark"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div 
            className="text-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <i className="fas fa-camera text-2xl mb-2 block"></i>
            <p className="text-sm">Scanning Image</p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <i className="fas fa-utensils text-2xl mb-2 block"></i>
            <p className="text-sm">Identifying Dish</p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          >
            <i className="fas fa-book-open text-2xl mb-2 block"></i>
            <p className="text-sm">Finding Recipes</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
