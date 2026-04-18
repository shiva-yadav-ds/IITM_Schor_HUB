
import React from 'react';
import { ResumeData } from '@/types/resume';

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-stone-50 text-gray-800 w-full h-full p-10 font-serif">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-400 pb-6 mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider">{personal.firstName} {personal.lastName}</h1>
        
        <div className="mt-4 text-gray-600 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
        </div>
        
        <div className="mt-2 text-gray-600 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {personal.linkedin && <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/i, '')}</span>}
          {personal.github && <span>{personal.github.replace(/^https?:\/\/(www\.)?/i, '')}</span>}
        </div>
        
        {additional.summary && (
          <p className="mt-4 max-w-2xl mx-auto italic text-gray-700">{additional.summary}</p>
        )}
      </header>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:gap-x-8">
        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-2 mb-4">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-lg">{edu.school}</h3>
                  <p className="italic">{edu.graduationYear}</p>
                </div>
                <p className="font-semibold">{edu.degree}</p>
                {edu.gpa && <p>GPA/Percentage: {edu.gpa}</p>}
                {edu.relevantCourses.length > 0 && (
                  <p className="mt-1">
                    <span className="font-semibold">Relevant Courses:</span> {edu.relevantCourses.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-2 mb-4">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <p className="italic">{exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}</p>
                </div>
                <p className="font-semibold mb-2">{exp.title}</p>
                {exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-5 mt-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="mb-1">{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-2 mb-4">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.filter(s => s.type === 'technical').length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Technical Skills</h3>
                  <ul className="list-disc list-outside ml-5">
                    {skills.filter(s => s.type === 'technical').map(s => (
                      <li key={s.id}>{s.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {skills.filter(s => s.type === 'soft').length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Soft Skills</h3>
                  <ul className="list-disc list-outside ml-5">
                    {skills.filter(s => s.type === 'soft').map(s => (
                      <li key={s.id}>{s.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-2 mb-4">
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{proj.title}</h3>
                  {proj.link && (
                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-800 underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="mt-1">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="italic mt-1">
                    Technologies: {proj.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
        
        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-2 mb-4">
              Certifications
            </h2>
            <ul className="list-disc list-outside ml-5">
              {certifications.map((cert) => (
                <li key={cert.id} className="mb-2 last:mb-0">
                  <span className="font-medium">{cert.name}</span>, {cert.issuer} ({cert.year})
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Additional Information */}
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-2 mb-4">
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additional.languages.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <p>{additional.languages.join(", ")}</p>
              </div>
            )}
            {additional.hobbies.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Hobbies & Interests</h3>
                <p>{additional.hobbies.join(", ")}</p>
              </div>
            )}
            {additional.references && (
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-2">References</h3>
                <p className="italic">{additional.references}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
