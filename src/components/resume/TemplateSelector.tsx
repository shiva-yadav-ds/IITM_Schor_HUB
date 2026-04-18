import React, { useRef } from 'react';
import { 
  ProfessionalTemplate, 
  MinimalistTemplate, 
  CreativeTemplate, 
  TechTemplate,
  GoogleTemplate,
  MicrosoftTemplate,
  ExecutiveTemplate
} from './templates';
import { ResumeData } from '@/types/resume';
import { Button } from "@/components/ui/button";
import { Download, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useToast } from "@/hooks/use-toast";

const templates = [
  { id: 'professional', name: 'Professional', description: 'Formal business-oriented design', premium: false },
  { id: 'minimalist', name: 'Minimalist', description: 'Clean design with focus on content', premium: false },
  { id: 'creative', name: 'Creative', description: 'Colorful design with visual elements', premium: false },
  { id: 'tech', name: 'Tech', description: 'Dark mode coding-inspired design', premium: false },
  { id: 'google', name: '★ Google Style', description: 'Clean, modern Google-inspired design', premium: true },
  { id: 'microsoft', name: '★ Microsoft Style', description: 'Professional Microsoft template', premium: true },
  { id: 'executive', name: '★ Executive', description: 'Elegant design for senior roles', premium: true },
];

interface TemplateSelectorProps {
  data: ResumeData;
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  data,
  selectedTemplate,
  onSelectTemplate,
}) => {
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    if (!resumeRef.current) return;
    
    const element = resumeRef.current;
    
    // Calculate content height to determine if we need multiple pages
    const contentHeight = element.scrollHeight;
    const a4Height = 297; // A4 height in mm
    const scale = 2; // Scale factor for better quality
    
    const opt = {
      margin: 0,
      filename: `${data.personal.firstName}_${data.personal.lastName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: scale,
        useCORS: true,
        height: contentHeight,
        windowHeight: contentHeight
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };
    
    toast({
      title: "Preparing download...",
      description: "Your resume is being generated."
    });
    
    html2pdf().set(opt).from(element).save()
      .then(() => {
        toast({
          title: "Success!",
          description: "Your resume has been downloaded successfully."
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to download resume. Please try again.",
          variant: "destructive"
        });
      });
  };

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'tech':
        return <TechTemplate data={data} />;
      case 'google':
        return <GoogleTemplate data={data} />;
      case 'microsoft':
        return <MicrosoftTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      default:
        return <ProfessionalTemplate data={data} />;
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Choose Template</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div 
                className={`w-full h-10 rounded mb-2 flex items-center justify-center text-sm font-medium ${
                  template.id === 'tech' 
                    ? 'bg-gray-800 text-cyan-400' 
                    : template.id === 'creative'
                    ? 'bg-blue-100 text-blue-600'
                    : template.id === 'minimalist'
                    ? 'bg-gray-50 text-gray-700'
                    : template.id === 'google'
                    ? 'bg-white text-gray-800 font-google'
                    : template.id === 'microsoft'
                    ? 'bg-[#0078d4] text-white'
                    : template.id === 'executive'
                    ? 'bg-stone-800 text-stone-200'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {template.premium && <span className="mr-1">⭐</span>}
                {template.name}
              </div>
              <span className="text-xs text-gray-500 text-center">{template.description}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-3 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">
            Preview: <span className="text-blue-600">{templates.find(t => t.id === selectedTemplate)?.name} Template</span>
          </h3>
          <div className="flex space-x-2">
            <Button 
              onClick={() => window.print()}
              size="sm"
              variant="outline"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button 
              onClick={downloadPDF}
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
        <div className="w-full overflow-auto bg-gray-100 relative" style={{ height: '842px' }}>
          <div 
            ref={resumeRef} 
            className="w-[210mm] mx-auto my-0 shadow-md bg-white"
            style={{ 
              minHeight: '297mm',
              height: 'fit-content'
            }}
          >
            {renderSelectedTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
