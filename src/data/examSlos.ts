import { SLOItem, ExamCategory } from '../types';
import { findHapsCorrelation } from './hapsData';

// ============================================================================
// LE1: Chapter 1 (Introduction), Chapter 2 (Chemical Level), Chapter 3 (Cellular Level)
// ============================================================================
const RAW_LE1 = [
  // Chapter 1: Introduction to Anatomy & Physiology, Body Plan & Homeostasis
  "Describe the human body in anatomical position and apply directional terms correctly.",
  "Identify and define anatomical planes (sagittal, coronal, transverse) and major body cavities.",
  "List and describe the location of major anatomical regions and abdominopelvic quadrants.",
  "Describe the major levels of structural organization in the human organism from chemical to organismal.",
  "List the organ systems of the human body and summarize their primary functions.",
  "Define homeostasis and explain the components of a homeostatic mechanism (receptor, control center, effector).",
  "Compare and contrast positive and negative feedback mechanisms, providing physiological examples of each.",
  "Explain why negative feedback is the predominant homeostatic regulatory mechanism in the body.",
  "Define the law of mass balance and relate it to physiological homeostasis.",

  // Chapter 2: Chemical Level of Organization
  "Describe the charge, mass, and location of subatomic particles (protons, neutrons, electrons) in an atom.",
  "Explain the mechanisms of covalent, ionic, and hydrogen chemical bonds with biological examples.",
  "Describe the physiologically important properties of water (solvency, thermal stability, reactivity, lubrication).",
  "Define acid, base, buffer, and interpret the pH scale with respect to hydrogen ion concentration.",
  "Describe the building blocks, structural classes, and biological functions of carbohydrates.",
  "Compare and contrast lipids (triglycerides, phospholipids, steroids) in molecular structure and cellular roles.",
  "Explain the four levels of protein structure (primary, secondary, tertiary, quaternary) and the consequences of denaturation.",
  "Define enzyme and active site, and explain how temperature, pH, and substrate concentration affect enzymatic activity.",
  "Describe the structure and functions of nucleic acids (DNA and RNA) and the role of ATP as the cellular energy currency.",

  // Chapter 3: Cellular Level of Organization
  "Describe the chemical composition and fluid mosaic model of the plasma membrane.",
  "Compare and contrast simple diffusion, facilitated diffusion, osmosis, and active transport mechanisms.",
  "Define resting membrane potential (RMP) and explain how the Na+/K+ ATPase pump maintains it.",
  "Compare and contrast vesicular transport mechanisms: phagocytosis, pinocytosis, receptor-mediated endocytosis, and exocytosis.",
  "Describe the structure and function of cellular organelles (nucleus, ribosomes, ER, Golgi apparatus, mitochondria, lysosomes, peroxisomes).",
  "Describe the structural components and cellular functions of the cytoskeleton (microfilaments, intermediate filaments, microtubules).",
  "Explain the phases of the cell cycle (Interphase: G1, S, G2, and M phase).",
  "Describe the events in each phase of somatic cell division (mitosis: prophase, metaphase, anaphase, telophase and cytokinesis).",
  "Describe DNA replication and explain key controls of the cell cycle and division.",
  "Define the genetic code, transcription, and translation, detailing how genetic information directs protein synthesis."
];

// ============================================================================
// LE2: Chapter 4 (Metabolism), Chapter 5 (Tissues), Chapter 6 (Integumentary)
// ============================================================================
const RAW_LE2 = [
  // Chapter 4: Cellular Metabolism
  "Compare and contrast anabolism and catabolism in cellular metabolism.",
  "Explain the central role of ATP in coupled metabolic reactions.",
  "Describe how metabolic pathways and enzymes are regulated by allosteric mechanisms and feedback inhibition.",
  "Explain the phases of cellular respiration: glycolysis, the citric acid cycle (Krebs cycle), and oxidative phosphorylation.",
  "Describe the anaerobic pathway of lactic acid fermentation and compare its energy yield to aerobic respiration.",
  "Explain how carbohydrates, lipids, and proteins are utilized in metabolic energy pathways.",

  // Chapter 5: Tissue Level of Organization (Histology)
  "List the four major tissue types in the body (epithelial, connective, muscle, nervous) and indicate their primary locations and functions.",
  "Describe the general characteristics and structural classification of epithelial tissues.",
  "Name the types of epithelium (simple/stratified squamous, cuboidal, columnar, pseudostratified, transitional) and identify organs where each is found.",
  "Compare and contrast exocrine glands (merocrine, apocrine, holocrine) and endocrine glands.",
  "Describe the structural components common to all connective tissues: cells, ground substance, and protein fibers.",
  "Classify connective tissues (embryonic, loose, dense, cartilage, bone, blood) with their locations and functions.",
  "Distinguish among the three types of muscle tissue (skeletal, cardiac, smooth) with respect to histology, location, and control.",
  "Describe the general characteristics, cellular composition (neurons and neuroglia), and functions of nervous tissue.",
  "Describe the structure, locations, and functions of mucous, serous, cutaneous, and synovial membranes.",
  "Compare and contrast intercellular junctions: tight junctions, desmosomes, and gap junctions.",
  "Explain the phases and cellular events of tissue repair and wound healing.",

  // Chapter 6: Integumentary System
  "List the components of the integumentary system and the subcutaneous layer (hypodermis).",
  "Describe the general functions of the integument (protection, thermoregulation, sensory reception, excretion, vitamin D synthesis).",
  "Identify and describe the layers of the epidermis, noting differences in thin versus thick skin (stratum basale to stratum corneum).",
  "Describe the cellular processes of growth and keratinization in the epidermis.",
  "Describe the genetic, physiological, and dietary factors that contribute to skin color.",
  "Identify and describe the papillary and reticular layers of the dermis, including tissue composition and nerve endings.",
  "Describe the accessory structures of the skin and explain their functions (hair follicles, sebaceous glands, sudoriferous glands, nails).",
  "Explain how the integumentary system participates in thermoregulation through dermal blood flow and sweating.",
  "Distinguish among first-, second-, and third-degree burns and describe the healing process for each."
];

