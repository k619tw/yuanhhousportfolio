import React from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Briefcase, GraduationCap } from '@phosphor-icons/react'
import { Accordion, AccordionItem } from '../Accordion/Accordion'
import styles from './about.module.css'

export interface AboutProps {
  className?: string
}

interface JobExperience {
  id: string
  titleKey: string
  dateKey: string
  locationKey: string
  descriptionKey: string
  responsibilities: string[]
}

interface Education {
  schoolKey: string
  degreeKey: string
  locationKey: string
  dateKey: string
}

/**
 * About section - Interactive resume-style layout with expandable sections
 */
export const About: React.FC<AboutProps> = ({ className }) => {
  const { t } = useTranslation()

  const jobs: JobExperience[] = [
    {
      id: 'bupa',
      titleKey: 'about.jobs.bupa.title',
      dateKey: 'about.jobs.bupa.date',
      locationKey: 'about.jobs.bupa.location',
      descriptionKey: 'about.jobs.bupa.description',
      responsibilities: [
        'about.jobs.bupa.resp1',
        'about.jobs.bupa.resp2',
        'about.jobs.bupa.resp3',
        'about.jobs.bupa.resp4',
      ],
    },
    {
      id: 'bupaSecondment',
      titleKey: 'about.jobs.bupaSecondment.title',
      dateKey: 'about.jobs.bupaSecondment.date',
      locationKey: 'about.jobs.bupaSecondment.location',
      descriptionKey: 'about.jobs.bupaSecondment.description',
      responsibilities: [
        'about.jobs.bupaSecondment.resp1',
        'about.jobs.bupaSecondment.resp2',
        'about.jobs.bupaSecondment.resp3',
        'about.jobs.bupaSecondment.resp4',
      ],
    },
    {
      id: 'ctm',
      titleKey: 'about.jobs.ctm.title',
      dateKey: 'about.jobs.ctm.date',
      locationKey: 'about.jobs.ctm.location',
      descriptionKey: 'about.jobs.ctm.description',
      responsibilities: [
        'about.jobs.ctm.resp1',
        'about.jobs.ctm.resp2',
        'about.jobs.ctm.resp3',
        'about.jobs.ctm.resp4',
      ],
    },
    {
      id: 'etrainu',
      titleKey: 'about.jobs.etrainu.title',
      dateKey: 'about.jobs.etrainu.date',
      locationKey: 'about.jobs.etrainu.location',
      descriptionKey: 'about.jobs.etrainu.description',
      responsibilities: [
        'about.jobs.etrainu.resp1',
        'about.jobs.etrainu.resp2',
        'about.jobs.etrainu.resp3',
        'about.jobs.etrainu.resp4',
      ],
    },
    {
      id: 'hyphen',
      titleKey: 'about.jobs.hyphen.title',
      dateKey: 'about.jobs.hyphen.date',
      locationKey: 'about.jobs.hyphen.location',
      descriptionKey: 'about.jobs.hyphen.description',
      responsibilities: [
        'about.jobs.hyphen.resp1',
        'about.jobs.hyphen.resp2',
        'about.jobs.hyphen.resp3',
      ],
    },
  ]

  const education: Education[] = [
    {
      schoolKey: 'about.education.uq.school',
      degreeKey: 'about.education.uq.degree',
      locationKey: 'about.education.uq.location',
      dateKey: 'about.education.uq.date',
    },
    {
      schoolKey: 'about.education.rmit.school',
      degreeKey: 'about.education.rmit.degree',
      locationKey: 'about.education.rmit.location',
      dateKey: 'about.education.rmit.date',
    },
    {
      schoolKey: 'about.education.shihChien.school',
      degreeKey: 'about.education.shihChien.degree',
      locationKey: 'about.education.shihChien.location',
      dateKey: 'about.education.shihChien.date',
    },
  ]

  // Transform jobs to AccordionItem format
  const accordionItems: AccordionItem[] = jobs.map((job) => ({
    id: job.id,
    title: t(job.titleKey),
    subtitle: (
      <>
        <span className={styles.jobDate}>{t(job.dateKey)}</span>
        <span className={styles.jobLocation}>
          <MapPin weight="duotone" size={12} aria-hidden="true" />
          {t(job.locationKey)}
        </span>
      </>
    ),
    content: (
      <>
        <p className={styles.jobDescription}>{t(job.descriptionKey)}</p>
        <div className={styles.responsibilities}>
          <h5 className={styles.responsibilitiesTitle}>{t('about.responsibilitiesTitle')}</h5>
          <ul className={styles.responsibilitiesList}>
            {job.responsibilities.map((respKey) => (
              <li key={respKey} className={styles.responsibilityItem}>
                {t(respKey)}
              </li>
            ))}
          </ul>
        </div>
      </>
    ),
  }))

  return (
    <section className={`${styles.about} ${className || ''}`} aria-labelledby="about-heading">
      <h2 id="about-heading" className={styles.srOnly}>{t('portfolio.nav.about')}</h2>

      {/* Two Column Layout: Education + Experience */}
      <div className={styles.twoColumnGrid}>
        {/* Education Card */}
        <div className={styles.educationCard}>
          <div className={styles.cardHeader}>
            <GraduationCap weight="duotone" className={styles.cardIcon} aria-hidden="true" />
            <h3 className={styles.cardTitle}>{t('about.educationTitle')}</h3>
          </div>
          <div className={styles.educationList}>
            {education.map((edu, index) => (
              <div key={edu.schoolKey} className={styles.educationItem}>
                <div className={styles.timelineConnector}>
                  <span className={styles.timelineDot} />
                  {index < education.length - 1 && <span className={styles.timelineLine} />}
                </div>
                <div className={styles.educationContent}>
                  <p className={styles.schoolName}>{t(edu.schoolKey)}</p>
                  <p className={styles.degree}>{t(edu.degreeKey)}</p>
                  <div className={styles.educationMeta}>
                    <span className={styles.date}>{t(edu.dateKey)}</span>
                    <span className={styles.location}>
                      <MapPin weight="duotone" aria-hidden="true" />
                      {t(edu.locationKey)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Card */}
        <div className={styles.experienceCard}>
          <div className={styles.cardHeader}>
            <Briefcase weight="duotone" className={styles.cardIcon} aria-hidden="true" />
            <h3 className={styles.cardTitle}>{t('about.experienceTitle')}</h3>
          </div>
          <Accordion
            items={accordionItems}
            allowMultiple
            defaultOpen={['bupa']}
          />
        </div>
      </div>
    </section>
  )
}

export default About
