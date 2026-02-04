import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// using inline SVGs for hamburger/close icons (no external icon lib)
import { ChipGroup } from '../UIComponents/Chip'
import { Dialog } from '../UIComponents/Dialog/Dialog'
import { Button } from '../UIComponents/Button/Button'
import { Badge } from '../UIComponents/Badge/Badge'
import { ThemeSelector } from './ThemeSelector'
import { Hero } from '../UIComponents/Hero/Hero'
import { Toggle } from '../UIComponents/Toggle/Toggle'
import { Card } from '../UIComponents/Card/Card'
import { useTheme } from '../ThemeProvider'
import styles from './portfolio.module.css'
import heroImg from '../assets/hero.png'

const ONBOARDING_KEY = 'portfolio-onboarding-complete'

export const Portfolio: React.FC = () => {
  const { t, i18n } = useTranslation()
  useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'work' | 'settings'>('home')
  const [selectedLanguage, setSelectedLanguage] = useState<(string | number)[]>([i18n.language])
  
  // Onboarding dialog state
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingLanguage, setOnboardingLanguage] = useState<(string | number)[]>([i18n.language])

  // Check if onboarding should be shown on mount
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY)
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  // Sync selected language with i18n when language changes
  useEffect(() => {
    setSelectedLanguage([i18n.language])
  }, [i18n.language])

  const handleOnboardingLanguageChange = (selected: (string | number)[]) => {
    if (selected.length > 0) {
      setOnboardingLanguage(selected)
      i18n.changeLanguage(String(selected[0]))
    }
  }

  // hero right-side controls removed (moved into dedicated pages/components if needed)
  const [enhancedContrast, setEnhancedContrast] = useState(false)

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setShowOnboarding(false)
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 18) return 'afternoon'
    return 'evening'
  }

  const onboardingTitle = t(`portfolio.onboarding.greeting.${getTimeOfDay()}`)

  // Announcements for screen readers
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    // Announce language changes
    setAnnouncement(t('aria.languageChanged', { lang: i18n.language }))
  }, [i18n.language, t])

  useEffect(() => {
    // Announce view changes (home/work/settings)
    setAnnouncement(t('aria.viewChanged', { view: t(`portfolio.nav.${currentView === 'home' ? 'about' : currentView}`) }))
  }, [currentView, t])

  return (
    <div className={`${styles.portfolio} ${enhancedContrast ? styles.enhancedContrast : ''}`}>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className={styles.skipLink}>{t('aria.skipToContent')}</a>
      {/* ARIA live region for announcements */}
      <div aria-live="polite" aria-atomic="true" className={styles.srOnly}>{announcement}</div>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navInner}>
            {/* Logo (tappable to return home) */}
            <div className={styles.logo}>
              <button
                className={styles.logoButton}
                onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }}
                aria-label={t('portfolio.logo')}
              >
                <span>{t('portfolio.logo')}</span>
              </button>
            </div>

            {/* Nav Links */}
            <ul id="primary-navigation" className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
              <li>
                <a href="#about">{t('portfolio.nav.about')}</a>
              </li>
              <li>
                <a href="#work" onClick={() => { setCurrentView('work'); setIsMenuOpen(false); }} className={currentView === 'work' ? styles.active : ''}>{t('portfolio.nav.work')}</a>
              </li>
              <li>
                <a href="#settings" onClick={() => { setCurrentView('settings'); setIsMenuOpen(false); }} className={currentView === 'settings' ? styles.active : ''}>{t('portfolio.nav.settings')}</a>
              </li>
            </ul>

            {/* Hamburger Menu */}
            <button
              className={styles.hamburger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('portfolio.nav.closeMenu') : t('portfolio.nav.openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
            >
              {isMenuOpen ? (
                <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" fill="currentColor" />
                </svg>
              ) : (
                <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M3 6h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm18 5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2zm0 7H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2z" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <main id="main-content" className={styles.main}>
        {currentView === 'home' ? (
          <div className={styles.grid}>
            <section className={styles.hero}>
              <Hero
                title={t('portfolio.hero.title')}
                subtitle={t('portfolio.hero.subtitle')}
                imageSrc={heroImg}
                imageAlt={t('portfolio.hero.imageAlt')}
                imageVariant="decorated"
                className={styles.heroLeft}
                ctaLabel={t('portfolio.hero.cta') || 'View recent work'}
                ctaHref="#work"
                onCtaClick={() => { setCurrentView('work'); setIsMenuOpen(false); }}
              />
            </section>

            {/* Content Area */}
            <section className={styles.content}>
              <div className={styles.placeholder}>
                <p>{t('portfolio.placeholder')}</p>
              </div>
            </section>
          </div>
        ) : currentView === 'work' ? (
          <div className={styles.grid}>
            <section className={styles.workSection}>
              <h2>{t('portfolio.work.title')}</h2>
              <div className={styles.workCards} role="list">
                <article role="listitem">
                  <Card
                    variant="filled"
                    direction="vertical"
                    title={t('portfolio.work.card2.title')}
                    body={t('portfolio.work.card2.body')}
                    footer={<span className={styles.cardLinkDisabled} aria-label={`${t('portfolio.work.card2.title')} - ${t('portfolio.work.card2.link')}`}>{t('portfolio.work.card2.link')}</span>}
                  />
                </article>
                <article role="listitem">
                  <Card
                    variant="filled"
                    direction="vertical"
                    title={t('portfolio.work.card3.title')}
                    body={t('portfolio.work.card3.body')}
                    footer={<span className={styles.cardLinkDisabled} aria-label={`${t('portfolio.work.card3.title')} - ${t('portfolio.work.card3.link')}`}>{t('portfolio.work.card3.link')}</span>}
                  />
                </article>
                <article role="listitem">
                  <Card
                    variant="filled"
                    direction="vertical"
                    title={t('portfolio.work.card4.title')}
                    body={t('portfolio.work.card4.body')}
                    footer={<span className={styles.cardLinkDisabled} aria-label={`${t('portfolio.work.card4.title')} - ${t('portfolio.work.card4.link')}`}>{t('portfolio.work.card4.link')}</span>}
                  />
                </article>
                <article role="listitem" className={styles.bonusCard}>
                  <Card
                    variant="filled"
                    direction="vertical"
                    title={
                      <>
                        <div className={styles.cardBadge}>
                          <Badge type="success" label={t('portfolio.work.card1.badge')} />
                        </div>
                        {t('portfolio.work.card1.title')}
                      </>
                    }
                    body={t('portfolio.work.card1.body')}
                    footer={<a href="#components" className={styles.cardLink} aria-label={`${t('portfolio.work.card1.title')} - ${t('portfolio.work.card1.link')}`}>{t('portfolio.work.card1.link')}</a>}
                  />
                </article>
              </div>
            </section>
          </div>
        ) : (
          <div className={styles.grid}>
            {/* Settings View */}
            <section className={styles.settings}>
              <h2>{t('portfolio.settings.title')}</h2>

              {/* Language Selection */}
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel}>{t('portfolio.settings.language')}</label>
                <ChipGroup
                  items={[
                    { id: 'en', label: 'English' },
                    { id: 'ja', label: '日本語' },
                    { id: 'zh-TW', label: '繁體中文' },
                  ]}
                  selected={selectedLanguage}
                  onChange={(selected) => {
                    if (selected.length > 0) {
                      i18n.changeLanguage(String(selected[0]))
                    }
                  }}
                  multiple={false}
                  className={styles.languageChips}
                />
                <p className={styles.settingHint}>{t('portfolio.settings.languageHint')}</p>
              </div>

              {/* Theme Selection */}
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel}>{t('portfolio.settings.theme')}</label>
                <ThemeSelector />
                <p className={styles.settingHint}>{t('portfolio.settings.themeHint')}</p>
              </div>

              {/* Accessibility - Enhanced Contrast */}
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel}>{t('portfolio.settings.accessibility')}</label>
                <Toggle
                  checked={enhancedContrast}
                  onChange={(v) => setEnhancedContrast(v)}
                  label={t('portfolio.settings.enhancedContrast')}
                />
                <p className={styles.settingHint}>{t('portfolio.settings.enhancedContrastHint')}</p>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Onboarding Dialog */}
      <Dialog
        open={showOnboarding}
        onClose={handleOnboardingComplete}
        closeLabel={t('dialog.close')}
        closeOnOverlayClick={false}
        closeOnEscape={false}
        title={onboardingTitle}
      >
        <div className={styles.onboarding}>
          {/* Language Selection */}
          <div className={styles.onboardingGroup}>
            <p className={styles.onboardingQuestion}>{t('portfolio.onboarding.languageStep')}</p>
            <ChipGroup
              items={[
                { id: 'en', label: 'English' },
                { id: 'ja', label: '日本語' },
                { id: 'zh-TW', label: '繁體中文' },
              ]}
              selected={onboardingLanguage}
              onChange={handleOnboardingLanguageChange}
              multiple={false}
            />
          </div>

          {/* Theme Selection */}
          <div className={styles.onboardingGroup}>
            <p className={styles.onboardingQuestion}>{t('portfolio.onboarding.themeStep')}</p>
            <ThemeSelector />
          </div>

          <p className={styles.onboardingHint}>{t('portfolio.onboarding.settingsHint')}</p>
          <div className={styles.onboardingActions}>
            <Button variant="primary" onClick={handleOnboardingComplete}>
              {t('portfolio.onboarding.letsGo')}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
