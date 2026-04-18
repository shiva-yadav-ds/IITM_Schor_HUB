
import React from 'react';
import { ResumeData } from '@/types/resume';

interface SimpleElegantTemplateProps {
  data: ResumeData;
}

export const SimpleElegantTemplate: React.FC<SimpleElegantTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-white text-gray-800 font-sans leading-relaxed">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-light mb-2">{personal.firstName} {personal.lastName}</h1>
        <div className="text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span> • {personal.phone}</span>}
          {personal.address && <span> • {personal.address}</span>}
        </div>
        {(personal.linkedin || personal.github) && (
          <div className="text-gray-600 mt-1">
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.github && <span> • {personal.github}</span>}
          </div>
        )}
      </header>

      <div className="px-8">
        {/* Summary */}
        {additional.summary && (
          <section className="mb-8">
            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              {additional.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light border-b border-gray-200 pb-2 mb-4">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-medium">{exp.title}</h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-gray-700 mb-2">{exp.company}</div>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Skills and Education Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-light border-b border-gray-200 pb-2 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="bg-gray-100 px-3 py-1 text-sm rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-light border-b border-gray-200 pb-2 mb-4">Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <div className="font-medium">{edu.degree}</div>
                  <div className="text-gray-700">{edu.school}</div>
                  <div className="text-gray-600 text-sm">{edu.graduationYear}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Projects and Certifications Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-light border-b border-gray-200 pb-2 mb-4">Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} className="mb-4">
                  <h3 className="font-medium">{proj.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {proj.technologies.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-light border-b border-gray-200 pb-2 mb-4">Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-sm text-gray-600">{cert.issuer}, {cert.year}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
