
import React from 'react';
import { ResumeData } from '@/types/resume';

interface ModernCompactTemplateProps {
  data: ResumeData;
}

export const ModernCompactTemplate: React.FC<ModernCompactTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-8">
        <h1 className="text-3xl font-bold">{personal.firstName} {personal.lastName}</h1>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 mb-4">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="font-bold">{exp.title}</h3>
                <div className="text-gray-600">{exp.company} | {exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}</div>
                <ul className="list-disc ml-4 mt-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-sm text-gray-700">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            {/* Education */}
            {education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 mb-4">Education</h2>
                {education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <div className="font-bold">{edu.degree}</div>
                    <div>{edu.school}</div>
                    <div className="text-gray-600">{edu.graduationYear}</div>
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Projects */}
            {projects.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 mb-4">Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="mb-3">
                    <div className="font-bold">{proj.title}</div>
                    <div className="text-sm text-gray-700">{proj.description}</div>
                    {proj.technologies.length > 0 && (
                      <div className="text-sm text-gray-600 mt-1">
                        Technologies: {proj.technologies.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 mb-4">Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <div className="font-bold">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer}, {cert.year}</div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
