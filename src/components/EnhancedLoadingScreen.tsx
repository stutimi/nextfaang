import { motion } from "framer-motion";
import { Code, Zap, Target, Trophy } from "lucide-react";

export const EnhancedLoadingScreen = () => {
  const icons = [Code, Zap, Target, Trophy];
  
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1
          }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(59, 130, 246, 0.6)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Code className="h-12 w-12 text-white" />
            </motion.div>
            
            {/* Orbiting icons */}
            {icons.map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute w-8 h-8 bg-card border-2 border-primary/30 rounded-full flex items-center justify-center"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5
                }}
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: `${40 + index * 10}px 0px`,
                  marginTop: "-16px",
                  marginLeft: "-16px"
                }}
              >
                <Icon className="h-4 w-4 text-primary" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4"
        >
          NEXTFAANG
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-muted-foreground mb-8"
        >
          Preparing your coding journey...
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              delay: 1,
              duration: 2,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};