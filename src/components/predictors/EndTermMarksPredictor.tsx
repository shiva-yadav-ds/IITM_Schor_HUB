"use client";

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import {
  foundationSubjects,
  getRequiredFields as getFoundationRequiredFields,
  calculatePredictions as calculateFoundationPredictions,
  gradeThresholds,
  foundation,
  diploma,
  degree
} from "@/lib/endterm-marks-predictor";
import { getFormulaWeightage, calculateAchievedScore } from "@/lib/endterm-marks-predictor/formula-utils";
import PredictionGraph from './PredictionGraph';

// Constants for localStorage keys
const STORAGE_KEYS = {
  SELECTED_SUBJECT: 'endTermMarksPredictor.selectedSubject',
  FORM_VALUES: 'endTermMarksPredictor.formValues'
};

// Field Label mapping
const fieldLabels: Record<string, string> = {
  gaa: "GAA (Weekly assignments average)",
  gaa1: "GAA1 (Objective assignments)",
  gaa2: "GAA2 (Programming assignments)",
  gaap: "GAAP (Programming assignments average)",
  gpa: "GPA (Graded Programming Assignments)",
  quiz1: "Quiz 1 Score",
  quiz2: "Quiz 2 Score",
  quiz3: "Quiz 3 Score",
  pe1: "Programming Exam 1 Score",
  pe2: "Programming Exam 2 Score",
  oppe1: "Online Proctored Programming Exam 1",
  oppe2: "Online Proctored Programming Exam 2",
  nppe1: "Non-Proctored Programming Assignment 1",
  nppe2: "Non-Proctored Programming Assignment 2",
  nppe3: "Non-Proctored Programming Assignment 3",
  gp: "Group Project Score",
  gp1: "Group Project Score (Milestone 1-3)",
  gp2: "Group Project Score (Milestone 4-6)",
  pp: "Project Presentation Score",
  cp: "Course Participation Activity",
  bonus: "Bonus Marks"
};

interface EndTermMarksPredictorProps {
  level: 'foundation' | 'diploma' | 'degree';
}

// Create a memoized component for PredictionGraph
const MemoizedPredictionGraph = memo(PredictionGraph);

// Create a memoized InputField component
const InputField = memo(({
  field,
  label,
  value,
  onChange
}: {
  field: string;
  label: string;
  value: string | number;
  onChange: (field: string, value: string) => void;
}) => (
  <div
    className="group flex flex-col space-y-1.5 rounded-[1.25rem] border border-border/80 bg-secondary/70 p-3 sm:p-4 transition-all duration-300 hover:border-primary/30"
  >
    <Label className="text-xs font-medium text-muted-foreground group-hover:text-foreground sm:text-sm">
      {label}
    </Label>
    <Input
      type="number"
      min="0"
      max={field.includes('bonus') ? '5' : '100'}
      step="0.01"
      placeholder="Enter score"
      value={value !== undefined ? value : ''}
      onChange={(e) => onChange(field, e.target.value)}
      className="h-10 rounded-xl border-border bg-background text-sm text-foreground placeholder:text-muted-foreground"
    />
  </div>
));

