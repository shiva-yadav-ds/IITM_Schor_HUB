
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}

const PageHeader = ({ 
  title, 
  description, 
  icon: Icon, 
  className 
}: PageHeaderProps) => {
  return (
    <div className={cn("page-hero mb-8", className)}>
      <div className="section-eyebrow mb-5">
        {Icon && <Icon className="h-4 w-4" />}
        Smart academic tools
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <h1 className="section-title">{title}</h1>
          <p className="section-copy mt-3">{description}</p>
        </div>
        {Icon && (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary shadow-[var(--shadow-sm)]">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
