import { useEffect } from "react";
import {
  Brain,
  Calculator,
  CheckCircle2,
  FileText,
  GraduationCap,
  MessageSquare,
  BookOpen,
  ChevronRight,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import MainLayout from "@/components/MainLayout";

const features = [
  {
    title: "Grade Calculator",
    description: "Calculate grades using official IITM rules with a cleaner breakdown of every component.",
    icon: GraduationCap,
    path: "/grade-calculator",
  },
  {
    title: "CGPA Calculator",
    description: "Track your CGPA across Foundation, Diploma, BSc, and BS with reliable course handling.",
    icon: Calculator,
    path: "/cgpa-calculator",
  },
  {
    title: "Resume Generator",
    description: "Build polished resumes with strong templates and a guided workflow for student profiles.",
    icon: FileText,
    path: "/resume-generator",
  },
  {
    title: "Learning Roadmaps",
    description: "Follow focused learning paths for Python, DSA, full stack development, and data science.",
    icon: Brain,
    path: "/roadmaps",
  },
  {
    title: "Marks Predictor",
    description: "See the end-term score you need for each target grade with visual guidance.",
    icon: Zap,
    path: "/endterm-marks-predictor",
  },
  {
    title: "AI Assistant",
    description: "Ask academic and programming questions in one place with persistent conversations. Login required.",
    icon: MessageSquare,
    path: "/ai-assistant",
  },
  {
    title: "StudyMatch",
    description: "Join the IITM student network for study sessions, reels, peer discovery, and collaborative learning.",
    icon: Users,
    path: "/study-match",
  },
];

const quickLinks = [
  { name: "Grade Calculator", subtitle: "Official grading logic", path: "/grade-calculator", icon: GraduationCap },
  { name: "CGPA Calculator", subtitle: "Across all levels", path: "/cgpa-calculator", icon: Calculator },
  { name: "Resume Builder", subtitle: "Professional templates", path: "/resume-generator", icon: FileText },
  { name: "Marks Predictor", subtitle: "Target your end term", path: "/endterm-marks-predictor", icon: Zap },
  { name: "StudyMatch", subtitle: "Campus collaboration", path: "/study-match", icon: Users },
];

const workflow = [
  {
    step: "01",
    title: "Choose the right tool",
    description: "Jump straight into grades, CGPA, resumes, roadmaps, or exam prediction from the homepage.",
  },
  {
    step: "02",
    title: "Enter your details",
    description: "Add scores, courses, or profile data through a structured interface built for IITM workflows.",
  },
  {
    step: "03",
    title: "Use the result immediately",
    description: "Get clean outputs, clear summaries, and next actions without extra setup or confusion.",
  },
];

const Index = () => {
  useEffect(() => {
    const links = ["/grade-calculator", "/resume-generator", "/roadmaps", "/endterm-marks-predictor"];
    links.forEach((link) => {
      const prefetch = document.createElement("link");
      prefetch.rel = "prefetch";
      prefetch.href = link;
      document.head.appendChild(prefetch);
    });
  }, []);

  return (
    <MainLayout>
      <section className="page-shell pb-16 pt-6 sm:pt-8">
        <div className="page-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,115,232,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(52,168,83,0.12),transparent_26%)]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl"
              >
                Academic tools that feel
                <span className="text-gradient-premium"> clear, fast, and premium.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
              >
                IITM Scholar Hub brings grade calculators, CGPA planning, resume building, roadmaps,
                smart guidance, and StudyMatch in one polished workspace.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.24 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <Link to="/grade-calculator">
                  <Button size="lg" className="min-w-[210px]">
                    Open Grade Calculator
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/roadmaps">
                  <Button size="lg" variant="outline" className="min-w-[210px]">
                    Explore Roadmaps
                  </Button>
                </Link>
                <Link to="/study-match">
                  <Button size="lg" variant="outline" className="min-w-[210px]">
                    Open StudyMatch
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <span className="metric-chip">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  2026 grading updates included
                </span>
                <span className="metric-chip">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Official IITM formulas preserved
                </span>
                <span className="metric-chip">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Faster, cleaner UI across tools
                </span>
                <span className="metric-chip">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  AI gated, core tools public
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="grid gap-4"
            >
              {quickLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} to={item.path}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="feature-tile flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                        </div>
                      </div>
                      <div className="rounded-full bg-secondary p-2 text-primary">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="page-shell py-8">
        <div className="mb-10">
          <div className="section-eyebrow">Core tools</div>
          <h2 className="section-title mt-5">Everything students need in one professional hub</h2>
          <p className="section-copy mt-4 max-w-3xl">
            Each workflow is organized around a specific academic task, with cleaner surfaces,
            stronger hierarchy, better visual consistency, and a connected student community layer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              path={feature.path}
              delay={index}
            />
          ))}
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="page-panel p-6 sm:p-8">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="section-eyebrow">How it works</div>
              <h2 className="section-title mt-5">Fast workflows, less friction, cleaner decisions</h2>
            </div>
            <p className="section-copy max-w-2xl">
              The site is structured to move students from input to output quickly while keeping the UI calm,
              readable, and consistent across calculators, resource pages, and StudyMatch flows.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {workflow.map((item) => (
              <div key={item.step} className="feature-tile h-full">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell pb-20 pt-6">
        <div className="page-panel overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,115,232,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(52,168,83,0.12),transparent_22%)]" />
          <div className="relative text-center">
            <div className="section-eyebrow">Start now</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
              Ready to make the site work harder for your academics?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Use the tools, plan your coursework, and keep your progress in one place with a sharper,
              more trustworthy interface and student collaboration built in.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/grade-calculator">
                <Button size="lg">
                  Calculate grades
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/cgpa-calculator">
                <Button size="lg" variant="outline">
                  Open CGPA Calculator
                </Button>
              </Link>
              <Link to="/python-cheatsheet">
                <Button size="lg" variant="outline">
                  <BookOpen className="h-4 w-4" />
                  Python Cheatsheet
                </Button>
              </Link>
              <Link to="/study-match">
                <Button size="lg" variant="outline">
                  <Users className="h-4 w-4" />
                  Go to StudyMatch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
