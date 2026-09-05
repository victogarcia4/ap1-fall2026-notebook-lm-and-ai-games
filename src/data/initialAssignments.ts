import { Assignment, ExamCategory, Student, AIGameData } from '../types';
import { INITIAL_STUDENTS } from './students';
import { ALL_EXAM_SLOS } from './examSlos';

export const LOCAL_STORAGE_ASSIGNMENTS_KEY = 'ap1_notebooklm_assignments_v10';
export const LOCAL_STORAGE_GAMES_KEY = 'ap1_aigame_submissions_v10';
export const LOCAL_STORAGE_STUDENTS_KEY = 'ap1_students_list_v10';

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

      // Sample submissions for showcase
      let status: Assignment['status'] = 'assigned';
      let notebookUrl: string | undefined = undefined;
      let notebookNotes: string | undefined = undefined;
      let gameUrl: string | undefined = undefined;
      let gameTitle: string | undefined = undefined;
      let grade: string | undefined = undefined;
      let feedback: string | undefined = undefined;

      // Pre-populate student submissions
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
      } else if (student.id === '7996309') { // Alvarez, Alexa Michelle (Section 1501)
        status = 'submitted';
        notebookUrl = 'https://notebooklm.google.com/notebook/alexa-ap1-submission';
        notebookNotes = 'Completed all 5 assets: Audio deep-dive, 60s video short script, slide deck, infographic map, and flashcard set.';
        if (exam === 'Final') {
          gameUrl = 'https://aistudio.google.com/game/alexa-cell-division-arcade';
          gameTitle = 'Cell Division & Mitosis Arcade Quest';
        }
      } else if (student.id === '0320060') { // Cox, Caitlin Elizabeth (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/ce76579d-98a9-47a4-b0cb-d7b052f4c54a';
          notebookNotes = 'Delivered LE1 NotebookLM: Homeostatic Mechanisms, feedback loops, and anatomical regulation. Includes audio deep-dive, summary deck, and study flashcards.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/44115d52-f410-474b-a899-166bb751cbf8?showAssistant=true&showPreview=true&fullscreenApplet=true';
          gameTitle = 'CalciBalance: Calcium Homeostasis & Organ Regulation Lab';
        }
      } else if (student.id === '7965782') { // Cabrera, Daniela Araceli (Section 1101)
        if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/7f603830-1bbb-4c05-b037-6d6cd59d8801?showAssistant=true&showPreview=true&fullscreenApplet=true';
          gameTitle = 'Tissue Architect: Integumentary & Musculoskeletal Systems';
        }
      }

      const isSubmitted = status === 'submitted' || status === 'reviewed';
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
        chapter: slo.chapter,
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
        submittedAt: isSubmitted ? (student.id === '0320060' || student.id === '7965782' ? '2026-09-04' : '2026-08-20') : undefined,
        updatedAt: '2026-09-04',
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
      studentId: '7996309',
      studentName: 'Alvarez, Alexa Michelle',
      studentSection: '1501',
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
    {
      id: 'game-caitlin-cox',
      studentId: '0320060',
      studentName: 'Cox, Caitlin Elizabeth',
      studentSection: '1101',
      sloText: 'Explain how calcium homeostasis is dynamically regulated through interactions among bone tissue, hormones, and the kidneys (Chapter 7).',
      hapsCode: 'AP-19-F-09-01',
      hapsNominal: 'Skeletal system & calcium homeostasis',
      gameTitle: 'CalciBalance: Calcium Homeostasis & Organ Regulation Lab',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/apps/44115d52-f410-474b-a899-166bb751cbf8?showAssistant=true&showPreview=true&fullscreenApplet=true',
      geminiPrompt: 'Build an interactive educational lab simulation where students regulate blood calcium levels by balancing parathyroid hormone (PTH), calcitriol, and calcitonin across bone, kidney, and gastrointestinal target organs.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-04',
      questions: [
        {
          question: 'When blood calcium (Ca²⁺) drops below 9.0 mg/dL, which endocrine gland secretes parathyroid hormone (PTH)?',
          options: ['Parathyroid glands', 'Thyroid parafollicular C-cells', 'Anterior pituitary gland', 'Adrenal cortex'],
          correctIndex: 0,
          explanation: 'Parathyroid glands detect hypocalcemia via calcium-sensing receptors and immediately secrete PTH into circulation.',
        },
        {
          question: 'What is the primary action of PTH on bone tissue to restore normal blood calcium levels?',
          options: [
            'Stimulates osteoclast activity and proliferation to resorb bone matrix',
            'Stimulates osteoblasts to deposit hydroxyapatite mineral crystals',
            'Inhibits collagen fiber synthesis in osteons',
            'Promotes calcification of articular hyaline cartilage'
          ],
          correctIndex: 0,
          explanation: 'PTH promotes osteoclast-mediated bone resorption, releasing calcium and phosphate ions into the blood.',
        },
        {
          question: 'In the kidneys, PTH stimulates tubular reabsorption of calcium while promoting the activation of which essential hormone?',
          options: ['Calcitriol (active 1,25-dihydroxyvitamin D3)', 'Calcitonin', 'Aldosterone', 'Erythropoietin'],
          correctIndex: 0,
          explanation: 'PTH activates the renal 1α-hydroxylase enzyme to produce calcitriol, which significantly enhances intestinal calcium absorption.',
        },
      ],
    },
    {
      id: 'game-daniela-cabrera',
      studentId: '7965782',
      studentName: 'Cabrera, Daniela Araceli',
      studentSection: '1101',
      sloText: 'Compare and contrast how the four primary tissue types contribute to the structure and function of the integumentary and musculoskeletal systems (Chapters 5–9).',
      hapsCode: 'AP-19-D-01-03',
      hapsNominal: 'General features of tissue types',
      gameTitle: 'Tissue Architect: Integumentary & Musculoskeletal Systems',
      gameType: 'quiz',
      aiStudioUrl: 'https://aistudio.google.com/apps/7f603830-1bbb-4c05-b037-6d6cd59d8801?showAssistant=true&showPreview=true&fullscreenApplet=true',
      geminiPrompt: 'Create a tissue architecture puzzle game connecting epithelial, connective, muscular, and nervous tissue functions to the epidermis, dermis, skeleton, and muscular movement.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-04',
      questions: [
        {
          question: 'Which specific epithelial tissue forms the durable, protective outer barrier of the skin epidermis?',
          options: [
            'Keratinized stratified squamous epithelium',
            'Non-keratinized simple columnar epithelium',
            'Pseudostratified ciliated columnar epithelium',
            'Transitional epithelium (urothelium)'
          ],
          correctIndex: 0,
          explanation: 'The epidermis is composed of keratinized stratified squamous epithelium designed to resist abrasion, dehydration, and pathogen entry.',
        },
        {
          question: 'What category of connective tissue comprises the deep reticular layer of the dermis, providing multi-directional tensile strength?',
          options: [
            'Dense irregular connective tissue',
            'Dense regular connective tissue',
            'Elastic hyaline cartilage',
            'Loose areolar connective tissue'
          ],
          correctIndex: 0,
          explanation: 'The reticular layer of the dermis consists of dense irregular connective tissue packed with interwoven collagen fiber bundles.',
        },
        {
          question: 'How do muscular and nervous tissues cooperate to execute voluntary movement in the musculoskeletal system?',
          options: [
            'Somatic motor neurons release acetylcholine at neuromuscular junctions to stimulate skeletal muscle fibers',
            'Autonomic neurons stimulate cardiac intercalated discs to pull tendons',
            'Sensory afferents directly contract osteon canaliculi',
            'Neuroglial ependymal cells shorten myofibrils'
          ],
          correctIndex: 0,
          explanation: 'Somatic motor neurons synapse with skeletal muscle fibers at neuromuscular junctions, releasing acetylcholine to initiate contraction.',
        },
      ],
    },
  ];
}
