import React, { useState } from 'react';
import { Education } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X, Pencil } from 'lucide-react';

const educationSchema = z.object({
  school: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),
  gpa: z.string().optional(),
  relevantCourses: z.array(z.string())
});

interface EducationFormProps {
  data: Education[];
  updateData: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, updateData }) => {
  const [educations, setEducations] = useState<Education[]>(data);
  const [courseInput, setCourseInput] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  // Sync local state with prop when data is restored from localStorage
  React.useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(educations)) {
      setEducations(data);
    }
  }, [data]);

  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: '',
      degree: '',
      graduationYear: '',
      gpa: '',
      relevantCourses: []
    }
  });

  const onSubmit = (values: z.infer<typeof educationSchema>) => {
    // Ensure all required fields are defined
    const updatedEducation: Education = {
      school: values.school,
      degree: values.degree,
      graduationYear: values.graduationYear,
      gpa: values.gpa || '',
      relevantCourses: courses
    };

    if (isEditing !== null) {
      const updated = [...educations];
      updated[isEditing] = updatedEducation;
      setEducations(updated);
      updateData(updated);
      setIsEditing(null);
    } else {
      const updated = [...educations, updatedEducation];
      setEducations(updated);
      updateData(updated);
    }

    form.reset();
    setCourses([]);
  };

  const addCourse = () => {
    if (courseInput.trim()) {
      setCourses([...courses, courseInput.trim()]);
      setCourseInput('');
    }
  };

  const removeCourse = (index: number) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const removeEducation = (index: number) => {
    const updated = [...educations];
    updated.splice(index, 1);
    setEducations(updated);
    updateData(updated);
  };

  const editEducation = (index: number) => {
    const education = educations[index];
    form.reset({
      school: education.school,
      degree: education.degree,
      graduationYear: education.graduationYear,
      gpa: education.gpa || '',
      relevantCourses: education.relevantCourses
    });
    setCourses(education.relevantCourses);
    setIsEditing(index);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Education</h2>

      {/* Display added educations */}
      {educations.length > 0 && (
        <div className="space-y-4 mb-6">
          {educations.map((education, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{education.school}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Degree:</strong> {education.degree}</p>
                <p><strong>Graduation Year:</strong> {education.graduationYear}</p>
                {education.gpa && <p><strong>GPA/Percentage:</strong> {education.gpa}</p>}
                {education.relevantCourses.length > 0 && (
                  <div>
                    <p className="mt-2"><strong>Relevant Courses:</strong></p>
                    <ul className="list-disc list-inside">
                      {education.relevantCourses.map((course, idx) => (
                        <li key={idx}>{course}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editEducation(index)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEducation(index)}
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Form to add new education */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-lg font-medium">
            {isEditing !== null ? "Edit Education" : "Add Education"}
          </h3>

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Name</FormLabel>
                <FormControl>
                  <Input placeholder="IIT Madras" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="BSc in Data Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="graduationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2025" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPA/Percentage (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="8.5/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormLabel>Relevant Courses</FormLabel>
            <div className="flex gap-2">
              <Input
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                placeholder="Add course"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCourse();
                  }
                }}
              />
              <Button type="button" onClick={addCourse}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {courses.map((course, i) => (
                <div
                  key={i}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {course}
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => removeCourse(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {isEditing !== null && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(null);
                  form.reset();
                  setCourses([]);
                }}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {isEditing !== null ? "Update" : "Add"} Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