// ============================================================================
// LE3: Chapter 7 (Bones), Chapter 8 (Joints), Chapter 9 (Muscles)
// ============================================================================
const RAW_LE3 = [
  // Chapter 7: Bone Tissue & Skeletal System
  "Describe the major functions of the skeletal system (support, protection, movement assistance, mineral homeostasis, blood cell production, triglyceride storage).",
  "Identify and describe the structural components of a long bone (diaphysis, epiphyses, metaphyses, articular cartilage, periosteum, endosteum, medullary cavity).",
  "List and describe the cellular and extracellular matrix components of bone tissue (osteoprogenitor cells, osteoblasts, osteocytes, osteoclasts).",
  "Identify the microscopic structure of compact bone (osteons, concentric lamellae, central canal, canaliculi, lacunae) and spongy bone (trabeculae).",
  "Describe how the location and distribution of red and yellow bone marrow varies across a lifetime.",
  "Compare and contrast intramembranous ossification and endochondral (intracartilaginous) bone formation.",
  "Compare and contrast interstitial (lengthwise) and appositional (width) bone growth.",
  "Explain the roles of parathyroid hormone (PTH), calcitriol, and calcitonin in plasma calcium regulation and bone remodeling.",
  "Explain the sequential steps involved in bone fracture repair (hematoma, fibrocartilaginous callus, bony callus, bone remodeling).",
  "Classify bones of the human skeleton based on their shape (long, short, flat, irregular, sesamoid).",
  "Identify major bones and anatomical landmarks of the axial skeleton (skull, vertebral column, thoracic cage).",
  "Identify major bones and anatomical landmarks of the appendicular skeleton (pectoral girdle, upper limbs, pelvic girdle, lower limbs).",

  // Chapter 8: Joints & Articulations
  "Describe the anatomical classification of joints based on structure: fibrous, cartilaginous, and synovial, providing examples of each.",
  "Describe the functional classification of joints based on movement: synarthroses, amphiarthroses, and diarthroses.",
  "Explain the relationship between the anatomical and functional classifications of joints.",
  "Identify and describe the major structural components of a typical synovial joint (articular capsule, synovial fluid, ligaments, articular discs, bursae).",
  "For each of the six structural types of synovial joints (planar, hinge, pivot, condyloid, saddle, ball-and-socket), describe anatomic features and permitted movements.",
  "Define the movements that occur at synovial joints (flexion, extension, hyperextension, abduction, adduction, circumduction, rotation, supination, pronation, inversion, eversion).",
  "Predict the pathophysiological changes and consequences of joint disorders such as osteoarthritis and rheumatoid arthritis.",

  // Chapter 9: Muscle Tissue & Muscular System
  "Describe the major functions of muscle tissue (producing body movements, stabilizing posture, storing and moving substances, thermogenesis).",
  "Compare and contrast the structure, location, histology, and control of skeletal, cardiac, and smooth muscle tissue.",
  "Describe the organization of skeletal muscle from deep fascia to whole muscle, fascicles, muscle fibers, and myofibrils.",
  "Describe the microscopic components within a skeletal muscle fiber (sarcolemma, T-tubules, sarcoplasmic reticulum, terminal cisternae, triads).",
  "Describe the arrangement and molecular composition of a sarcomere: actin, myosin, troponin, tropomyosin, Z-discs, I-bands, A-bands, H-zones, M-lines.",
  "Describe the structural components of the neuromuscular junction (NMJ) and the events of synaptic transmission leading to muscle action potentials.",
  "Describe the sequence of events involved in excitation-contraction coupling and the cross-bridge cycle of skeletal muscle contraction.",
  "Interpret a myogram of a twitch contraction and describe the events in latent, contraction, and relaxation periods.",
  "Interpret graphs of tension vs. stimulus frequency and explain treppe, wave summation, incomplete tetanus, and complete tetanus.",
  "Interpret a graph of tension vs. stimulus intensity and explain motor unit recruitment and the size principle.",
  "Interpret a graph of the length-tension relationship and explain its anatomical sarcomere basis.",
  "Compare and contrast isotonic (concentric and eccentric) contractions and isometric contractions.",
  "Explain the physiological factors that contribute to skeletal muscle fatigue and oxygen debt (excess post-exercise oxygen consumption / EPOC).",
  "Define the roles of skeletal muscles in producing movement: prime mover (agonist), antagonist, synergist, and fixator.",
  "Identify the location, general attachments, and primary actions of major skeletal muscle groups in the human body."
];

