'use client';
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";
import styles from '@/styles/Modal.module.css';
import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children, title }: PropsWithChildren<{ isOpen: boolean; onClose: () => void; title: string }>) => {
  // 1. Hook Integration
  useScrollLock(isOpen);
  const modalRef = useFocusTrap(isOpen);

  // 2. UX: Escape Key Handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    };

    return () => {
      window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // 3. Early Return: Don't render if not open
  if (!isOpen) return null;

  // 4. The Portal: Render explicitly into the body
  return createPortal(
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.Modal} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <header className={styles.ModalHeader}>
          <h2 id="modal-title">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal" // A11y: Icon-only buttons need labels
          >
            ✕
          </button>
        </header>
        <div className={styles.ModalContent}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;