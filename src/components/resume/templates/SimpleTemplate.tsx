
import React from 'react';
import { ResumeData } from '@/types/resume';

interface SimpleTemplateProps {
  data: ResumeData;
}

export const SimpleTemplate: React.FC<SimpleTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-white text-gray-800 w-full h-full p-8 font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold">{personal.firstName} {personal.lastName}</h1>
        
        <div className="mt-2 text-gray-600">
          {personal.email && <span className="mx-1">{personal.email}</span>}
          {personal.phone && <span className="mx-1">• {personal.phone}</span>}
          {personal.address && <span className="mx-1">• {personal.address}</span>}
        </div>
        
        <div className="mt-1 text-gray-600">
          {personal.linkedin && <span className="mx-1">{personal.linkedin.replace(/^https?:\/\/(www\.)?/i, '')}</span>}
          {personal.github && <span className="mx-1">• {personal.github.replace(/^https?:\/\/(www\.)?/i, '')}</span>}
        </div>
      </header>
      
      {/* Summary */}
      {additional.summary && (
        <section className="mb-6">
          <p className="text-gray-700">{additional.summary}</p>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill.id}
                className="bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4 last:mb-0">
              <div className="flex justify-between">
                <h3 className="font-semibold">{exp.company}</h3>
                <p className="text-gray-600">{exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}</p>
              </div>
              <p className="italic text-gray-700">{exp.title}</p>
              {exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="flex justify-between">
                <h3 className="font-semibold">{edu.school}</h3>
                <p className="text-gray-600">{edu.graduationYear}</p>
              </div>
              <p className="text-gray-700">{edu.degree}</p>
              {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
              {edu.relevantCourses.length > 0 && (
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Courses:</span> {edu.relevantCourses.join(", ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-4 last:mb-0">
              <div className="flex justify-between">
                <h3 className="font-semibold">{proj.title}</h3>
                {proj.link && (
                  <a 
                    href={proj.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm"
                  >
                    View Project
                  </a>
                )}
              </div>
              <p className="text-gray-700 mt-1">{proj.description}</p>
              {proj.technologies.length > 0 && (
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Technologies:</span> {proj.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">
            Certifications
          </h2>
          <ul className="list-disc list-inside">
            {certifications.map((cert) => (
              <li key={cert.id} className="text-gray-700 mb-1 last:mb-0">
                <span className="font-medium">{cert.name}</span> - {cert.issuer}, {cert.year}
              </li>
            ))}
          </ul>
        </section>
      )}
      
      {/* Additional Information */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">
          Additional Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {additional.languages.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-1">Languages</h3>
              <p className="text-gray-700 text-sm">{additional.languages.join(", ")}</p>
            </div>
          )}
          {additional.hobbies.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-1">Interests</h3>
              <p className="text-gray-700 text-sm">{additional.hobbies.join(", ")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
