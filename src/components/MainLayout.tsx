import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mount animation and handle window events
  useEffect(() => {
    setMounted(true);

    // Immediately scroll to top when navigating
    if (isHomePage && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "auto" });
    } else {
      window.scrollTo(0, 0);
    }

    // Toggle home-page class for scoped body overflow behavior
    document.body.classList.toggle("home-page", isHomePage);
    
    return () => {
      setMounted(false);
      document.body.classList.remove("home-page");
    };
  }, [location.pathname, isHomePage]);
  
  return (
    <div
      ref={containerRef}
      className={
        isHomePage
          ? "relative flex h-screen flex-col overflow-y-auto overflow-x-hidden bg-transparent"
          : "relative flex min-h-screen flex-col overflow-x-hidden bg-transparent"
      }
    >
      {mounted && isHomePage && (
        <>
          <div className="blob blob-primary pointer-events-none right-[-8rem] top-0 h-72 w-72 opacity-80" />
          <div className="blob blob-secondary pointer-events-none bottom-[-6rem] left-[-5rem] h-72 w-72 opacity-70" />
        </>
      )}

      <Navbar />

      <main className="relative z-10 flex-grow w-full">
        <div className="w-full" style={{ minHeight: "calc(100vh - 4rem)" }}>
          {children}
        </div>
      </main>

      {isHomePage && (
        <div className="will-change-opacity">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
