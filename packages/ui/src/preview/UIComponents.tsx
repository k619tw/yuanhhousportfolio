import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Star, ArrowRight, Plus, Info, Trash, PencilSimple, Heart, MagnifyingGlass, BracketsAngle } from '@phosphor-icons/react';
import { iconSize } from '../utils/iconSize';
import { Accordion } from '../UIComponents/Accordion/Accordion';
import { Badge } from '../UIComponents/Badge/Badge';
import { Button } from '../UIComponents/Button/Button';
import { Card } from '../UIComponents/Card/Card';
import { Chip, ChipGroup } from '../UIComponents/Chip';
import { Dialog } from '../UIComponents/Dialog/Dialog';
import { Hero } from '../UIComponents/Hero/Hero';
import { Toggle } from '../UIComponents/Toggle/Toggle';
import { Portfolio } from '../portfolio';
import { ThemeSelector } from '../portfolio/ThemeSelector';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTheme } from '../ThemeProvider';

// Get initial view from URL hash
const getViewFromHash = (): 'components' | 'portfolio' => {
  const hash = window.location.hash.slice(1);
  return hash === 'components' ? 'components' : 'portfolio';
};

export default function App() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState<'components' | 'portfolio'>(getViewFromHash);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getViewFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogVariant, setDialogVariant] = useState<'default' | 'info' | 'danger' | 'custom'>('default');
  const [toggleStates, setToggleStates] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });
  const [singleChip, setSingleChip] = useState<(string | number)[]>([]);
  const [multiChip, setMultiChip] = useState<(string | number)[]>([]);

  return (
    <div style={{ minHeight: '100vh' }}>
      {currentView === 'portfolio' ? (
        <Portfolio />
      ) : (
        <>
          {/* Sticky Header with Theme Toggle */}
          <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'var(--background-primary)',
            borderBottom: '1px solid var(--border-tertiary)',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
          }}>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: 20, 
                fontWeight: 600,
                color: 'var(--foreground-primary)'
              }}>
                {t('header.title')}
              </h1>
              <span style={{ 
                fontSize: 13, 
                color: 'var(--foreground-secondary)',
                textTransform: 'capitalize'
              }}>
                {t('header.currentlyViewing', { theme: theme.replace('-', ' ') })}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <a
                href={currentView === 'components' ? '#portfolio' : '#components'}
                style={{
                  padding: '8px 16px',
                  background: 'var(--background-brand-primary)',
                  color: 'var(--foreground-brand-on-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'opacity 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {currentView === 'components' ? 'View Portfolio' : 'View Components'}
              </a>
              <LanguageSwitcher />
              <div style={{ 
                width: 1, 
                height: 24, 
                background: 'var(--border-tertiary)' 
              }} />
              <ThemeSelector />
            </div>
          </header>

      <div style={{ padding: 24, maxWidth: 1440, margin: '0 auto' }}>
        <h1 style={{ marginBottom: 32, color: 'var(--foreground-primary)' }}>{t('sections.componentLibrary')}</h1>

      

      {/* Accordion Component */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600, color: 'var(--foreground-primary)' }}>{t('sections.accordion')}</h2>
        <Accordion
          items={[
            { 
              id: '1', 
              title: t('accordion.q1.title'), 
              content: (
                <p>
                  {t('accordion.q1.content')}
                </p>
              )
            },
            { 
              id: '2', 
              title: t('accordion.q2.title'), 
              content: (
                <p>
                  {t('accordion.q2.content')}
                </p>
              )
            },
            { 
              id: '3', 
              title: t('accordion.q3.title'), 
              content: (
                <p>
                  {t('accordion.q3.content')}
                </p>
              )
            },
          ]}
        />
      </section>

      {/* Hero Component (default + brand) - stacked */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600, color: 'var(--foreground-primary)' }}>{t('sections.hero')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: 'var(--foreground-secondary)' }}>{t('preview.hero.defaultLabel')}</h3>
            <Hero
              title={t('portfolio.hero.title')}
              subtitle={t('portfolio.hero.subtitle')}
              imageSrc="https://k619tw.github.io/yuanhhou/about/img/profile.webp"
              imageAlt={t('portfolio.hero.imageAlt')}
              headingLevel="h3"
            />
          </div>
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 16, color: 'var(--foreground-secondary)' }}>{t('preview.hero.brandLabel')}</h3>
            <Hero
              title={t('portfolio.hero.title')}
              subtitle={t('portfolio.hero.subtitle')}
              imageSrc="https://k619tw.github.io/yuanhhou/about/img/profile.webp"
              imageAlt={t('portfolio.hero.imageAlt')}
              headingLevel="h3"
              type="brand"
            />
          </div>
        </div>
      </section>

      {/* Badge Component */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600, color: 'var(--foreground-primary)' }}>{t('sections.badge')}</h2>
        
        {/* All Types - Small Size */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.small')} — {t('sizes.allTypes')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Badge label={t('badges.neutral')} size="small" type="neutral" />
            <Badge label={t('badges.danger')} size="small" type="danger" />
            <Badge label={t('badges.warning')} size="small" type="warning" />
            <Badge label={t('badges.success')} size="small" type="success" />
            <Badge label={t('badges.promote')} size="small" type="promote" />
          </div>
        </div>

        {/* All Types - Large Size */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.large')} — {t('sizes.allTypes')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Badge label={t('badges.neutral')} size="large" type="neutral" />
            <Badge label={t('badges.danger')} size="large" type="danger" />
            <Badge label={t('badges.warning')} size="large" type="warning" />
            <Badge label={t('badges.success')} size="large" type="success" />
            <Badge label={t('badges.promote')} size="large" type="promote" />
          </div>
        </div>

        {/* With Icons - Small */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.small')} — {t('sizes.withIcons')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Badge label={t('badges.neutral')} size="small" type="neutral" icon={<BracketsAngle style={iconSize.sm} />} />
            <Badge label={t('badges.danger')} size="small" type="danger" icon={<BracketsAngle style={iconSize.sm} />} />
            <Badge label={t('badges.warning')} size="small" type="warning" icon={<BracketsAngle style={iconSize.sm} />} />
            <Badge label={t('badges.success')} size="small" type="success" icon={<BracketsAngle style={iconSize.sm} />} />
            <Badge label={t('badges.promote')} size="small" type="promote" icon={<BracketsAngle style={iconSize.sm} />} />
          </div>
        </div>

        {/* With Icons - Large */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.large')} — {t('sizes.withIcons')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Badge label={t('badges.neutral')} size="large" type="neutral" icon={<BracketsAngle style={iconSize.sm} />} />
            <Badge label={t('badges.danger')} size="large" type="danger" icon={<BracketsAngle style={iconSize.sm} />} />
            <Badge label={t('badges.warning')} size="large" type="warning" icon={<BracketsAngle style={iconSize.sm} />} />
            <Badge label={t('badges.success')} size="large" type="success" icon={<BracketsAngle style={iconSize.sm} />} />
            <Badge label={t('badges.promote')} size="large" type="promote" icon={<BracketsAngle style={iconSize.sm} />} />
          </div>
        </div>
      </section>

      {/* Button Component */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600, color: 'var(--foreground-primary)' }}>{t('sections.button')}</h2>
        
        {/* Large Size - All Variants */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.large')} — {t('variants.allVariants')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="large">{t('buttons.primary')}</Button>
            <Button variant="secondary" size="large">{t('buttons.secondary')}</Button>
            <Button variant="tertiary" size="large">{t('buttons.tertiary')}</Button>
            <Button variant="alert" size="large">{t('buttons.alert')}</Button>
          </div>
        </div>

        {/* Small Size - All Variants */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.small')} — {t('variants.allVariants')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="small">{t('buttons.primary')}</Button>
            <Button variant="secondary" size="small">{t('buttons.secondary')}</Button>
            <Button variant="tertiary" size="small">{t('buttons.tertiary')}</Button>
            <Button variant="alert" size="small">{t('buttons.alert')}</Button>
          </div>
        </div>

        {/* With Start Icons - Large */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.large')} — {t('variants.withStartIcons')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="large" startIcon={<Plus style={iconSize.md} weight="bold" />}>{t('buttons.createNew')}</Button>
            <Button variant="secondary" size="large" startIcon={<CheckCircle style={iconSize.sm} weight="bold" />}>{t('buttons.saveChanges')}</Button>
            <Button variant="tertiary" size="large" startIcon={<Star style={iconSize.sm} weight="bold" />}>{t('buttons.addFavorite')}</Button>
            <Button variant="alert" size="large" startIcon={<CheckCircle style={iconSize.sm} weight="bold" />}>{t('buttons.deleteItem')}</Button>
          </div>
        </div>

        {/* With End Icons - Large */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.large')} — {t('variants.withEndIcons')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="large" endIcon={<ArrowRight style={iconSize.md} weight="bold" />}>{t('buttons.continue')}</Button>
            <Button variant="secondary" size="large" endIcon={<ArrowRight style={iconSize.md} weight="bold" />}>{t('buttons.learnMore')}</Button>
            <Button variant="tertiary" size="large" endIcon={<ArrowRight style={iconSize.md} weight="bold" />}>{t('buttons.viewDetails')}</Button>
            <Button variant="alert" size="large" endIcon={<ArrowRight style={iconSize.md} weight="bold" />}>{t('buttons.proceedWithCaution')}</Button>
          </div>
        </div>

        {/* With Start Icons - Small */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.small')} — {t('variants.withStartIcons')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="small" startIcon={<Plus style={iconSize.md} weight="bold" />}>{t('buttons.add')}</Button>
            <Button variant="secondary" size="small" startIcon={<CheckCircle style={iconSize.sm} weight="bold" />}>{t('buttons.save')}</Button>
            <Button variant="tertiary" size="small" startIcon={<Star style={iconSize.sm} weight="bold" />}>{t('buttons.favorite')}</Button>
            <Button variant="alert" size="small" startIcon={<CheckCircle style={iconSize.sm} weight="bold" />}>{t('buttons.delete')}</Button>
          </div>
        </div>

        {/* With End Icons - Small */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('sizes.small')} — {t('variants.withEndIcons')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="small" endIcon={<ArrowRight style={iconSize.md} weight="bold" />}>{t('buttons.next')}</Button>
            <Button variant="secondary" size="small" endIcon={<ArrowRight style={iconSize.md} weight="bold" />}>{t('buttons.more')}</Button>
            <Button variant="tertiary" size="small" endIcon={<ArrowRight style={iconSize.md} weight="bold" />}>{t('buttons.details')}</Button>
            <Button variant="alert" size="small" endIcon={<ArrowRight style={iconSize.md} weight="bold" />}>{t('buttons.remove')}</Button>
          </div>
        </div>

        {/* Disabled States */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('variants.disabledStates')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="large" disabled>{t('buttons.primaryDisabled')}</Button>
            <Button variant="secondary" size="large" disabled>{t('buttons.secondaryDisabled')}</Button>
            <Button variant="tertiary" size="large" disabled>{t('buttons.tertiaryDisabled')}</Button>
            <Button variant="alert" size="large" disabled>{t('buttons.alertDisabled')}</Button>
          </div>
        </div>

        {/* Button vs Link */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('preview.buttonVsLink.title')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" size="large" onClick={() => alert(t('preview.buttonVsLink.alert'))}>{t('preview.buttonVsLink.button')}</Button>
            <Button variant="primary" size="large" href="https://github.com" target="_blank" rel="noopener noreferrer">{t('preview.buttonVsLink.link')}</Button>
            <Button variant="secondary" size="large" onClick={() => alert(t('preview.buttonVsLink.alert'))}>{t('preview.buttonVsLink.secondaryButton')}</Button>
            <Button variant="secondary" size="large" href="#card-section">{t('preview.buttonVsLink.secondaryLink')}</Button>
          </div>
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--foreground-tertiary)' }}>
            💡 {t('preview.buttonVsLink.tip')}
          </p>
        </div>

        {/* Icon-Only Buttons */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('preview.iconOnly.title')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
            <Button iconOnly icon={<Plus style={iconSize.lg} weight="bold" />} variant="primary" size="large" aria-label={t('preview.iconLabels.addItem')} />
            <Button iconOnly icon={<Heart style={iconSize.lg} weight="bold" />} variant="secondary" size="large" aria-label={t('preview.iconLabels.addFavorite')} />
            <Button iconOnly icon={<PencilSimple style={iconSize.lg} weight="bold" />} variant="tertiary" size="large" aria-label={t('preview.iconLabels.edit')} />
            <Button iconOnly icon={<Trash style={iconSize.lg} weight="bold" />} variant="alert" size="large" aria-label={t('preview.iconLabels.delete')} />
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button iconOnly icon={<Plus style={iconSize.md} weight="bold" />} variant="primary" size="small" aria-label={t('preview.iconLabels.addItem')} />
            <Button iconOnly icon={<Heart style={iconSize.md} weight="bold" />} variant="secondary" size="small" aria-label={t('preview.iconLabels.addFavorite')} />
            <Button iconOnly icon={<MagnifyingGlass style={iconSize.md} weight="bold" />} variant="tertiary" size="small" aria-label={t('preview.iconLabels.search')} />
            <Button iconOnly icon={<Trash style={iconSize.md} weight="bold" />} variant="alert" size="small" aria-label={t('preview.iconLabels.delete')} />
          </div>
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--foreground-tertiary)' }}>
            💡 {t('preview.iconOnly.tip')}
          </p>
        </div>
      </section>

      {/* Card Component */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600, color: 'var(--foreground-primary)' }}>{t('sections.card')}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Row 1: Icon + Horizontal */}
          <div>
            <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('card.iconHorizontal')}</h3>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {/* Default (transparent) */}
              <Card
                title={t('card.title')}
                body={t('card.body')}
                asset={<Info style={iconSize.xl} />}
                assetType="icon"
                direction="horizontal"
                variant="transparent"
                footer={<Button variant="primary" size="small">{t('buttons.primary')}</Button>}
              />
              {/* Filled */}
              <Card
                title={t('card.title')}
                body={t('card.body')}
                asset={<Info style={iconSize.xl} />}
                assetType="icon"
                direction="horizontal"
                variant="filled"
                footer={<Button variant="primary" size="small">{t('buttons.primary')}</Button>}
              />
            </div>
          </div>

          {/* Row 2: Icon + Vertical */}
          <div>
            <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('card.iconVertical')}</h3>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {/* Default (transparent) */}
              <Card
                title={t('card.title')}
                body={t('card.body')}
                asset={<Info style={iconSize.xl} />}
                assetType="icon"
                direction="vertical"
                variant="transparent"
                footer={<Button variant="primary" size="small">{t('buttons.primary')}</Button>}
              />
              {/* Filled */}
              <Card
                title={t('card.title')}
                body={t('card.body')}
                asset={<Info style={iconSize.xl} />}
                assetType="icon"
                direction="vertical"
                variant="filled"
                footer={<Button variant="primary" size="small">{t('buttons.primary')}</Button>}
              />
            </div>
          </div>

          {/* Row 3: Image + Horizontal */}
          <div>
            <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('card.imageHorizontal')}</h3>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {/* Default (transparent) */}
              <Card
                    title={t('card.title')}
                    body={t('card.body')}
                    asset={<img src="https://k619tw.github.io/yuanhhou/about/img/profile.webp" alt="placeholder" />}
                    assetType="image"
                    direction="horizontal"
                    variant="transparent"
                    footer={<Button variant="primary" size="small">{t('buttons.primary')}</Button>}
                  />
                  {/* Stroke (background-secondary) */}
                  <Card
                    title={t('card.title')}
                    body={t('card.body')}
                    asset={<img src="https://k619tw.github.io/yuanhhou/about/img/profile.webp" alt="placeholder" />}
                    assetType="image"
                    direction="horizontal"
                    variant="filled"
                    footer={<Button variant="primary" size="small">{t('buttons.primary')}</Button>}
                  />
                </div>
              </div>

              {/* Row 4: Image + Vertical */}
              <div>
                <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('card.imageVertical')}</h3>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {/* Default (transparent) */}
                  <Card
                    title={t('card.title')}
                    body={t('card.body')}
                    asset={<img src="https://k619tw.github.io/yuanhhou/about/img/profile.webp" alt="placeholder" />}
                    assetType="image"
                    direction="vertical"
                    variant="transparent"
                    footer={<Button variant="primary" size="small">{t('buttons.primary')}</Button>}
                  />
                  {/* Stroke (background-secondary) */}
                  <Card
                    title={t('card.title')}
                    body={t('card.body')}
                    asset={<img src="https://k619tw.github.io/yuanhhou/about/img/profile.webp" alt="placeholder" />}
                    assetType="image"
                    direction="vertical"
                    variant="filled"
                    footer={<Button variant="primary" size="small">{t('buttons.primary')}</Button>}
                  />
                </div>
              </div>
            </div>
      </section>
      {/* Dialog Component */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600, color: 'var(--foreground-primary)' }}>{t('sections.dialog')}</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Button 
            variant="primary" 
            onClick={() => { setDialogVariant('default'); setDialogOpen(true); }}
          >
            {t('dialog.openDefault')}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => { setDialogVariant('info'); setDialogOpen(true); }}
          >
            {t('dialog.openInfo')}
          </Button>
          <Button 
            variant="alert" 
            onClick={() => { setDialogVariant('danger'); setDialogOpen(true); }}
          >
            {t('dialog.openDanger')}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => { setDialogVariant('custom'); setDialogOpen(true); }}
          >
            {t('dialog.openCustom')}
          </Button>
        </div>

        {/* Default Dialog */}
        {dialogVariant === 'default' && (
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title={t('dialog.defaultTitle')}
            description={t('dialog.defaultBody')}
            actions={
              <>
                <Button variant="secondary" onClick={() => setDialogOpen(false)}>{t('dialog.cancel')}</Button>
                <Button variant="primary" onClick={() => setDialogOpen(false)}>{t('dialog.confirm')}</Button>
              </>
            }
          />
        )}

        {/* Info Dialog */}
        {dialogVariant === 'info' && (
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title={t('dialog.infoTitle')}
            description={t('dialog.infoBody')}
            actions={
              <Button variant="primary" onClick={() => setDialogOpen(false)}>{t('dialog.gotIt')}</Button>
            }
          />
        )}

        {/* Danger Dialog */}
        {dialogVariant === 'danger' && (
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title={t('dialog.dangerTitle')}
            description={t('dialog.dangerBody')}
            actions={
              <>
                <Button variant="tertiary" onClick={() => setDialogOpen(false)}>{t('dialog.cancel')}</Button>
                <Button variant="alert" onClick={() => setDialogOpen(false)}>{t('dialog.delete')}</Button>
              </>
            }
          />
        )}

        {/* Custom Content Dialog */}
        {dialogVariant === 'custom' && (
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title={t('dialog.customTitle')}
            actions={
              <Button variant="primary" onClick={() => setDialogOpen(false)}>{t('dialog.cancel')}</Button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ margin: 0, color: 'var(--foreground-secondary)' }}>
                {t('dialog.customBody')}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Badge label="React" type="promote" />
                <Badge label="TypeScript" type="success" />
                <Badge label="CSS Modules" type="warning" />
              </div>
              <div style={{ 
                padding: 16, 
                background: 'var(--background-secondary)', 
                borderRadius: 'var(--radius-card)',
                fontSize: 14,
                color: 'var(--foreground-secondary)'
              }}>
                {t('header.currentlyViewing', { theme: theme.replace('-', ' ') })}
              </div>
            </div>
          </Dialog>
        )}
      </section>

      {/* Chip Component */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600, color: 'var(--foreground-primary)' }}>{t('sections.chip')}</h2>

        {/* Individual Chip States */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('chip.states')}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Chip label={t('chip.unselected')} selected={false} showIcon={false} />
            <Chip label={t('chip.selected')} selected={true} showIcon={false} />
          </div>
        </div>

        {/* Single Selection Group */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('chip.singleSelection')}</h3>
          <ChipGroup
            items={[
              { id: 'option1', label: t('chip.option1') },
              { id: 'option2', label: t('chip.option2') },
              { id: 'option3', label: t('chip.option3') },
              { id: 'option4', label: t('chip.option4') },
            ]}
            selected={singleChip}
            onChange={setSingleChip}
            multiple={false}
          />
        </div>

        {/* Multiple Selection Group */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('chip.multipleSelection')}</h3>
          <ChipGroup
            items={[
              { id: 'filter1', label: t('chip.filter1') },
              { id: 'filter2', label: t('chip.filter2') },
              { id: 'filter3', label: t('chip.filter3') },
              { id: 'filter4', label: t('chip.filter4') },
              { id: 'filter5', label: t('chip.filter5') },
            ]}
            selected={multiChip}
            onChange={setMultiChip}
            multiple={true}
          />
        </div>
      </section>

      {/* Toggle Component */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600, color: 'var(--foreground-primary)' }}>{t('sections.toggle')}</h2>
        
        {/* States */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('variants.disabledStates')}</h3>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <Toggle label={t('toggle.off')} />
            <Toggle label={t('toggle.on')} defaultChecked />
            <Toggle label={`${t('buttons.disabled')} ${t('toggle.off')}`} disabled />
            <Toggle label={`${t('buttons.disabled')} ${t('toggle.on')}`} disabled defaultChecked />
          </div>
        </div>

        {/* Interactive Example */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 500, color: 'var(--foreground-secondary)' }}>{t('toggle.title')}</h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 16,
            background: 'var(--background-secondary)',
            padding: 24,
            borderRadius: 'var(--radius-card)',
            maxWidth: 400
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--foreground-primary)' }}>{t('toggle.enableNotifications')}</span>
              <Toggle 
                checked={toggleStates.notifications}
                onChange={(checked) => setToggleStates(s => ({ ...s, notifications: checked }))}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--foreground-primary)' }}>{t('toggle.darkMode')}</span>
              <Toggle 
                checked={toggleStates.darkMode}
                onChange={(checked) => setToggleStates(s => ({ ...s, darkMode: checked }))}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--foreground-primary)' }}>{t('toggle.autoSave')}</span>
              <Toggle 
                checked={toggleStates.autoSave}
                onChange={(checked) => setToggleStates(s => ({ ...s, autoSave: checked }))}
              />
            </div>
          </div>
        </div>
      </section>
      </div>
        </>
      )}
    </div>
  );
}