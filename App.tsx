
import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_WORKFLOW_DATA } from './constants';
import PhaseCard from './components/PhaseCard';
import WorkflowStepper from './components/WorkflowStepper';
import InteractionModal from './components/InteractionModal';
import { WorkflowPhase, AdditionalConsideration } from './types';
import { CheckCircleIcon, DocumentTextIcon } from './components/icons';

const LOCAL_STORAGE_KEY = 'softwareWorkflowProgress';

const App: React.FC = () => {
  const [workflowPhases, setWorkflowPhases] = useState<WorkflowPhase[]>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Basic validation to ensure it's an array and has expected properties
        if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].id && parsedData[0].status) {
          return parsedData as WorkflowPhase[];
        }
      } catch (error) {
        console.error("Failed to parse workflow data from localStorage:", error);
        // Fallback to initial data if parsing fails
      }
    }
    return INITIAL_WORKFLOW_DATA.phases;
  });

  const [currentPhaseId, setCurrentPhaseId] = useState<string | null>(workflowPhases.length > 0 ? workflowPhases[0].id : null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mainTitle, additionalConsiderations } = INITIAL_WORKFLOW_DATA;

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workflowPhases));
  }, [workflowPhases]);

  const handleOpenModal = (phaseId: string) => {
    setCurrentPhaseId(phaseId);
    // Mark as in-progress when modal is opened, if it's 'todo'
    setWorkflowPhases(prevPhases =>
      prevPhases.map(p =>
        p.id === phaseId && p.status === 'todo' ? { ...p, status: 'in-progress' } : p
      )
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSavePhaseData = useCallback((phaseId: string, userInput: string, aiOutput: string, markAsCompleted: boolean) => {
    setWorkflowPhases(prevPhases =>
      prevPhases.map(p =>
        p.id === phaseId
          ? { ...p, userInputForAI: userInput, aiGeneratedOutput: aiOutput, status: markAsCompleted ? 'completed' : p.status }
          : p
      )
    );
    // If marked as completed, try to advance to the next 'todo' phase
    if (markAsCompleted) {
      const currentIndex = workflowPhases.findIndex(p => p.id === phaseId);
      const nextPhase = workflowPhases.find((p, index) => index > currentIndex && p.status === 'todo');
      if (nextPhase) {
        setCurrentPhaseId(nextPhase.id);
      } else {
         // If no next 'todo' phase, find first incomplete or stay on current
        const firstIncomplete = workflowPhases.find(p => p.status !== 'completed');
        setCurrentPhaseId(firstIncomplete ? firstIncomplete.id : phaseId);
      }
    }
  }, [workflowPhases]);


  const handlePhaseSelect = (phaseId: string) => {
    setCurrentPhaseId(phaseId);
    // Optionally open modal directly or just highlight, for now just sets current.
    // Consider if clicking stepper should open modal: handleOpenModal(phaseId);
  };
  
  const currentPhaseForModal = workflowPhases.find(p => p.id === currentPhaseId);

  const handleGenerateDocumentation = () => {
    let docContent = `${mainTitle}\n\n`;
    docContent += "Generated on: " + new Date().toLocaleString() + "\n\n";

    workflowPhases.forEach(phase => {
      docContent += `--------------------------------------------------\n`;
      docContent += `PHASE: ${phase.title} (Status: ${phase.status})\n`;
      docContent += `--------------------------------------------------\n\n`;
      docContent += `Description: ${phase.description}\n\n`;
      
      if (phase.userInputForAI) {
        docContent += `User Input to AI:\n${phase.userInputForAI}\n\n`;
      }
      if (phase.aiGeneratedOutput) {
        docContent += `AI Generated Output:\n${phase.aiGeneratedOutput}\n\n`;
      }
      if (!phase.userInputForAI && !phase.aiGeneratedOutput && phase.status !== 'completed') {
        docContent += `This phase has not been fully processed with AI.\n\n`;
      }
      if (phase.status === 'completed' && !phase.aiGeneratedOutput) {
        docContent += `This phase was marked completed without AI generation, or AI output was cleared.\n\n`
      }

      docContent += `Activities:\n`;
      phase.activities.forEach(activity => {
        docContent += `  - ${activity.title}: ${activity.details}\n`;
        if (activity.deliverables.length > 0) {
          docContent += `    Deliverables: ${activity.deliverables.join(', ')}\n`;
        }
      });
      docContent += `\n\n`;
    });

    docContent += `--------------------------------------------------\n`;
    docContent += `ADDITIONAL CONSIDERATIONS\n`;
    docContent += `--------------------------------------------------\n\n`;
    additionalConsiderations.points.forEach(point => {
      docContent += `- ${point}\n`;
    });

    // Create a blob and trigger download
    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Software_Engineering_Workflow_Documentation.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 sm:text-5xl">
          {mainTitle}
        </h1>
      </header>

      <WorkflowStepper
        phases={workflowPhases}
        currentPhaseId={currentPhaseId}
        onPhaseSelect={handlePhaseSelect}
      />
      
      <div className="mt-8 mb-8 flex justify-center">
        <button
            onClick={handleGenerateDocumentation}
            className="flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150"
            title="Generate full documentation based on saved progress"
          >
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            Generate Full Documentation
        </button>
      </div>


      <main className="max-w-4xl mx-auto">
        {workflowPhases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            onStartPhase={() => handleOpenModal(phase.id)}
            isCurrent={phase.id === currentPhaseId}
          />
        ))}

        <section className="mt-12 p-6 bg-white shadow-xl rounded-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{additionalConsiderations.title}</h2>
          <ul className="space-y-3">
            {additionalConsiderations.points.map((point, index) => (
              <li key={index} className="flex items-start text-sm text-slate-700">
                <CheckCircleIcon className="w-5 h-5 text-sky-500 mr-3 flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {currentPhaseForModal && (
        <InteractionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          phase={currentPhaseForModal}
          onSave={handleSavePhaseData}
        />
      )}

      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Software Engineering Workflow Visualizer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
