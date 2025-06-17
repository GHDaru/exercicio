
import React from 'react';
import { WorkflowPhase } from '../types';
import { CheckCircleIcon, CogIcon, LightBulbIcon } from './icons'; // Assuming you have these or similar

interface WorkflowStepperProps {
  phases: WorkflowPhase[];
  currentPhaseId: string | null;
  onPhaseSelect: (phaseId: string) => void;
}

const getStatusStyles = (status: WorkflowPhase['status'], isCurrent: boolean) => {
  let bgColor = 'bg-slate-200';
  let textColor = 'text-slate-600';
  let borderColor = 'border-slate-300';
  let IconComponent = LightBulbIcon;

  if (status === 'in-progress') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-700';
    borderColor = 'border-yellow-400';
    IconComponent = CogIcon;
  } else if (status === 'completed') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-700';
    borderColor = 'border-green-400';
    IconComponent = CheckCircleIcon;
  }

  if (isCurrent) {
    borderColor = 'border-sky-500 ring-2 ring-sky-500';
    textColor = status === 'todo' ? 'text-sky-700' : textColor; // Emphasize current if todo
  }
  
  return { bgColor, textColor, borderColor, IconComponent };
};

const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ phases, currentPhaseId, onPhaseSelect }) => {
  if (!phases || phases.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Workflow Progress" className="mb-10 max-w-5xl mx-auto">
      <ol className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4">
        {phases.map((phase, index) => {
          const isCurrent = phase.id === currentPhaseId;
          const { bgColor, textColor, borderColor, IconComponent } = getStatusStyles(phase.status, isCurrent);
          const isLastStep = index === phases.length - 1;

          return (
            <li key={phase.id} className="flex-1 w-full sm:w-auto">
              <button
                onClick={() => onPhaseSelect(phase.id)}
                aria-current={isCurrent ? 'step' : undefined}
                className={`group flex flex-col items-center p-3 border-2 rounded-lg w-full text-center transition-all duration-200 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${bgColor} ${borderColor}`}
              >
                <div className="flex items-center justify-center">
                   <IconComponent className={`w-6 h-6 mr-2 flex-shrink-0 ${textColor}`} />
                  <span className={`text-xs sm:text-sm font-medium ${textColor}`}>
                    {phase.title.replace('Fase ', '')} {/* Shorten title a bit */}
                  </span>
                </div>
                <span className={`text-[10px] sm:text-xs font-light mt-1 capitalize ${textColor}`}>
                    {phase.status.replace('-', ' ')}
                </span>
              </button>
              {!isLastStep && (
                <div className="hidden sm:block absolute top-1/2 left-full w-4 h-px bg-slate-300 transform -translate-y-1/2" aria-hidden="true"></div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default WorkflowStepper;
