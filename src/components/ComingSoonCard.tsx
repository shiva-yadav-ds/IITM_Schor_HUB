import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ComingSoonCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ComingSoonCard = ({ title, description, icon: Icon }: ComingSoonCardProps) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 h-full">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-lg bg-iitm-blue/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-iitm-blue" />
        </div>
        <CardTitle className="text-black dark:text-white text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700 dark:text-gray-300 text-base mb-4">{description}</CardDescription>
        <div className="mt-4 py-2 px-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 rounded-md text-amber-800 dark:text-amber-300 text-sm font-medium">
          Launching Soon – Stay Tuned!
        </div>
      </CardContent>
    </Card>
  );
};

export default ComingSoonCard;
