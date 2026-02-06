import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { List, X } from '@phosphor-icons/react'
import { ChipGroup } from '../UIComponents/Chip'
import { Dialog } from '../UIComponents/Dialog/Dialog'
import { Button } from '../UIComponents/Button/Button'
import { Badge } from '../UIComponents/Badge/Badge'
import { ThemeSelector } from './ThemeSelector'
import { Hero } from '../UIComponents/Hero/Hero'
import { Toggle } from '../UIComponents/Toggle/Toggle'
import { Card } from '../UIComponents/Card/Card'
import { InterestingFacts } from '../UIComponents/InterestingFacts'
import { Footer } from '../UIComponents/Footer'
import { About } from '../UIComponents/About'
import { useTheme, type Theme } from '../ThemeProvider'
import styles from './portfolio.module.css'
import heroImg from '../assets/hero.png'

import videoAen from '../assets/demo-product-a-en.mp4'
import videoAja from '../assets/demo-product-a-ja.mp4'
import videoAzh from '../assets/demo-product-a-zh-TW.mp4'
import videoBen from '../assets/demo-product-b-en.mp4'
import videoBja from '../assets/demo-product-b-ja.mp4'
import videoBzh from '../assets/demo-product-b-zh-TW.mp4'
import videoCen from '../assets/demo-product-c-en.mp4'
import videoCja from '../assets/demo-product-c-ja.mp4'
import videoCzh from '../assets/demo-product-c-zh-TW.mp4'
import posterAen from '../assets/poster-product-a-en.png'
import posterAja from '../assets/poster-product-a-ja.png'
import posterAzh from '../assets/poster-product-a-zh-TW.png'
import posterBen from '../assets/poster-product-b-en.png'
import posterBja from '../assets/poster-product-b-ja.png'
import posterBzh from '../assets/poster-product-b-zh-TW.png'
import posterCen from '../assets/poster-product-c-en.png'
import posterCja from '../assets/poster-product-c-ja.png'
import posterCzh from '../assets/poster-product-c-zh-TW.png'
import basketballVideo from '../assets/basketball.mp4'

type HeroMedia = { video: string; poster: string }
const heroVideos: Record<Theme, Record<string, HeroMedia>> = {
  'product-a': {
    en: { video: videoAen, poster: posterAen },
    ja: { video: videoAja, poster: posterAja },
    'zh-TW': { video: videoAzh, poster: posterAzh },
  },
  'product-b': {
    en: { video: videoBen, poster: posterBen },
    ja: { video: videoBja, poster: posterBja },
    'zh-TW': { video: videoBzh, poster: posterBzh },
  },
  'product-c': {
    en: { video: videoCen, poster: posterCen },
    ja: { video: videoCja, poster: posterCja },
    'zh-TW': { video: videoCzh, poster: posterCzh },
  },
}

const ONBOARDING_KEY = 'portfolio-onboarding-complete'

