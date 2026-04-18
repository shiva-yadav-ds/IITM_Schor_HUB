import React from 'react';
import { ResumeData } from '@/types/resume';

interface TechTemplateProps {
  data: ResumeData;
}

export const TechTemplate: React.FC<TechTemplateProps> = ({ data }) => {
  const { personal, education, experience, skills, projects, certifications, additional } = data;

  // Dark theme inline styles for PDF compatibility
  const styles = {
    container: {
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      width: '100%',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      padding: '24px 28px',
      boxSizing: 'border-box' as const,
      fontSize: '9pt',
      lineHeight: '1.4',
    },
    header: {
      marginBottom: '16px',
      borderBottom: '1px solid #334155',
      paddingBottom: '14px',
    },
    terminalBar: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',
    },
    terminalDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginRight: '6px',
    },
    terminalTitle: {
      marginLeft: '12px',
      fontSize: '10pt',
      color: '#64748b',
    },
    name: {
      fontSize: '26pt',
      fontWeight: 700,
      color: '#22d3ee',
      marginBottom: '8px',
    },
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '16px',
      fontSize: '10pt',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
    },
    prompt: {
      color: '#22d3ee',
      marginRight: '8px',
    },
    label: {
      color: '#64748b',
    },
    value: {
      color: '#e2e8f0',
      marginLeft: '6px',
    },
    link: {
      color: '#22d3ee',
      textDecoration: 'none',
    },
    twoColumn: {
      display: 'flex',
      gap: '28px',
    },
    mainColumn: {
      flex: 2,
    },
    sideColumn: {
      flex: 1,
    },
    section: {
      marginBottom: '24px',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
    },
    keyword: {
      color: '#c084fc',
      marginRight: '8px',
    },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: 700,
      color: '#ffffff',
    },
    bracket: {
      fontSize: '12pt',
      fontWeight: 700,
      color: '#ffffff',
      marginLeft: '4px',
    },
    entryContainer: {
      marginBottom: '16px',
      paddingLeft: '16px',
      borderLeft: '2px solid #334155',
    },
    entryTitle: {
      fontSize: '11pt',
      fontWeight: 600,
      color: '#ffffff',
    },
    entrySubtitle: {
      fontSize: '10pt',
      color: '#22d3ee',
      marginTop: '2px',
    },
    entryDate: {
      fontSize: '9pt',
      color: '#64748b',
      marginTop: '2px',
    },
    list: {
      marginTop: '8px',
    },
    listItem: {
      fontSize: '10pt',
      color: '#cbd5e1',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'flex-start',
    },
    arrow: {
      color: '#22d3ee',
      marginRight: '8px',
    },
    projectCard: {
      backgroundColor: '#1e293b',
      padding: '14px',
      borderRadius: '6px',
      marginBottom: '12px',
    },
    projectTitle: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '6px',
    },
    comment: {
      color: '#22d3ee',
      marginRight: '8px',
    },
    techTag: {
      backgroundColor: '#334155',
      color: '#22d3ee',
      fontSize: '8pt',
      padding: '3px 8px',
      borderRadius: '3px',
      marginRight: '6px',
      marginBottom: '4px',
      display: 'inline-block',
    },
    skillsBox: {
      backgroundColor: '#1e293b',
      padding: '14px',
      borderRadius: '6px',
      borderLeft: '3px solid #22d3ee',
    },
    skillItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '4px',
      fontSize: '10pt',
    },
    quote: {
      color: '#22d3ee',
    },
    comma: {
      color: '#64748b',
    },
    footer: {
      marginTop: '20px',
      paddingTop: '12px',
      borderTop: '1px solid #334155',
      color: '#64748b',
      fontSize: '9pt',
    },
  };

  const technicalSkills = skills.filter(skill => skill.type === 'technical');
  const softSkills = skills.filter(skill => skill.type === 'soft');

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.terminalBar}>
          <div style={{ ...styles.terminalDot, backgroundColor: '#ef4444' }}></div>
          <div style={{ ...styles.terminalDot, backgroundColor: '#eab308' }}></div>
          <div style={{ ...styles.terminalDot, backgroundColor: '#22c55e' }}></div>
          <span style={styles.terminalTitle}>resume.tsx — developer profile</span>
        </div>

        <h1 style={styles.name}>
          {personal.firstName} <span style={{ color: '#67e8f9' }}>{personal.lastName}</span>
        </h1>

        {additional.summary && (
          <p style={{ color: '#94a3b8', fontSize: '10pt', fontStyle: 'italic', marginBottom: '12px', maxWidth: '500px' }}>
            <span style={{ color: '#22d3ee' }}>// </span>{additional.summary}
          </p>
        )}

        <div style={styles.contactRow}>
          {personal.email && (
            <div style={styles.contactItem}>
              <span style={styles.prompt}>$</span>
              <span style={styles.label}>email:</span>
              <span style={styles.value}>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div style={styles.contactItem}>
              <span style={styles.prompt}>$</span>
              <span style={styles.label}>phone:</span>
              <span style={styles.value}>{personal.phone}</span>
            </div>
          )}
          {personal.github && (
            <a href={personal.github} style={{ ...styles.contactItem, ...styles.link }}>
              <span style={styles.prompt}>~</span>
              <span>github</span>
            </a>
          )}
          {personal.linkedin && (
            <a href={personal.linkedin} style={{ ...styles.contactItem, ...styles.link }}>
              <span style={styles.prompt}>~</span>
              <span>linkedin</span>
            </a>
          )}
        </div>
      </header>

      {/* Content */}
      <div style={styles.twoColumn}>
        {/* Main Column */}
        <div style={styles.mainColumn}>
          {/* Experience */}
          {experience.length > 0 && (
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <span style={styles.keyword}>function</span>
                <span style={styles.sectionTitle}>Experience()</span>
                <span style={styles.bracket}>{'{'}</span>
              </div>

              {experience.map((exp) => (
                <div key={exp.id} style={styles.entryContainer}>
                  <h3 style={styles.entryTitle}>{exp.title}</h3>
                  <p style={styles.entrySubtitle}>{exp.company}</p>
                  <p style={styles.entryDate}>
                    {exp.startDate} – {exp.currentJob ? 'Present' : exp.endDate}
                  </p>
                  {exp.responsibilities.length > 0 && (
                    <div style={styles.list}>
                      {exp.responsibilities.map((resp, i) => (
                        <div key={i} style={styles.listItem}>
                          <span style={styles.arrow}>→</span>
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div><span style={styles.sectionTitle}>{'}'}</span></div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <span style={styles.keyword}>function</span>
                <span style={styles.sectionTitle}>Projects()</span>
                <span style={styles.bracket}>{'{'}</span>
              </div>

              {projects.map((proj) => (
                <div key={proj.id} style={styles.projectCard}>
                  <div style={styles.projectTitle}>
                    <span style={styles.comment}>//</span>
                    <span style={{ fontWeight: 600, color: '#ffffff' }}>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link} style={{ marginLeft: 'auto', color: '#22d3ee', fontSize: '9pt' }}>
                        View →
                      </a>
                    )}
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '10pt', marginBottom: '8px' }}>{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <div>
                      {proj.technologies.map((tech, i) => (
                        <span key={i} style={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div><span style={styles.sectionTitle}>{'}'}</span></div>
            </section>
          )}
        </div>

        {/* Side Column */}
        <div style={styles.sideColumn}>
          {/* Skills */}
          {skills.length > 0 && (
            <section style={styles.section}>
              <div style={styles.skillsBox}>
                <div style={styles.sectionHeader}>
                  <span style={styles.keyword}>const</span>
                  <span style={{ ...styles.sectionTitle, marginLeft: '8px' }}>skills</span>
                  <span style={{ color: '#64748b', marginLeft: '8px' }}>=</span>
                  <span style={styles.bracket}>[</span>
                </div>

                {technicalSkills.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ color: '#64748b', fontSize: '9pt', marginBottom: '4px' }}>// technical</p>
                    {technicalSkills.map((skill, i) => (
                      <div key={skill.id} style={styles.skillItem}>
                        <span style={styles.quote}>'</span>
                        <span style={{ color: '#fbbf24' }}>{skill.name}</span>
                        <span style={styles.quote}>'</span>
                        {i < technicalSkills.length - 1 && <span style={styles.comma}>,</span>}
                      </div>
                    ))}
                  </div>
                )}

                {softSkills.length > 0 && (
                  <div>
                    <p style={{ color: '#64748b', fontSize: '9pt', marginBottom: '4px' }}>// soft skills</p>
                    {softSkills.map((skill, i) => (
                      <div key={skill.id} style={styles.skillItem}>
                        <span style={styles.quote}>'</span>
                        <span style={{ color: '#a78bfa' }}>{skill.name}</span>
                        <span style={styles.quote}>'</span>
                        {i < softSkills.length - 1 && <span style={styles.comma}>,</span>}
                      </div>
                    ))}
                  </div>
                )}

                <div><span style={styles.sectionTitle}>];</span></div>
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <span style={styles.keyword}>class</span>
                <span style={{ ...styles.sectionTitle, marginLeft: '8px' }}>Education</span>
                <span style={styles.bracket}>{'{'}</span>
              </div>

              {education.map((edu, i) => (
                <div key={i} style={{ ...styles.entryContainer, marginBottom: '12px' }}>
                  <p style={{ fontWeight: 600, color: '#ffffff', fontSize: '10pt' }}>{edu.degree}</p>
                  <p style={{ color: '#22d3ee', fontSize: '10pt' }}>{edu.school}</p>
                  <p style={{ color: '#64748b', fontSize: '9pt' }}>{edu.graduationYear}</p>
                  {edu.gpa && <p style={{ color: '#64748b', fontSize: '9pt' }}>GPA: {edu.gpa}</p>}
                </div>
              ))}

              <div><span style={styles.sectionTitle}>{'}'}</span></div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <span style={styles.keyword}>import</span>
                <span style={{ ...styles.sectionTitle, marginLeft: '8px' }}>Certifications</span>
              </div>

              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '8px', paddingLeft: '16px' }}>
                  <p style={{ fontWeight: 500, color: '#ffffff', fontSize: '10pt' }}>{cert.name}</p>
                  <p style={{ color: '#64748b', fontSize: '9pt' }}>{cert.issuer}, {cert.year}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {additional.languages && additional.languages.length > 0 && (
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <span style={styles.keyword}>const</span>
                <span style={{ ...styles.sectionTitle, marginLeft: '8px' }}>languages</span>
                <span style={{ color: '#64748b', marginLeft: '8px' }}>=</span>
              </div>
              <p style={{ paddingLeft: '16px', fontSize: '10pt' }}>
                [
                {additional.languages.map((lang, i) => (
                  <span key={i}>
                    <span style={styles.quote}>'</span>
                    <span style={{ color: '#4ade80' }}>{lang}</span>
                    <span style={styles.quote}>'</span>
                    {i < additional.languages.length - 1 && <span style={styles.comma}>, </span>}
                  </span>
                ))}
                ];
              </p>
            </section>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={{ color: '#22d3ee' }}>// </span>
        Generated on {new Date().toLocaleDateString()}
      </footer>
    </div>
  );
};