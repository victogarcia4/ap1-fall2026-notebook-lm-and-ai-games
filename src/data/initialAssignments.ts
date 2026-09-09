import { Assignment, ExamCategory, Student, AIGameData } from '../types';
import { INITIAL_STUDENTS } from './students';
import { ALL_EXAM_SLOS } from './examSlos';

export const LOCAL_STORAGE_ASSIGNMENTS_KEY = 'ap1_notebooklm_assignments_v23';
export const LOCAL_STORAGE_GAMES_KEY = 'ap1_aigame_submissions_v23';
export const LOCAL_STORAGE_STUDENTS_KEY = 'ap1_students_list_v23';

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
        grade = '100 / 100 (Exemplar)';
        feedback = 'Master instructor exemplar. Audio deep-dive, video short storyboard, 8-slide presentation deck, 1-page infographic, and flashcard set complete.';
        if (exam === 'LE1') {
          notebookUrl = 'https://notebook.google.com/notebook/1c45a20c-218e-4fdb-a0d1-4516fcb55e8f';
          notebookNotes = 'Instructor Exemplar LE1: Underlying mechanisms in anatomy & physiology, homeostatic regulation, feedback loops, and anatomical organization.';
        } else if (exam === 'LE2') {
          notebookUrl = 'https://notebook.google.com/notebook/0be32e60-26c8-46e2-a2df-01f6de2e14d7';
          notebookNotes = 'Instructor Exemplar LE2: Cellular metabolism, anabolism and catabolism, energy pathways, and biological tissue histology.';
        } else if (exam === 'LE3') {
          notebookUrl = 'https://notebook.google.com/notebook/2f4eabd4-9069-464d-89cb-afee95a331e9';
          notebookNotes = 'Instructor Exemplar LE3: Skeletal system functions, mineral homeostasis, bone tissue mechanics, and articulation classifications.';
        } else if (exam === 'LE4') {
          notebookUrl = 'https://notebook.google.com/notebook/1b2da9be-b556-4928-9dac-a6930094acc2';
          notebookNotes = 'Instructor Exemplar LE4: Nervous system functional divisions, neuroglial cells, action potential dynamics, and synaptic transmission.';
        } else if (exam === 'Final') {
          gameUrl = 'https://homeosync-anatomy-physiology-game.ai.studio';
          gameTitle = 'HomeoSync - Anatomy & Physiology Game';
        }
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
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/c409ba9d-2574-4bce-9ee9-61645e05235f';
          notebookNotes = 'Explain how carbohydrates, lipids, and proteins are utilized in metabolic energy pathways.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/44115d52-f410-474b-a899-166bb751cbf8?showAssistant=true&showPreview=true&fullscreenApplet=true';
          gameTitle = 'CalciBalance: Calcium Homeostasis & Organ Regulation Lab';
        }
      } else if (student.id === '7965782') { // Cabrera, Daniela Araceli (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/5dd058b0-aee4-429c-ab4d-4027765bbf0b';
          notebookNotes = 'Levels of Structural Organization in the Human Organism.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b3b9d6d4-584f-4730-bdf2-bdb67ccf4f2c';
          notebookNotes = 'Cellular Respiration Phases: Glycolysis, Krebs Cycle & Oxidative Phosphorylation.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/96ad144a-fd00-4e0b-b23c-5dc46908a58d';
          notebookNotes = 'Identify the microscopic structure of compact bone (osteons, concentric lamellae, central canal, canaliculi, lacunae) and spongy bone (trabeculae).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/eaa62c4a-3327-4afe-8931-3c2656643687';
          notebookNotes = 'Neuroglial cells of the CNS and PNS.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/7f603830-1bbb-4c05-b037-6d6cd59d8801?showAssistant=true&showPreview=true&fullscreenApplet=true';
          gameTitle = 'Tissue Architect: Integumentary & Musculoskeletal Systems';
        }
      } else if (student.id === '7338264') { // Melendez, Yamaly (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/f9859a64-5bb0-4505-8126-b55eba2780d6';
          notebookNotes = 'Acid, Base, Buffer, and the Biological pH scale.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/96ef6c54-ba83-43ee-87d6-283814e3e09c';
          notebookNotes = 'Muscle Tissue Types: Skeletal, Cardiac, and Smooth muscle histology and physiology.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/d9e595f7-3cd3-465f-95b0-8bb26e8afd71';
          notebookNotes = 'Joint Structural Classification: Fibrous, Cartilaginous, and Synovial joints.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/09dde92a-2de7-4d64-bc17-152e5153f3f0';
          notebookNotes = 'Major classes of neurotransmitters and synaptic transmission.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/e8eeda31-8181-4152-a9a6-6d8447d31162?fullscreenApplet=true';
          gameTitle = 'Homeostasis Unifier: Human Physiology Systems Quest';
        }
      } else if (student.id === '7828698') { // Santillan, Noemi Abigail (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/2fcc3997-99d8-4a26-bcf8-c191f2590304';
          notebookNotes = 'Plasma membrane chemical composition and fluid mosaic model.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/82978b28-56c6-4698-8408-5b4d12efa61e';
          notebookNotes = 'Integumentary system general functions and physiological defense.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/8750c319-86d6-41a3-9134-9e18e6d4cb92';
          notebookNotes = 'Predict the pathophysiological changes and consequences of joint disorders such as osteoarthritis and rheumatoid arthritis.';
        }
      } else if (student.id === '7778338') { // Velazquez, Yesenia (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/01878a79-c44c-475f-b9bb-f07db69b300c';
          notebookNotes = 'Cellular organelle structure and metabolic function.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/d119c84c-92e6-4045-9fdb-589d08b36929';
          notebookNotes = 'Papillary and reticular layers of the dermis.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/e3f9c697-3f97-4624-b270-bc8b5fcbb182';
          notebookNotes = 'Microscopic components within a skeletal muscle fiber.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/244ad57a-3747-4b08-82fc-bb2a6ddd6499?pli=1';
          notebookNotes = 'Distinguish between the sympathetic and parasympathetic divisions of the autonomic nervous system in structural origin, pathway lengths, and bodily functions.';
        }
      } else if (student.id === '8035971') { // Moran, Angel Adrian (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/14a78504-72bc-4513-a719-095c983e3db7';
          notebookNotes = 'Building blocks, structural classes, and biological roles of biomolecules.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/2976c311-82d0-4942-8f8f-cf0eb278eade';
          notebookNotes = 'Nervous system general characteristics and neurohistology.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/155d2e8e-610d-460c-8f7d-c988417b90ae';
          notebookNotes = 'Functional classification of joints: Synarthroses, Amphiarthroses, and Diarthroses.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/bf72876a-0b4a-41c4-8ba0-1cb734e2f15c?authuser=1';
          notebookNotes = 'Meninges coverings: Dura mater, arachnoid mater, and pia mater.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/c5a47a51-e518-4e7f-a110-6e899c6da94e?showAssistant=true&showPreview=true&fullscreenApplet=true';
          gameTitle = 'BioFoundations: Chemical & Cellular Tissue Physiology';
        }
      } else if (student.id === '7123232') { // Tutor, Jessica Renee (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/f57f69ba-bf00-4001-8c23-422ce53752dc';
          notebookNotes = 'Vesicular transport mechanisms: phagocytosis, pinocytosis, and receptor-mediated endocytosis.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/6a3b9f33-1941-4718-96d0-e958fe4f294e';
          notebookNotes = 'Factors that influence skin pigmentation and epidermal physiology.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/1e085193-7573-41c1-a57a-1c802c2784e1';
          notebookNotes = 'Organization of skeletal muscle from deep fascia to myofibril.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/580911d5-d42a-4f29-bce3-7f6ecf8da6c4';
          notebookNotes = 'Explain how spinal nerves are formed, named, and organized into principal nerve plexuses (cervical, brachial, lumbar, sacral).';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/80622894-1040-46af-b376-6778cdfe8de3?showAssistant=true&showPreview=true&fullscreenApplet=true';
          gameTitle = 'NeuroPathways: Somatic & Autonomic Nervous Systems Quest';
        }
      } else if (student.id === '8029974') { // Ponce, Jaslen (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/63ec6481-b10c-4ae5-aebd-3840dd98b112';
          notebookNotes = 'Biochemistry of lipids: triglycerides, phospholipids, steroids, and eicosanoids.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/82978b28-56c6-4698-8408-5b4d12efa61e';
          notebookNotes = 'Structure, locations, and functions of mucous, serous, cutaneous, and synovial membranes.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/dff61fd1-f56e-4253-aa39-4e9d4883f126';
          notebookNotes = 'Relationship between joint anatomical structure and functional movement.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/05010716-f823-4fe8-9ec9-9db993a6a1f1?authuser=1';
          notebookNotes = 'Formation, circulation, and homeostatic functions of cerebrospinal fluid (CSF).';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/b4ddbcb9-302e-4289-b110-2910c48b67ff?fullscreenApplet=true&showAssistant=true&showPreview=true';
          gameTitle = 'Metabolic Bioenergetics & Respiration Arena';
        }
      } else if (student.id === '8159253') { // Bell, Cyaira (Section 1501)
        if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/eec0bcfb-04ba-4acc-8df9-cbc461855202';
          notebookNotes = 'Metabolic pathway regulation, allosteric control, and rate-limiting enzymes.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/d282bee6-01e7-4c4e-a22f-9be414365da4';
          notebookNotes = 'Cellular and extracellular matrix components of bone tissue (osteoprogenitor cells, osteoblasts, osteocytes, osteoclasts).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b4f37aa0-befc-4d1f-b7f5-8a01e4145299';
          notebookNotes = 'Structural classification of neurons: multipolar, bipolar, unipolar, and anaxonic.';
        }
      } else if (student.id === '7959119') { // Davis, Dana Yvette (Section 1501)
        if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/a0ff1896-3301-4a2f-895d-7054f883879e';
          notebookNotes = 'Carbohydrate, lipid, and protein utilization in metabolic energy pathways.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/f7ccec1d-134f-4488-9956-395c6b5cc0c1';
          notebookNotes = 'Intramembranous vs. Endochondral ossification bone formation comparison.';
        }
      } else if (student.id === '7826640') { // Quintanilla, Ellyannie (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/acf49af3-8e45-48aa-90de-a9182daa03d7';
          notebookNotes = 'Physiologically important properties of water: solvency, thermal stability, reactivity, and lubrication.';
        }
      } else if (student.id === '8063449') { // Wolford, Hannah (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/d8750931-4dbc-483a-b9d2-c8bb7e71376f';
          notebookNotes = 'Phases of the cell cycle: Interphase (G1, S, G2) and M phase (Mitosis and Cytokinesis).';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/64836699-8619-4b3b-a178-56c2bd9882d1';
          notebookNotes = 'Thermoregulation and water conservation via integumentary dermal blood flow and sweat mechanisms.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/c2bf31ab-2eb4-49a2-81a0-9f9aebf91830';
          notebookNotes = 'Structural components of the neuromuscular junction (NMJ) and synaptic transmission in muscle action potentials.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/142803a8-f81f-4ec0-99dd-95b521684958';
          notebookNotes = 'Differentiate between general (somatic and visceral) senses and special senses (vision, hearing, equilibrium, olfaction, gustation).';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://homeosync-a-p-i-homeostasis-synthesis-game.ai.studio/';
          gameTitle = 'HomeoSync v1.0: Cybernetic Homeostasis & Cross-System Synthesis';
        }
      } else if (student.id === '7764134') { // Gonzalez, Anned Abigail (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/ada491dd-74c1-4603-9789-6184106d1a25';
          notebookNotes = 'Define the law of mass balance and relate it to physiological homeostasis.';
        }
      } else if (student.id === '8094555') { // Regalado, Mia Pamela (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/69e840e0-67dd-4efe-9add-01303449dffd';
          notebookNotes = 'Explain the four levels of protein structure (primary, secondary, tertiary, quaternary) and the consequences of denaturation.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/d47467e3-f35d-476b-a2fc-1150a605e06c';
          notebookNotes = 'Compare and contrast intercellular junctions: tight junctions, desmosomes, and gap junctions.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/5d2650a3-3431-44d1-adf2-ced4ca5c798e';
          notebookNotes = 'Identify and describe the major structural components of a typical synovial joint (articular capsule, synovial fluid, ligaments, articular discs, bursae).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/cd828f92-0b6e-4cbc-aacd-e11c163f46c2?original_referer=https:%2F%2Fnotebook.google.com%23';
          notebookNotes = 'Describe the structural organization, anatomical landmarks, and functions of the four major brain regions (cerebrum, diencephalon, brainstem, cerebellum).';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/5ed18507-22ed-463a-b7f4-6b67a2e8498c?fullscreenApplet=true&showAssistant=true&showPreview=true';
          gameTitle = 'Tissue Matrix: Integumentary & Musculoskeletal A&P Game';
        }
      } else if (student.id === '7659964') { // Siharath, Connie (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/8636de56-7548-41db-86b5-a17039252e7d';
          notebookNotes = 'Explain the phases of the cell cycle (Interphase: G1, S, G2, and M phase).';
        }
      } else if (student.id === '7922888') { // Cruz, Katherine (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/08d433f3-45c7-40c0-9d3a-3a86da225d55';
          notebookNotes = 'Compare and contrast positive and negative feedback mechanisms, providing physiological examples of each.';
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
      sloText: 'Synthesize the fundamental homeostatic mechanisms that unify all organ systems in Human Anatomy & Physiology I.',
      hapsCode: 'AP-19-A-07-01',
      hapsNominal: 'Organ systems and components',
      gameTitle: 'HomeoSync - Anatomy & Physiology Game',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://homeosync-anatomy-physiology-game.ai.studio',
      geminiPrompt: 'Master exemplar physiology game: HomeoSync balances organ systems, homeostatic mechanisms, and clinical feedback challenges across human anatomy and physiology.',
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
    {
      id: 'game-yamaly-melendez',
      studentId: '7338264',
      studentName: 'Melendez, Yamaly',
      studentSection: '1201',
      sloText: 'Synthesize the fundamental homeostatic mechanisms that unify all organ systems in Human Anatomy & Physiology I.',
      hapsCode: 'AP-19-A-07-01',
      hapsNominal: 'Organ systems and components',
      gameTitle: 'Homeostasis Unifier: Human Physiology Systems Quest',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/apps/e8eeda31-8181-4152-a9a6-6d8447d31162?fullscreenApplet=true',
      geminiPrompt: 'Create an interactive human physiology adventure uniting nervous, endocrine, musculoskeletal, and cardiovascular homeostatic mechanisms.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-05',
      questions: [
        {
          question: 'Which two physiological systems act as the primary extrinsic regulatory controllers of homeostatic balance across the body?',
          options: ['Nervous and Endocrine systems', 'Integumentary and Skeletal systems', 'Digestive and Lymphatic systems', 'Muscular and Urinary systems'],
          correctIndex: 0,
          explanation: 'The nervous system delivers rapid electrical impulses while the endocrine system secretes blood-borne chemical hormones for systemic regulation.',
        },
        {
          question: 'In a homeostatic negative feedback loop, what is the role of the receptor?',
          options: [
            'Detects changes in a specific physiological variable or stimulus',
            'Compares the variable against the set point and commands action',
            'Carries out physiological modifications to reverse the disturbance',
            'Synthesizes peptide hormones for systemic circulation'
          ],
          correctIndex: 0,
          explanation: 'Sensory receptors monitor physiological variables and report alterations via afferent pathways to the control center.',
        },
      ],
    },
    {
      id: 'game-angel-moran',
      studentId: '8035971',
      studentName: 'Moran, Angel Adrian',
      studentSection: '1201',
      sloText: 'Explain how chemistry, cellular biology, and transport mechanisms establish the biological foundation for tissue function (Chapters 1–3).',
      hapsCode: 'AP-19-F-02-01',
      hapsNominal: 'Bone tissue cellular components',
      gameTitle: 'BioFoundations: Chemical & Cellular Tissue Physiology',
      gameType: 'quiz',
      aiStudioUrl: 'https://aistudio.google.com/apps/c5a47a51-e518-4e7f-a110-6e899c6da94e?showAssistant=true&showPreview=true&fullscreenApplet=true',
      geminiPrompt: 'Create an educational biology quest testing fundamental biomolecules, cellular organelles, membrane transport, and tissue histology.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-05',
      questions: [
        {
          question: 'Which cellular transport mechanism consumes ATP energy directly to move ions against their electrochemical gradient?',
          options: ['Primary active transport (e.g., Na⁺/K⁺-ATPase pump)', 'Simple lipid diffusion', 'Facilitated diffusion through leak channels', 'Osmotic water flow'],
          correctIndex: 0,
          explanation: 'Primary active transport directly hydrolyzes ATP to move solutes uphill against their electrochemical gradients.',
        },
        {
          question: 'Which cellular organelle is responsible for synthesizing ATP via oxidative phosphorylation and the citric acid cycle?',
          options: ['Mitochondria', 'Rough endoplasmic reticulum', 'Golgi complex', 'Peroxisomes'],
          correctIndex: 0,
          explanation: 'Mitochondria are the primary metabolic powerhouses that generate cellular ATP through aerobic respiration.',
        },
      ],
    },
    {
      id: 'game-jaslen-ponce',
      studentId: '8029974',
      studentName: 'Ponce, Jaslen',
      studentSection: '1201',
      sloText: 'Correlate cellular metabolism and respiration pathways with physiological energy demands across active human tissues (Chapter 4).',
      hapsCode: 'AP-19-O-01-04',
      hapsNominal: 'Cellular respiration phases and pathways',
      gameTitle: 'Metabolic Bioenergetics & Respiration Arena',
      gameType: 'rapid-recall',
      aiStudioUrl: 'https://aistudio.google.com/apps/b4ddbcb9-302e-4289-b110-2910c48b67ff?fullscreenApplet=true&showAssistant=true&showPreview=true',
      geminiPrompt: 'Design a high-energy metabolic bioenergetics simulation game exploring glycolysis, the citric acid cycle, and electron transport in human tissues.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-05',
      questions: [
        {
          question: 'Under anaerobic conditions or high-intensity skeletal muscle contraction, pyruvate is reduced to what molecule to regenerate NAD⁺?',
          options: ['Lactate (lactic acid)', 'Acetyl-CoA', 'Oxaloacetate', 'Citrate'],
          correctIndex: 0,
          explanation: 'Lactate dehydrogenase reduces pyruvate to lactate, oxidizing NADH to NAD⁺ so glycolysis can sustain rapid anaerobic ATP synthesis.',
        },
        {
          question: 'What is the final electron acceptor in the mitochondrial electron transport chain during aerobic cellular respiration?',
          options: ['Molecular oxygen (O₂)', 'Cytochrome c', 'Ubiquinone (CoQ)', 'Carbon dioxide (CO₂)'],
          correctIndex: 0,
          explanation: 'Molecular oxygen serves as the terminal electron acceptor, accepting electrons and protons to form metabolic water (H₂O).',
        },
      ],
    },
    {
      id: 'game-hannah-wolford',
      studentId: '8063449',
      studentName: 'Wolford, Hannah',
      studentSection: '1201',
      sloText: 'Synthesize the fundamental homeostatic mechanisms that unify all organ systems in Human Anatomy & Physiology I.',
      hapsCode: 'AP-19-A-07-01',
      hapsNominal: 'Organ systems and components',
      gameTitle: 'HomeoSync v1.0: Cybernetic Homeostasis & Cross-System Synthesis',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://homeosync-a-p-i-homeostasis-synthesis-game.ai.studio/',
      geminiPrompt: 'Design a cybernetic homeostasis simulation game connecting nervous, endocrine, musculoskeletal, and sensory organ systems in A&P I.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-06',
      questions: [
        {
          question: 'In a complex cybernetic feedback loop maintaining arterial blood pressure, which sensor-effector pathway provides rapid compensatory response to sudden orthostatic hypotension?',
          options: [
            'Arterial baroreceptor reflex triggering sympathetic vasoconstriction and tachycardia',
            'Renin-angiotensin-aldosterone axis promoting renal sodium retention',
            'Atrial natriuretic peptide (ANP) release causing systemic vasodilation',
            'Hypothalamic osmoreceptor stimulation of antidiuretic hormone (ADH) secretion'
          ],
          correctIndex: 0,
          explanation: 'Arterial baroreceptors in the carotid sinus and aortic arch detect acute drops in stretch, rapidly increasing sympathetic output to restore blood pressure within seconds.',
        },
        {
          question: 'How do negative feedback loops ensure physiological stability across interconnected organ systems?',
          options: [
            'By sensing deviations from a set point and initiating effector responses that counteract the initial stimulus',
            'By amplifying the initial perturbation to accelerate physiological change until a climatic event occurs',
            'By isolating individual organ systems to operate without neural or humoral communication',
            'By maintaining constant, unchangeable internal variables without any biological fluctuation'
          ],
          correctIndex: 0,
          explanation: 'Negative feedback mechanisms detect shifts away from homeostatic set points and mobilize effectors to oppose the stimulus, preserving dynamic equilibrium across organ systems.',
        },
      ],
    },
    {
      id: 'game-mia-regalado',
      studentId: '8094555',
      studentName: 'Regalado, Mia Pamela',
      studentSection: '1201',
      sloText: 'Compare and contrast how the four primary tissue types contribute to the structure and function of the integumentary and musculoskeletal systems (Chapters 5–9).',
      hapsCode: 'AP-19-D-01-03',
      hapsNominal: 'General features of tissue types',
      gameTitle: 'Tissue Matrix: Integumentary & Musculoskeletal A&P Game',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/apps/5ed18507-22ed-463a-b7f4-6b67a2e8498c?fullscreenApplet=true&showAssistant=true&showPreview=true',
      geminiPrompt: 'Develop an interactive histology and anatomical synthesis game exploring how epithelial, connective, muscle, and nervous tissues integrate across the integumentary and musculoskeletal systems.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-08',
      questions: [
        {
          question: 'Which primary tissue type provides high tensile strength in tendons, connects bone to bone in ligaments, and forms the reticular dermis?',
          options: [
            'Dense regular and irregular connective tissue',
            'Stratified squamous keratinized epithelium',
            'Smooth muscle tissue with intercalated discs',
            'Pseudostratified ciliated columnar tissue'
          ],
          correctIndex: 0,
          explanation: 'Dense regular connective tissue forms tendons and ligaments, while dense irregular connective tissue provides multidirectional tensile strength in the dermis.',
        },
        {
          question: 'In skeletal muscle hierarchical organization, which connective tissue wrapping surrounds individual muscle fascicles?',
          options: [
            'Perimysium',
            'Epimysium',
            'Endomysium',
            'Hypodermis'
          ],
          correctIndex: 0,
          explanation: 'The perimysium surrounds and bundles individual muscle fibers into functional units called fascicles.',
        },
      ],
    },
    {
      id: 'game-jessica-tutor',
      studentId: '7123232',
      studentName: 'Tutor, Jessica Renee',
      studentSection: '1201',
      sloText: 'Compare and contrast the somatic motor nervous system and autonomic nervous system in target tissues, pathways, and neurochemistry (Chapters 11 & 12).',
      hapsCode: 'AP-19-H-02-03',
      hapsNominal: 'Nervous system response to stimuli',
      gameTitle: 'NeuroPathways: Somatic & Autonomic Nervous Systems Quest',
      gameType: 'rapid-recall',
      aiStudioUrl: 'https://aistudio.google.com/apps/80622894-1040-46af-b376-6778cdfe8de3?showAssistant=true&showPreview=true&fullscreenApplet=true',
      geminiPrompt: 'Design an interactive neurobiology game contrasting somatic motor efferents and autonomic two-neuron pathways, neurotransmitters, and receptor mechanisms.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-08',
      questions: [
        {
          question: 'How do somatic motor pathways differ structurally from autonomic efferent pathways?',
          options: [
            'Somatic motor pathways use a single lower motor neuron extending from CNS directly to skeletal muscle, while autonomic pathways utilize a two-neuron chain (preganglionic and postganglionic)',
            'Somatic pathways always synapse in sympathetic chain ganglia before reaching involuntary smooth muscle',
            'Autonomic pathways only utilize unmyelinated fibers with voluntary conscious control',
            'Somatic pathways release norepinephrine onto muscarinic cholinergic receptors'
          ],
          correctIndex: 0,
          explanation: 'Somatic motor pathways have a single heavily myelinated axon reaching directly to skeletal muscle, whereas autonomic pathways require preganglionic and postganglionic neurons in series.',
        },
        {
          question: 'Which neurotransmitter is universally released by all preganglionic autonomic neurons and all somatic motor neurons?',
          options: [
            'Acetylcholine (ACh)',
            'Norepinephrine (NE)',
            'Epinephrine',
            'Dopamine'
          ],
          correctIndex: 0,
          explanation: 'Acetylcholine (ACh) is universally released by somatic motor neurons and preganglionic neurons of both sympathetic and parasympathetic divisions, binding to nicotinic cholinergic receptors.',
        },
      ],
    },
  ];
}
