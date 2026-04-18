import React, { useState } from 'react';
import { Project } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X, Pencil } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  technologies: z.array(z.string()),
  link: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional()
});

interface ProjectsFormProps {
  data: Project[];
  updateData: (data: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, updateData }) => {
  const [projects, setProjects] = useState<Project[]>(data);
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Sync local state with prop when data is restored from localStorage
  React.useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(projects)) {
      setProjects(data);
    }
  }, [data]);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      technologies: [],
      link: ''
    }
  });

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    const project: Project = {
      id: isEditing || uuidv4(),
      title: values.title,
      description: values.description,
      technologies: technologies,
      link: values.link
    };

    if (isEditing) {
      const updated = projects.map(proj =>
        proj.id === isEditing ? project : proj
      );
      setProjects(updated);
      updateData(updated);
      setIsEditing(null);
    } else {
      const updated = [...projects, project];
      setProjects(updated);
      updateData(updated);
    }

    form.reset();
    setTechnologies([]);
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    const updated = [...technologies];
    updated.splice(index, 1);
    setTechnologies(updated);
  };

  const removeProject = (id: string) => {
    const updated = projects.filter(proj => proj.id !== id);
    setProjects(updated);
    updateData(updated);
  };

  const editProject = (id: string) => {
    const project = projects.find(proj => proj.id === id);
    if (!project) return;

    form.reset({
      title: project.title,
      description: project.description,
      technologies: [],
      link: project.link || ''
    });
    setTechnologies(project.technologies);
    setIsEditing(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Projects</h2>

      {projects.length > 0 && (
        <div className="space-y-4 mb-6">
          {projects.map((project) => (
            <Card key={project.id} className="relative">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{project.description}</p>

                {project.technologies.length > 0 && (
                  <div className="mt-2">
                    <p><strong>Technologies:</strong></p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-secondary text-secondary-foreground px-2 py-1 text-sm rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.link && (
                  <p className="mt-2">
                    <strong>Link:</strong>{" "}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {project.link}
                    </a>
                  </p>
                )}

                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editProject(project.id)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProject(project.id)}
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
            {isEditing ? "Edit Project" : "Add Project"}
          </h3>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="E-commerce Website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A brief description of your project"
                    className="min-h-[100px] rounded-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Technologies Used</FormLabel>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
              />
              <Button type="button" onClick={addTechnology}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {technologies.map((tech, i) => (
                <div
                  key={i}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md flex items-center gap-1"
                >
                  {tech}
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => removeTechnology(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/username/project" {...field} />
                </FormControl>
                <FormDescription>GitHub repository, live demo, etc.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 mt-6">
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(null);
                  form.reset();
                  setTechnologies([]);
                }}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {isEditing ? "Update" : "Add"} Project
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
