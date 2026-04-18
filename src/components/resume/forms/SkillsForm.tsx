
import React, { useState } from 'react';
import { Skill } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { v4 as uuidv4 } from 'uuid';
import { X } from 'lucide-react';

interface SkillsFormProps {
  data: Skill[];
  updateData: (data: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, updateData }) => {
  const [skills, setSkills] = useState<Skill[]>(data);
  const [newSkill, setNewSkill] = useState('');
  const [skillType, setSkillType] = useState<'technical' | 'soft'>('technical');

  // Sync local state with prop when data is restored from localStorage
  React.useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(skills)) {
      setSkills(data);
    }
  }, [data]);

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill = {
        id: uuidv4(),
        name: newSkill.trim(),
        type: skillType
      };
      const updated = [...skills, skill];
      setSkills(updated);
      updateData(updated);
      setNewSkill('');
    }
  };

  const removeSkill = (id: string) => {
    const updated = skills.filter(skill => skill.id !== id);
    setSkills(updated);
    updateData(updated);
  };

  const technicalSkills = skills.filter(skill => skill.type === 'technical');
  const softSkills = skills.filter(skill => skill.type === 'soft');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technical Skills */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 rounded-full flex items-center gap-1"
              >
                {skill.name}
                <X
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => removeSkill(skill.id)}
                />
              </div>
            ))}
            {technicalSkills.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No technical skills added yet</p>
            )}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1 rounded-full flex items-center gap-1"
              >
                {skill.name}
                <X
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => removeSkill(skill.id)}
                />
              </div>
            ))}
            {softSkills.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No soft skills added yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Add new skill */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Add New Skill</h3>

        <div className="space-y-4">
          <RadioGroup
            defaultValue="technical"
            className="flex space-x-4"
            value={skillType}
            onValueChange={(value) => setSkillType(value as 'technical' | 'soft')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="technical" id="technical" />
              <Label htmlFor="technical">Technical Skill</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="soft" id="soft" />
              <Label htmlFor="soft">Soft Skill</Label>
            </div>
          </RadioGroup>

          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder={`Add a ${skillType} skill`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button onClick={addSkill}>Add</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