// ============================================================================
// LE4: Chapter 10 (Nervous Overview), Chapter 11 (CNS & PNS), Chapter 12 (Senses)
// ============================================================================
const RAW_LE4 = [
  // Chapter 10: Nervous System Overview & Neural Tissue
  "Describe the general functions (sensory, integrative, motor) and structural/functional divisions of the nervous system (CNS, PNS, SNS, ANS, ENS).",
  "Describe the anatomy of a multipolar neuron (cell body/soma, dendrites, axon, axon hillock, initial segment, synaptic end bulbs).",
  "Classify neurons structurally (multipolar, bipolar, unipolar) and functionally (sensory/afferent, motor/efferent, interneurons/association).",
  "Compare and contrast neuroglial cells in the CNS (astrocytes, oligodendrocytes, microglia, ependymal cells) and PNS (Schwann cells, satellite cells).",
  "Describe the structure and functions of myelin, the neurilemma, and nodes of Ranvier.",
  "Distinguish between the anatomical composition and arrangement of white matter and gray matter in the nervous system.",
  "Explain how the resting membrane potential (RMP) is established and maintained across neuronal membranes.",
  "Compare and contrast graded potentials and action potentials in amplitude, duration, propagation, and channels involved.",
  "Explain the ionic basis and phases of an action potential (depolarization, repolarization, hyperpolarization, absolute and relative refractory periods).",
  "Compare continuous conduction in unmyelinated axons with saltatory conduction in myelinated axons.",
  "Explain how chemical synaptic transmission occurs from presynaptic action potential to neurotransmitter release and postsynaptic response.",
  "Distinguish between excitatory postsynaptic potentials (EPSPs) and inhibitory postsynaptic potentials (IPSPs), and explain temporal and spatial summation.",
  "List major classes of neurotransmitters (acetylcholine, amino acids, monoamines, neuropeptides, gases) and describe their primary mechanisms.",

  // Chapter 11: Central & Peripheral Nervous System (CNS & PNS)
  "Describe the coverings (meninges: dura mater, arachnoid mater, pia mater) and spaces surrounding the brain and spinal cord.",
  "Discuss the formation, circulation, and functions of cerebrospinal fluid (CSF) through the ventricular system and subarachnoid space.",
  "Describe the structural organization, anatomical landmarks, and functions of the four major brain regions (cerebrum, diencephalon, brainstem, cerebellum).",
  "Distinguish among sensory, association, and motor areas of the cerebral cortex (primary motor, primary somatosensory, visual, auditory, Broca's, Wernicke's).",
  "Explain the functions of the limbic system in emotion and memory, and the reticular activating system (RAS) in consciousness and arousal.",
  "Describe the cross-sectional anatomy of the spinal cord (anterior/posterior/lateral horns, funiculi, central canal) and its major ascending and descending tracts.",
  "Describe the structural and functional components of a somatic reflex arc and differentiate monosynaptic and polysynaptic reflexes.",
  "Identify the 12 pairs of cranial nerves by Roman numeral and name, classifying their functional fiber types (sensory, motor, mixed) and major actions.",
  "Explain how spinal nerves are formed, named, and organized into principal nerve plexuses (cervical, brachial, lumbar, sacral).",
  "Distinguish between the sympathetic and parasympathetic divisions of the autonomic nervous system in structural origin, pathway lengths, and bodily functions.",
  "Compare sympathetic and parasympathetic neurotransmitters (acetylcholine, norepinephrine) and their adrenergic and cholinergic receptor types on visceral effectors.",

  // Chapter 12: Senses (General & Special)
  "Differentiate between general (somatic and visceral) senses and special senses (vision, hearing, equilibrium, olfaction, gustation).",
  "Classify sensory receptors based on microscopic structure, location of stimuli, and type of stimulus detected (mechanoreceptors, thermoreceptors, photoreceptors, chemoreceptors, nociceptors).",
  "Explain the concepts of sensation, perception, sensory adaptation, and receptive fields.",
  "Describe the somatic receptors associated with touch, pressure, vibration, temperature, pain, and proprioception.",
  "Describe how the sensation of pain is produced, transmitted via nociceptors, and explain the mechanism of referred pain.",
  "Describe the anatomy of the olfactory epithelium and the neural pathway for olfaction (sense of smell).",
  "Describe the anatomy of taste buds, the five primary taste sensations, and the neural pathway for gustation (sense of taste).",
  "Describe the accessory structures of the eye and internal anatomy of the eyeball (fibrous, vascular, and retina/neural tunics).",
  "Explain the physiology of vision: light refraction, accommodation of the lens, constriction of the pupil, and convergence of the eyeballs.",
  "Compare and contrast photoreceptors (rods and cones) in structure, distribution, visual pigments (rhodopsin/photopsins), and roles in light/dark adaptation.",
  "Trace the visual neural pathway from retina through optic nerve, optic chiasm, optic tract, thalamus, and optic radiation to the primary visual cortex.",
  "Describe the anatomical structures of the outer ear, middle ear (tympanic cavity and ossicles), and inner ear (bony and membranous labyrinths).",
  "Explain the physiology of hearing: transmission of sound waves, basilar membrane resonance in the cochlea, hair cell excitation, and the auditory pathway.",
  "Distinguish between static equilibrium (vestibule: utricle and saccule, maculae, otoliths) and dynamic equilibrium (semicircular ducts, ampullary cristae).",
  "Describe common age-related sensory declines and clinical disorders affecting vision, hearing, equilibrium, smell, and taste."
];

