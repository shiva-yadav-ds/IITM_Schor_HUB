
import React from 'react';
import { ResumeData } from '@/types/resume';

interface GoogleTemplateProps {
  data: ResumeData;
}

export const GoogleTemplate: React.FC<GoogleTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-white text-gray-800 font-sans min-h-0">
      {/* Header - More compact */}
      <header className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold mb-2">
          {personal.firstName} {personal.lastName}
        </h1>
        <div className="text-sm text-gray-600 flex flex-wrap gap-4">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
        {additional.summary && (
          <p className="mt-3 text-sm text-gray-700">{additional.summary}</p>
        )}
      </header>

      {/* Main Content - Optimized spacing */}
      <div className="px-6 py-4 grid grid-cols-3 gap-6">
        {/* Left Column - Experience and Projects */}
        <div className="col-span-2 space-y-4">
          {experience.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-[#1a73e8] mb-3">Experience</h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="pb-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-medium">{exp.title}</h3>
                      <span className="text-xs text-gray-500">
                        {exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs text-[#1a73e8] font-medium">{exp.company}</div>
                    <ul className="mt-1 space-y-1">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start">
                          <span className="mr-2 text-[#1a73e8]">•</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-[#1a73e8] mb-3">Projects</h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="pb-2">
                    <h3 className="text-sm font-medium">{project.title}</h3>
                    <p className="text-xs text-gray-700 mb-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-[#e8f0fe] text-[#1a73e8] rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {education.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-[#1a73e8] mb-3">Education</h2>
              <div className="space-y-2">
                {education.map((edu, idx) => (
                  <div key={idx} className="pb-2">
                    <h3 className="text-sm font-medium">{edu.school}</h3>
                    <div className="text-xs text-gray-700">{edu.degree}</div>
                    <div className="text-xs text-gray-500">{edu.graduationYear}</div>
                    {edu.gpa && <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-[#1a73e8] mb-3">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-2 py-0.5 bg-[#e8f0fe] text-[#1a73e8] text-xs rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-[#1a73e8] mb-3">Certifications</h2>
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-gray-600">{cert.issuer}, {cert.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
