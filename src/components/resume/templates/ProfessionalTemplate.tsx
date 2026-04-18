import React from 'react';
import { ResumeData } from '@/types/resume';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;

  // Inline styles for PDF compatibility
  const styles = {
    container: {
      backgroundColor: '#ffffff',
      color: '#1f2937',
      width: '100%',
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
      padding: '24px 28px',
      boxSizing: 'border-box' as const,
      fontSize: '10pt',
      lineHeight: '1.4',
    },
    header: {
      borderBottom: '2px solid #1e40af',
      paddingBottom: '12px',
      marginBottom: '16px',
    },
    name: {
      fontSize: '22pt',
      fontWeight: 700,
      color: '#111827',
      letterSpacing: '0.03em',
      marginBottom: '6px',
    },
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '16px',
      fontSize: '10pt',
      color: '#4b5563',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    link: {
      color: '#1e40af',
      textDecoration: 'none',
    },
    sectionTitle: {
      fontSize: '13pt',
      fontWeight: 700,
      color: '#1e40af',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '6px',
      marginBottom: '12px',
      marginTop: '20px',
    },
    section: {
      marginBottom: '16px',
    },
    summary: {
      color: '#374151',
      fontSize: '11pt',
      lineHeight: '1.6',
      fontStyle: 'italic',
    },
    entryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '4px',
    },
    entryTitle: {
      fontSize: '12pt',
      fontWeight: 600,
      color: '#111827',
    },
    entryDate: {
      fontSize: '10pt',
      color: '#6b7280',
      fontStyle: 'italic',
    },
    entrySubtitle: {
      fontSize: '11pt',
      color: '#374151',
      fontWeight: 500,
      marginBottom: '6px',
    },
    list: {
      marginLeft: '20px',
      marginTop: '6px',
      paddingLeft: '0',
    },
    listItem: {
      fontSize: '10.5pt',
      color: '#4b5563',
      marginBottom: '4px',
      lineHeight: '1.5',
    },
    skillsGrid: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '8px',
      marginTop: '8px',
    },
    skillTag: {
      backgroundColor: '#e0e7ff',
      color: '#3730a3',
      fontSize: '9pt',
      padding: '4px 10px',
      borderRadius: '4px',
      fontWeight: 500,
    },
    techTag: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      fontSize: '9pt',
      padding: '3px 8px',
      borderRadius: '3px',
    },
    twoColumn: {
      display: 'flex',
      gap: '32px',
    },
    mainColumn: {
      flex: 2,
    },
    sideColumn: {
      flex: 1,
    },
  };

  const technicalSkills = skills.filter(skill => skill.type === 'technical');
  const softSkills = skills.filter(skill => skill.type === 'soft');

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.name}>
          {personal.firstName} {personal.lastName}
        </h1>

        <div style={styles.contactRow}>
          {personal.email && (
            <span style={styles.contactItem}>📧 {personal.email}</span>
          )}
          {personal.phone && (
            <span style={styles.contactItem}>📱 {personal.phone}</span>
          )}
          {personal.address && (
            <span style={styles.contactItem}>📍 {personal.address}</span>
          )}
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              🔗 LinkedIn
            </a>
          )}
          {personal.github && (
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              💻 GitHub
            </a>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {additional.summary && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={styles.summary}>{additional.summary}</p>
        </section>
      )}

      {/* Two Column Layout */}
      <div style={styles.twoColumn}>
        {/* Main Column */}
        <div style={styles.mainColumn}>
          {/* Experience Section */}
          {experience.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Professional Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={styles.entryHeader}>
                    <h3 style={styles.entryTitle}>{exp.title}</h3>
                    <span style={styles.entryDate}>
                      {exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p style={styles.entrySubtitle}>{exp.company}</p>
                  {exp.responsibilities.length > 0 && (
                    <ul style={styles.list}>
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} style={styles.listItem}>• {resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '14px' }}>
                  <div style={styles.entryHeader}>
                    <h3 style={styles.entryTitle}>{proj.title}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                        View Project →
                      </a>
                    )}
                  </div>
                  <p style={{ ...styles.listItem, marginBottom: '6px' }}>{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {proj.technologies.map((tech, idx) => (
                        <span key={idx} style={styles.techTag}>{tech}</span>
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
          {/* Education Section */}
          {education.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Education</h2>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <h3 style={{ ...styles.entryTitle, fontSize: '11pt' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '10pt', color: '#374151', fontWeight: 500 }}>{edu.school}</p>
                  <p style={{ fontSize: '9pt', color: '#6b7280' }}>{edu.graduationYear}</p>
                  {edu.gpa && (
                    <p style={{ fontSize: '9pt', color: '#6b7280' }}>GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Skills</h2>

              {technicalSkills.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '10pt', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Technical</p>
                  <div style={styles.skillsGrid}>
                    {technicalSkills.map((skill, i) => (
                      <span key={i} style={styles.skillTag}>{skill.name}</span>
                    ))}
                  </div>
                </div>
              )}

              {softSkills.length > 0 && (
                <div>
                  <p style={{ fontSize: '10pt', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Soft Skills</p>
                  <div style={styles.skillsGrid}>
                    {softSkills.map((skill, i) => (
                      <span key={i} style={{ ...styles.skillTag, backgroundColor: '#fef3c7', color: '#92400e' }}>{skill.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Certifications Section */}
          {certifications.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '10pt', fontWeight: 600, color: '#111827' }}>{cert.name}</p>
                  <p style={{ fontSize: '9pt', color: '#6b7280' }}>{cert.issuer} • {cert.year}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {additional.languages && additional.languages.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Languages</h2>
              <div style={styles.skillsGrid}>
                {additional.languages.map((lang, i) => (
                  <span key={i} style={{ ...styles.skillTag, backgroundColor: '#d1fae5', color: '#065f46' }}>{lang}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};