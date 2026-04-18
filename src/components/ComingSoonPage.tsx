import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import MainLayout from "@/components/MainLayout";
import { cn } from "@/lib/utils";

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ComingSoonPage = ({ title, description, icon: Icon }: ComingSoonPageProps) => {
  return (
    <MainLayout>
      <PageHeader title={title} description={description} icon={Icon} />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Card className="border-2 border-amber-200 dark:border-amber-800 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-6 shadow-inner">
              <Icon className="h-12 w-12 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[hsl(var(--iitm-dark))]">
              {title} - Coming Soon!
            </h2>
            <p className={cn(
              "text-center max-w-lg mb-8",
              "text-gray-700 dark:text-gray-200"
            )}>
              {description}
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-800/80 rounded-md px-6 py-4 text-amber-800 dark:text-amber-300 text-center shadow-sm w-full max-w-md">
              <p className="font-semibold text-lg mb-2">We're working on it!</p>
              <p>This feature is currently under development and will be available soon.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ComingSoonPage;
