import React from 'react';
import MainLayout from '@/components/MainLayout';
import CGPACalculatorComponent from '@/components/cgpa/CGPACalculator';
import { Helmet } from 'react-helmet';

const CGPACalculatorPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>CGPA Calculator for IIT Madras BS Program | IITM Scholar Hub</title>
        <meta name="description" content="Calculate your CGPA accurately with our specialized CGPA Calculator for IIT Madras BS students. Uses official IITM grading system (S=10, A=9, B=8, C=7, D=6, E=4, U=0). Get instant CGPA calculations for Foundation, Diploma, BSc, and BS programs." />
        <meta name="keywords" content="CGPA Calculator for IIT Madras, IITM CGPA Calculator, IIT Madras BS CGPA calculator, IITM BS program CGPA, BS degree CGPA calculator, IITM grading system, free CGPA calculator" />
        <meta property="og:title" content="CGPA Calculator for IIT Madras BS Program | IITM Scholar Hub" />
        <meta property="og:description" content="Calculate your CGPA accurately with our specialized calculator for IIT Madras BS students." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IITM Scholar Hub" />
        <meta property="og:url" content="https://iitm-scholar-hub.vercel.app/cgpa-calculator" />
        <meta property="og:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:title" content="CGPA Calculator for IIT Madras BS Program" />
        <meta name="twitter:description" content="Calculate your CGPA for IIT Madras BS program with our free calculator." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
      </Helmet>
      <div className="page-shell py-6 sm:py-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">CGPA Calculator</p>

        <div className="mt-4 sm:mt-8">
            <CGPACalculatorComponent />
        </div>
      </div>
    </MainLayout>
  );
};

export default CGPACalculatorPage;
