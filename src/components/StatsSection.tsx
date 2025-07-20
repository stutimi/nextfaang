
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BookOpen, Users, Trophy, Target, Zap, Award, Code } from "lucide-react";
import { motion } from "framer-motion";

export const StatsSection = () => {
  const stats = [
    {
      icon: Target,
      value: "1M+",
      label: "Problems Solved",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      shadowColor: "shadow-primary/20"
    },
    {
      icon: Trophy,
      value: "150+",
      label: "FAANG Placements",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      shadowColor: "shadow-amber-500/20"
    },
    {
      icon: Users,
      value: "2,547+",
      label: "Active Users",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      shadowColor: "shadow-green-500/20"
    },
    {
      icon: Zap,
      value: "98%",
      label: "Success Rate",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      shadowColor: "shadow-cyan-500/20"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <motion.div 
        className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Platform Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforming careers and building the next generation of tech leaders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
            >
              <Card variant="elevated" className={`text-center group cursor-pointer ${stat.shadowColor} hover:${stat.shadowColor}`}>
                <CardContent className="pt-8 pb-8">
                  <motion.div 
                    className={`p-4 ${stat.bgColor} ${stat.borderColor} border-2 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </motion.div>
                  
                  <motion.div 
                    className={`text-4xl md:text-5xl font-black ${stat.color} mb-3`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-lg font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  {/* Animated progress bar */}
                  <motion.div 
                    className={`h-1 ${stat.bgColor} rounded-full mt-4 overflow-hidden`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-transparent`}
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
