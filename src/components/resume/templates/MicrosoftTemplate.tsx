
import React from 'react';
import { ResumeData } from '@/types/resume';

interface MicrosoftTemplateProps {
  data: ResumeData;
}

export const MicrosoftTemplate: React.FC<MicrosoftTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-white text-gray-900 font-sans min-h-full p-8">
      {/* Header */}
      <header className="border-b-2 border-[#0078d4] pb-6 mb-8">
        <h1 className="text-3xl font-bold text-[#0078d4]">{personal.firstName} {personal.lastName}</h1>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1 text-gray-700">
            <div>{personal.email}</div>
            <div>{personal.phone}</div>
          </div>
          <div className="space-y-1 text-gray-700">
            <div>{personal.address}</div>
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.github && <div>{personal.github}</div>}
          </div>
        </div>
        {additional.summary && (
          <p className="mt-4 text-gray-600 leading-relaxed">{additional.summary}</p>
        )}
      </header>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#0078d4] mb-4 pb-2 border-b">Professional Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[#0078d4] font-medium mb-2">{exp.company}</div>
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

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#0078d4] mb-4 pb-2 border-b">Education</h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-gray-800">{edu.school}</h3>
                  <span className="text-gray-600">{edu.graduationYear}</span>
                </div>
                <div className="text-gray-700">{edu.degree}</div>
                {edu.gpa && <div className="text-gray-600 text-sm">GPA: {edu.gpa}</div>}
                {edu.relevantCourses.length > 0 && (
                  <div className="text-gray-600 text-sm mt-1">
                    Relevant Coursework: {edu.relevantCourses.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#0078d4] mb-4 pb-2 border-b">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <div className="w-2 h-2 bg-[#0078d4] rounded-full mr-2"></div>
                <span className="text-gray-700">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#0078d4] mb-4 pb-2 border-b">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#0078d4] mb-4 pb-2 border-b">Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div className="font-medium text-gray-800">{cert.name}</div>
                <div className="text-gray-600">{cert.issuer}, {cert.year}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional Information */}
      {(additional.languages.length > 0 || additional.hobbies.length > 0) && (
        <section>
          <h2 className="text-2xl font-semibold text-[#0078d4] mb-4 pb-2 border-b">Additional Information</h2>
          {additional.languages.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-800 mb-1">Languages</h3>
              <div className="text-gray-700">{additional.languages.join(', ')}</div>
            </div>
          )}
          {additional.hobbies.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Interests</h3>
              <div className="text-gray-700">{additional.hobbies.join(', ')}</div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

