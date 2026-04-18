import { useEffect } from "react";
import { Brain, FileText, Calculator, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import ComingSoonCard from "@/components/ComingSoonCard";
import MainLayout from "@/components/MainLayout";
import { useHomeAnimations } from "@/hooks/useHomeAnimations";

const showFeatures = {
  resumeGenerator: true,
  gradeCalculator: true,
  marksPredictor: true
};

const Index = () => {
  useHomeAnimations();

  // Pre-load key components to improve navigation performance
  useEffect(() => {
    const links = [
      '/grade-calculator',
      '/resume-generator',
      '/roadmaps',
      '/endterm-marks-predictor'
    ];

    links.forEach(link => {
      const prefetch = document.createElement('link');
      prefetch.rel = 'prefetch';
      prefetch.href = link;
      document.head.appendChild(prefetch);
    });
  }, []);

  return (
    <MainLayout>
      {/* Rest of the component content */}
    </MainLayout>
  );
};

export default Index; 