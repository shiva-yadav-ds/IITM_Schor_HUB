import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PredictionGraphProps {
  predictions: any[];
  selectedIndex: number;
  onSelectGrade: (index: number) => void;
  components?: Record<string, number>;
  formulaWeightage?: Record<string, number>;
  totalAchieved?: number;
}

const PredictionGraph: React.FC<PredictionGraphProps> = ({
  predictions,
  selectedIndex,
  onSelectGrade,
  components = {},
  formulaWeightage = {},
  totalAchieved = 0
}) => {
  if (!predictions || predictions.length === 0) {
    return <div>No prediction data available</div>;
  }

  const isDarkTheme =
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  const chartTitleColor = isDarkTheme ? 'rgba(241, 245, 249, 0.92)' : 'rgba(30, 41, 59, 0.92)';
  const chartTextColor = isDarkTheme ? 'rgba(203, 213, 225, 0.9)' : 'rgba(71, 85, 105, 0.9)';
  const chartGridColor = isDarkTheme ? 'rgba(148, 163, 184, 0.16)' : 'rgba(148, 163, 184, 0.28)';

  const labels = predictions.map(pred => `Grade ${pred.grade}`);
  const requiredScores = predictions.map(pred => (pred.required < 0 ? 0 : pred.required > 100 ? 100 : pred.required));
  
  // Config for the bar chart showing required scores
  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Required Score',
        data: requiredScores,
        backgroundColor: predictions.map((pred, index) => 
          index === selectedIndex 
            ? 'rgba(59, 130, 246, 0.9)' 
            : pred.achievable 
              ? 'rgba(59, 130, 246, 0.5)' 
              : 'rgba(239, 68, 68, 0.5)'
        ),
        borderColor: predictions.map((pred, index) => 
          index === selectedIndex 
            ? 'rgba(59, 130, 246, 1)' 
            : pred.achievable 
              ? 'rgba(59, 130, 246, 0.8)' 
              : 'rgba(239, 68, 68, 0.8)'
        ),
        borderWidth: 2,
        borderRadius: 6,
      }
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event: any, elements: any) => {
      if (elements && elements.length > 0) {
        const clickedIndex = elements[0].index;
        if (predictions[clickedIndex].achievable) {
          onSelectGrade(clickedIndex);
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: chartTextColor,
        }
      },
      title: {
        display: true,
        text: 'Required Score by Grade',
        font: {
          size: 16,
          weight: 'bold' as const
        },
        color: chartTitleColor,
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(20, 30, 50, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function(context: any) {
            const prediction = predictions[context.dataIndex];
            const value = prediction.required;
            
            if (value <= 0) {
              return 'Already achieved!';
            } else if (value > 100) {
              return 'Not achievable';
            } else {
              return `Required: ${value.toFixed(2)}%`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Required Score (%)',
          color: chartTitleColor,
          font: {
            size: 14,
            weight: 'bold' as const
          }
        },
        ticks: {
          color: chartTextColor,
          font: {
            size: 12
          }
        },
        grid: {
          color: chartGridColor,
        }
      },
      x: {
        ticks: {
          color: chartTextColor,
          font: {
            size: 12,
            weight: 'bold' as const
          }
        },
        grid: {
          color: chartGridColor,
        }
      }
    },
  };

  // Create weightage chart data
  const componentKeys = Object.keys(components);
  const weightageChartData = {
    labels: componentKeys.map(k => k.toUpperCase()),
    datasets: [
      {
        label: 'Weightage (%)',
        data: componentKeys.map(key => (formulaWeightage[key] || 0)),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 0.9)',
        borderWidth: 2,
        borderRadius: 6,
      },
      {
        label: 'Your Contribution',
        data: componentKeys.map(key => {
          const score = components[key] || 0;
          const weight = formulaWeightage[key] || 0;
          return (score * weight / 100);
        }),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 0.9)',
        borderWidth: 2,
        borderRadius: 6,
      }
    ],
  };

  // Add final exam component
  if (formulaWeightage['final']) {
    weightageChartData.labels.push('FINAL EXAM');
    weightageChartData.datasets[0].data.push(formulaWeightage['final']);
    weightageChartData.datasets[1].data.push(0); // Haven't taken final yet
  }

  const weightageOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: chartTextColor,
        }
      },
      title: {
        display: true,
        text: 'Component Weightage & Contribution',
        font: {
          size: 16,
          weight: 'bold' as const
        },
        color: chartTitleColor,
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(20, 30, 50, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function(context: any) {
            const datasetLabel = context.dataset.label || '';
            const value = context.raw || 0;
            
            if (datasetLabel === 'Weightage (%)') {
              return `${datasetLabel}: ${value.toFixed(1)}%`;
            } else {
              const componentKey = (weightageChartData.labels[context.dataIndex] as string).toLowerCase();
              const score = components[componentKey] || 0;
              return [
                `${datasetLabel}: ${value.toFixed(1)}%`,
                `Score: ${score.toFixed(1)}%`
              ];
            }
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 50, // Most weightages don't exceed 50%
        title: {
          display: true,
          text: 'Percentage (%)',
          color: chartTitleColor,
          font: {
            size: 14,
            weight: 'bold' as const
          }
        },
        ticks: {
          color: chartTextColor,
          font: {
            size: 12
          }
        },
        grid: {
          color: chartGridColor,
        }
      },
      y: {
        ticks: {
          color: chartTextColor,
          font: {
            size: 12,
            weight: 'bold' as const
          }
        },
        grid: {
          color: chartGridColor,
        }
      }
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ marginBottom: '2rem', height: '400px' }}>
        <Bar data={barChartData} options={barOptions} />
      </div>
      <div style={{ marginTop: '2rem', height: '300px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: chartTitleColor }}>
          Component Weightage Analysis
        </h3>
        <Bar data={weightageChartData} options={weightageOptions} />
      </div>
    </div>
  );
};

export default PredictionGraph; 