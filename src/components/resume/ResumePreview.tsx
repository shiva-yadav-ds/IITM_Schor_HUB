import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ResumeData, ResumeTemplate } from "@/types/resume";
import {
  ProfessionalTemplate,
  MinimalistTemplate,
  CreativeTemplate,
  TechTemplate,
  ModernCompactTemplate,
  ElegantTemplate,
  MinimalBarTemplate,
  SimpleElegantTemplate
} from "./templates";
import { useToast } from "@/hooks/use-toast";
import { Download, Save, ChevronLeft, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface ResumePreviewProps {
  template: ResumeTemplate | string;
  resumeData: ResumeData;
  onPrev: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  template,
  resumeData,
  onPrev
}) => {
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (template as ResumeTemplate) {
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'minimalist':
        return <MinimalistTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'tech':
        return <TechTemplate data={resumeData} />;
      case 'modern-compact':
        return <ModernCompactTemplate data={resumeData} />;
      case 'elegant':
        return <ElegantTemplate data={resumeData} />;
      case 'minimal-bar':
        return <MinimalBarTemplate data={resumeData} />;
      case 'simple-elegant':
        return <SimpleElegantTemplate data={resumeData} />;
      default:
        return <ProfessionalTemplate data={resumeData} />;
    }
  };

  const downloadPDF = () => {
    if (!resumeRef.current) return;

    const element = resumeRef.current;
    const opt = {
      margin: [5, 0, 5, 0], // Small top/bottom margins, no side margins
      filename: `${resumeData.personal.firstName}_${resumeData.personal.lastName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: ['section', 'div', 'h2', 'h3']
      }
    };

    toast({
      title: "Preparing download...",
      description: "Your resume is being generated."
    });

    html2pdf().set(opt).from(element).save().then(() => {
      toast({
        title: "Download complete!",
        description: "Your resume has been downloaded successfully."
      });
    });
  };

  const printResume = () => {
    if (!resumeRef.current) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Error",
        description: "Unable to open print window. Please check your popup blocker settings.",
        variant: "destructive"
      });
      return;
    }

    const content = resumeRef.current.innerHTML;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.personal.firstName} ${resumeData.personal.lastName} - Resume</title>
          <style>
            body { margin: 0; font-family: Arial, sans-serif; }
            @media print {
              @page { size: A4; margin: 0; }
              body { width: 210mm; height: 297mm; }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const saveLocally = () => {
    const savedResumesStr = localStorage.getItem('resumeData');
    const savedResumes = savedResumesStr ? JSON.parse(savedResumesStr) : [];

    const newSavedResume = {
      id: Date.now(),
      title: `${resumeData.personal.firstName} ${resumeData.personal.lastName}'s Resume`,
      data: resumeData,
      template,
      date: new Date().toISOString()
    };

    savedResumes.push(newSavedResume);
    localStorage.setItem('resumeData', JSON.stringify(savedResumes));

    toast({
      title: "Resume saved!",
      description: "You can access it later from the My Resumes section."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resume Preview</h2>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={saveLocally}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" onClick={printResume}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button onClick={downloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto max-h-[85vh]">
        <div
          className="w-[210mm] shadow-xl bg-white"
          ref={resumeRef}
          style={{ maxWidth: '100%' }}
        >
          {renderTemplate()}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={onPrev} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Button>
      </div>
    </div>
  );
};
