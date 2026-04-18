import React, { useState } from 'react';
import { Experience } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X, Pencil } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const experienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required").optional(),
  currentJob: z.boolean().default(false),
  responsibilities: z.array(z.string())
});

interface ExperienceFormProps {
  data: Experience[];
  updateData: (data: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, updateData }) => {
  const [experiences, setExperiences] = useState<Experience[]>(data);
  const [respInput, setRespInput] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Sync local state with prop when data is restored from localStorage
  React.useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(experiences)) {
      setExperiences(data);
    }
  }, [data]);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      currentJob: false,
      responsibilities: []
    }
  });

  const watchCurrentJob = form.watch("currentJob");

  const onSubmit = (values: z.infer<typeof experienceSchema>) => {
    const experience: Experience = {
      id: isEditing || uuidv4(),
      title: values.title,
      company: values.company,
      startDate: values.startDate,
      endDate: values.currentJob ? "Present" : (values.endDate || ""),
      currentJob: values.currentJob,
      responsibilities: responsibilities
    };

    if (isEditing) {
      const updated = experiences.map(exp =>
        exp.id === isEditing ? experience : exp
      );
      setExperiences(updated);
      updateData(updated);
      setIsEditing(null);
    } else {
      const updated = [...experiences, experience];
      setExperiences(updated);
      updateData(updated);
    }

    form.reset();
    setResponsibilities([]);
  };

  const addResponsibility = () => {
    if (respInput.trim()) {
      setResponsibilities([...responsibilities, respInput.trim()]);
      setRespInput('');
    }
  };

  const removeResponsibility = (index: number) => {
    const updated = [...responsibilities];
    updated.splice(index, 1);
    setResponsibilities(updated);
  };

  const removeExperience = (id: string) => {
    const updated = experiences.filter(exp => exp.id !== id);
    setExperiences(updated);
    updateData(updated);
  };

  const editExperience = (id: string) => {
    const experience = experiences.find(exp => exp.id === id);
    if (!experience) return;

    form.reset({
      title: experience.title,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.currentJob ? "" : experience.endDate,
      currentJob: experience.currentJob,
      responsibilities: []
    });
    setResponsibilities(experience.responsibilities);
    setIsEditing(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Professional Experience</h2>

      {experiences.length > 0 && (
        <div className="space-y-4 mb-6">
          {experiences.map((experience) => (
            <Card key={experience.id} className="relative">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{experience.title} at {experience.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Duration:</strong> {experience.startDate} - {experience.endDate}</p>
                {experience.responsibilities.length > 0 && (
                  <div>
                    <p className="mt-2"><strong>Responsibilities:</strong></p>
                    <ul className="list-disc list-inside">
                      {experience.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editExperience(experience.id)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(experience.id)}
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-lg font-medium">
            {isEditing ? "Edit Experience" : "Add Experience"}
          </h3>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="ACME Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Jun 2022" {...field} />
                  </FormControl>
                  <FormDescription>Format: Mon YYYY</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!watchCurrentJob && (
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Mar 2023" disabled={watchCurrentJob} {...field} />
                    </FormControl>
                    <FormDescription>Format: Mon YYYY</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="currentJob"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked) {
                        form.setValue("endDate", "Present");
                      } else {
                        form.setValue("endDate", "");
                      }
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I currently work here</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Responsibilities</FormLabel>
            <div className="flex gap-2">
              <Input
                value={respInput}
                onChange={(e) => setRespInput(e.target.value)}
                placeholder="Add responsibility"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addResponsibility();
                  }
                }}
              />
              <Button type="button" onClick={addResponsibility}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 mt-2">
              {responsibilities.map((resp, i) => (
                <div
                  key={i}
                  className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md flex items-center justify-between"
                >
                  <span>{resp}</span>
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => removeResponsibility(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(null);
                  form.reset();
                  setResponsibilities([]);
                }}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {isEditing ? "Update" : "Add"} Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
