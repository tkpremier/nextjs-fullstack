/**
 * hooks/useFocusTrap.ts
 * A11y Requirement: Keeps focus inside the modal.
 * Note: In production, consider libraries like 'react-focus-lock' for edge cases.
 */
import { useEffect, useRef } from 'react';

export const useFocusTrap = (isOpen: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. CAPTURE: Save the element that triggered the modal
    previousFocusRef.current = document.activeElement as HTMLElement;

    // 2. TRAP: Find focusable elements
    const element = containerRef.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, selectarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // 3. INITIAL FOCUS: Move focus into the modal immediately
    firstFocusableElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement?.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTab);

    // 4. RESTORE: Return focus to trigger when closed
    return () => {
      element.removeEventListener('keydown', handleTab);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);
  return containerRef;
};