export const Portfolio: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'work' | 'settings'>('home')
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

  const [enhancedContrast, setEnhancedContrast] = useState(false)

  // Reduce motion — persisted preference + synced to DOM attribute
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('yuanhhou-reduce-motion')
      if (stored === 'true') return true
      // Fall back to OS-level preference
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem('yuanhhou-reduce-motion', String(reduceMotion))
    document.documentElement.setAttribute('data-reduce-motion', String(reduceMotion))
  }, [reduceMotion])

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

  // Basketball video dialog
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoDialogClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setShowVideoDialog(false)
  }, [])

  // Announcements for screen readers
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    // Announce language changes
    setAnnouncement(t('aria.languageChanged', { lang: i18n.language }))
  }, [i18n.language, t])

  useEffect(() => {
    // Announce view changes
    const viewName = currentView === 'home' ? 'home' : currentView
    setAnnouncement(t('aria.viewChanged', { view: t(`portfolio.nav.${viewName}`) }))
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
              {/* Theme Selector for mobile menu - at top */}
              <li className={styles.mobileThemeSelector}>
                <ThemeSelector />
              </li>
              <li>
                <a href="#about" onClick={() => { setCurrentView('about'); setIsMenuOpen(false); }} aria-current={currentView === 'about' ? 'page' : undefined} className={currentView === 'about' ? styles.active : ''}>{t('portfolio.nav.about')}</a>
              </li>
              <li>
                <a href="#work" onClick={() => { setCurrentView('work'); setIsMenuOpen(false); }} aria-current={currentView === 'work' ? 'page' : undefined} className={currentView === 'work' ? styles.active : ''}>{t('portfolio.nav.work')}</a>
              </li>
              <li>
                <a href="#settings" onClick={() => { setCurrentView('settings'); setIsMenuOpen(false); }} aria-current={currentView === 'settings' ? 'page' : undefined} className={currentView === 'settings' ? styles.active : ''}>{t('portfolio.nav.settings')}</a>
              </li>
            </ul>

            {/* Theme Selector for desktop - right side */}
            <div className={styles.desktopThemeSelector}>
              <ThemeSelector />
            </div>

            {/* Hamburger Menu */}
            <button
              className={styles.hamburger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('portfolio.nav.closeMenu') : t('portfolio.nav.openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
            >
              {isMenuOpen ? (
                <X size={24} weight="bold" aria-hidden="true" />
              ) : (
                <List size={24} weight="bold" aria-hidden="true" />
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
                videoSrc={(heroVideos[theme][i18n.language] || heroVideos[theme].en).video}
                videoPoster={(heroVideos[theme][i18n.language] || heroVideos[theme].en).poster}
                videoAutoplay={!reduceMotion}
                imageSrc={heroImg}
                imageAlt={t('portfolio.hero.imageAlt')}
                className={styles.heroLeft}
                ctaLabel={t('portfolio.hero.cta') || 'View recent work'}
                ctaHref="#work"
                onCtaClick={() => { setCurrentView('work'); setIsMenuOpen(false); }}
              />
            </section>

            {/* Interesting Facts Section */}
            <InterestingFacts onSportyCTAClick={() => setShowVideoDialog(true)} />
          </div>
        ) : currentView === 'about' ? (
          <div className={styles.grid}>
            <About />
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
                <span id="language-label" className={styles.settingLabel}>{t('portfolio.settings.language')}</span>
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
                  aria-labelledby="language-label"
                />
                <p className={styles.settingHint}>{t('portfolio.settings.languageHint')}</p>
              </div>

              {/* Theme Selection */}
              <div className={styles.settingGroup}>
                <span id="theme-label" className={styles.settingLabel}>{t('portfolio.settings.theme')}</span>
                <ThemeSelector aria-labelledby="theme-label" />
                <p className={styles.settingHint}>{t('portfolio.settings.themeHint')}</p>
              </div>

              {/* Accessibility */}
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel}>{t('portfolio.settings.accessibility')}</label>
                <div className={styles.toggleItem}>
                  <Toggle
                    checked={enhancedContrast}
                    onChange={(v) => setEnhancedContrast(v)}
                    label={t('portfolio.settings.enhancedContrast')}
                  />
                  <p className={styles.settingHint}>{t('portfolio.settings.enhancedContrastHint')}</p>
                </div>
                <div className={styles.toggleItem}>
                  <Toggle
                    checked={reduceMotion}
                    onChange={(v) => setReduceMotion(v)}
                    label={t('portfolio.settings.reduceMotion')}
                  />
                  <p className={styles.settingHint}>{t('portfolio.settings.reduceMotionHint')}</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

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

      {/* Basketball Video Dialog */}
      <Dialog
        open={showVideoDialog}
        onClose={handleVideoDialogClose}
        closeLabel={t('dialog.close')}
        title={t('interestingFacts.sporty.title')}
        className={styles.videoDialog}
      >
        <video
          ref={videoRef}
          src={basketballVideo}
          controls
          autoPlay
          playsInline
          className={styles.videoPlayer}
          aria-label={t('interestingFacts.sporty.cta')}
        />
      </Dialog>
    </div>
  )
}
