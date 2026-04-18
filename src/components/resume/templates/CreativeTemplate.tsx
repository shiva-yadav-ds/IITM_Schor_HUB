import React from 'react';
import { ResumeData } from '@/types/resume';

interface CreativeTemplateProps {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;
  
  return (
    <div className="bg-white text-gray-800 w-full h-full font-sans px-8 py-6 flex flex-col">
      {/* Header with accent color */}
      <header className="relative pb-10 mb-6">
        <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500 opacity-10 rounded-full -ml-4 -mt-4"></div>
        <h1 className="text-4xl font-bold text-gray-900 relative z-10">
          {personal.firstName} <span className="text-blue-600">{personal.lastName}</span>
        </h1>
        <p className="text-lg text-gray-500 mt-1 italic">{additional.summary || 'Professional Resume'}</p>
        
        <div className="mt-4 flex flex-wrap gap-3">
          {personal.email && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">📧</span> {personal.email}
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">📱</span> {personal.phone}
            </div>
          )}
          {personal.address && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">📍</span> {personal.address}
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">🔗</span> {personal.linkedin.replace(/^https?:\/\/(www\.)?/i, '')}
            </div>
          )}
          {personal.github && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">💻</span> {personal.github.replace(/^https?:\/\/(www\.)?/i, '')}
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600">💼</span>
                </div>
                Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-blue-200 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full -left-[7px] top-1"></div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-bold text-gray-800">{exp.title}</h3>
                      <span className="text-sm text-blue-600 font-medium">
                        {exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
                    {exp.responsibilities.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
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
          
          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600">🚀</span>
                </div>
                Projects
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-bold text-gray-800">
                        {proj.title}
                      </h3>
                      {proj.link && (
                        <a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Right Column */}
        <div className="col-span-1 space-y-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600">🎓</span>
                </div>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-blue-200 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full -left-[7px] top-1"></div>
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.graduationYear}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                    {edu.relevantCourses.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        <span className="font-medium">Coursework:</span><br />
                        {edu.relevantCourses.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600">⚡</span>
                </div>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
          
          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600">🏆</span>
                </div>
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <div className="font-bold text-gray-800">{cert.name}</div>
                    <div className="text-gray-600">{cert.issuer}, {cert.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Additional */}
          {(additional.languages.length > 0 || additional.hobbies.length > 0) && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600">✨</span>
                </div>
                Additional
              </h2>
              
              {additional.languages.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-sm font-bold text-gray-700 mb-1">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {additional.languages.map((lang, i) => (
                      <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {additional.hobbies.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-1">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {additional.hobbies.map((hobby, i) => (
                      <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};