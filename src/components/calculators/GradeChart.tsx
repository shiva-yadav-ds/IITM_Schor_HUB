import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { CourseGrade } from '@/lib/grade/foundation';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Professional color palette with purple and blue transparent blur
const colors = {
  primary: 'rgba(124, 58, 237, 1)',   // Vibrant Purple
  secondary: 'rgba(79, 70, 229, 1)',  // Indigo
  info: 'rgba(59, 130, 246, 1)',      // Bright Blue
  success: 'rgba(16, 185, 129, 1)',   // Emerald
  warning: 'rgba(245, 158, 11, 1)',   // Amber
  error: 'rgba(239, 68, 68, 1)',      // Red
  neutral: 'rgba(148, 163, 184, 1)',  // Slate
};

// Grade color mapping with purple and blue focus
const gradeColors = {
  'S': colors.primary,                // Purple for S grade
  'A': colors.secondary,              // Indigo for A grade
  'B': colors.info,                   // Blue for B grade
  'C': colors.success,                // Emerald for C grade
  'D': colors.warning,                // Amber for D grade
  'E': colors.error,                  // Red for E grade
  'F': 'rgba(156, 163, 175, 1)',      // Gray for F grade
  'U': 'rgba(156, 163, 175, 1)'       // Gray for U grade
};

// Function to get color based on grade
export const getGradeColor = (grade: string): string => {
  return gradeColors[grade as keyof typeof gradeColors] || colors.neutral;
};

// Function to create gradient backgrounds for charts with transparent blur effect
const createGradient = (ctx: CanvasRenderingContext2D, color: string) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  const rgbaColor = color.replace('1)', '0.8)');
  const rgbaColorLight = color.replace('1)', '0.3)'); // More transparency for blur effect

  gradient.addColorStop(0, rgbaColor);
  gradient.addColorStop(1, rgbaColorLight);

  return gradient;
};

interface GradeChartProps {
  courses: CourseGrade[];
  cgpa: number | null;
}

const GradeChart: React.FC<GradeChartProps> = ({ courses, cgpa }) => {
  // Prepare data for grade distribution
  const gradeDistribution = React.useMemo(() => {
    const distribution: Record<string, number> = {};

    courses.forEach(course => {
      distribution[course.grade] = (distribution[course.grade] || 0) + 1;
    });

    const labels = Object.keys(distribution);
    const data = Object.values(distribution);

    return {
      labels,
      datasets: [
        {
          label: 'Number of Courses',
          data,
          backgroundColor: labels.map(grade =>
            getGradeColor(grade).replace('1)', '0.85)')  // More opaque for better visibility
          ),
          borderColor: labels.map(grade => getGradeColor(grade)),
          borderWidth: 2,
          borderRadius: 6,
          hoverOffset: 10,
        },
      ],
    };
  }, [courses]);

  // Prepare data for credit distribution
  const creditDistribution = React.useMemo(() => {
    const distribution: Record<string, number> = {};

    courses.forEach(course => {
      distribution[course.grade] = (distribution[course.grade] || 0) + course.credits;
    });

    const labels = Object.keys(distribution);
    const data = Object.values(distribution);

    return {
      labels,
      datasets: [
        {
          label: 'Credits',
          data,
          backgroundColor: labels.map(grade =>
            getGradeColor(grade).replace('1)', '0.85)')  // More opaque for better visibility
          ),
          borderColor: labels.map(grade => getGradeColor(grade)),
          borderWidth: 2,
          borderRadius: 6,
          hoverOffset: 10,
        },
      ],
    };
  }, [courses]);

  // Chart options with improved styling for better contrast
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11,
            weight: 'bold' as const,
          },
          color: 'white',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleFont: {
          size: 13,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyColor: 'rgba(255, 255, 255, 1)',
      },
    },
  };

  // Calculate total credits
  const totalCredits = React.useMemo(() => {
    return courses.reduce((sum, course) => sum + course.credits, 0);
  }, [courses]);

  // CGPA visualization options
  const cgpaDisplayValue = cgpa !== null ? cgpa : 0;
  const cgpaPercentage = (cgpaDisplayValue / 10) * 100;

  // Get CGPA color based on value with enhanced visibility
  const getCgpaColor = (value: number) => {
    if (value >= 9) return colors.primary;    // Purple for highest CGPA
    if (value >= 8) return colors.secondary;  // Indigo for high CGPA
    if (value >= 7) return colors.info;       // Blue for good CGPA
    if (value >= 5) return colors.success;    // Emerald for average CGPA
    return colors.warning;                    // Amber for low CGPA
  };

  const cgpaColor = getCgpaColor(cgpaDisplayValue);

  const cgpaData = {
    labels: ['CGPA'],
    datasets: [
      {
        data: [cgpaPercentage, 100 - cgpaPercentage],
        backgroundColor: [
          cgpaColor.replace('1)', '0.9)'),     // Very opaque for better visibility
          'rgba(226, 232, 240, 0.15)',         // Slightly more visible for contrast
        ],
        borderColor: [
          cgpaColor,
          'rgba(226, 232, 240, 0.1)',
        ],
        borderWidth: 2,
        circumference: 360,
        cutout: '80%',
      },
    ],
  };

  const cgpaOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* CGPA Display Card */}
      <Card className="overflow-hidden border-border/80 bg-card/92">
        <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center">
          <h3 className="mb-3 text-center text-base font-medium text-foreground sm:text-lg">CGPA</h3>
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <Doughnut data={cgpaData} options={cgpaOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold" style={{ color: cgpaColor }}>
                {cgpaDisplayValue.toFixed(2)}
              </span>
              <span className="mt-1 text-xs text-muted-foreground sm:text-sm">out of 10.0</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-xs text-muted-foreground sm:text-sm">
              Total Credits: <span className="font-medium text-foreground">{totalCredits}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Grade Distribution Card */}
      <Card className="overflow-hidden border-border/80 bg-card/92">
        <CardContent className="p-4 sm:p-6">
          <h3 className="mb-3 text-base font-medium text-foreground sm:text-lg">Grade Distribution</h3>
          <div className="h-[180px] sm:h-[220px] flex items-center justify-center">
            <Doughnut data={gradeDistribution} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Credit Distribution Card */}
      <Card className="overflow-hidden border-border/80 bg-card/92 sm:col-span-2 lg:col-span-1">
        <CardContent className="p-4 sm:p-6">
          <h3 className="mb-3 text-base font-medium text-foreground sm:text-lg">Credit Distribution</h3>
          <div className="h-[180px] sm:h-[220px] flex items-center justify-center">
            <Doughnut data={creditDistribution} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeChart; 
