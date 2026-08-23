import { Assignment, ExamCategory, Student, AIGameData } from '../types';
import { INITIAL_STUDENTS } from './students';
import { ALL_EXAM_SLOS } from './examSlos';

export const LOCAL_STORAGE_ASSIGNMENTS_KEY = 'ap1_notebooklm_assignments_v5';
export const LOCAL_STORAGE_GAMES_KEY = 'ap1_aigame_submissions_v5';
export const LOCAL_STORAGE_STUDENTS_KEY = 'ap1_students_list_v5';

export function generateInitialAssignments(): Assignment[] {
  const assignments: Assignment[] = [];
  const exams: ExamCategory[] = ['LE1', 'LE2', 'LE3', 'LE4', 'Final'];

  // Track the student index within each section so each section gets independent full coverage
  const sectionCounters: Record<string, number> = {};

  INITIAL_STUDENTS.forEach((student) => {
    const sec = student.section || 'General';
    if (sectionCounters[sec] === undefined) {
      sectionCounters[sec] = 0;
    }
    const studentSecIdx = sectionCounters[sec];
    sectionCounters[sec] += 1;

    exams.forEach((exam) => {
      const slos = ALL_EXAM_SLOS[exam];
      if (!slos || slos.length === 0) return;

      // Assign sequentially within section; wraps around if students in section > SLO count
      // This ensures full unique coverage within section, and equitable repetition across sections
      const sloIndex = studentSecIdx % slos.length;
      const slo = slos[sloIndex];

      const assignmentId = `${exam}-${student.id}`;

      // Sample mock submissions for showcase
      let status: Assignment['status'] = 'assigned';
      let notebookUrl: string | undefined = undefined;
      let notebookNotes: string | undefined = undefined;
      let gameUrl: string | undefined = undefined;
      let gameTitle: string | undefined = undefined;
      let grade: string | undefined = undefined;
      let feedback: string | undefined = undefined;

      // Give Dr. Victor Garcia M and Mock Student 1 ready-made demo submissions
      if (student.isInstructor) {
        status = 'reviewed';
        notebookUrl = 'https://notebooklm.google.com/notebook/demo-ap1-instructor';
        notebookNotes = 'Instructor exemplar: audio deep-dive, video short storyboard, 8-slide presentation deck, 1-page infographic, and 15 flashcards.';
        if (exam === 'Final') {
          gameUrl = 'https://aistudio.google.com/game/ap1-homeostasis-challenge';
          gameTitle = 'Homeostasis & Physiological Mechanisms Master Challenge';
        }
        grade = '100 / 100 (Exemplar)';
        feedback = 'Master model assignment. Audio, video shorts, slide deck, infographic, and flashcard set complete.';
      } else if (student.id === '1111111') { // Student 1
        status = 'submitted';
        notebookUrl = 'https://notebooklm.google.com/notebook/student1-ap1-submission';
        notebookNotes = 'Completed all 5 assets: Audio deep-dive, 60s video short script, slide deck, infographic map, and flashcard set.';
        if (exam === 'Final') {
          gameUrl = 'https://aistudio.google.com/game/student1-cell-division-arcade';
          gameTitle = 'Cell Division & Mitosis Arcade Quest';
        }
      }

      assignments.push({
        id: assignmentId,
        studentId: student.id,
        studentName: student.name,
        studentSection: student.section,
        exam,
        sloId: slo.id,
        sloText: slo.text,
        hapsCode: slo.hapsCode,
        hapsNominal: slo.hapsNominal,
        notebookUrl,
        notebookNotes,
        deliverables: notebookUrl ? {
          audio: true,
          video: true,
          slideDeck: true,
          infographic: true,
          flashcards: true,
        } : undefined,
        gameUrl,
        gameTitle,
        status,
        grade,
        feedback,
        submittedAt: status === 'submitted' || status === 'reviewed' ? '2026-08-20' : undefined,
        updatedAt: '2026-08-21',
      });
    });
  });

  return assignments;
}

export function generateInitialAIGames(): AIGameData[] {
  return [
    {
      id: 'game-demo-1',
      studentId: '9990001',
      studentName: 'Dr. Victor Garcia M',
      studentSection: 'Instructor',
      sloText: 'List and describe the underlying mechanisms in anatomy & physiology.',
      hapsCode: 'AP-19-B-01-02',
      hapsNominal: 'Homeostatic mechanism components',
      gameTitle: 'Physiology Feedback Loop Escape Room',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/prompts/demo-physiology-loop',
      geminiPrompt: 'Create an interactive text-based scenario game in Gemini where a patient experiences hypothermia and the user must trigger the correct effector feedback responses to restore setpoint temperature (37°C).',
      status: 'ready',
      extraCreditScore: 100,
      submittedAt: '2026-08-20',
      questions: [
        {
          question: 'In a negative feedback loop for body temperature, what serves as the primary control center?',
          options: ['Hypothalamus', 'Skeletal muscles', 'Sweat glands', 'Skin thermoreceptors'],
          correctIndex: 0,
          explanation: 'The hypothalamus receives afferent signals from thermoreceptors and coordinates efferent responses.',
        },
        {
          question: 'What is the immediate physiological response of cutaneous blood vessels to severe cold exposure?',
          options: ['Vasoconstriction to conserve core heat', 'Vasodilation to increase skin radiation', 'Diapedesis', 'Apoptosis'],
          correctIndex: 0,
          explanation: 'Vasoconstriction reduces peripheral blood flow, keeping warm blood concentrated in vital organs.',
        },
      ],
    },
    {
      id: 'game-demo-2',
      studentId: '1111111',
      studentName: 'Student 1',
      studentSection: '1201',
      sloText: 'Explain how a cell divides.',
      hapsCode: 'AP-19-C-13-01',
      hapsNominal: 'Cell cycle phases & mitosis',
      gameTitle: 'Mitosis Stage Runner & Chromosome Sorter',
      gameType: 'quiz',
      aiStudioUrl: 'https://aistudio.google.com/prompts/demo-mitosis-runner',
      geminiPrompt: 'Design a rapid-fire quiz game with Gemini that tests chromosome alignment, spindle fiber attachments, and cytokinesis checkpoints.',
      status: 'submitted',
      extraCreditScore: 95,
      submittedAt: '2026-08-21',
      questions: [
        {
          question: 'During which phase of mitosis do sister chromatids separate and migrate to opposite poles?',
          options: ['Anaphase', 'Metaphase', 'Prophase', 'Telophase'],
          correctIndex: 0,
          explanation: 'During anaphase, centromeres split and sister chromatids are pulled toward spindle poles.',
        },
      ],
    },
  ];
}
