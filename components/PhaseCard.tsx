
import React, { useState } from 'react';
import { WorkflowPhase } from '../types';
import ActivityItem from './ActivityItem';
import { ClipboardDocumentListIcon, ChevronDownIcon, ChevronUpIcon, RocketLaunchIcon, CheckBadgeIcon, CogIcon, LightBulbIcon } from './icons';

interface PhaseCardProps {
  phase: WorkflowPhase;
  onStartPhase: () => void;
  isCurrent: boolean;
  initiallyOpen?: boolean;
}

const PhaseStatusIndicator: React.FC<{ status: WorkflowPhase['status'] }> = ({ status }) => {
  let Icon = LightBulbIcon;
  let text = "To Do";
  let color = "text-slate-500";
  let bgColor = "bg-slate-100";

  if (status === 'in-progress') {
    Icon = CogIcon;
    text = "In Progress";
    color = "text-yellow-600";
    bgColor = "bg-yellow-100";
  } else if (status === 'completed') {
    Icon = CheckBadgeIcon;
    text = "Completed";
    color = "text-green-600";
    bgColor = "bg-green-100";
  }

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${color}`}>
      <Icon className={`w-4 h-4 mr-1.5 ${color}`} />
      {text}
    </div>
  );
};


const PhaseCard: React.FC<PhaseCardProps> = ({ phase, onStartPhase, isCurrent, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen || isCurrent); // Open if current or initially set

  React.useEffect(() => {
    // If this card becomes the current one, open it (unless already explicitly closed by user interaction)
    // This logic might need refinement if we don't want it to always pop open when `isCurrent` changes.
    // For now, it makes sense for the "current" phase selected by stepper to be visible.
    if (isCurrent) {
      setIsOpen(true);
    }
  }, [isCurrent]);


  const cardBorderColor = isCurrent ? 'border-sky-500 ring-2 ring-sky-500' : 'border-transparent';

  return (
    <div className={`mb-8 bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out border-2 ${cardBorderColor}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-sky-600 to-cyan-500 text-white focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`phase-content-${phase.id}`}
      >
        <div className="flex items-center">
          <ClipboardDocumentListIcon className="w-8 h-8 mr-4 flex-shrink-0" />
          <div className="text-left">
            <h2 className="text-2xl font-bold">{phase.title}</h2>
            {!isOpen && <p className="text-sm text-sky-100 font-light mt-1 truncate max-w-md md:max-w-lg lg:max-w-2xl">{phase.description}</p>}
          </div>
        </div>
        <div className="flex items-center">
            {!isOpen && <PhaseStatusIndicator status={phase.status} />}
            {isOpen ? <ChevronUpIcon className="w-7 h-7 flex-shrink-0 ml-4" /> : <ChevronDownIcon className="w-7 h-7 flex-shrink-0 ml-4" />}
        </div>
      </button>

      {isOpen && (
        <div id={`phase-content-${phase.id}`} className="p-6 border-t border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <p className="text-slate-600 text-sm flex-grow">{phase.description}</p>
            <PhaseStatusIndicator status={phase.status} />
          </div>
          
          <button
            onClick={onStartPhase}
            className="mb-6 w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-colors duration-150 ease-in-out"
            aria-label={`Iniciar Interação com AI ${phase.title}`}
          >
            <RocketLaunchIcon className="w-5 h-5 mr-2" />
            {phase.status === 'completed' ? 'Review/Edit with AI' : 'Start Phase with AI'}
          </button>

          {phase.aiGeneratedOutput && (
            <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg shadow">
              <h5 className="text-sm font-semibold text-sky-700 mb-1">Summary of AI Output:</h5>
              <p className="text-xs text-slate-600 whitespace-pre-wrap break-words font-sans line-clamp-3">
                {phase.aiGeneratedOutput}
              </p>
            </div>
          )}
          
          <h3 className="text-xl font-semibold text-slate-700 mb-3">Activities in this Phase:</h3>
          {phase.activities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhaseCard;
