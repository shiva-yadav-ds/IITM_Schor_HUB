import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-white text-gray-800 w-full h-full p-8 font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-light tracking-tight mb-2">{personal.firstName} {personal.lastName}</h1>
        
        <div className="flex flex-wrap text-sm text-gray-500 gap-x-4 gap-y-1 mb-4">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.linkedin && <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/i, '')}</span>}
          {personal.github && <span>{personal.github.replace(/^https?:\/\/(www\.)?/i, '')}</span>}
        </div>
        
        {additional.summary && (
          <p className="mt-4 text-sm leading-relaxed text-gray-600 max-w-2xl">{additional.summary}</p>
        )}
      </header>
      
      <div className="border-t border-gray-200 py-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-sm text-gray-500">{exp.startDate} — {exp.currentJob ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                  {exp.responsibilities.length > 0 && (
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium">{edu.school}</h3>
                    <p className="text-sm text-gray-500">{edu.graduationYear}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{edu.degree}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  {edu.relevantCourses.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="italic">Courses:</span> {edu.relevantCourses.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Projects</h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium">{proj.title}</h3>
                    {proj.link && (
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-gray-800"
                      >
                        Link →
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-xs text-gray-500">{tech}{i < proj.technologies.length - 1 ? ',' : ''}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <p className="text-sm">{cert.name}, {cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Additional Info */}
        <section className="grid grid-cols-2 gap-8">
          {additional.languages.length > 0 && (
            <div>
              <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Languages</h2>
              <p className="text-sm text-gray-600">{additional.languages.join(", ")}</p>
            </div>
          )}
          
          {additional.hobbies.length > 0 && (
            <div>
              <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Interests</h2>
              <p className="text-sm text-gray-600">{additional.hobbies.join(", ")}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}; 