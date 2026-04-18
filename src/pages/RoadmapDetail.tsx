import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { motion } from "framer-motion";
import { ChevronDown, ArrowLeft } from 'lucide-react';
import roadmaps, { RoadmapId, getRoadmapById } from '@/data/roadmaps';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const moduleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const sectionAccent: Record<string, string> = {
  blue: "rgb(26 115 232)",
  green: "rgb(52 168 83)",
  purple: "rgb(147 51 234)",
  rose: "rgb(244 63 94)",
  indigo: "rgb(79 70 229)",
  amber: "rgb(245 158 11)",
};

const RoadmapDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const roadmapData = getRoadmapById(id as RoadmapId);
      if (roadmapData) {
        setRoadmap(roadmapData);
        setLoading(false);
      } else {
        setError('Roadmap not found');
        setLoading(false);
      }
    }
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="page-shell py-20 text-center">
          <p className="text-xl">Loading roadmap...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !roadmap) {
    return (
      <MainLayout>
        <div className="page-shell py-20 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">{error || 'An error occurred'}</h1>
          <Link to="/roadmaps">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Roadmaps
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="page-shell py-8">
        <div className="page-hero mb-6">
          <Link to="/roadmaps">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Roadmaps
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-eyebrow mb-4">Detailed roadmap</div>
            <h1 className="section-title mb-2">
              {roadmap.title}
            </h1>
            <p className="section-copy mb-2 max-w-3xl">
              {roadmap.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {roadmap.sections.map((section: any, index: number) => (
            <motion.section 
              key={section.id} 
              variants={sectionVariants}
              className="mb-10"
            >
              <Card
                className="mb-6 shadow-[var(--shadow)]"
                style={{ borderTopWidth: "4px", borderTopColor: sectionAccent[section.color] || "rgb(26 115 232)" }}
              >
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {section.icon && <section.icon className="h-6 w-6" />}
                    <span>Section {index + 1}: {section.title}</span>
                  </CardTitle>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
              </Card>

              <div className="ml-4 md:ml-8">
                <Accordion type="multiple" className="space-y-4">
                  {section.modules.map((module: any) => (
                    <AccordionItem 
                      key={module.id} 
                      value={module.id}
                      className="rounded-[1.5rem] border border-border/80 bg-card/92 px-1 shadow-[var(--shadow-sm)]"
                    >
                      <AccordionTrigger className="rounded-[1.25rem] px-4 py-4 hover:bg-secondary/70">
                        <div className="flex items-center gap-3">
                          {module.icon && <module.icon className="h-5 w-5 text-primary" />}
                          <span className="font-medium">{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <ul className="space-y-2 text-sm md:text-base mt-2">
                          {module.lectures.map((lecture: any, idx: number) => {
                            // Handle both string lectures and object lectures
                            if (typeof lecture === 'string') {
                              return (
                                <motion.li 
                                  key={`${module.id}-lecture-${idx}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                                  className="border-l-2 border-border py-1 pl-3 transition-colors hover:border-primary"
                                >
                                  {lecture}
                                </motion.li>
                              );
                            } else {
                              // Handle lecture objects with title and content
                              return (
                                <motion.li 
                                  key={lecture.id || `${module.id}-lecture-${idx}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                                  className="border-l-2 border-border py-2 pl-3 transition-colors hover:border-primary"
                                >
                                  <h4 className="font-medium text-primary">
                                    {lecture.title}
                                  </h4>
                                  {lecture.content && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                      {lecture.content}
                                    </p>
                                  )}
                                </motion.li>
                              );
                            }
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.section>
          ))}
        </motion.div>

        <div className="page-panel mt-10 p-6">
          <h2 className="mb-4 text-xl font-semibold tracking-[-0.03em] text-foreground">Learning Tips</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Set specific, achievable goals for each section of the roadmap</li>
            <li>Practice regularly with hands-on coding exercises</li>
            <li>Join study groups or find a learning partner</li>
            <li>Take notes and create your own cheat sheets</li>
            <li>Build projects that incorporate what you've learned</li>
            <li>Don't rush - focus on understanding concepts thoroughly</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default RoadmapDetail; 
