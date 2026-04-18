import React from 'react';
import MainLayout from '@/components/MainLayout';
import PythonCheatsheetComponent from '@/components/python/PythonCheatsheet';
import { Helmet } from 'react-helmet';

const PythonCheatsheetPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Python Reference Guide - IITM Exam Prep | IITM Scholar Hub</title>
        <meta name="description" content="Complete Python built-in function and method reference for IITM BS DS exam preparation. 85+ functions covered including len, max, min, sorted, enumerate, zip, map, filter, and more." />
        <meta name="keywords" content="Python cheatsheet IITM, Python built-in functions, IITM exam prep Python, Python reference guide, Python methods, len max min sum sorted, IITM BS DS Python" />
        <meta property="og:title" content="Python Reference Guide - IITM Exam Prep | IITM Scholar Hub" />
        <meta property="og:description" content="Complete Python built-in function reference for IITM BS DS exam preparation. 85+ functions covered." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IITM Scholar Hub" />
        <meta property="og:url" content="https://iitm-scholar-hub.vercel.app/python-cheatsheet" />
        <meta property="og:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:title" content="Python Reference Guide - IITM Exam Prep" />
        <meta name="twitter:description" content="Complete Python function reference for IITM BS DS exams." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
      </Helmet>
      <PythonCheatsheetComponent />
    </MainLayout>
  );
};

export default PythonCheatsheetPage;
