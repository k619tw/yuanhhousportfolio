import React, { useId } from 'react'
import styles from './hero.module.css'

export type HeroProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  className?: string
  /** Visual variant: 'default' or 'brand' */
  type?: 'default' | 'brand'
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
  const id = useId()
  const headingId = `hero-heading-${id}`

  const Tag: React.ElementType = headingLevel as React.ElementType
  const classes = [styles.hero, type === 'brand' ? styles.brand : '', className]
    .filter(Boolean)
    .join(' ')

  const media = imageSrc ? (
    <img src={imageSrc} alt={imageAlt} className={styles.image} loading="lazy" />
  ) : (
    <div className={styles.placeholder} aria-hidden={true} />
  )

  return (
    <section className={classes} aria-labelledby={headingId}>
      <div className={styles.text}>
        <Tag id={headingId} className={styles.title}>
          {title}
        </Tag>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.media} aria-hidden={!imageSrc}>
        {media}
      </div>
    </section>
  )
}

export default Hero
