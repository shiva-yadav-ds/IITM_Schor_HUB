
import React from 'react';
import { ResumeData } from '@/types/resume';

interface ElegantTemplateProps {
  data: ResumeData;
}

export const ElegantTemplate: React.FC<ElegantTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-gray-50 text-gray-800 font-serif">
      {/* Header */}
      <div className="text-center py-8 border-b-2 border-gray-200">
        <h1 className="text-4xl font-light tracking-wide mb-2">{personal.firstName} {personal.lastName}</h1>
        <div className="flex justify-center gap-4 text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
        </div>
        {additional.summary && (
          <p className="max-w-2xl mx-auto mt-4 text-gray-600 italic">{additional.summary}</p>
        )}
      </div>

      <div className="px-8 py-6">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light text-center mb-6 tracking-wide">Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <span className="text-gray-600">{exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-gray-700 mb-2">{exp.company}</div>
                <ul className="list-disc ml-5 text-gray-600">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="mb-1">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Two Columns */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            {/* Education */}
            {education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-light text-center mb-6 tracking-wide">Education</h2>
                {education.map((edu, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <div className="text-gray-700">{edu.school}</div>
                    <div className="text-gray-600">{edu.graduationYear}</div>
                    {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-light text-center mb-6 tracking-wide">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            {/* Projects */}
            {projects.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-light text-center mb-6 tracking-wide">Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="mb-4">
                    <h3 className="font-semibold">{proj.title}</h3>
                    <p className="text-gray-600 mb-2">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <div className="text-sm text-gray-500">
                        Technologies: {proj.technologies.join(' • ')}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-light text-center mb-6 tracking-wide">Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-3">
                    <div className="font-semibold">{cert.name}</div>
                    <div className="text-gray-600">{cert.issuer}, {cert.year}</div>
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
