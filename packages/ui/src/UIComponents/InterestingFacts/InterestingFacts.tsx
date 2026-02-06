import React from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Basketball, Quotes } from '@phosphor-icons/react'
import { useTheme } from '../../ThemeProvider'
import styles from './interestingFacts.module.css'

// Company logos - light mode
import logoBupa from '../../assets/Bupa.svg'
import logoBlua from '../../assets/Blua.svg'
import logoCtm from '../../assets/CompareTheMarket.svg'

// Company logos - dark mode variants
import logoBupaDark from '../../assets/Bupa-dark.svg'
import logoBluaDark from '../../assets/Blua-dark.svg'
import logoCtmDark from '../../assets/CompareTheMarket-dark.svg'

// Creative tool logos - light mode
import toolFigma from '../../assets/Figma.svg'
import toolProtopie from '../../assets/Protopie.svg'
import toolVSCode from '../../assets/VS Studio Code.svg'
import toolClaude from '../../assets/Claude.svg'
import toolAi from '../../assets/Ai.svg'
import toolPs from '../../assets/PS.svg'
import toolAe from '../../assets/AE.svg'
import toolPr from '../../assets/PR.svg'
import toolMe from '../../assets/ME.svg'

// Creative tool logos - dark mode variants
import toolProtopieDark from '../../assets/Protopie-dark.svg'
import toolClaudeDark from '../../assets/Claude-dark.svg'

// Country flags
import flagJp from '../../assets/JP.svg'
import flagCn from '../../assets/CN.svg'
import flagTw from '../../assets/TW.svg'
import flagGb from '../../assets/GB.svg'

// Images
import bandImage from '../../assets/yorushika.png'
import testimonialAvatar from '../../assets/Rifan image.png'
import heroImage from '../../assets/hero.png'

export interface InterestingFactsProps {
  /** Optional class name for custom styling */
  className?: string
  /** Callback when the "Check my three point shot" CTA is clicked */
  onSportyCTAClick?: () => void
}

/**
 * InterestingFacts section displaying personal facts in a bento-grid layout.
 * Sits below the hero section on the portfolio page.
 */
