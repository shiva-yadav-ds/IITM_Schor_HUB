import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import EndTermMarksPredictor from "@/components/predictors/EndTermMarksPredictor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from 'react-helmet';

export default function EndTermMarksPredictorPage() {
  const [activeTab, setActiveTab] = useState("foundation");

  return (
    <MainLayout>
      <Helmet>
        <title>End Term Marks Predictor for IIT Madras BS Exams | IITM Scholar Hub</title>
        <meta name="description" content="Calculate the marks you need in your final exam to achieve your target grade with our free End Term Marks Predictor for IIT Madras students. Made specifically for IITM BS foundation, diploma, and degree programs." />
        <meta name="keywords" content="End Term Marks Predictor for IIT Madras, IITM marks calculator, IIT Madras BS grade predictor, IITM exam score calculator, BS degree marks calculator, IITM foundation marks, diploma program calculator" />
        <meta property="og:title" content="Free End Term Marks Predictor for IIT Madras BS Exams | IITM Scholar Hub" />
        <meta property="og:description" content="Calculate the marks you need in your final exams to achieve your target grade in IITM BS programs." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IITM Scholar Hub" />
        <meta property="og:url" content="https://iitm-scholar-hub.vercel.app/endterm-marks-predictor" />
        <meta property="og:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:title" content="Free End Term Marks Predictor for IIT Madras BS Exams" />
        <meta name="twitter:description" content="Calculate required marks for your target grade in IITM BS programs." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
      </Helmet>
      <div className="page-shell py-6 sm:py-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Exam target planning</p>

          <Tabs
            defaultValue="foundation"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4 flex w-full flex-wrap gap-1 sm:mb-6">
              <TabsTrigger
                value="foundation"
                className="flex-1 px-2 text-xs sm:px-8 sm:text-sm"
              >
                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                  <span>Foundation</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="diploma"
                className="flex-1 px-2 text-xs sm:px-8 sm:text-sm"
              >
                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scroll"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" /><path d="M19 17V5a2 2 0 0 0-2-2H4" /></svg>
                  <span>Diploma</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="degree"
                className="flex-1 px-2 text-xs sm:px-8 sm:text-sm"
              >
                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                  <span>Degree</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="foundation" className="mt-0">
              <EndTermMarksPredictor level="foundation" />
            </TabsContent>

            <TabsContent value="diploma" className="mt-0">
              <EndTermMarksPredictor level="diploma" />
            </TabsContent>

            <TabsContent value="degree" className="mt-0">
              <EndTermMarksPredictor level="degree" />
            </TabsContent>
          </Tabs>
      </div>
    </MainLayout>
  );
}
