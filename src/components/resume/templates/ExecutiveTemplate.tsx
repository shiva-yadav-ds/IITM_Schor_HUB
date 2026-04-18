
import React from 'react';
import { ResumeData } from '@/types/resume';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-stone-50 text-gray-900 font-serif p-8">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-300 pb-6 mb-8">
        <h1 className="text-4xl font-bold tracking-wide text-gray-900">
          {personal.firstName} {personal.lastName}
        </h1>
        <div className="mt-3 space-y-1 text-gray-600">
          <div>{personal.email} • {personal.phone}</div>
          <div>{personal.address}</div>
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </header>

      {/* Executive Summary */}
      {additional.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{additional.summary}</p>
        </section>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                <span className="text-gray-700">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{exp.company}</h3>
                  <span className="text-gray-600 italic">
                    {exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="font-semibold text-gray-700 mb-2">{exp.title}</div>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-gray-800">{edu.school}</h3>
                  <div className="text-gray-700">{edu.degree}</div>
                </div>
                <div className="text-gray-600">{edu.graduationYear}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Professional Development */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Certifications & Professional Development
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <div className="font-bold text-gray-800">{cert.name}</div>
                <div className="text-gray-600">{cert.issuer}, {cert.year}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notable Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Notable Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-800">{project.title}</h3>
                <p className="text-gray-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="mt-1 text-gray-600 italic">
                    Technologies: {project.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional Information */}
      {(additional.languages.length > 0 || additional.hobbies.length > 0) && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Additional Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {additional.languages.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800">Languages</h3>
                <p className="text-gray-700">{additional.languages.join(', ')}</p>
              </div>
            )}
            {additional.hobbies.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800">Interests</h3>
                <p className="text-gray-700">{additional.hobbies.join(', ')}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
