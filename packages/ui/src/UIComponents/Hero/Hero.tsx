import React, { useId } from 'react'
import styles from './hero.module.css'

export type HeroProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  className?: string
  /** Visual variant: 'default' (current) or 'brand' (uses brand background/on-secondary text) */
  type?: 'default' | 'brand'
  /** CTA removed — title/subtitle only. Remove these props from callers if safe. */
  /** Heading level for accessibility (h1..h6) */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = 'Hero image',
  className,
  type = 'default',
  headingLevel = 'h1',
}) => {
  const Heading = headingLevel as any
  const variantClass = type === 'brand' ? styles.brand : ''
  const id = useId()
  const headingId = `hero-heading-${id}`

  return (
    <section className={`${styles.hero} ${variantClass} ${className ?? ''}`} aria-labelledby={headingId}>
      <div className={styles.text}>
        <Heading id={headingId} className={styles.title}>{title}</Heading>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {/* CTA removed by request; keep title/subtitle only */}
      </div>

      <div className={styles.media} aria-hidden={!imageSrc}>
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.placeholder} aria-hidden={true} />
        )}
      </div>
    </section>
  )
}

export default Hero
