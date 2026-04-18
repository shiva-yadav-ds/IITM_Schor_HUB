
import React from 'react';
import { Button } from "@/components/ui/button";
import { PersonalForm } from "./forms/PersonalForm";
import { EducationForm } from "./forms/EducationForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { SkillsForm } from "./forms/SkillsForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { AdditionalInfoForm } from "./forms/AdditionalInfoForm";
import { ResumeData } from "@/types/resume";

interface ResumeFormProps {
  step: keyof ResumeData;
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  step,
  data,
  updateData,
  onNext,
  onPrev
}) => {
  const renderFormStep = () => {
    switch (step) {
      case 'personal':
        return (
          <PersonalForm 
            data={data.personal} 
            updateData={(newData) => updateData('personal', newData)} 
          />
        );
      case 'education':
        return (
          <EducationForm 
            data={data.education} 
            updateData={(newData) => updateData('education', newData)} 
          />
        );
      case 'experience':
        return (
          <ExperienceForm 
            data={data.experience} 
            updateData={(newData) => updateData('experience', newData)} 
          />
        );
      case 'skills':
        return (
          <SkillsForm 
            data={data.skills} 
            updateData={(newData) => updateData('skills', newData)} 
          />
        );
      case 'projects':
        return (
          <ProjectsForm 
            data={data.projects} 
            updateData={(newData) => updateData('projects', newData)} 
          />
        );
      case 'additional':
        return (
          <AdditionalInfoForm 
            data={data.additional} 
            updateData={(newData) => updateData('additional', newData)} 
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div>
      <div className="mb-6">
        {renderFormStep()}
      </div>
      <div className="flex justify-between mt-8">
        <Button
          onClick={onPrev}
          variant="outline"
          disabled={step === 'personal'}
        >
          Previous
        </Button>
        <Button onClick={onNext}>
          {step === 'additional' ? 'Choose Template' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
