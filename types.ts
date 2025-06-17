
export interface ActivityCategory {
  functional: string;
  nonFunctional: string;
  business: string;
  user: string;
}

export interface Activity {
  title: string;
  details: string; // "Atividade: ..."
  origin?: string;
  keyQuestions?: string;
  considerations?: string;
  examples?: string;
  techniques?: string;
  categories?: ActivityCategory;
  focus?: string;
  tools?: string; // e.g. OpenAPI (Swagger)
  deliverables: string[]; // "Entregável: ..."
}

export interface WorkflowPhase {
  id: string;
  title: string;
  description: string;
  activities: Activity[];
  status: 'todo' | 'in-progress' | 'completed';
  userInputForAI: string | null;
  aiGeneratedOutput: string | null;
}

export interface AdditionalConsideration {
  title: string;
  points: string[];
}

export interface WorkflowData {
  mainTitle: string;
  phases: WorkflowPhase[];
  additionalConsiderations: AdditionalConsideration;
}
