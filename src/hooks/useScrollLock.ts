/**
 * src/hooks/useScrollLock.ts
 * UX Requirement: Prevents the background page from scrolling while modal is open.
 */

import { useLayoutEffect } from 'react';

export const useScrollLock = (isOpen: boolean) => {
  useLayoutEffect(() => {
    if (isOpen) {
      return;
    }

    // save original overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Lock scroll;
    document.body.style.overflow = 'hidden';

    //Cleanup: return function to restore original overflow
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
};
