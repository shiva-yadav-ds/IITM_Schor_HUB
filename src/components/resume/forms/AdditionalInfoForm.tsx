
import React, { useState } from 'react';
import { AdditionalInfo } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Plus, X } from 'lucide-react';

interface AdditionalInfoFormProps {
  data: AdditionalInfo;
  updateData: (data: AdditionalInfo) => void;
}

export const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ data, updateData }) => {
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>(data);
  const [hobbyInput, setHobbyInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const form = useForm({
    defaultValues: {
      summary: data.summary || '',
      references: data.references || ''
    }
  });

  // Sync local state with prop when data is restored from localStorage
  React.useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(additionalInfo)) {
      setAdditionalInfo(data);
      form.reset({
        summary: data.summary || '',
        references: data.references || ''
      });
    }
  }, [data]);

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      updateData({
        ...additionalInfo,
        summary: value.summary || '',
        references: value.references || ''
      });
    });
    return () => subscription.unsubscribe();
  }, [form.watch, additionalInfo, updateData]);

  const addHobby = () => {
    if (hobbyInput.trim()) {
      const updated = {
        ...additionalInfo,
        hobbies: [...additionalInfo.hobbies, hobbyInput.trim()]
      };
      setAdditionalInfo(updated);
      updateData(updated);
      setHobbyInput('');
    }
  };

  const removeHobby = (index: number) => {
    const updated = {
      ...additionalInfo,
      hobbies: additionalInfo.hobbies.filter((_, i) => i !== index)
    };
    setAdditionalInfo(updated);
    updateData(updated);
  };

  const addLanguage = () => {
    if (languageInput.trim()) {
      const updated = {
        ...additionalInfo,
        languages: [...additionalInfo.languages, languageInput.trim()]
      };
      setAdditionalInfo(updated);
      updateData(updated);
      setLanguageInput('');
    }
  };

  const removeLanguage = (index: number) => {
    const updated = {
      ...additionalInfo,
      languages: additionalInfo.languages.filter((_, i) => i !== index)
    };
    setAdditionalInfo(updated);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Additional Information</h2>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A brief summary about yourself and your professional goals"
                    className="min-h-[100px] rounded-md"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Hobbies & Interests</h3>
            <div className="flex gap-2">
              <Input
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                placeholder="Add hobby or interest"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addHobby();
                  }
                }}
              />
              <Button type="button" onClick={addHobby}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {additionalInfo.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {hobby}
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => removeHobby(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Languages Known</h3>
            <div className="flex gap-2">
              <Input
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                placeholder="Add language (e.g., English - Native)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addLanguage();
                  }
                }}
              />
              <Button type="button" onClick={addLanguage}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {additionalInfo.languages.map((language, index) => (
                <div
                  key={index}
                  className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {language}
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => removeLanguage(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="references"
            render={({ field }) => (
              <FormItem>
                <FormLabel>References (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Available upon request"
                    className="min-h-[80px] rounded-md"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
