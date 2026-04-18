import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronDown } from 'lucide-react';
import roadmaps, { RoadmapId } from '@/data/roadmaps';
import { useParams, useNavigate } from 'react-router-dom';

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

const moduleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const RoadmapPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<RoadmapId>(id as RoadmapId || 'data-scientist');
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [activeRoadmap, setActiveRoadmap] = useState(roadmaps.find(r => r.id === activeTab)?.roadmap || roadmaps[0].roadmap);

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  useEffect(() => {
    // If URL has an ID parameter, set it as active tab
    if (id) {
      const isValidRoadmap = roadmaps.some(r => r.id === id);
      if (isValidRoadmap) {
        setActiveTab(id as RoadmapId);
      } else {
        // Redirect to 404 or default roadmap if ID is invalid
        navigate('/roadmaps/data-scientist', { replace: true });
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    // Reset open modules when changing tabs
    setOpenModules({});
    
    // Set the active roadmap based on the tab
    const roadmap = roadmaps.find(r => r.id === activeTab)?.roadmap;
    if (roadmap) {
      setActiveRoadmap(roadmap);
      
      // Open first module of the first section by default
      if (roadmap.sections && roadmap.sections.length > 0 && 
          roadmap.sections[0].modules && roadmap.sections[0].modules.length > 0) {
        setOpenModules({ [roadmap.sections[0].modules[0].id]: true });
      }
    }
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as RoadmapId);
    // Update URL when tab changes
    navigate(`/roadmaps/${value}`, { replace: true });
  };

  const renderModules = (modules: any[]) => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {modules.map((module) => (
          <motion.div key={module.id} variants={moduleVariants}>
            <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader 
                className="cursor-pointer flex flex-row items-center justify-between" 
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center gap-3">
                  {module.icon && <module.icon className="h-5 w-5" />}
                  <CardTitle className="text-lg md:text-xl">{module.title}</CardTitle>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${openModules[module.id] ? 'transform rotate-180' : ''}`} 
                />
              </CardHeader>
              {openModules[module.id] && (
                <CardContent className="pt-2">
                  <ul className="space-y-4 text-sm md:text-base">
                    {module.lectures.map((lecture: any, index: number) => {
                      // Handle both string lectures and object lectures
                      if (typeof lecture === 'string') {
                        return (
                          <motion.li 
                            key={`${module.id}-lecture-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="py-1 pl-3 border-l-2 border-gray-300 hover:border-blue-500 transition-colors"
                          >
                            {lecture}
                          </motion.li>
                        );
                      } else {
                        // Handle lecture objects with title and content
                        return (
                          <motion.li 
                            key={lecture.id || `${module.id}-lecture-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="py-2 pl-3 border-l-2 border-gray-300 hover:border-blue-500 transition-colors"
                          >
                            <h4 className="font-medium text-blue-700 dark:text-blue-400">
                              {lecture.title}
                            </h4>
                            {lecture.content && (
                              <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                                {lecture.content}
                              </p>
                            )}
                          </motion.li>
                        );
                      }
                    })}
                  </ul>
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {activeRoadmap.title}
          </h1>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            {activeRoadmap.description}
          </p>
        </motion.div>

        <Tabs 
          defaultValue={activeTab} 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="w-full"
        >
          <div className="flex justify-center mb-10">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-4xl backdrop-blur-sm bg-opacity-90">
              {roadmaps.map(roadmap => (
                <TabsTrigger 
                  key={roadmap.id} 
                  value={roadmap.id} 
                  className="text-sm md:text-base font-medium tracking-wide"
                >
                  {roadmap.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {activeRoadmap.sections.map((section) => (
              <TabsContent key={section.id} value={activeTab} className="mt-0 mb-10">
                <div className={`p-4 bg-${section.color}-50 rounded-lg mb-6`}>
                  <h2 className="text-xl md:text-2xl font-semibold mb-2 flex items-center gap-2">
                    {section.icon && <section.icon className="h-6 w-6" />}
                    {section.title}
                  </h2>
                  <p className="text-gray-700">
                    {section.description}
                  </p>
                </div>
                {renderModules(section.modules)}
              </TabsContent>
            ))}
          </motion.div>
        </Tabs>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">More Learning Resources</h2>
          <p className="text-gray-700 mb-4">
            Our roadmaps are designed to give you a structured learning path, 
            but we encourage you to explore additional resources:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Recommended books for each topic</li>
            <li>Hands-on projects to reinforce your learning</li>
            <li>Online courses and tutorials</li>
            <li>Community forums and discussion groups</li>
            <li>Practice platforms for coding challenges</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default RoadmapPage; 