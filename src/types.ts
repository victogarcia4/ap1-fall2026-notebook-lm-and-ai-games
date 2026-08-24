export type ExamCategory = 'LE1' | 'LE2' | 'LE3' | 'LE4' | 'Final';

export interface Student {
  id: string;
  name: string;
  section: '1101' | '1201' | '1501' | 'Instructor' | 'Mock';
  isInstructor?: boolean;
  isMock?: boolean;
}

export interface HapsOutcome {
  id: string;
  parentId: string;
  title: string;
  description: string;
  type: string;
  semester: string;
  chapter: string;
}

export interface SLOItem {
  id: string;
  exam: ExamCategory;
  index: number;
  text: string;
  hapsCode: string;
  hapsNominal: string;
  hapsModule: string;
  chapter: string;
  keywords?: string[];
}

export interface AssignmentDeliverables {
  audio?: boolean;
  video?: boolean;
  slideDeck?: boolean;
  infographic?: boolean;
  flashcards?: boolean;
}

export interface Assignment {
  id: string;
  studentId: string;
  studentName: string;
  studentSection: string;
  exam: ExamCategory;
  sloId: string;
  sloText: string;
  hapsCode: string;
  hapsNominal: string;
  chapter?: string;
  notebookUrl?: string;
  notebookNotes?: string;
  deliverables?: AssignmentDeliverables;
  gameUrl?: string;
  gameTitle?: string;
  gamePrompt?: string;
  gameType?: 'quiz' | 'flashcards' | 'scenario' | 'interactive';
  status: 'assigned' | 'in-progress' | 'submitted' | 'reviewed';
  grade?: string;
  feedback?: string;
  submittedAt?: string;
  updatedAt: string;
}

export interface AIGameData {
  id: string;
  studentId: string;
  studentName: string;
  studentSection: string;
  sloText: string;
  hapsCode: string;
  hapsNominal: string;
  gameTitle: string;
  gameType: 'quiz' | 'flashcards' | 'clinical-scenario' | 'rapid-recall';
  aiStudioUrl?: string;
  geminiPrompt: string;
  questions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  status: 'draft' | 'ready' | 'submitted';
  extraCreditScore?: number;
  submittedAt?: string;
}
