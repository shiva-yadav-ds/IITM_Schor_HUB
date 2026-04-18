import React from 'react';
import MainLayout from '@/components/MainLayout';
import GradeCalculatorComponent from '@/components/calculators/GradeCalculator';
import { Helmet } from 'react-helmet';

const GradeCalculatorPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Grade Calculator for IIT Madras BS Program | IITM Scholar Hub</title>
        <meta name="description" content="Calculate your grades accurately with our specialized Grade Calculator for IIT Madras BS students. Uses official IITM grading system (A=10, B=9, C=8, D=7, E=6, F=0). Get instant grade calculations for all IIT Madras programs." />
        <meta name="keywords" content="Grade Calculator for IIT Madras, IITM Grade Calculator, IIT Madras BS grade calculator, IITM BS program grades, BS degree grade calculator, IITM grading system, free grade calculator" />
        <meta property="og:title" content="Grade Calculator for IIT Madras BS Program | IITM Scholar Hub" />
        <meta property="og:description" content="Calculate your grades accurately with our specialized calculator for IIT Madras BS students." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IITM Scholar Hub" />
        <meta property="og:url" content="https://iitm-scholar-hub.vercel.app/grade-calculator" />
        <meta property="og:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:title" content="Grade Calculator for IIT Madras BS Program" />
        <meta name="twitter:description" content="Calculate your grades for IIT Madras BS program with our free calculator." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
      </Helmet>
      <div className="page-shell py-6 sm:py-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Grade analysis</p>

        <div className="mt-4 sm:mt-8">
            <GradeCalculatorComponent />
        </div>
      </div>
    </MainLayout>
  );
};

export default GradeCalculatorPage;
