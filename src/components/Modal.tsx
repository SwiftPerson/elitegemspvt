import React from 'react';
import { FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.3 }}
  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl max-w-4xl w-full relative"
  onClick={(e) => e.stopPropagation()}
>
        <button 
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <FiX size={28} />
        </button>
        {children}
        </motion.div>
        </div>
  );
};

export default Modal;
