import React from 'react';
import { ResumeData } from '@/types/resume';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;

  const technicalSkills = skills.filter(skill => skill.type === 'technical');
  const softSkills = skills.filter(skill => skill.type === 'soft');

  // Modern inline styles for PDF compatibility
  const styles = {
    container: {
      backgroundColor: '#ffffff',
      color: '#1f2937',
      width: '100%',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      display: 'flex',
      flexDirection: 'column' as const,
    },
    header: {
      background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
      color: '#ffffff',
      padding: '20px 28px',
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    nameSection: {
      flex: 1,
    },
    name: {
      fontSize: '32pt',
      fontWeight: 700,
      marginBottom: '8px',
      letterSpacing: '-0.02em',
    },
    summary: {
      fontSize: '11pt',
      color: '#cbd5e1',
      maxWidth: '480px',
      lineHeight: '1.6',
    },
    contactSection: {
      textAlign: 'right' as const,
      fontSize: '10pt',
    },
    contactItem: {
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '8px',
    },
    content: {
      display: 'flex',
      flex: 1,
    },
    mainColumn: {
      flex: 2,
      padding: '28px 32px',
      borderRight: '1px solid #e5e7eb',
    },
    sideColumn: {
      flex: 1,
      padding: '28px 24px',
      backgroundColor: '#f8fafc',
    },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: 700,
      color: '#1e3a5f',
      borderBottom: '2px solid #3b82f6',
      paddingBottom: '6px',
      marginBottom: '16px',
      marginTop: '4px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
    },
    sideSectionTitle: {
      fontSize: '11pt',
      fontWeight: 700,
      color: '#1e3a5f',
      borderBottom: '2px solid #3b82f6',
      paddingBottom: '4px',
      marginBottom: '12px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    entryContainer: {
      marginBottom: '20px',
    },
    entryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    entryTitle: {
      fontSize: '12pt',
      fontWeight: 600,
      color: '#111827',
    },
    entryDate: {
      fontSize: '9pt',
      color: '#6b7280',
      backgroundColor: '#f3f4f6',
      padding: '2px 8px',
      borderRadius: '4px',
    },
    entrySubtitle: {
      fontSize: '10pt',
      color: '#4b5563',
      fontWeight: 500,
      marginTop: '2px',
    },
    entryDescription: {
      fontSize: '10pt',
      color: '#4b5563',
      marginTop: '6px',
      lineHeight: '1.5',
    },
    list: {
      marginTop: '8px',
      paddingLeft: '0',
    },
    listItem: {
      fontSize: '10pt',
      color: '#4b5563',
      marginBottom: '4px',
      lineHeight: '1.5',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
    },
    bullet: {
      color: '#3b82f6',
      fontWeight: 'bold',
      marginTop: '2px',
    },
    skillCategory: {
      marginBottom: '16px',
    },
    skillCategoryTitle: {
      fontSize: '9pt',
      fontWeight: 600,
      color: '#6b7280',
      marginBottom: '8px',
      textTransform: 'uppercase' as const,
    },
    skillsGrid: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '6px',
    },
    techSkill: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      fontSize: '9pt',
      padding: '4px 10px',
      borderRadius: '20px',
      fontWeight: 500,
    },
    softSkill: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      fontSize: '9pt',
      padding: '4px 10px',
      borderRadius: '20px',
      fontWeight: 500,
    },
    techTag: {
      backgroundColor: '#ecfdf5',
      color: '#065f46',
      fontSize: '8pt',
      padding: '2px 6px',
      borderRadius: '3px',
      marginRight: '4px',
    },
    eduItem: {
      marginBottom: '14px',
    },
    eduDegree: {
      fontSize: '10pt',
      fontWeight: 600,
      color: '#111827',
    },
    eduSchool: {
      fontSize: '10pt',
      color: '#4b5563',
    },
    eduYear: {
      fontSize: '9pt',
      color: '#9ca3af',
    },
    certItem: {
      marginBottom: '10px',
    },
    certName: {
      fontSize: '10pt',
      fontWeight: 500,
      color: '#111827',
    },
    certIssuer: {
      fontSize: '9pt',
      color: '#6b7280',
    },
    langTag: {
      backgroundColor: '#f3e8ff',
      color: '#7c3aed',
      fontSize: '9pt',
      padding: '4px 10px',
      borderRadius: '20px',
      fontWeight: 500,
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.nameSection}>
            <h1 style={styles.name}>{personal.firstName} {personal.lastName}</h1>
            {additional.summary && (
              <p style={styles.summary}>{additional.summary}</p>
            )}
          </div>
          <div style={styles.contactSection}>
            {personal.email && (
              <div style={styles.contactItem}>
                <span>{personal.email}</span>
                <span>📧</span>
              </div>
            )}
            {personal.phone && (
              <div style={styles.contactItem}>
                <span>{personal.phone}</span>
                <span>📱</span>
              </div>
            )}
            {personal.address && (
              <div style={styles.contactItem}>
                <span>{personal.address}</span>
                <span>📍</span>
              </div>
            )}
            {personal.linkedin && (
              <div style={styles.contactItem}>
                <a href={personal.linkedin} style={{ color: '#93c5fd' }}>
                  {personal.linkedin.replace(/^https?:\/\/(www\.)?/i, '').slice(0, 25)}
                </a>
                <span>🔗</span>
              </div>
            )}
            {personal.github && (
              <div style={styles.contactItem}>
                <a href={personal.github} style={{ color: '#93c5fd' }}>
                  {personal.github.replace(/^https?:\/\/(www\.)?/i, '').slice(0, 25)}
                </a>
                <span>💻</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div style={styles.content}>
        {/* Main Column */}
        <div style={styles.mainColumn}>
          {/* Experience */}
          {experience.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={styles.sectionTitle}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={styles.entryContainer}>
                  <div style={styles.entryHeader}>
                    <h3 style={styles.entryTitle}>{exp.title}</h3>
                    <span style={styles.entryDate}>
                      {exp.startDate} - {exp.currentJob ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p style={styles.entrySubtitle}>{exp.company}</p>
                  {exp.responsibilities.length > 0 && (
                    <ul style={styles.list}>
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} style={styles.listItem}>
                          <span style={styles.bullet}>▸</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={styles.sectionTitle}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ ...styles.entryContainer, marginBottom: '16px' }}>
                  <div style={styles.entryHeader}>
                    <h3 style={styles.entryTitle}>{proj.title}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', fontSize: '9pt' }}>
                        View →
                      </a>
                    )}
                  </div>
                  <p style={styles.entryDescription}>{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {proj.technologies.map((tech, i) => (
                        <span key={i} style={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Side Column */}
        <div style={styles.sideColumn}>
          {/* Education */}
          {education.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={styles.sideSectionTitle}>Education</h2>
              {education.map((edu, i) => (
                <div key={i} style={styles.eduItem}>
                  <p style={styles.eduDegree}>{edu.degree}</p>
                  <p style={styles.eduSchool}>{edu.school}</p>
                  <p style={styles.eduYear}>{edu.graduationYear} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={styles.sideSectionTitle}>Skills</h2>

              {technicalSkills.length > 0 && (
                <div style={styles.skillCategory}>
                  <p style={styles.skillCategoryTitle}>Technical</p>
                  <div style={styles.skillsGrid}>
                    {technicalSkills.map((skill) => (
                      <span key={skill.id} style={styles.techSkill}>{skill.name}</span>
                    ))}
                  </div>
                </div>
              )}

              {softSkills.length > 0 && (
                <div style={styles.skillCategory}>
                  <p style={styles.skillCategoryTitle}>Soft Skills</p>
                  <div style={styles.skillsGrid}>
                    {softSkills.map((skill) => (
                      <span key={skill.id} style={styles.softSkill}>{skill.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={styles.sideSectionTitle}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={styles.certItem}>
                  <p style={styles.certName}>{cert.name}</p>
                  <p style={styles.certIssuer}>{cert.issuer} • {cert.year}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {additional.languages && additional.languages.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={styles.sideSectionTitle}>Languages</h2>
              <div style={styles.skillsGrid}>
                {additional.languages.map((lang, i) => (
                  <span key={i} style={styles.langTag}>{lang}</span>
                ))}
              </div>
            </section>
          )}

          {/* Hobbies */}
          {additional.hobbies && additional.hobbies.length > 0 && (
            <section>
              <h2 style={styles.sideSectionTitle}>Interests</h2>
              <p style={{ fontSize: '10pt', color: '#4b5563', lineHeight: '1.5' }}>
                {additional.hobbies.join(' • ')}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
