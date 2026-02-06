import React, { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import styles from './accordion.module.css'

export interface AccordionItem {
  id: string
  /** Main title of the accordion item */
  title: React.ReactNode
  /** Content shown when the accordion is expanded */
  content: React.ReactNode
  /** Optional subtitle shown below title (e.g., date, location) */
  subtitle?: React.ReactNode
  /** Optional icon or image shown at the start of the accordion trigger */
  icon?: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  /** Allow multiple items to be open at once (default: false) */
  allowMultiple?: boolean
  /** IDs of items that should be open by default */
  defaultOpen?: string[]
  /** Optional class name for the container */
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen))

  const handleToggle = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) {
          next.clear()
        }
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id)
        return (
          <div className={styles.item} key={item.id}>
            <button
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              onClick={() => handleToggle(item.id)}
              type="button"
            >
              {item.icon && (
                <span className={styles.itemIcon} aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <div className={styles.titleWrapper}>
                <span className={styles.title}>{item.title}</span>
                {item.subtitle && <span className={styles.subtitle}>{item.subtitle}</span>}
              </div>
              <span
                className={styles.caretIcon}
                aria-hidden="true"
                style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              >
                <CaretDown weight="bold" size={20} />
              </span>
            </button>
            <div
              id={`panel-${item.id}`}
              className={styles.panel}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
