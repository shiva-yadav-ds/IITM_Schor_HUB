
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import MainLayout from "@/components/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="container py-16 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-iitm-blue/10 rounded-full flex items-center justify-center mb-6">
          <FileQuestion className="h-10 w-10 text-iitm-blue" />
        </div>
        <h1 className="text-4xl font-bold text-iitm-dark mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6 text-center">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button className="bg-iitm-blue text-white hover:bg-iitm-blue/90">
            Return to Home
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