// ============================================================================
// Final Comprehensive Exam: Synthesizing Chapters 1 through 12
// ============================================================================
const RAW_FINAL = [
  "Synthesize the fundamental homeostatic mechanisms that unify all organ systems in Human Anatomy & Physiology I.",
  "Explain how chemistry, cellular biology, and transport mechanisms establish the biological foundation for tissue function (Chapters 1–3).",
  "Correlate cellular metabolism and respiration pathways with physiological energy demands across active human tissues (Chapter 4).",
  "Compare and contrast how the four primary tissue types contribute to the structure and function of the integumentary and musculoskeletal systems (Chapters 5–9).",
  "Analyze how the integumentary system interacts with the nervous, circulatory, and skeletal systems to maintain systemic homeostasis (Chapter 6).",
  "Explain how calcium homeostasis is dynamically regulated through interactions among bone tissue, hormones, and the kidneys (Chapter 7).",
  "Evaluate how the structural classification of joints directly dictates mobility, stability, and susceptibility to clinical pathology (Chapter 8).",
  "Integrate the events of neural excitation, neuromuscular junction transmission, and sliding filament contraction in skeletal muscle performance (Chapters 9 & 10).",
  "Trace the generation, propagation, and synaptic transmission of an action potential from sensory receptor to central processing and motor response (Chapters 10 & 11).",
  "Compare and contrast the somatic motor nervous system and autonomic nervous system in target tissues, pathways, and neurochemistry (Chapters 11 & 12).",
  "Explain how special sensory organs transduce environmental stimuli into neural signals to guide somatic and autonomic reflexes (Chapter 12).",
  "Design and model an interactive Google AI Studio learning game architecture that tests student mastery of complex A&P I homeostatic loops."
];

function buildSlos(list: string[], exam: ExamCategory): SLOItem[] {
  return list.map((text, idx) => {
    const haps = findHapsCorrelation(text);
    return {
      id: `${exam}-SLO-${String(idx + 1).padStart(2, '0')}`,
      exam,
      index: idx + 1,
      text,
      hapsCode: haps.code,
      hapsNominal: haps.nominal,
      hapsModule: haps.module,
      chapter: haps.chapter,
    };
  });
}

export const ALL_EXAM_SLOS: Record<ExamCategory, SLOItem[]> = {
  LE1: buildSlos(RAW_LE1, 'LE1'),
  LE2: buildSlos(RAW_LE2, 'LE2'),
  LE3: buildSlos(RAW_LE3, 'LE3'),
  LE4: buildSlos(RAW_LE4, 'LE4'),
  Final: buildSlos(RAW_FINAL, 'Final'),
};

export const TOTAL_SLO_COUNT =
  RAW_LE1.length + RAW_LE2.length + RAW_LE3.length + RAW_LE4.length + RAW_FINAL.length;

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
