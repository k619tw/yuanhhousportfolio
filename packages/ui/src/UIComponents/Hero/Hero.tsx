import React, { useId } from 'react'
import styles from './hero.module.css'
import Button from '../Button/Button'
import { ArrowRight } from '@phosphor-icons/react'
import { iconSize } from '../../utils/iconSize'

export type HeroProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  className?: string
  /** Image visual variant: 'default', 'circle', or 'decorated' (with staircase squares) */
  imageVariant?: 'default' | 'circle' | 'decorated'
  /** Visual variant: 'default' or 'brand' */
  type?: 'default' | 'brand'
  /** Heading level for accessibility (h1..h6) */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** Optional call-to-action label */
  ctaLabel?: React.ReactNode
  /** Optional call-to-action link (renders an anchor) */
  ctaHref?: string
  /** Optional click handler for CTA (if not using href) */
  onCtaClick?: React.MouseEventHandler
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  className,
  imageVariant = 'default',
  type = 'default',
  headingLevel = 'h1',
  ctaLabel,
  ctaHref,
  onCtaClick,
}) => {
  const id = useId()
  const headingId = `hero-heading-${id}`
  // animation on scroll removed — static decorative squares only

  const Tag: React.ElementType = headingLevel as React.ElementType
  const classes = [styles.hero, type === 'brand' ? styles.brand : '', className]
    .filter(Boolean)
    .join(' ')

  // Staircase squares component for decorated variant
  const StaircaseSquares = ({ position }: { position: 'topLeft' | 'bottomRight' }) => {
    const isTopLeft = position === 'topLeft'
    // Top-left: 4-3-2-1 pattern, Bottom-right: 1-2-3-4 pattern
    const rows = isTopLeft ? [4, 3, 2, 1] : [1, 2, 3, 4]

    return (
      <div
        className={isTopLeft ? styles.staircaseTopLeft : styles.staircaseBottomRight}
        aria-hidden="true"
      >
        {rows.map((count, rowIndex) => (
          <div key={rowIndex} className={styles.squareRow}>
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className={styles.square} />
            ))}
          </div>
        ))}
      </div>
    )
  }

  const media = imageSrc ? (
    imageVariant === 'circle' ? (
      <div className={styles.circle}>
        <img src={imageSrc} alt={imageAlt} className={styles.circleImage} loading="lazy" aria-hidden={imageAlt === ''} />
      </div>
    ) : imageVariant === 'decorated' ? (
      <div className={styles.decoratedContainer}>
        <StaircaseSquares position="topLeft" />
        <div className={styles.imageWrapper}>
          <div className={styles.imageOverlay} aria-hidden="true" />
          <img src={imageSrc} alt={imageAlt} className={styles.decoratedImage} loading="lazy" aria-hidden={imageAlt === ''} />
        </div>
        <StaircaseSquares position="bottomRight" />
      </div>
    ) : (
      <img src={imageSrc} alt={imageAlt} className={styles.image} loading="lazy" aria-hidden={imageAlt === ''} />
    )
  ) : (
    <div className={styles.placeholder} aria-hidden={true} />
  )

  return (
    <section className={classes} aria-labelledby={headingId} role="region">
      <div className={styles.text}>
        <Tag id={headingId} className={styles.title}>
          {title}
        </Tag>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {ctaLabel && (
          <div className={styles.actions}>
            <Button variant="primary" size="small" href={ctaHref} onClick={onCtaClick as any} endIcon={<ArrowRight style={iconSize.md} weight="bold" />}>
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>

      <div className={styles.media} aria-hidden={!imageSrc}>
        {media}
      </div>
    </section>
  )
}

export default Hero