export const InterestingFacts: React.FC<InterestingFactsProps> = ({
  className,
  onSportyCTAClick,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isDarkMode = theme === 'product-b'

  return (
    <section
      className={`${styles.section} ${className || ''}`}
      aria-labelledby="interesting-facts-title"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 id="interesting-facts-title" className={styles.title}>
            {t('interestingFacts.title')}
          </h2>
          <p className={styles.subtitle}>{t('interestingFacts.subtitle')}</p>
        </header>

        {/* Bento Grid Layout */}
        <div className={styles.grid}>
          {/* === TOP ROW === */}
          <div className={styles.topRow}>
            {/* Companies Card - Fixed Width 402px */}
            <article className={styles.companiesCard} aria-label={t('interestingFacts.companies.title')}>
              <h3 className={styles.cardTitle}>
                {t('interestingFacts.companies.title').split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </h3>
              <div className={styles.logos}>
                <img src={isDarkMode ? logoBupaDark : logoBupa} alt="Bupa" className={styles.logoBupa} loading="lazy" />
                <img src={isDarkMode ? logoBluaDark : logoBlua} alt="Blua" className={styles.logoBlua} loading="lazy" />
                <img src={isDarkMode ? logoCtmDark : logoCtm} alt="Compare the Market" className={styles.logoCtm} loading="lazy" />
              </div>
            </article>

            {/* Creative Tools Card - Flexible Width */}
            <article className={styles.toolsCard} aria-label={t('interestingFacts.tools.label')}>
              <div className={styles.toolsGrid}>
                <img src={toolFigma} alt="Figma" className={styles.toolIcon} loading="lazy" />
                <img src={isDarkMode ? toolProtopieDark : toolProtopie} alt="ProtoPie" className={styles.toolIconProtopie} loading="lazy" />
                <img src={toolVSCode} alt="VS Code" className={styles.toolIconVSCode} loading="lazy" />
                <img src={isDarkMode ? toolClaudeDark : toolClaude} alt="Claude AI" className={styles.toolIconClaude} loading="lazy" />
              </div>
              <div className={styles.toolsGridBottom}>
                <img src={toolAi} alt="Adobe Illustrator" className={styles.adobeIcon} loading="lazy" />
                <img src={toolPs} alt="Adobe Photoshop" className={styles.adobeIcon} loading="lazy" />
                <img src={toolAe} alt="Adobe After Effects" className={styles.adobeIcon} loading="lazy" />
                <img src={toolPr} alt="Adobe Premiere Pro" className={styles.adobeIcon} loading="lazy" />
                <img src={toolMe} alt="Adobe Media Encoder" className={styles.adobeIcon} loading="lazy" />
              </div>
              <p className={styles.toolsLabel}>{t('interestingFacts.tools.label')}</p>
            </article>
          </div>

          {/* === MIDDLE SECTION (CSS Grid Layout) === */}
          <div className={styles.middleSection}>
            {/* Sporty Person Card */}
            <article
              className={styles.sportyCard}
              role="button"
              tabIndex={0}
              onClick={onSportyCTAClick}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSportyCTAClick?.(); } }}
              aria-label={`${t('interestingFacts.sporty.cta')} - video will play`}
            >
              <div className={styles.sportyContent}>
                <h3 className={styles.cardTitleLeft}>{t('interestingFacts.sporty.title')}</h3>
                <span className={styles.sportyCTA}>
                  <span>{t('interestingFacts.sporty.cta')}</span>
                  <ArrowRight size={20} weight="bold" aria-hidden="true" />
                </span>
              </div>
              <div className={styles.sportyIcon} aria-hidden="true">
                <Basketball size={56} weight="duotone" />
              </div>
            </article>

            {/* Gradient Card with Overflow Image */}
            <article className={styles.gradientCard} aria-label="Featured image">
              <div className={styles.gradientImageWrapper}>
                <img
                  src={heroImage}
                  alt="Yuan - Designer portrait"
                  className={styles.gradientImage}
                  loading="lazy"
                />
              </div>
            </article>

            {/* Testimonial Card - spans full height */}
            <article className={styles.testimonialCard} aria-label={t('interestingFacts.testimonial.title')}>
              <h3 className={styles.testimonialTitle}>{t('interestingFacts.testimonial.title')}</h3>
              <p className={styles.testimonialPlaceholder}>{t('interestingFacts.testimonial.placeholder')}</p>
              <div className={styles.quoteWrapper}>
                <Quotes size={56} weight="duotone" className={styles.quoteIconOpen} aria-hidden="true" />
                <blockquote className={styles.testimonialQuote}>
                  {t('interestingFacts.testimonial.quote')}
                </blockquote>
                <Quotes size={56} weight="duotone" className={styles.quoteIconClose} aria-hidden="true" />
              </div>
              <footer className={styles.testimonialFooter}>
                <img
                  src={testimonialAvatar}
                  alt=""
                  className={styles.testimonialAvatar}
                  loading="lazy"
                />
                <div className={styles.testimonialAuthor}>
                  <cite className={styles.authorName}>{t('interestingFacts.testimonial.author')}</cite>
                  <span className={styles.authorRole}>{t('interestingFacts.testimonial.role')}</span>
                </div>
              </footer>
            </article>

            {/* Favourite Band Card */}
            <article className={styles.bandCard} aria-label={t('interestingFacts.band.title')}>
              <h3 className={styles.cardTitleCenter}>{t('interestingFacts.band.title')}</h3>
              <img
                src={bandImage}
                alt="Yorushika band"
                className={styles.bandImage}
                loading="lazy"
              />
              <p className={styles.bandName} lang="ja">{t('interestingFacts.band.name')}</p>
            </article>

            {/* Years in Industry Card */}
            <article className={styles.yearsCard} aria-label={t('interestingFacts.years.label')}>
              <span className={styles.yearsNumber}>{t('interestingFacts.years.number')}</span>
              <span className={styles.yearsLabel}>{t('interestingFacts.years.label')}</span>
            </article>

            {/* Travel Card */}
            <article className={styles.travelCard} aria-label={t('interestingFacts.travel.title')}>
              <h3 className={styles.cardTitleCenter}>{t('interestingFacts.travel.title')}</h3>
              <div className={styles.flags}>
                <img src={flagJp} alt="Japan" className={styles.flagLarge} loading="lazy" />
                <img src={flagCn} alt="China" className={styles.flag} loading="lazy" />
                <img src={flagTw} alt="Taiwan" className={styles.flag} loading="lazy" />
                <img src={flagGb} alt="United Kingdom" className={styles.flag} loading="lazy" />
              </div>
            </article>

            {/* Stats Card - gets more width priority */}
            <article className={styles.statsCard} aria-label={t('interestingFacts.stats.text')}>
              <span className={styles.statsNumber}>{t('interestingFacts.stats.number')}</span>
              <p className={styles.statsText}>{t('interestingFacts.stats.text')}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InterestingFacts
