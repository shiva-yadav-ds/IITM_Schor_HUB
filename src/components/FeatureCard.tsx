import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  delay?: number;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  path,
  delay = 0 
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="interactive-card group feature-tile relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,115,232,0.1),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <motion.div 
          className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.2, 0.3, 0.2] : 0.2
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <CardHeader className="pb-2 relative z-10">
          <motion.div 
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-300 group-hover:bg-primary/10"
            whileHover={{ scale: 1.05, rotate: 5 }}
            animate={isHovered ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            <motion.div
              animate={isHovered ? { rotate: 360 } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative w-10 h-10 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-dashed"></div>
              <Icon className="relative z-10 h-7 w-7 text-primary transition-transform duration-300" />
            </motion.div>
          </motion.div>
          
          <CardTitle className="text-xl font-semibold text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <CardDescription className="text-base text-muted-foreground">
            {description}
          </CardDescription>
        </CardContent>
        
        <CardFooter className="relative z-10">
          <Link to={path} className="w-full">
            <Button 
              variant="premium"
              className={cn(
                "group/button relative w-full overflow-hidden"
              )}
            >
              <span className="absolute inset-0 h-full w-full -translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/button:animate-shimmer-x"></span>
              <span className="relative z-10 flex items-center gap-2">
                <span className="relative">
                  Open tool
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-white/35" 
                    initial={{ width: "0%" }}
                    animate={isHovered ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  animate={isHovered ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </motion.svg>
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
