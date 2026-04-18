
import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalBarTemplateProps {
  data: ResumeData;
}

export const MinimalBarTemplate: React.FC<MinimalBarTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-white text-gray-800 font-sans flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-100 p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-1">{personal.firstName}</h1>
          <h1 className="text-2xl font-bold">{personal.lastName}</h1>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.address && <div>{personal.address}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
          {personal.github && <div>{personal.github}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Skills</h2>
            <div className="space-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">{skill.name}</div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3 text-sm">
                <div className="font-bold">{edu.degree}</div>
                <div>{edu.school}</div>
                <div className="text-gray-600">{edu.graduationYear}</div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2 text-sm">
                <div className="font-bold">{cert.name}</div>
                <div className="text-gray-600">{cert.issuer}, {cert.year}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6 space-y-6">
        {/* Summary */}
        {additional.summary && (
          <section className="mb-6">
            <p className="text-gray-700">{additional.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 border-b border-gray-300 pb-1">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between">
                  <h3 className="font-bold">{exp.title}</h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-gray-700 mb-2">{exp.company}</div>
                <ul className="list-disc ml-4 text-sm space-y-1">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 border-b border-gray-300 pb-1">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-4">
                <h3 className="font-bold">{proj.title}</h3>
                <p className="text-sm mb-2">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Technologies: {proj.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
