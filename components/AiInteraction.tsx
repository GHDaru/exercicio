
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { WorkflowPhase } from '../types';
import { SparklesIcon } from './icons';

interface AiInteractionProps {
  phase: WorkflowPhase;
  onSaveAiOutput: (userInput: string, aiOutput: string) => void;
  initialUserInput?: string;
  initialAiResponse?: string | null;
}

const AiInteraction: React.FC<AiInteractionProps> = ({ phase, onSaveAiOutput, initialUserInput = '', initialAiResponse = null }) => {
  const [userInput, setUserInput] = useState(initialUserInput);
  const [aiResponse, setAiResponse] = useState<string | null>(initialAiResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effect to update local state if props change (e.g. navigating between phases in modal, though current setup re-mounts)
  useEffect(() => {
    setUserInput(initialUserInput);
    setAiResponse(initialAiResponse);
  }, [initialUserInput, initialAiResponse, phase.id]);


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setError("Please enter your question, instructions, or content to process with the AI.");
      return;
    }

    setIsLoading(true);
    setError(null);
    // Keep previous AI response until new one is generated for better UX
    // setAiResponse(null); 

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setError("API key is not configured. Please set the API_KEY environment variable.");
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const activitiesSummary = phase.activities.map(a => `- ${a.title}: ${a.details}\n  Deliverables: ${a.deliverables.join(', ')}`).join('\n\n');
      const prompt = `
        You are an expert AI assistant for software engineering project planning and documentation.
        You are currently helping to "execute" the following phase:

        Phase Title: ${phase.title}
        Phase Description: ${phase.description}
        Key Activities & Deliverables for this phase:
        ${activitiesSummary}
        -------------------

        The user wants to work on this phase and has provided the following input/request:
        "${userInput}"

        Based on the user's input and the context of this phase, please generate a comprehensive and actionable response.
        This could involve:
        - Drafting specific deliverables (e.g., user stories, architectural diagrams descriptions, API endpoint definitions).
        - Answering questions related to the phase's activities.
        - Elaborating on specific requirements or design choices.
        - Identifying potential risks or considerations for this phase.
        - Providing detailed explanations or examples relevant to the phase.

        Aim to produce content that would directly contribute to completing this phase of the software project.
        Be thorough, clear, and practical. If the user's input is a question, answer it fully. If it's a request for generation, fulfill it.
      `;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17', 
        contents: prompt,
      });

      const newAiResponse = response.text;
      setAiResponse(newAiResponse);
      onSaveAiOutput(userInput, newAiResponse); // Save to parent state

    } catch (e: any) {
      console.error("Error calling Gemini API:", e);
      setError(`Failed to get response from AI: ${e.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2 p-1 bg-sky-50 rounded-lg "> {/* Reduced padding from p-5 and shadow */}
      <h4 className="text-base font-semibold text-sky-800 mb-3">Execute "{phase.title}" with AI</h4>
      <p className="text-xs text-slate-600 mb-3">
        Provide your inputs, questions, or specific instructions for the AI to help you complete this phase. 
        For example: "Draft an initial business case for [project idea]", "Generate user stories for a login and registration module", or "Outline key technical considerations for choosing a database for [application type]".
        The AI will attempt to generate deliverables or provide guidance based on your input and the phase's objectives.
      </p>
      <textarea
        value={userInput}
        onChange={handleInputChange}
        placeholder={`Your input for AI to process for ${phase.title}... (e.g., requirements, questions, draft content)`}
        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-150 ease-in-out text-sm"
        rows={5}
        aria-label={`AI input for ${phase.title}`}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-3 w-full flex items-center justify-center px-4 py-2.5 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        aria-live="polite"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        {isLoading ? 'AI Generating...' : (aiResponse ? 'Regenerate with AI' : 'Generate with AI')}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm" role="alert">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {aiResponse && (
        <div className="mt-4 p-4 bg-white border border-slate-200 rounded-md shadow">
          <h5 className="text-sm font-semibold text-slate-700 mb-2">AI Generated Output:</h5>
          <pre className="text-sm text-slate-600 whitespace-pre-wrap break-words font-sans">{aiResponse}</pre>
        </div>
      )}
    </div>
  );
};

export default AiInteraction;
