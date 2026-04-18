import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Variants for the theme icons animation
  const iconVariants = {
    initial: { 
      scale: 0.5, 
      opacity: 0, 
      rotate: -30 
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    exit: { 
      scale: 0.5, 
      opacity: 0, 
      rotate: 30,
      transition: { duration: 0.2 }
    }
  };
  
  // Variants for sun rays
  const sunRaysVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 10,
        ease: "linear"
      }
    }
  };
  
  // Variants for the moon stars
  const starsVariants = {
    animate: {
      opacity: [0.4, 1, 0.4],
      scale: [0.8, 1, 0.8],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  // Dropdown menu animation
  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -5,
      transition: { 
        duration: 0.15,
        ease: "easeOut" 
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="focus-ring relative h-10 w-10 overflow-hidden rounded-full border border-border/80 bg-secondary/80 shadow-[var(--shadow-sm)] transition-all duration-300 hover:bg-secondary"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/6 to-primary/18 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          
          <AnimatePresence mode="wait">
            {theme === "light" && (
              <motion.div
                key="light"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative"
              >
                <Sun className="h-[18px] w-[18px] text-yellow-500" />
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-yellow-500/20 border-dashed"
                  variants={sunRaysVariants}
                  animate="animate"
                />
              </motion.div>
            )}
            
            {theme === "dark" && (
              <motion.div
                key="dark"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative"
              >
                <Moon className="h-[18px] w-[18px] text-blue-400" />
                <motion.div 
                  className="absolute -top-1 -right-1 h-1 w-1 rounded-full bg-blue-200"
                  variants={starsVariants}
                  animate="animate"
                />
                <motion.div 
                  className="absolute top-1 -left-1 h-0.5 w-0.5 rounded-full bg-blue-200"
                  variants={starsVariants}
                  animate="animate"
                  style={{ animationDelay: "0.5s" }}
                />
              </motion.div>
            )}
            
            {theme === "system" && (
              <motion.div
                key="system"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative"
              >
                <Laptop className="h-[18px] w-[18px] text-gray-400" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      
      <AnimatePresence>
        <DropdownMenuContent 
          align="end"
          className="min-w-[200px] rounded-[1.5rem] border border-border/80 bg-popover/98 p-2 backdrop-blur-xl"
          sideOffset={8}
        >
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-1"
          >
            <DropdownMenuItem 
              onClick={() => setTheme("light")}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 cursor-pointer",
                theme === "light" 
                  ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300" 
                  : "hover:bg-gray-100/70 dark:hover:bg-gray-800/50"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full",
                theme === "light" 
                  ? "bg-yellow-100 dark:bg-yellow-800/30" 
                  : "bg-gray-100 dark:bg-gray-800"
              )}>
                <Sun className={cn(
                  "h-4 w-4",
                  theme === "light" 
                    ? "text-yellow-600 dark:text-yellow-400" 
                    : "text-gray-500 dark:text-gray-400"
                )} />
              </div>
              <div className="text-sm">
                <div className="font-medium">Light</div>
                <div className="text-xs text-muted-foreground">Light mode appearance</div>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => setTheme("dark")}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 cursor-pointer",
                theme === "dark" 
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" 
                  : "hover:bg-gray-100/70 dark:hover:bg-gray-800/50"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full",
                theme === "dark" 
                  ? "bg-blue-100 dark:bg-blue-800/30" 
                  : "bg-gray-100 dark:bg-gray-800"
              )}>
                <Moon className={cn(
                  "h-4 w-4",
                  theme === "dark" 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 dark:text-gray-400"
                )} />
              </div>
              <div className="text-sm">
                <div className="font-medium">Dark</div>
                <div className="text-xs text-muted-foreground">Dark mode appearance</div>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => setTheme("system")}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 cursor-pointer",
                theme === "system" 
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" 
                  : "hover:bg-gray-100/70 dark:hover:bg-gray-800/50"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full",
                theme === "system" 
                  ? "bg-purple-100 dark:bg-purple-800/30" 
                  : "bg-gray-100 dark:bg-gray-800"
              )}>
                <Laptop className={cn(
                  "h-4 w-4",
                  theme === "system" 
                    ? "text-purple-600 dark:text-purple-400" 
                    : "text-gray-500 dark:text-gray-400"
                )} />
              </div>
              <div className="text-sm">
                <div className="font-medium">System</div>
                <div className="text-xs text-muted-foreground">Follow system theme</div>
              </div>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
}
