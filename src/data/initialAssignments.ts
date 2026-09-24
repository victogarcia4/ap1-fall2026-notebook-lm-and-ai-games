import { Assignment, ExamCategory, Student, AIGameData } from '../types';
import { INITIAL_STUDENTS } from './students';
import { ALL_EXAM_SLOS } from './examSlos';

export const LOCAL_STORAGE_ASSIGNMENTS_KEY = 'ap1_notebooklm_assignments_v60';
export const LOCAL_STORAGE_GAMES_KEY = 'ap1_aigame_submissions_v60';
export const LOCAL_STORAGE_STUDENTS_KEY = 'ap1_students_list_v60';

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
        if (exam === 'LE1') {
          notebookUrl = 'https://notebook.google.com/notebook/c6445f28-560c-4d4b-9c50-c41afafbf1a0';
          notebookNotes = 'Describe the human body in anatomical position and apply directional terms correctly.';
        } else {
          notebookUrl = 'https://notebooklm.google.com/notebook/alexa-ap1-submission';
          notebookNotes = 'Completed all 5 assets: Audio deep-dive, 60s video short script, slide deck, infographic map, and flashcard set.';
        }
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
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/1389780e-7789-40e6-8e88-dfa9f40bec16';
          notebookNotes = 'Compare and contrast intramembranous ossification and endochondral (intracartilaginous) bone formation.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/9b905cc8-8128-46ba-ad2c-e6f3e2b327d4';
          notebookNotes = 'Distinguish between the anatomical composition and arrangement of white matter and gray matter in the nervous system.';
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
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/43ceb93e-f9d0-4271-8839-f1f71a769e17';
          notebookNotes = 'Describe the structural and functional components of a somatic reflex arc and differentiate monosynaptic and polysynaptic reflexes.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://ai.studio/apps/44019fff-b160-4b75-8332-b15d3f0fb4cb?fullscreenApplet=true';
          gameTitle = 'ArthroLogic: Joint Mechanics & Pathology Game';
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
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/ac83f241-7af3-48aa-9d8f-4e23b3fceb13';
          notebookNotes = 'List and describe the location of major anatomical regions and abdominopelvic quadrants.';
        } else if (exam === 'LE2') {
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
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/c756a7e3-ac3b-454a-9cf3-1600c6c76bc8?showAssistant=true&showPreview=true&fullscreenApplet=true';
          gameTitle = 'Metabolic Pathways & Physiological Demands Game';
        }
      } else if (student.id === '7131580') { // Douglas, Alyssa (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/a8d9f660-4ef1-4ebe-837d-23ace1b9aef2';
          notebookNotes = 'Define the law of mass balance and relate it to physiological homeostasis.';
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
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/108e48ba-04e6-417c-a7f4-85b1a2bfd985';
          notebookNotes = 'Distinguish between the anatomical composition and arrangement of white matter and gray matter in the nervous system.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/fef0cbcd-a562-4c8c-b6a3-8955043bd4c2?showAssistant=true&showPreview=true';
          gameTitle = 'Calcium Equilibrium: A&P Homeostasis Game';
        }
      } else if (student.id === '7826640') { // Quintanilla, Ellyannie (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/acf49af3-8e45-48aa-90de-a9182daa03d7';
          notebookNotes = 'Physiologically important properties of water: solvency, thermal stability, reactivity, and lubrication.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b444d030-f8cd-4449-92b4-8e648c7f1f79';
          notebookNotes = 'Classify connective tissues (embryonic, loose, dense, cartilage, bone, blood) with their locations and functions.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/c0921b6a-1994-419a-a79a-3645e5fc56b4';
          notebookNotes = 'Identify major bones and anatomical landmarks of the appendicular skeleton (pectoral girdle, upper limbs, pelvic girdle, lower limbs).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/6cd56945-3a43-48ad-824d-aac39187c6be';
          notebookNotes = 'Distinguish between excitatory postsynaptic potentials (EPSPs) and inhibitory postsynaptic potentials (IPSPs), and explain temporal and spatial summation.';
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
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/5ffc0a6d-3f32-4123-a831-9324bd5e7fb3';
          notebookNotes = 'Name the types of epithelium (simple/stratified squamous, cuboidal, columnar, pseudostratified, transitional) and identify organs where each is found.';
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
      } else if (student.id === '7869456') { // Argueta, Dayami (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/9c8164ba-b12d-4f40-95f9-ae0abb37c890';
          notebookNotes = 'Describe the human body in anatomical position and apply directional terms correctly.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/93ef6852-3945-45af-bbd7-2c10fc9713de';
          notebookNotes = 'Compare and contrast anabolism and catabolism in cellular metabolism.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/3b371091-d3a0-447d-9deb-b589d15dfd6c';
          notebookNotes = 'Describe the major functions of the skeletal system (support, protection, movement assistance, mineral homeostasis, blood cell production, triglyceride storage).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/6f64e359-bd56-4869-bdcf-493c68c409b3';
          notebookNotes = 'Describe the general functions (sensory, integrative, motor) and structural/functional divisions of the nervous system (CNS, PNS, SNS, ANS, ENS).';
        }
      } else if (student.id === '7989701') { // Bussey, Leslie Ann (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/f8693d47-c0a8-4eca-9595-e290499175ed';
          notebookNotes = 'Describe the major levels of structural organization in the human organism from chemical to organismal.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/817512cb-a5d6-4e16-9f6f-00b2bc27a5c9';
          notebookNotes = 'Explain the phases of cellular respiration: glycolysis, the citric acid cycle (Krebs cycle), and oxidative phosphorylation.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/0f2333a3-e443-4b6f-b9a1-bace96c8eb1e';
          notebookNotes = 'Identify the microscopic structure of compact bone (osteons, concentric lamellae, central canal, canaliculi, lacunae) and spongy bone (trabeculae).';
        }
      } else if (student.id === '8028028') { // Turrubiartes, Miley (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/c248316c-cf68-41b2-a446-93e7e8b40e26';
          notebookNotes = 'Compare and contrast lipids (triglycerides, phospholipids, steroids) in molecular structure and cellular roles.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/e1932bd2-3b70-40cc-b4f8-197fc0bd0154';
          notebookNotes = 'Describe the structure, locations, and functions of mucous, serous, cutaneous, and synovial membranes.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/96eeebc8-0f4a-4278-848d-2b8fc688834f';
          notebookNotes = 'Explain the relationship between the anatomical and functional classifications of joints.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/496d65bd-59bd-4f74-8fce-8689802e04d1';
          notebookNotes = 'Discuss the formation, circulation, and functions of cerebrospinal fluid (CSF) through the ventricular system and subarachnoid space.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/3051a604-b1f4-49d9-827d-144b917e9183?fullscreenApplet=true&showAssistant=true&showPreview=true';
          gameTitle = 'CardioQuest: A&P Heart Flow & Hemodynamics';
        }
      } else if (student.id === '8060817') { // Carpio, Katherine (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/68b8850d-ede6-4f6b-a28a-e33e820074b9';
          notebookNotes = 'List the organ systems of the human body and summarize their primary functions.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/199c1565-1716-415e-83c2-2684df6e9366';
          notebookNotes = 'Describe the anaerobic pathway of lactic acid fermentation and compare its energy yield to aerobic respiration.';
        }
      } else if (student.id === '7237055') { // Guzman, Blanca E. (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b55387e1-7153-46d3-9a1a-0d6028ea1ce2';
          notebookNotes = 'Define acid, base, buffer, and interpret the pH scale with respect to hydrogen ion concentration.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/c98bda8d-6994-4ea3-abf3-03aa33d6b31a';
          notebookNotes = 'Distinguish among the three types of muscle tissue (skeletal, cardiac, smooth) with respect to histology, location, and control.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/119c7e1b-aff2-456d-ad90-c2e3956d726f';
          notebookNotes = 'List major classes of neurotransmitters (acetylcholine, amino acids, monoamines, neuropeptides, gases) and describe their primary mechanisms.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/908cef3a-e588-4668-a426-73b369b1f632?fullscreenApplet=true&showAssistant=true&showPreview=true';
          gameTitle = 'Nexus A&P: Homeostasis Master Game';
        }
      } else if (student.id === '7332513') { // Sisavath, Steven Lucky (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b9a47789-af3b-46f7-a281-1a18f033e623';
          notebookNotes = 'Describe the building blocks, structural classes, and biological functions of carbohydrates.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/4f4305da-2bf8-4b06-af55-1877b7e1c28e';
          notebookNotes = 'Describe the general characteristics, cellular composition (neurons and neuroglia), and functions of nervous tissue.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/62f19839-61b2-4204-9b82-d08780ab0e1b';
          notebookNotes = 'Describe the functional classification of joints based on movement: synarthroses, amphiarthroses, and diarthroses.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/857f41f0-3527-4568-b8c2-b118b07a42ee';
          notebookNotes = 'Describe the coverings (meninges: dura mater, arachnoid mater, pia mater) and spaces surrounding the brain and spinal cord.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/22d86fa8-8b7f-4176-8ed5-079f5e838e72?fullscreenApplet=true&showAssistant=true&showPreview=true';
          gameTitle = 'BioFoundation: Cellular to Tissue A&P Game';
        }
      } else if (student.id === '7989206' || student.name.includes('Jesus')) { // Lopez, Jesus (Section 1201)
        if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/a4a123dd-4f57-4669-84fd-be4a4ebcde97';
          notebookNotes = 'Detail the countercurrent multiplier and urea trapping mechanisms forming concentrated urine under ADH.';
        }
      } else if (student.id === '7986008') { // Devora, Giovanni Eraquio (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b435e5b4-145a-4ad6-bd03-360699d3fa15';
          notebookNotes = 'Explain why negative feedback is the predominant homeostatic regulatory mechanism in the body.';
        }
      } else if (student.id === '7356820') { // Gentry, Quincy Jerrod (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/dcf3c8ab-5590-4e22-8a7a-80a9d0eec93d';
          notebookNotes = 'Compare and contrast positive and negative feedback mechanisms, providing physiological examples of each.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/449cb85b-19a9-4ec1-a784-c6455f079b4c';
          notebookNotes = 'List the four major tissue types in the body (epithelial, connective, muscle, nervous) and indicate their primary locations and functions.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/42d23005-76f1-4998-9f75-8eeba505bd85';
          notebookNotes = 'Compare and contrast interstitial (lengthwise) and appositional (width) bone growth.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/9fcfd0b1-74bd-4b7c-89b4-c94f355f6d05';
          notebookNotes = 'Explain how the resting membrane potential (RMP) is established and maintained across neuronal membranes.';
        }
      } else if (student.id === '7928723') { // Resendiz, Luz (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/25a66ee8-8db7-47ff-87e5-8b98affd6a8c';
          notebookNotes = 'Describe the structure and functions of nucleic acids (DNA and RNA) and the role of ATP as the cellular energy currency.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/809311e1-c944-4b9c-86ed-28b6a1929966';
          notebookNotes = 'List the components of the integumentary system and the subcutaneous layer (hypodermis).';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/24872f45-2544-4d32-acb4-fa517c3df70d';
          notebookNotes = 'Define the movements that occur at synovial joints (flexion, extension, hyperextension, abduction, adduction, circumduction, rotation, supination, pronation, inversion, eversion).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/97310ab7-b266-42e2-b781-b0381d9dfefc';
          notebookNotes = 'Explain the functions of the limbic system in emotion and memory, and the reticular activating system (RAS) in consciousness and arousal.';
        }
      } else if (student.id === '8088157') { // Rivera Rodriguez, Thalia De La Caridad (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/60553a35-8d34-4ec0-96cb-5cf9e401111b';
          notebookNotes = 'Describe the chemical composition and fluid mosaic model of the plasma membrane.';
        }
      } else if (student.id === '8150234') { // Franco, Regina (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/4c335af4-a1cf-48a7-9a08-816ae55b4644?authuser=1';
          notebookNotes = 'Explain the mechanisms of covalent, ionic, and hydrogen chemical bonds with biological examples (flashcards generated from selected sources).';
        }
      } else if (student.id === '8031930') { // Guzman, Ashlie Nancie (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/225ddc70-59e8-4ec7-aa7f-24b3534ecf8d';
          notebookNotes = 'Describe the physiologically important properties of water (solvency, thermal stability, reactivity, lubrication).';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/8248a8c7-ddc7-4b2d-92de-6ac6cbc364f1';
          notebookNotes = 'Classify connective tissues (embryonic, loose, dense, cartilage, bone, blood) with their locations and functions.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/0c78b773-d1d5-4cac-9e0b-3afff2fc2663';
          notebookNotes = 'Identify major bones and anatomical landmarks of the appendicular skeleton (pectoral girdle, upper limbs, pelvic girdle, lower limbs).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/d603a41e-4947-4042-87e7-1b34dd0d5e05';
          notebookNotes = 'Distinguish between excitatory postsynaptic potentials (EPSPs) and inhibitory postsynaptic potentials (IPSPs), and explain temporal and spatial summation.';
        }
      } else if (student.id === '7948782') { // Campa, Yarely (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b1b8dfd1-3c40-412d-ac52-ce0cf1d6554c';
          notebookNotes = 'Describe the major levels of structural organization in the human organism from chemical to organismal.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://aistudio.google.com/apps/6a29bb9e-50d9-4e28-bd83-5ee1b22881ae?fullscreenApplet=true';
          gameTitle = 'Tissue Architect: A&P Histology Quest';
        }
      } else if (student.id === '7687626') { // Taft, William (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b1e84672-d7ca-4eed-84b3-f1806900857a';
          notebookNotes = 'Define resting membrane potential (RMP) and explain how the Na+/K+ ATPase pump maintains it.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/19373a08-9468-47a1-b124-7f5499a89c62';
          notebookNotes = 'Describe the cellular processes of growth and keratinization in the epidermis.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/a3e831c7-816b-42bc-a2df-1f64f3ae0b60';
          notebookNotes = 'Compare and contrast the structure, location, histology, and control of skeletal, cardiac, and smooth muscle tissue.';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/a50403d2-a5fa-4243-bfdf-71ee5490f8fd';
          notebookNotes = 'Identify the 12 pairs of cranial nerves by Roman numeral and name, classifying their functional fiber types (sensory, motor, mixed) and major actions.';
        }
      } else if (student.id === '8002796') { // Williams, Asia Amyrie (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/6ffaf8c8-3cdc-4462-8291-1c0ff2186385';
          notebookNotes = 'Explain the four levels of protein structure (primary, secondary, tertiary, quaternary) and the consequences of denaturation.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/d8f8ef0b-952c-486b-8df5-e8c02607a6bd';
          notebookNotes = 'Compare and contrast intercellular junctions: tight junctions, desmosomes, and gap junctions.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/302e75e7-8e29-4cb5-ab26-62754d4876b0';
          notebookNotes = 'Identify and describe the major structural components of a typical synovial joint (articular capsule, synovial fluid, ligaments, articular discs, bursae).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/1c26b944-0c01-4b8e-8ab1-5407d7a8f211';
          notebookNotes = 'Examine CNS and PNS divisions, brain structures, meninges, CSF circulation, spinal cord tracts, reflex arcs, and autonomic pathways.';
        }
      } else if (student.id === '7998925') { // Dokes, Donmonique (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/c4c0d7c1-3b35-42a9-b08b-e9063852e497';
          notebookNotes = 'Compare and contrast positive and negative feedback mechanisms, providing physiological examples of each.';
        }
      } else if (student.id === '8035519') { // Carrizalez, Dulce Maria (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b71ba69e-6564-457f-9cf3-9e348c8f0ef1';
          notebookNotes = 'List the organ systems of the human body and summarize their primary functions.';
        }
      } else if (student.id === '7937808') { // Torres, Katherine Stephanie (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/0d8e48cd-33cf-49bb-bf05-0ba930959218?pli=1';
          notebookNotes = 'Define the genetic code, transcription, and translation, detailing how genetic information directs protein synthesis.';
        }
      } else if (student.id === '7854589') { // Banks Jr, Christopher Kareen (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/42074515-7c4e-48f8-a232-d15a4e03740f';
          notebookNotes = 'List and describe the location of major anatomical regions and abdominopelvic quadrants.';
        }
      } else if (student.id === '7837615') { // Robinson, Jax (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/990cde96-2338-4adb-954d-09541d5089e7';
          notebookNotes = 'Describe the structure and function of cellular organelles (nucleus, ribosomes, ER, Golgi apparatus, mitochondria, lysosomes, peroxisomes).';
        }
      } else if (student.id === '7995287') { // Rochez, Samantha Nevaeh (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/bbf9aaaf-a9c4-453f-94df-de4d0e389149';
          notebookNotes = 'Describe the structural components and cellular functions of the cytoskeleton (microfilaments, intermediate filaments, microtubules).';
        }
      } else if (student.id === '7946428') { // Okafor, Angel Kamsi (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/eb600c90-3471-4a17-9916-01b32b5b96a8?original_referer=https:%2F%2Fd2l.lonestar.edu%23';
          notebookNotes = 'Define resting membrane potential (RMP) and explain how the Na+/K+ ATPase pump maintains it.';
        } else if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/ae91ee64-adda-41e0-9a9c-431c45fecea9';
          notebookNotes = 'Describe the cellular processes of growth and keratinization in the epidermis.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/07e9bdef-24ba-449a-ae46-8749b5288930?authuser=3';
          notebookNotes = 'Compare and contrast the structure, location, histology, and control of skeletal, cardiac, and smooth muscle tissue.';
        }
      } else if (student.id === '7895965') { // Hubbard, Shelby Gemese (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/b59c93a8-3e4e-499a-bec9-825e2e6d0425';
          notebookNotes = 'Compare and contrast lipids (triglycerides, phospholipids, steroids) in molecular structure and cellular roles.';
        }
      } else if (student.id === '8112484') { // Reed, Gabrielle Nicole (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/74553f4f-9527-4ed6-b92f-40116db975cf';
          notebookNotes = 'Compare and contrast vesicular transport mechanisms: phagocytosis, pinocytosis, receptor-mediated endocytosis, and exocytosis.';
        }
      } else if (student.id === '7450125') { // Solano, Monserrat Adela (Section 1101)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/abc745af-8247-40b3-a541-df7818fb6b24';
          notebookNotes = 'Describe the events in each phase of somatic cell division (mitosis: prophase, metaphase, anaphase, telophase and cytokinesis).';
        }
      } else if (student.id === '8036488') { // Richard, Alayzia (Section 1501)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/ef2bc406-a96a-40af-92c9-7af62bae6207';
          notebookNotes = 'Define acid, base, buffer, and interpret the pH scale with respect to hydrogen ion concentration.';
        }
      } else if (student.id === '8127365') { // Duarte Lucas, Fatima (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/3b4bffd9-aa6d-45ec-b85d-d84675f48f5c';
          notebookNotes = 'Explain why negative feedback is the predominant homeostatic regulatory mechanism in the body.';
        } else if (exam === 'Final') {
          status = 'submitted';
          gameUrl = 'https://skeletal-muscle-contraction-game.ai.studio/';
          gameTitle = 'Skeletal Muscle Contraction: The Bio-Circuit';
        }
      } else if (student.id === '7989205') { // Lopez, Itzel Danay (Section 1201)
        if (exam === 'LE1') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/fcff15d6-aa7b-44b7-9a7c-4ceaab462506';
          notebookNotes = 'Describe the physiologically important properties of water (solvency, thermal stability, reactivity, lubrication).';
        }
      } else if (student.id === '8043673') { // Iglesias, Camila (Section 1201)
        if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/57c739ba-eb39-4d73-9188-7f5b14897f26';
          notebookNotes = 'Classify bones of the human skeleton based on their shape (long, short, flat, irregular, sesamoid).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/ebc99fbd-6f88-4be8-b604-e839fea9d2f9';
          notebookNotes = 'Compare continuous conduction in unmyelinated axons with saltatory conduction in myelinated axons.';
        }
      } else if (student.id === '8029112') { // Aviles, Carmen Stephany (Section 1201)
        if (exam === 'LE2') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/694d4573-a3c5-4aa6-bc97-f1458615e912';
          notebookNotes = 'Explain the central role of ATP in coupled metabolic reactions.';
        } else if (exam === 'LE3') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/bea8b184-4647-4937-9c08-babee6fd610c';
          notebookNotes = 'Identify and describe the structural components of a long bone (diaphysis, epiphyses, metaphyses, articular cartilage, periosteum, endosteum, medullary cavity).';
        } else if (exam === 'LE4') {
          status = 'submitted';
          notebookUrl = 'https://notebook.google.com/notebook/a9946a44-339e-439c-85ce-93115ef04960';
          notebookNotes = 'Describe the anatomy of a multipolar neuron (cell body/soma, dendrites, axon, axon hillock, initial segment, synaptic end bulbs).';
        }
      }

      const isSubmitted = status === 'submitted' || status === 'reviewed';
      const isJesusLE4 = (student.id === '7989206' || student.name.includes('Jesus')) && exam === 'LE4';
      const isTaft = student.id === '7687626';

      let finalSloId = slo.id;
      let finalSloText = slo.text;
      let finalHapsCode = slo.hapsCode;
      let finalHapsNominal = slo.hapsNominal;
      let finalChapter = slo.chapter;

      if (isJesusLE4) {
        finalSloId = 'LE4-SLO-ADV';
        finalSloText = 'Detail the countercurrent multiplier and urea trapping mechanisms forming concentrated urine under ADH.';
        finalHapsCode = 'AP-19-N-04-03';
        finalHapsNominal = 'Countercurrent multiplier & urea trapping under ADH';
        finalChapter = 'Renal Physiology / ADH';
      } else if (isTaft) {
        if (exam === 'LE1') {
          finalSloId = 'LE1-SLO-21';
          finalSloText = 'Define resting membrane potential (RMP) and explain how the Na+/K+ ATPase pump maintains it.';
          finalHapsCode = 'AP-19-C-09-01';
          finalHapsNominal = 'Resting membrane potential';
          finalChapter = 'Chapter 3';
        } else if (exam === 'LE2') {
          finalSloId = 'LE2-SLO-21';
          finalSloText = 'Describe the cellular processes of growth and keratinization in the epidermis.';
          finalHapsCode = 'AP-19-E-02-04';
          finalHapsNominal = 'Growth and keratinization of epidermis';
          finalChapter = 'Chapter 6';
        } else if (exam === 'LE3') {
          finalSloId = 'LE3-SLO-21';
          finalSloText = 'Compare and contrast the structure, location, histology, and control of skeletal, cardiac, and smooth muscle tissue.';
          finalHapsCode = 'AP-19-G-02-01';
          finalHapsNominal = 'Skeletal, cardiac, and smooth muscle comparison';
          finalChapter = 'Chapter 9';
        } else if (exam === 'LE4') {
          finalSloId = 'LE4-SLO-21';
          finalSloText = 'Identify the 12 pairs of cranial nerves by Roman numeral and name, classifying their functional fiber types (sensory, motor, mixed) and major actions.';
          finalHapsCode = 'AP-19-H-11-01';
          finalHapsNominal = 'Cranial nerves and major functions';
          finalChapter = 'Chapter 11';
        }
      }

      assignments.push({
        id: assignmentId,
        studentId: student.id,
        studentName: student.name,
        studentSection: student.section,
        exam,
        sloId: finalSloId,
        sloText: finalSloText,
        hapsCode: finalHapsCode,
        hapsNominal: finalHapsNominal,
        chapter: finalChapter,
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
    {
      id: 'game-miley-turrubiartes',
      studentId: '8028028',
      studentName: 'Turrubiartes, Miley',
      studentSection: '1501',
      sloText: 'Correlate cellular metabolism and respiration pathways with physiological energy demands across active human tissues (Chapter 4).',
      hapsCode: 'AP-19-O-01-04',
      hapsNominal: 'Cellular respiration phases and pathways',
      gameTitle: 'CardioQuest: A&P Heart Flow & Hemodynamics',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/apps/3051a604-b1f4-49d9-827d-144b917e9183?fullscreenApplet=true&showAssistant=true&showPreview=true',
      geminiPrompt: 'Design an interactive clinical physiology game challenging students on cardiac blood flow sequence, heart chamber pressures, valve mechanics, and systemic hemodynamics.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-10',
      questions: [
        {
          question: 'Following systemic venous return through the superior and inferior vena cavae, into which heart chamber does deoxygenated blood first enter?',
          options: [
            'Right atrium',
            'Right ventricle',
            'Left atrium',
            'Pulmonary trunk'
          ],
          correctIndex: 0,
          explanation: 'Deoxygenated venous blood from systemic circulation enters the right atrium via the superior and inferior vena cavae and coronary sinus.',
        },
        {
          question: 'During ventricular systole, which heart valves are forced open to permit blood ejection into the great vessels?',
          options: [
            'Aortic and pulmonary semilunar valves',
            'Tricuspid and bicuspid (mitral) atrioventricular valves',
            'Eustachian valve and foramen ovale',
            'Coronary sinus valve'
          ],
          correctIndex: 0,
          explanation: 'High ventricular pressures overcome systemic arterial backpressure, forcing the aortic and pulmonary semilunar valves open.',
        },
      ],
    },
    {
      id: 'game-steven-sisavath',
      studentId: '7332513',
      studentName: 'Sisavath, Steven Lucky',
      studentSection: '1501',
      sloText: 'Explain how chemistry, cellular biology, and transport mechanisms establish the biological foundation for tissue function (Chapters 1–3).',
      hapsCode: 'AP-19-F-02-01',
      hapsNominal: 'Biological foundations: cellular to tissue organization',
      gameTitle: 'BioFoundation: Cellular to Tissue A&P Game',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/apps/22d86fa8-8b7f-4176-8ed5-079f5e838e72?fullscreenApplet=true&showAssistant=true&showPreview=true',
      geminiPrompt: 'Design an interactive A&P review game exploring how biochemical macromolecules, cellular transport mechanisms, and organelles coordinate to sustain histological tissue physiology.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-10',
      questions: [
        {
          question: 'Which biomacromolecule serves as the primary immediate source of cellular ATP through glycolysis and oxidative phosphorylation?',
          options: [
            'Carbohydrates (monosaccharides like glucose)',
            'Phospholipids',
            'Triglycerides',
            'Nucleic acids'
          ],
          correctIndex: 0,
          explanation: 'Carbohydrates, particularly glucose, are rapidly catabolized to produce cellular ATP via glycolysis, the citric acid cycle, and oxidative phosphorylation.',
        },
        {
          question: 'What cellular transport mechanism moves solutes against their electrochemical gradient using direct energy from ATP hydrolysis?',
          options: [
            'Primary active transport',
            'Facilitated diffusion',
            'Simple diffusion',
            'Osmosis'
          ],
          correctIndex: 0,
          explanation: 'Primary active transport directly hydrolyzes ATP to move ions and solutes against their concentration or electrical gradient (e.g., Na+/K+ ATPase pump).',
        },
      ],
    },
    {
      id: 'game-dana-davis',
      studentId: '7959119',
      studentName: 'Davis, Dana Yvette',
      studentSection: '1501',
      sloText: 'Explain how calcium homeostasis is dynamically regulated through negative feedback loops involving parathyroid hormone (PTH), calcitonin, osteoclasts, and kidneys.',
      hapsCode: 'AP-19-F-04-03',
      hapsNominal: 'Calcium homeostasis & regulation (PTH, calcitonin)',
      gameTitle: 'Calcium Equilibrium: A&P Homeostasis Game',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/apps/fef0cbcd-a562-4c8c-b6a3-8955043bd4c2?showAssistant=true&showPreview=true',
      geminiPrompt: 'Design an interactive A&P simulation game where students balance systemic calcium ions through endocrine feedback loops of parathyroid hormone and calcitonin.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-11',
      questions: [
        {
          question: 'When blood calcium levels drop below the normal homeostatic set point, which endocrine gland releases parathyroid hormone (PTH)?',
          options: [
            'Parathyroid glands',
            'Thyroid parafollicular (C) cells',
            'Anterior pituitary gland',
            'Adrenal cortex',
          ],
          correctIndex: 0,
          explanation: 'Low blood calcium triggers the parathyroid glands to secrete PTH, stimulating osteoclast activity and renal calcium reabsorption.',
        },
        {
          question: 'How does calcitonin counteract hypercalcemia in systemic mineral regulation?',
          options: [
            'Inhibiting osteoclasts and promoting calcium deposition into bone matrix',
            'Stimulating osteoclasts to resorb bone matrix',
            'Increasing intestinal absorption of calcium via calcitriol',
            'Decreasing renal calcium excretion in urine',
          ],
          correctIndex: 0,
          explanation: 'Calcitonin, secreted by thyroid parafollicular cells during hypercalcemia, inhibits osteoclasts and stimulates bone calcium uptake.',
        },
      ],
    },
    {
      id: 'game-cyaira-bell',
      studentId: '8159253',
      studentName: 'Bell, Cyaira',
      studentSection: '1501',
      sloText: 'Correlate cellular metabolism and respiration pathways with physiological energy demands during resting, exercise, and fasting states.',
      hapsCode: 'AP-19-C-05-06',
      hapsNominal: 'Cellular metabolism and energy demands',
      gameTitle: 'Metabolic Pathways & Physiological Demands Game',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/apps/c756a7e3-ac3b-454a-9cf3-1600c6c76bc8?showAssistant=true&showPreview=true&fullscreenApplet=true',
      geminiPrompt: 'Design an interactive A&P challenge modeling cellular respiration, glycolysis, the citric acid cycle, and oxidative phosphorylation across resting, exercise, and fasting metabolic states.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-12',
      questions: [
        {
          question: 'During intense anaerobic exercise when oxygen delivery to skeletal muscle is insufficient, pyruvate is converted into which molecule to regenerate NAD+ for glycolysis?',
          options: [
            'Lactic acid (lactate)',
            'Acetyl-CoA',
            'Citric acid',
            'Oxaloacetate',
          ],
          correctIndex: 0,
          explanation: 'Under anaerobic conditions, lactate dehydrogenase reduces pyruvate to lactate, oxidizing NADH back to NAD+ so glycolysis can continue generating ATP.',
        },
        {
          question: 'In prolonged fasting states, what alternative fuel source is synthesized by the liver through beta-oxidation of fatty acids to nourish cardiac muscle and the brain?',
          options: [
            'Ketone bodies (acetoacetate, beta-hydroxybutyrate)',
            'Glycogen',
            'Essential amino acids',
            'Lactose',
          ],
          correctIndex: 0,
          explanation: 'During prolonged fasting or carbohydrate depletion, the liver converts acetyl-CoA from fatty acid breakdown into ketone bodies to supply energy to the brain and heart.',
        },
      ],
    },
    {
      id: 'game-noemi-santillan',
      studentId: '7828698',
      studentName: 'Santillan, Noemi Abigail',
      studentSection: '1201',
      sloText: 'Evaluate how the structural classification of joints directly dictates mobility, stability, and susceptibility to clinical pathology (Chapter 8).',
      hapsCode: 'AP-19-F-08-01',
      hapsNominal: 'Joint structural classification (fibrous, cartilaginous, synovial)',
      gameTitle: 'ArthroLogic: Joint Mechanics & Pathology Game',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://ai.studio/apps/44019fff-b160-4b75-8332-b15d3f0fb4cb?fullscreenApplet=true',
      geminiPrompt: 'Design an interactive A&P simulation game that tests how the structural classification of joints (fibrous, cartilaginous, synovial) dictates degrees of mobility, stability tradeoffs, and susceptibility to pathologies like osteoarthritis and rheumatoid arthritis.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-14',
      questions: [
        {
          question: 'Which structural class of joints features a fluid-filled cavity, provides the greatest range of motion, and is most susceptible to acute dislocations and degenerative osteoarthritis?',
          options: [
            'Synovial joints (diarthroses)',
            'Fibrous sutures (synarthroses)',
            'Cartilaginous symphyses (amphiarthroses)',
            'Gomphoses',
          ],
          correctIndex: 0,
          explanation: 'Synovial joints are diarthrotic and offer extensive mobility through a joint capsule and articular cartilage, but their high range of motion makes them vulnerable to injury and mechanical wear.',
        },
        {
          question: 'How does the autoimmune mechanism of rheumatoid arthritis differ pathologically from the wear-and-tear degeneration observed in primary osteoarthritis?',
          options: [
            'Rheumatoid arthritis involves immune-mediated chronic inflammation and pannus destruction of the synovial membrane, whereas osteoarthritis primarily involves progressive mechanical erosion of articular cartilage.',
            'Osteoarthritis is caused by systemic autoimmune antibodies attacking chondrocytes.',
            'Rheumatoid arthritis only affects fibrous joints such as cranial sutures.',
            'Osteoarthritis spares the articular cartilage and only affects the epiphyseal plates.',
          ],
          correctIndex: 0,
          explanation: 'Rheumatoid arthritis is an autoimmune disorder targeting the synovial membrane with inflammatory pannus formation, while osteoarthritis is a biomechanical breakdown of articular cartilage over time.',
        },
      ],
    },
    {
      id: 'game-yarely-campa',
      studentId: '7948782',
      studentName: 'Campa, Yarely',
      studentSection: '1201',
      sloText: 'Compare and contrast how the four primary tissue types contribute to the structure and function of the integumentary and musculoskeletal systems (Chapters 5–9).',
      hapsCode: 'AP-19-D-01-01',
      hapsNominal: 'Four primary tissue types comparison',
      gameTitle: 'Tissue Architect: A&P Histology Quest',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/apps/6a29bb9e-50d9-4e28-bd83-5ee1b22881ae?fullscreenApplet=true',
      geminiPrompt: 'Design an interactive histology and tissue architecture game exploring the four primary tissue types across integumentary and musculoskeletal systems, challenging students to match tissue histology with physiological function.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-15',
      questions: [
        {
          question: 'Which of the four primary tissue types is characterized by an abundance of extracellular matrix containing ground substance and protein fibers, serving to bind, support, and protect body organs?',
          options: [
            'Connective tissue',
            'Epithelial tissue',
            'Muscle tissue',
            'Nervous tissue',
          ],
          correctIndex: 0,
          explanation: 'Connective tissue is defined by relatively few cells surrounded by abundant extracellular matrix, providing tensile strength, elasticity, and physiological support.',
        },
        {
          question: 'How do the specialized intercellular junctions (such as desmosomes and tight junctions) of epithelial tissue support its role as the barrier layer of the integument?',
          options: [
            'They create continuous impermeable or mechanically resilient sheets preventing transcellular leakage and resisting mechanical shearing stress.',
            'They allow rapid electrical coupling similar to intercalated discs.',
            'They produce calcium phosphate mineral crystals for rigidity.',
            'They generate contractile force to adjust epidermal surface area.',
          ],
          correctIndex: 0,
          explanation: 'Tight junctions seal adjacent cell membranes to prevent water and solute leakage, while desmosomes anchor keratin intermediate filaments across cells to resist mechanical strain.',
        },
      ],
    },
    {
      id: 'game-fatima-duarte-lucas',
      studentId: '8127365',
      studentName: 'Duarte Lucas, Fatima',
      studentSection: '1201',
      sloText: 'Integrate the events of neural excitation, neuromuscular junction transmission, and sliding filament contraction in skeletal muscle performance (Chapters 9 & 10).',
      hapsCode: 'AP-19-G-03-01',
      hapsNominal: 'Neuromuscular junction & muscle contraction mechanism',
      gameTitle: 'Skeletal Muscle Contraction: The Bio-Circuit',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://skeletal-muscle-contraction-game.ai.studio/',
      geminiPrompt: 'Design an interactive A&P bio-circuit learning game exploring the sequence of events in neural excitation, acetylcholine release at the neuromuscular junction, action potential propagation down T-tubules, calcium release from the sarcoplasmic reticulum, and the sliding filament mechanism of skeletal muscle contraction.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-18',
      questions: [
        {
          question: 'What triggers the release of acetylcholine (ACh) from synaptic vesicles into the synaptic cleft at the neuromuscular junction?',
          options: [
            'Influx of calcium ions (Ca²⁺) through voltage-gated channels in the axon terminal upon action potential arrival',
            'Efflux of potassium ions (K⁺) through leakage channels',
            'Direct mechanical pulling of synaptic vesicles by actin filaments',
            'Depolarization of the muscle sarcolemma motor end plate',
          ],
          correctIndex: 0,
          explanation: 'When a nerve action potential reaches the axon terminal, it opens voltage-gated Ca²⁺ channels. Calcium influx triggers exocytosis of ACh vesicles into the synaptic cleft.',
        },
        {
          question: 'During excitation-contraction coupling, calcium ions released from the terminal cisternae of the sarcoplasmic reticulum bind to which regulatory protein?',
          options: [
            'Troponin',
            'Tropomyosin',
            'Myosin heavy chain',
            'Dystrophin',
          ],
          correctIndex: 0,
          explanation: 'Calcium binds to troponin, causing a conformational change that pulls tropomyosin away from the active binding sites on actin filaments.',
        },
        {
          question: 'What immediate event provides the mechanical energy for the myosin head power stroke during cross-bridge cycling?',
          options: [
            'Release of inorganic phosphate (Pi) and ADP from the myosin head',
            'Binding of a new ATP molecule to the myosin ATPase site',
            'Hydrolysis of ATP into ADP and Pi',
            'Active transport of calcium back into the sarcoplasmic reticulum',
          ],
          correctIndex: 0,
          explanation: 'The release of inorganic phosphate (Pi) triggers the conformational power stroke of the myosin head, pulling the thin filament toward the center of the sarcomere (M line).',
        },
      ],
    },
    {
      id: 'game-blanca-guzman',
      studentId: '7237055',
      studentName: 'Guzman, Blanca E.',
      studentSection: '1101',
      sloText: 'Synthesize the fundamental homeostatic mechanisms that unify all organ systems in Human Anatomy & Physiology I.',
      hapsCode: 'AP-19-A-07-01',
      hapsNominal: 'Homeostatic mechanisms and organ systems integration',
      gameTitle: 'Nexus A&P: Homeostasis Master Game',
      gameType: 'clinical-scenario',
      aiStudioUrl: 'https://aistudio.google.com/apps/908cef3a-e588-4668-a426-73b369b1f632?fullscreenApplet=true&showAssistant=true&showPreview=true',
      geminiPrompt: 'Nexus A&P: An interactive homeostatic crisis and system balancing game testing mastery of negative feedback loops, set points, physiological sensors, integrators, and effectors across organ systems.',
      status: 'submitted',
      extraCreditScore: 100,
      submittedAt: '2026-09-20',
      questions: [
        {
          question: 'In homeostatic feedback mechanisms, what is the key functional distinction between negative feedback and positive feedback?',
          options: [
            'Negative feedback counteracts deviations from a set point to restore equilibrium, while positive feedback amplifies deviations toward a specific endpoint',
            'Negative feedback always decreases blood pressure, while positive feedback increases heart rate',
            'Negative feedback occurs only in endocrine glands, while positive feedback is restricted to neurons',
            'Negative feedback causes organ dysfunction, while positive feedback produces homeostatic adaptation',
          ],
          correctIndex: 0,
          explanation: 'Negative feedback loops reverse any divergence from the physiological set point to maintain stability, whereas positive feedback enhances the stimulus to complete a definitive physiological event (e.g., labor contractions or blood clotting).',
        },
        {
          question: 'Which sequence correctly represents the flow of information through a canonical homeostatic control system?',
          options: [
            'Receptor (sensor) → Afferent pathway → Control center (integrator) → Efferent pathway → Effector',
            'Effector → Efferent pathway → Control center → Afferent pathway → Receptor',
            'Control center → Receptor → Afferent pathway → Effector → Efferent pathway',
            'Stimulus → Effector → Afferent pathway → Control center → Response',
          ],
          correctIndex: 0,
          explanation: 'Sensory receptors detect changes in a regulated variable and send signals along afferent pathways to the control center, which determines the set point and coordinates effector responses via efferent pathways.',
        },
        {
          question: 'Which of the following is the primary control center for regulating core body temperature in the human body?',
          options: [
            'Hypothalamus',
            'Medulla oblongata',
            'Adrenal cortex',
            'Thalamus',
          ],
          correctIndex: 0,
          explanation: 'The preoptic and anterior regions of the hypothalamus act as the primary biological thermostat, receiving thermoreceptor input and directing cutaneous vasodilation, sweating, shivering, or vasoconstriction.',
        },
      ],
    },
  ];
}
