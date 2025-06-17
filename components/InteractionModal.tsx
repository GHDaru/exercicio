import React, { useEffect } from 'react';
import { WorkflowPhase } from '../types';
import AiInteraction from './AiInteraction'; // Corrected/Verified import path
import { XMarkIcon } from './icons';

interface InteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  phase: WorkflowPhase;
  onSave: (phaseId: string, userInput: string, aiOutput: string, markAsCompleted: boolean) => void;
}

const InteractionModal: React.FC<InteractionModalProps> = ({ isOpen, onClose, phase, onSave }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSaveAndClose = (userInput: string, aiOutput: string, markAsCompleted: boolean) => {
    onSave(phase.id, userInput, aiOutput, markAsCompleted);
    onClose();
  };
  
  const handleSaveOnly = (userInput: string, aiOutput: string) => {
    onSave(phase.id, userInput, aiOutput, false); // Not marking as completed
    // Optionally provide feedback that it's saved, but keep modal open
  };


  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out"
      aria-labelledby={`modal-title-${phase.id}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose} // Close on backdrop click
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 ease-in-out scale-95 group-hover:scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <header className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50 rounded-t-xl">
          <h2 id={`modal-title-${phase.id}`} className="text-xl font-semibold text-slate-800">
            AI Assistant: {phase.title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto flex-grow">
          <p className="text-sm text-slate-600 mb-4">{phase.description}</p>
          <AiInteraction
            key={phase.id} // Add key to re-mount AiInteraction when phase changes, clearing its internal state
            phase={phase}
            onSaveAiOutput={handleSaveOnly} // Simple save, modal stays open
            initialUserInput={phase.userInputForAI || ''}
            initialAiResponse={phase.aiGeneratedOutput || null}
          />
        </div>

        <footer className="p-5 border-t border-slate-200 bg-slate-50 rounded-b-xl flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
          >
            Close
          </button>
           <button
            onClick={() => {
              if (phase.aiGeneratedOutput || phase.userInputForAI) { 
                 handleSaveAndClose(phase.userInputForAI || '', phase.aiGeneratedOutput || '', true);
              } else {
                onClose(); 
              }
            }}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
            disabled={!phase.userInputForAI && !phase.aiGeneratedOutput} 
          >
            Save & Mark as Completed
          </button>
        </footer>
      </div>
    </div>
  );
};

export default InteractionModal;