// Create a memoized ResultCard component
const ResultCard = memo(({
  prediction,
  index,
  isSelected,
  onSelect
}: {
  prediction: foundation.PredictionResult;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
}) => {
  const isAchievable = prediction.achievable;
  const requiredScore = prediction.required;
  const requiredPercentage = requiredScore > 100 ? 100 : requiredScore;

  return (
    <Card className={`
      cursor-pointer overflow-hidden border-border/80 transition-all duration-200
      ${isSelected ? 'ring-2 ring-primary/30 shadow-[var(--shadow)]' : ''}
      ${!isAchievable ? 'opacity-60' : ''}
    `}
    >
      <CardHeader className="bg-secondary/85 px-3 py-2.5 sm:px-4 sm:py-3">
        <CardTitle className="text-sm sm:text-base font-semibold">Grade {prediction.grade}</CardTitle>
      </CardHeader>
      <CardContent
        className="bg-card/95 p-3 sm:p-4"
        onClick={() => isAchievable && onSelect(index)}
      >
        <div className="text-center">
          <div className={`mb-2 text-sm font-bold sm:text-base ${isAchievable ? 'text-primary' : 'text-red-500'}`}>
            {isAchievable ? (
              <>
                <Check className="w-4 h-4 inline mr-1" />
                <span>Achievable</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 inline mr-1" />
                <span>Not Achievable</span>
              </>
            )}
          </div>

          <div className="mb-3">
            <div className="text-xs text-muted-foreground">Required in Final:</div>
            <div className="text-base sm:text-lg font-bold mt-0.5">
              {requiredScore > 100 ? (
                <span className="text-red-500">Not Possible</span>
              ) : requiredScore < 0 ? (
                <span className="text-emerald-600">Already Achieved!</span>
              ) : (
                <span className="text-foreground">{requiredScore.toFixed(1)}%</span>
              )}
            </div>
          </div>

          {isAchievable && requiredScore >= 0 && requiredScore <= 100 && (
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${requiredPercentage}%` }}
              ></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

export default function EndTermMarksPredictor({ level = 'foundation' }: EndTermMarksPredictorProps) {
  // State for form values and results
  const [selectedSubject, setSelectedSubject] = useState("");
  const [formValues, setFormValues] = useState<Record<string, string | number>>({});
  const [requiredFields, setRequiredFields] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<foundation.PredictionResult[]>([]);
  const [eligibilityError, setEligibilityError] = useState<string | null>(null);
  const [currentComponents, setCurrentComponents] = useState<Record<string, number>>({});

  // New state variables for visualization
  const [showGraph, setShowGraph] = useState(false);
  const [selectedGradeIndex, setSelectedGradeIndex] = useState(0);
  const [formulaWeightage, setFormulaWeightage] = useState<Record<string, number>>({});
  const [totalAchieved, setTotalAchieved] = useState(0);

  // Get subject list based on level - memoized to avoid recalculation
  const subjectList = useMemo(() => {
    if (level === 'diploma') {
      return diploma.diplomaSubjects;
    } else if (level === 'degree') {
      return degree.degreeSubjects;
    }
    return foundationSubjects;
  }, [level]);

  // Load saved data from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load selected subject
      const savedSubject = localStorage.getItem(`${level}.${STORAGE_KEYS.SELECTED_SUBJECT}`);
      if (savedSubject) {
        setSelectedSubject(savedSubject);
      }

      // Load form values
      const savedFormValues = localStorage.getItem(`${level}.${STORAGE_KEYS.FORM_VALUES}`);
      if (savedFormValues) {
        try {
          setFormValues(JSON.parse(savedFormValues));
        } catch (e) {
          console.error("Error parsing saved form values", e);
          localStorage.removeItem(`${level}.${STORAGE_KEYS.FORM_VALUES}`);
        }
      }
    }
  }, [level]);

  // Update required fields when subject changes
  useEffect(() => {
    if (!selectedSubject) {
      setRequiredFields([]);
      return;
    }

    // Update required fields based on level
    let fields: string[] = [];
    if (level === 'diploma') {
      fields = diploma.getRequiredFields(selectedSubject);
    } else if (level === 'degree') {
      fields = degree.getRequiredFields(selectedSubject);
    } else {
      fields = getFoundationRequiredFields(selectedSubject);
    }

    setRequiredFields(fields);

    // Clear predictions when subject changes
    setPredictions([]);
    setEligibilityError(null);

    // Only reset form values when subject actually changes, not on initial load
    const prevSubject = localStorage.getItem(`${level}.${STORAGE_KEYS.SELECTED_SUBJECT}`);
    if (prevSubject && prevSubject !== selectedSubject) {
      setFormValues({});
      localStorage.removeItem(`${level}.${STORAGE_KEYS.FORM_VALUES}`);
    }

    // Save the selected subject to localStorage
    localStorage.setItem(`${level}.${STORAGE_KEYS.SELECTED_SUBJECT}`, selectedSubject);
  }, [selectedSubject, level]);

  // Handle input change with useCallback to prevent unnecessary re-renders
  const handleInputChange = useCallback((field: string, value: string) => {
    // Parse the value to a number or keep as empty string
    const numValue = value === '' ? '' : parseFloat(value);

    // Update form values
    setFormValues(prevValues => {
      const updatedValues = { ...prevValues, [field]: numValue };

      // Save to localStorage
      try {
        localStorage.setItem(`${level}.${STORAGE_KEYS.FORM_VALUES}`, JSON.stringify(updatedValues));
      } catch (e) {
        console.error("Error saving form values", e);
      }

      return updatedValues;
    });
  }, [level]);

  // Reset form with useCallback
  const resetForm = useCallback(() => {
    setSelectedSubject("");
    setFormValues({});
    setPredictions([]);
    setEligibilityError(null);
    setCurrentComponents({});
    setShowGraph(false);
    setSelectedGradeIndex(0);
    setFormulaWeightage({});
    setTotalAchieved(0);

    // Clear localStorage values
    localStorage.removeItem(`${level}.${STORAGE_KEYS.SELECTED_SUBJECT}`);
    localStorage.removeItem(`${level}.${STORAGE_KEYS.FORM_VALUES}`);
  }, [level]);

  // Toggle graph visibility with useCallback
  const toggleGraph = useCallback(() => {
    setShowGraph(prev => !prev);
  }, []);

  // Set selected grade index with useCallback
  const handleSelectGrade = useCallback((index: number) => {
    setSelectedGradeIndex(index);
  }, []);

  // Calculate predictions with useCallback
  const calculateResults = useCallback(() => {
    // Validate that all required fields have values
    const missingFields = requiredFields.filter(field => {
      const value = formValues[field];
      return value === undefined || value === '';
    });

    if (missingFields.length > 0) {
      setEligibilityError(`Please enter values for all required fields: ${missingFields.map(f => fieldLabels[f] || f).join(', ')}`);
      setPredictions([]);
      setShowGraph(false);
      return;
    }

    // Convert all form values to numbers
    const numericValues: Record<string, number> = {};
    requiredFields.forEach(field => {
      const value = formValues[field];
      numericValues[field] = typeof value === 'string' ? parseFloat(value) : (value as number);
    });

    // Get formula weightage for visualization
    const weightage = getFormulaWeightage(selectedSubject);
    setFormulaWeightage(weightage);

    // Calculate current components for visualization
    const componentValues: Record<string, number> = {};
    Object.keys(numericValues).forEach(key => {
      componentValues[key] = numericValues[key];
    });
    setCurrentComponents(componentValues);

    // Calculate total achieved score based on formula weightage
    const achieved = calculateAchievedScore(componentValues, weightage);
    setTotalAchieved(achieved);

    // Create the input for calculation
    const input = {
      subject: selectedSubject,
      ...numericValues
    };

    let results;
    // Calculate the predictions based on level
    if (level === 'diploma') {
      results = diploma.calculatePredictions(input);
    } else if (level === 'degree') {
      results = degree.calculatePredictions(input);
    } else {
      results = calculateFoundationPredictions(input);
    }

    // Check if there's any eligibility error
    const notAchievable = results.every(result => !result.achievable);
    if (notAchievable && results[0].required === 0) {
      setEligibilityError("You're not eligible to write the final exam.");
      setShowGraph(false);
    } else {
      setEligibilityError(null);
      // Show graph by default when there are valid results
      setShowGraph(true);
      // Select first achievable grade by default
      const achievableIndex = results.findIndex(result => result.achievable);
      setSelectedGradeIndex(achievableIndex >= 0 ? achievableIndex : 0);
    }

    setPredictions(results);
  }, [formValues, level, requiredFields, selectedSubject]);

  // Memoized required score display component
  const RequiredScoreDisplay = memo(({
    totalAchieved,
    selectedPrediction
  }: {
    totalAchieved: number;
    selectedPrediction: foundation.PredictionResult;
  }) => {
    const requiredScore = selectedPrediction.required < 0 ? 0 : selectedPrediction.required;

    return (
      <div className="mb-6 rounded-[1.5rem] border border-border/80 bg-secondary/75 p-5">
        <h4 className="mb-3 text-lg font-semibold text-foreground">What You Need</h4>
        <div className="space-y-2 text-muted-foreground">
          {requiredScore <= 0 ? (
            <p className="font-medium text-emerald-600">
              You have already achieved grade {selectedPrediction.grade} or better! No need to score anything in the final exam.
            </p>
          ) : (
            <>
              <p>
                <span className="font-medium text-primary">Current score:</span> {totalAchieved.toFixed(2)} / 100
              </p>
              <p>
                <span className="font-medium text-amber-600">Required in final exam:</span> {requiredScore.toFixed(2)}% to achieve grade {selectedPrediction.grade}
              </p>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${requiredScore > 100 ? 100 : requiredScore}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  });

  // Render input fields - memoized to avoid re-renders
  const renderInputFields = useMemo(() => {
    if (requiredFields.length === 0) return null;

    return (
      <div className="rounded-[1.5rem] border border-border/80 bg-card/92 p-4 sm:p-5">
        <h3 className="mb-3 text-center text-base font-semibold text-foreground sm:mb-4 sm:text-lg">Enter Your Current Scores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
          {requiredFields.map((field) => (
            <InputField
              key={field}
              field={field}
              label={fieldLabels[field] || field}
              value={formValues[field] !== undefined ? formValues[field] : ''}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div className="mt-4 sm:mt-6 flex justify-center">
          <Button
            onClick={calculateResults}
            className="w-full sm:w-auto text-sm font-medium sm:text-base"
          >
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            Calculate Required Score
          </Button>
        </div>
      </div>
    );
  }, [requiredFields, formValues, handleInputChange, calculateResults]);

  // Render results - memoized to avoid re-renders
  const renderResults = useMemo(() => {
    if (!predictions.length) return null;

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mt-4 sm:mt-6">
        {predictions.map((prediction, index) => (
          <ResultCard
            key={`${prediction.grade}-${index}`}
            prediction={prediction}
            index={index}
            isSelected={index === selectedGradeIndex}
            onSelect={handleSelectGrade}
          />
        ))}
      </div>
    );
  }, [predictions, selectedGradeIndex, handleSelectGrade]);

  // Render visualization - memoized to avoid re-renders
  const renderVisualization = useMemo(() => {
    if (!showGraph || !predictions.length || selectedGradeIndex === null) return null;

    const selectedPrediction = predictions[selectedGradeIndex];
    if (!selectedPrediction) return null;

    // Ensure prediction is achievable before showing details
    if (!selectedPrediction.achievable || selectedPrediction.required > 100) {
      return (
        <div className="mt-6 rounded-[1.25rem] border border-red-200 bg-red-50 p-4 text-center dark:border-red-900/40 dark:bg-red-950/20">
          <p className="font-medium text-red-500">This grade is not achievable with your current scores.</p>
        </div>
      );
    }

    return (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Detailed Analysis</h3>
          <Button
            onClick={toggleGraph}
            variant="ghost"
            className="text-primary hover:bg-secondary hover:text-primary"
          >
            {showGraph ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Hide Graph
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show Graph
              </>
            )}
          </Button>
        </div>

        <RequiredScoreDisplay
          totalAchieved={totalAchieved}
          selectedPrediction={selectedPrediction}
        />

        <div className="h-[400px] mb-6">
          <MemoizedPredictionGraph
            predictions={predictions}
            selectedIndex={selectedGradeIndex}
            onSelectGrade={handleSelectGrade}
            components={currentComponents}
            formulaWeightage={formulaWeightage}
            totalAchieved={totalAchieved}
          />
        </div>
      </div>
    );
  }, [predictions, selectedGradeIndex, showGraph, toggleGraph, totalAchieved, handleSelectGrade, selectedSubject, currentComponents, formulaWeightage]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-[1.5rem] border border-border/80 bg-card/92 p-4 sm:p-5">
        <h2 className="mb-3 text-center text-base font-bold text-foreground sm:mb-4 sm:text-xl">Select Your Course</h2>
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <div className="flex-grow w-full">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {subjectList.map((subject) => (
                  <SelectItem key={subject.code} value={subject.code} className="text-sm">
                    {subject.label || subject.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={resetForm}
            variant="outline"
            size="sm"
            className="h-10 px-4 text-red-500 hover:bg-red-50 hover:text-red-600 sm:h-11"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Input Fields */}
      {renderInputFields}

      {/* Error Message */}
      {eligibilityError && (
        <div className="rounded-[1.25rem] border border-red-200 bg-red-50 p-4 text-center dark:border-red-900/40 dark:bg-red-950/20">
          <p className="font-medium text-red-500">{eligibilityError}</p>
        </div>
      )}

      {/* Results */}
      {renderResults}

      {/* Visualization */}
      {renderVisualization}
    </div>
  );
} 
