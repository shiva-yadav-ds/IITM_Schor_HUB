import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/MainLayout";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { TemplateSelector } from "@/components/resume/TemplateSelector";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ResumeData, defaultResumeData } from "@/types/resume";
import { cn } from "@/lib/utils";
import { Helmet } from 'react-helmet';
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = 'resume_generator_draft';

const steps = [
  { id: "personal", label: "Personal Info" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "additional", label: "Additional Info" },
  { id: "template", label: "Choose Template" },
  { id: "preview", label: "Preview & Download" },
];

// Helper function to load data from localStorage
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load resume data from localStorage:', e);
  }
  return null;
};

const ResumeGenerator = () => {
  const { toast } = useToast();

  // Initialize state from localStorage if available
  const savedData = loadFromStorage();

  const [currentStep, setCurrentStep] = useState(savedData?.currentStep ?? 0);
  const [resumeData, setResumeData] = useState<ResumeData>(savedData?.resumeData ?? defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState(savedData?.selectedTemplate ?? "professional");
  const [completedSteps, setCompletedSteps] = useState<number[]>(savedData?.completedSteps ?? []);
  const [hasShownRestoreToast, setHasShownRestoreToast] = useState(false);

  // Show toast if data was restored from localStorage
  useEffect(() => {
    if (savedData && !hasShownRestoreToast && savedData.resumeData?.personal?.firstName) {
      toast({
        title: "📝 Draft Restored!",
        description: `Welcome back! Your resume draft for "${savedData.resumeData.personal.firstName}" has been restored.`,
      });
      setHasShownRestoreToast(true);
    }
  }, [savedData, hasShownRestoreToast, toast]);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    const dataToSave = {
      resumeData,
      currentStep,
      selectedTemplate,
      completedSteps,
      lastUpdated: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to save resume data to localStorage:', e);
    }
  }, [resumeData, currentStep, selectedTemplate, completedSteps]);

  // Function to clear the draft
  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setResumeData(defaultResumeData);
    setCurrentStep(0);
    setSelectedTemplate("professional");
    setCompletedSteps([]);
    toast({
      title: "Draft Cleared",
      description: "Your resume draft has been cleared. You can start fresh!",
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);

      // Scroll to top when moving to next step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);

      // Scroll to top when moving to previous step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (index: number) => {
    // Only allow navigation to completed steps or the current step + 1
    if (completedSteps.includes(index) || index === currentStep || index === 0) {
      setCurrentStep(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateResumeData = (sectionKey: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [sectionKey]: data
    }));
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Resume Generator & Professional Resume Builder | IITM Scholar Hub</title>
        <meta name="description" content="Create a professional resume in minutes with our free resume generator. Choose from elegant templates, get AI suggestions, and download your resume in multiple formats. Best resume builder for students and professionals." />
        <meta name="keywords" content="free resume generator, resume builder, CV maker, automatic resume maker, professional resume builder, free resume templates, student resume maker, IIT resume builder, best resume generator" />
        <meta property="og:title" content="Free Resume Generator & Professional Resume Builder | IITM Scholar Hub" />
        <meta property="og:description" content="Create a professional resume in minutes with our free resume generator. Best resume builder for students and professionals." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IITM Scholar Hub" />
        <meta property="og:url" content="https://iitm-scholar-hub.vercel.app/resume-generator" />
        <meta property="og:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:title" content="Free Resume Generator & Builder | IITM Scholar Hub" />
        <meta name="twitter:description" content="Create a professional resume in minutes with our free resume generator." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
      </Helmet>
      <div className="page-shell py-6 sm:py-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Resume generator</p>

        {/* Clear Draft Button - only show if there's saved data */}
        {savedData && resumeData.personal.firstName && (
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={clearDraft}
              className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Draft & Start Fresh
            </Button>
          </div>
        )}
        {/* Improved Progress indicator */}
        <div className="w-full mb-12 mt-8 px-4">
          <div className="relative flex items-center justify-between">
            {/* Progress bar */}
            <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-border"></div>
            <div
              className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>

            {/* Step circles */}
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index;
              const isActive = index <= currentStep;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "relative flex flex-col items-center group",
                    isActive ? "cursor-pointer" : "cursor-not-allowed"
                  )}
                  onClick={() => goToStep(index)}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 shadow-md z-10",
                    isCompleted ? "bg-green-500 border-green-600 text-white" :
                      isCurrent ? "bg-primary border-primary text-white" :
                        isActive ? "bg-white border-primary text-primary dark:bg-card" :
                          "bg-white border-border text-muted-foreground dark:bg-card"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                  </div>

                  {/* Label */}
                  <span className={cn(
                    "text-xs font-medium mt-2 absolute top-full whitespace-nowrap -translate-x-1/2 left-1/2 transform",
                    "opacity-0 group-hover:opacity-100 transition-opacity",
                    isCompleted ? "text-green-600 dark:text-green-400" :
                      isCurrent ? "text-primary" :
                        isActive ? "text-foreground" :
                          "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current step indicator - mobile friendly version */}
        <div className="mb-6 text-center md:hidden">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}:
          </span>
          <span className="ml-2 font-semibold text-primary">
            {steps[currentStep].label}
          </span>
        </div>

        {/* Step content */}
        <div className="page-panel mb-8 p-6">
          {currentStep < 6 ? (
            <ResumeForm
              step={steps[currentStep].id as keyof ResumeData}
              data={resumeData}
              updateData={updateResumeData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          ) : currentStep === 6 ? (
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
              data={resumeData}
            />
          ) : (
            <ResumePreview
              template={selectedTemplate}
              resumeData={resumeData}
              onPrev={prevStep}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ResumeGenerator;
