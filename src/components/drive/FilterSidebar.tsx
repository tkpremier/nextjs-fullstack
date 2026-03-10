'use client';
import { useFilterSidebar } from '@/hooks/useFilterSidebar';
import styles from '@/styles/filterSidebar.module.scss';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const FilterSidebar = () => {
  const { isOpen, toggleSidebar, closeSidebar, content, activeFilterCount } = useFilterSidebar();

  const [isMounted, mount] = useState(false);

  // Only mount on client side
  useEffect(() => {
    if (!isMounted) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      mount(true);
    }
    return () => {
      mount(false);
    }
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {

    if (!document || !isOpen) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };

  }, [isOpen]);

  if (isMounted) {

    // Don't render until mounted (prevents hydration mismatch

    return createPortal(
      <>
        {/* Floating Action Button */}
        <button
          type="button"
          className={styles.fabButton}
          onClick={toggleSidebar}
          aria-label="Toggle filters"
          title="Toggle filters"
        >
          <span className={styles.fabIcon}>🔍</span>
          {activeFilterCount > 0 && <span className={styles.fabBadge}>{activeFilterCount}</span>}
        </button>

        {/* Backdrop */}
        {isOpen && <div className={styles.backdrop} onClick={closeSidebar} aria-hidden="true" />}

        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Filters & Sort</h2>
            <button type="button" className={styles.closeButton} onClick={closeSidebar} aria-label="Close filters">
              ✕
            </button>
          </div>
          <div className={styles.sidebarContent}>{content}</div>
        </aside>
      </>,
      document.body
    );
  }
  return null;
};