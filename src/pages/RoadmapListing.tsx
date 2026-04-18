import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { motion } from "framer-motion";
import { Code, BrainCircuit, Database, Network, MonitorSmartphone, ArrowRight, Coffee, BookOpen, Layers, BarChart } from 'lucide-react';
import roadmaps from '@/data/roadmaps';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Helper function for roadmap icons with their background
const getRoadmapIconWithBg = (id: string) => {
  switch(id) {
    case 'data-scientist':
      return {
        icon: <BrainCircuit className="h-7 w-7" />,
        bg: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        border: "border-purple-500/50 dark:border-purple-500/30"
      };
    case 'dsa-python':
      return {
        icon: <Code className="h-7 w-7" />,
        bg: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        border: "border-blue-500/50 dark:border-blue-500/30"
      };
    case 'dsa-java':
      return {
        icon: <Coffee className="h-7 w-7" />,
        bg: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
        border: "border-amber-600/50 dark:border-amber-500/30"
      };
    case 'fullstack':
      return {
        icon: <MonitorSmartphone className="h-7 w-7" />,
        bg: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-500/50 dark:border-emerald-500/30"
      };
    default:
      return {
        icon: <Code className="h-7 w-7" />,
        bg: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
        border: "border-gray-500/50 dark:border-gray-500/30"
      };
  }
};

// Helper for category badges
const getCategoryStyle = (id: string) => {
  switch(id) {
    case 'data-scientist':
      return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300";
    case 'dsa-python':
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
    case 'dsa-java':
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300";
    case 'fullstack':
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
  }
};

const RoadmapListing = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Data Science & Tech Learning Roadmaps | Complete Career Paths | IITM Scholar Hub</title>
        <meta name="description" content="Follow our detailed roadmaps for data science, programming, web development and more. Step-by-step guides from beginner to expert with comprehensive learning paths for any tech career." />
        <meta name="keywords" content="data science roadmap, complete data science roadmap, programming learning path, tech career roadmap, full stack development path, data science learning journey, beginner to expert roadmap, free learning roadmaps" />
        <meta property="og:title" content="Data Science & Tech Learning Roadmaps | Complete Career Paths" />
        <meta property="og:description" content="Follow our detailed roadmaps for data science, programming and web development with step-by-step guides." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IITM Scholar Hub" />
        <meta property="og:url" content="https://iitm-scholar-hub.vercel.app/roadmaps" />
        <meta property="og:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:title" content="Data Science & Tech Learning Roadmaps" />
        <meta name="twitter:description" content="Follow comprehensive roadmaps for data science and tech careers." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
      </Helmet>
      <div className="page-shell py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="page-hero mb-10"
        >
          <div className="section-eyebrow mb-4">Curated learning paths</div>
          <h1 className="section-title text-center">Learning Roadmaps</h1>
          <p className="section-copy mx-auto mt-4 max-w-3xl text-center">
            Explore our comprehensive learning paths designed to guide you from beginner to expert in various tech domains.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
        >
          {roadmaps.map((roadmap) => {
            const iconWithBg = getRoadmapIconWithBg(roadmap.id);
            const categoryStyle = getCategoryStyle(roadmap.id);
            
            return (
            <motion.div key={roadmap.id} variants={itemVariants}>
                <Card className="group flex h-full flex-col overflow-hidden border-border/80 bg-card/92">
                  <div className={`h-1.5 w-full ${iconWithBg.border}`}></div>
                  <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl ${iconWithBg.bg}`}>
                        {iconWithBg.icon}
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryStyle}`}>
                      {roadmap.id === 'data-scientist' ? 'Data Science' : 
                       roadmap.id === 'dsa-python' ? 'Programming' : 
                       roadmap.id === 'dsa-java' ? 'Programming' : 
                       roadmap.id === 'fullstack' ? 'Web Dev' : 'Technology'}
                    </div>
                  </div>
                    <CardTitle className="mt-3 text-xl text-foreground transition-colors group-hover:text-primary md:text-2xl">
                      {roadmap.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {roadmap.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-secondary/80 px-4 py-3">
                        <Database className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-foreground">
                        {roadmap.roadmap.sections.length} Learning Sections
                      </span>
                    </div>
                      <div className="flex items-center gap-3 rounded-2xl bg-secondary/80 px-4 py-3">
                        <Network className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm text-foreground">
                        {roadmap.roadmap.sections.reduce((acc, section) => 
                          acc + section.modules.length, 0
                        )} Detailed Modules
                      </span>
                    </div>
                      <div className="flex items-center gap-3 rounded-2xl bg-secondary/80 px-4 py-3">
                        <Code className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-foreground">
                        {roadmap.roadmap.sections.reduce((acc, section) => 
                          acc + section.modules.reduce((moduleAcc, module) => 
                            moduleAcc + module.lectures.length, 0
                          ), 0
                        )}+ Individual Lectures
                      </span>
                    </div>
                  </div>
                </CardContent>
                  <CardFooter className="mt-auto pt-5">
                    <Button asChild variant="default" className="w-full">
                      <Link to={`/roadmaps/${roadmap.id}`} className="flex items-center justify-center">
                        View Roadmap
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                </CardFooter>
              </Card>
            </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="page-panel overflow-hidden p-1.5"
        >
          <div className="rounded-[1.5rem] border border-border/80 bg-white/90 p-6 dark:bg-card/85">
            <h2 className="mb-6 text-center text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Why Follow Our Roadmaps?
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="rounded-xl overflow-hidden"
              >
                <div className="h-full rounded-[1.5rem] border border-blue-100 bg-blue-50/80 p-6 dark:border-blue-900/30 dark:bg-blue-950/20">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                    <Layers className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Structured Learning</h3>
                  <p className="text-muted-foreground">Our roadmaps provide a clear, step-by-step path from basics to advanced topics.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="rounded-xl overflow-hidden"
              >
                <div className="h-full rounded-[1.5rem] border border-purple-100 bg-purple-50/80 p-6 dark:border-purple-900/30 dark:bg-purple-950/20">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
                    <BarChart className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Industry Relevance</h3>
                  <p className="text-muted-foreground">Content designed based on current industry requirements and best practices.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="rounded-xl overflow-hidden"
              >
                <div className="h-full rounded-[1.5rem] border border-emerald-100 bg-emerald-50/80 p-6 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <BookOpen className="h-6 w-6" />
            </div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Comprehensive Coverage</h3>
                  <p className="text-muted-foreground">Each roadmap covers all essential topics needed to master the subject area.</p>
            </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default RoadmapListing; 
