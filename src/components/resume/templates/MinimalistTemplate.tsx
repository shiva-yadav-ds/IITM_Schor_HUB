import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalistTemplateProps {
  data: ResumeData;
}

export const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;

  // Ultra-clean minimalist inline styles for PDF compatibility
  const styles = {
    container: {
      backgroundColor: '#ffffff',
      color: '#374151',
      width: '100%',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: '28px 32px',
      boxSizing: 'border-box' as const,
      fontSize: '10pt',
      lineHeight: '1.5',
    },
    header: {
      marginBottom: '16px',
      textAlign: 'center' as const,
    },
    name: {
      fontSize: '22pt',
      fontWeight: 300,
      color: '#111827',
      letterSpacing: '0.1em',
      marginBottom: '8px',
      textTransform: 'uppercase' as const,
    },
    contactRow: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap' as const,
      gap: '24px',
      fontSize: '10pt',
      color: '#6b7280',
    },
    divider: {
      width: '60px',
      height: '1px',
      backgroundColor: '#d1d5db',
      margin: '0 auto 32px auto',
    },
    twoColumn: {
      display: 'flex',
      gap: '40px',
    },
    mainColumn: {
      flex: 2,
    },
    sideColumn: {
      flex: 1,
      borderLeft: '1px solid #e5e7eb',
      paddingLeft: '32px',
    },
    section: {
      marginBottom: '28px',
    },
    sectionTitle: {
      fontSize: '11pt',
      fontWeight: 600,
      color: '#111827',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.15em',
      marginBottom: '16px',
    },
    entryContainer: {
      marginBottom: '20px',
    },
    entryTitle: {
      fontSize: '11pt',
      fontWeight: 600,
      color: '#111827',
    },
    entrySubtitle: {
      fontSize: '10pt',
      color: '#6b7280',
      marginTop: '2px',
    },
    entryDate: {
      fontSize: '9pt',
      color: '#9ca3af',
      fontStyle: 'italic',
      marginTop: '2px',
    },
    list: {
      marginTop: '8px',
      paddingLeft: '16px',
    },
    listItem: {
      fontSize: '10pt',
      color: '#4b5563',
      marginBottom: '4px',
      lineHeight: '1.5',
    },
    skillList: {
      color: '#4b5563',
      fontSize: '10pt',
      lineHeight: '1.8',
    },
    techTag: {
      display: 'inline-block',
      fontSize: '9pt',
      color: '#6b7280',
      border: '1px solid #e5e7eb',
      padding: '2px 8px',
      borderRadius: '2px',
      marginRight: '6px',
      marginBottom: '4px',
    },
    summary: {
      fontSize: '10.5pt',
      color: '#4b5563',
      fontStyle: 'italic',
      textAlign: 'center' as const,
      maxWidth: '540px',
      margin: '0 auto 24px auto',
      lineHeight: '1.7',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.name}>
          {personal.firstName} {personal.lastName}
        </h1>

        <div style={styles.contactRow}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.linkedin && (
            <a href={personal.linkedin} style={{ color: '#6b7280', textDecoration: 'none' }}>
              LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={personal.github} style={{ color: '#6b7280', textDecoration: 'none' }}>
              GitHub
            </a>
          )}
        </div>
      </header>

      <div style={styles.divider}></div>

      {/* Summary */}
      {additional.summary && (
        <p style={styles.summary}>{additional.summary}</p>
      )}

      {/* Two Column Layout */}
      <div style={styles.twoColumn}>
        {/* Main Column */}
        <div style={styles.mainColumn}>
          {/* Experience */}
          {experience.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={styles.entryContainer}>
                  <h3 style={styles.entryTitle}>{exp.title}</h3>
                  <p style={styles.entrySubtitle}>{exp.company}</p>
                  <p style={styles.entryDate}>
                    {exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}
                  </p>
                  {exp.responsibilities.length > 0 && (
                    <ul style={styles.list}>
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} style={styles.listItem}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={styles.entryContainer}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <h3 style={styles.entryTitle}>{proj.title}</h3>
                    {proj.link && (
                      <a href={proj.link} style={{ color: '#9ca3af', fontSize: '9pt', textDecoration: 'none' }}>
                        ↗
                      </a>
                    )}
                  </div>
                  <p style={{ ...styles.listItem, marginTop: '4px' }}>{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
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
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Education</h2>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <h3 style={{ ...styles.entryTitle, fontSize: '10pt' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '10pt', color: '#6b7280' }}>{edu.school}</p>
                  <p style={{ fontSize: '9pt', color: '#9ca3af' }}>{edu.graduationYear}</p>
                  {edu.gpa && (
                    <p style={{ fontSize: '9pt', color: '#9ca3af' }}>GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Skills</h2>
              <p style={styles.skillList}>
                {skills.map((skill, i) => (
                  <span key={skill.id}>
                    {skill.name}{i < skills.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </p>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <p style={{ fontSize: '10pt', color: '#374151' }}>{cert.name}</p>
                  <p style={{ fontSize: '9pt', color: '#9ca3af' }}>{cert.issuer}, {cert.year}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {additional.languages && additional.languages.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Languages</h2>
              <p style={styles.skillList}>{additional.languages.join(' · ')}</p>
            </section>
          )}

          {/* Interests */}
          {additional.hobbies && additional.hobbies.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Interests</h2>
              <p style={styles.skillList}>{additional.hobbies.join(' · ')}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};