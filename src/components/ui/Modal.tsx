// components/Modal.tsx
"use client";

import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg pt-6 pb-8 px-6 max-w-md w-full shadow-lg border-t-4 border-indigo-600 font-sans text-gray-900 dark:text-gray-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-indigo-600 dark:text-indigo-400 font-semibold text-lg hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center space-y-4 mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}
