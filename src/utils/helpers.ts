import { ExamCategory, SLOItem } from '../types';

export function getExamFullName(exam: ExamCategory): string {
  switch (exam) {
    case 'LE1':
      return 'Lecture Exam 1 (Ch. 1: Introduction, Ch. 2: Chemical Level, Ch. 3: Cellular Level)';
    case 'LE2':
      return 'Lecture Exam 2 (Ch. 4: Metabolism, Ch. 5: Tissues, Ch. 6: Integumentary)';
    case 'LE3':
      return 'Lecture Exam 3 (Ch. 7: Bones, Ch. 8: Joints, Ch. 9: Muscles)';
    case 'LE4':
      return 'Lecture Exam 4 (Ch. 10: Nervous Overview, Ch. 11: CNS & PNS, Ch. 12: Senses)';
    case 'Final':
      return 'Final Comprehensive Exam & Google AI Studio Game (Chapters 1–12)';
    default:
      return exam;
  }
}

export function getExamShortDescription(exam: ExamCategory): string {
  switch (exam) {
    case 'LE1':
      return 'Chapters 1, 2 & 3: Introduction, Chemical Level, Cellular Level';
    case 'LE2':
      return 'Chapters 4, 5 & 6: Metabolism, Tissues, Integumentary System';
    case 'LE3':
      return 'Chapters 7, 8 & 9: Bones, Joints, Muscles';
    case 'LE4':
      return 'Chapters 10, 11 & 12: Nervous Overview, CNS/PNS, Senses';
    case 'Final':
      return 'Comprehensive Chapters 1–12 & AI Game Builder';
    default:
      return exam;
  }
}

export function generateNotebookLMPrompt(sloText: string, hapsCode: string, exam: ExamCategory): string {
  return `You are an expert Anatomy & Physiology instructor preparing a comprehensive master study notebook for BIOL 2401 (${getExamFullName(exam)}).

TARGET LEARNING OUTCOME (SLO):
"${sloText}"

HAPS STANDARD CODE: ${hapsCode}

Please generate the required 5 core study assets based on the uploaded lecture notes and OpenStax A&P sources:

1. AUDIO (PODCAST OVERVIEW):
   - Structured 2-host conversational script and dialogue focus points for NotebookLM's Audio Overview deep-dive.
   - Host A poses insightful clinical questions; Host B breaks down the underlying physiological feedback mechanisms.

2. VIDEO (SHORTS):
   - A 60-second vertical micro-lecture storyboard & punchy script for YouTube/TikTok/Instagram Shorts.
   - Hook (0-5s), Visual Cue & Anatomical Landmark (5-25s), Mechanism Breakdown (25-50s), Clinical Takeaway / High-Yield Callout (50-60s).

3. SLIDE DECK:
   - 6 to 8 structured presentation slides with title, bulleted key principles, anatomical relationships, step-by-step pathways, and homeostatic relevance.

4. INFOGRAPHIC:
   - Textual layout, ASCII/data flow concept map, and visual design blueprint for a 1-page visual summary diagram of the organ system pathway.

5. FLASHCARD SET:
   - 10-15 high-yield active recall flashcards (Front: Concept/Clinical Scenario/Structure; Back: Precise Physiological Definition & Board-Style Rationale).`;
}

export function generateAIGamePrompt(sloText: string, hapsCode: string): string {
  return `You are a game designer and educator using Google AI Studio and Gemini models to build an interactive Anatomy & Physiology learning game.

TOPIC & LEARNING OUTCOME:
"${sloText}" (HAPS Code: ${hapsCode})

GAME SPECIFICATION OBJECTIVES:
1. Title: Create an engaging title (e.g., "PhysioHero: ${sloText.slice(0, 30)}... Challenge").
2. Core Gameplay Mechanics: Define a 3-round progressive interactive challenge (Round 1: Rapid Terminology Blitz, Round 2: Pathway Sequencer / Mechanism Decoder, Round 3: Clinical Diagnostic Boss Fight).
3. Scoring & Multipliers: 100 points per correct answer, bonus streak multipliers, and instant feedback explaining the anatomical/physiological principle.
4. Player Options: 4 distinct choices per scenario with realistic distractors that address common student misconceptions.
5. Output format: Ready-to-play JSON structure or complete HTML/JavaScript single-file game.`;
}

export function exportToCSV(filename: string, rows: Record<string, any>[]): void {
  if (!rows || rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const val = row[header] === undefined || row[header] === null ? '' : String(row[header]);
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
