import React, { useEffect, lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import ChatWidgetProvider from "./components/ChatWidgetProvider";
import MainLayout from "./components/MainLayout";
import { seedColleges } from "./utils/seedData";

// Use React.lazy for code splitting (only load components when needed)
const ResumeGenerator = lazy(() => import("./pages/ResumeGenerator"));
const GradeCalculator = lazy(() => import("./pages/GradeCalculator"));
const CGPACalculator = lazy(() => import("./pages/CGPACalculator"));
const EndTermMarksPredictor = lazy(() => import("./pages/EndTermMarksPredictor"));
const PythonCheatsheet = lazy(() => import("./pages/PythonCheatsheet"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RoadmapListing = lazy(() => import("./pages/RoadmapListing"));
const RoadmapDetail = lazy(() => import("./pages/RoadmapDetail"));
const AiAssistant = lazy(() => import("./pages/AiAssistant"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const StudyMatchIndex = lazy(() => import("./pages/StudyMatchIndex"));
const ProfileSetup = lazy(() => import("./pages/ProfileSetup"));
const Feed = lazy(() => import("./pages/Feed"));
const Explore = lazy(() => import("./pages/Explore"));
const CreateSession = lazy(() => import("./pages/CreateSession"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const StudyReels = lazy(() => import("./pages/StudyReels"));
const SubmitReel = lazy(() => import("./pages/SubmitReel"));
const Terms = lazy(() => import("./pages/Terms"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
const SessionChat = lazy(() => import("./pages/SessionChat"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));


// Loading fallback component - should be lightweight
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-screen bg-background">
    <div className="flex flex-col items-center gap-2">
      <div className="h-10 w-10 rounded-full border-4 border-t-blue-600 border-blue-200 animate-spin"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Create the query client with cache optimization
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1, // Limit retries
      gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
    },
  },
});

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!user || !["admin@gmail.com", "yaduvanshishubha678@gmail.com"].includes(user.email || "")) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  // Fix for iOS height issue and performance optimizations
  useEffect(() => {
    // Fix iOS height issue
    const fixIOSHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Use passive event listeners for better scroll performance
    const opts = { passive: true };

    // Initial call and event listener
    fixIOSHeight();
    window.addEventListener('resize', fixIOSHeight, opts);
    window.addEventListener('orientationchange', fixIOSHeight, opts);

    // Prevent body scrolling on mobile touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.body.style.overscrollBehavior = 'none';
    }

    // Prefetch important routes
    const prefetchRoutes = () => {
      const importPromises = [
        import("./pages/Index"),
      ];
      // Execute all imports in parallel
      Promise.all(importPromises).catch(() => {
        // Silently fail prefetching
      });
    };

    // Prefetch after initial load during idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(prefetchRoutes);
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(prefetchRoutes, 1000);
    }

    return () => {
      window.removeEventListener('resize', fixIOSHeight);
      window.removeEventListener('orientationchange', fixIOSHeight);
    };
  }, []);

  useEffect(() => {
    seedColleges().catch((error) => {
      console.error("College seeding failed:", error);
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/resume-generator" element={<ResumeGenerator />} />
                  <Route path="/grade-calculator" element={<GradeCalculator />} />
                  <Route path="/cgpa-calculator" element={<CGPACalculator />} />
                  <Route path="/endterm-marks-predictor" element={<EndTermMarksPredictor />} />
                  <Route path="/roadmaps" element={<RoadmapListing />} />
                  <Route path="/roadmaps/:id" element={<RoadmapDetail />} />
                  <Route path="/python-cheatsheet" element={<PythonCheatsheet />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile-setup" element={<ProfileSetup />} />
                  <Route
                    path="/ai-assistant"
                    element={
                      <RequireAuth>
                        <AiAssistant />
                      </RequireAuth>
                    }
                  />

                  <Route path="/study-match" element={<MainLayout><StudyMatchIndex /></MainLayout>} />
                  <Route path="/feed" element={<MainLayout><Feed /></MainLayout>} />
                  <Route path="/explore" element={<MainLayout><Explore /></MainLayout>} />
                  <Route path="/create-session" element={<MainLayout><CreateSession /></MainLayout>} />
                  <Route path="/leaderboard" element={<MainLayout><Leaderboard /></MainLayout>} />
                  <Route path="/reels" element={<MainLayout><StudyReels /></MainLayout>} />
                  <Route path="/submit-reel" element={<MainLayout><SubmitReel /></MainLayout>} />
                  <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
                  <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
                  <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
                  <Route path="/sessions/:id/chat" element={<MainLayout><SessionChat /></MainLayout>} />
                  <Route path="/campus" element={<Navigate to="/study-match" replace />} />
                  <Route
                    path="/admin"
                    element={
                      <RequireAdmin>
                        <MainLayout><AdminDashboard /></MainLayout>
                      </RequireAdmin>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatWidgetProvider />
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
