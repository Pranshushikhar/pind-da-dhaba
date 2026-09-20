import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { scaleIn } from '../../animations/variants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md"
          />

          {/* Dialog Body */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`relative w-full ${maxWidth} bg-charcoal-900 border border-charcoal-700 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-charcoal-700/80">
              {title && (
                <h3 className="font-serif text-2xl text-cream-100 font-semibold tracking-wide">
                  {title}
                </h3>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1.5 text-cream-400 hover:text-white hover:bg-charcoal-800 transition-colors ml-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
