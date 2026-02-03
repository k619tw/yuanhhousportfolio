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
  /** Image visual variant: 'default' or 'circle' */
  imageVariant?: 'default' | 'circle'
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

  const Tag: React.ElementType = headingLevel as React.ElementType
  const classes = [styles.hero, type === 'brand' ? styles.brand : '', className]
    .filter(Boolean)
    .join(' ')

  const media = imageSrc ? (
    imageVariant === 'circle' ? (
      <div className={styles.circle}>
        <img src={imageSrc} alt={imageAlt} className={styles.circleImage} loading="lazy" role="img" />
      </div>
    ) : (
      <img src={imageSrc} alt={imageAlt} className={styles.image} loading="lazy" role="img" />
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
