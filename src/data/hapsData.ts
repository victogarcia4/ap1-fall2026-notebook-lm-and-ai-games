import { HapsOutcome } from '../types';

export const HAPS_DATABASE: HapsOutcome[] = [
  // Module A
  { id: 'AP-19-A-01-01', parentId: 'AP-19-A-01', title: 'Anatomical position description', description: 'Describe the human body in anatomical position.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-01-02', parentId: 'AP-19-A-01', title: 'Right and left anatomical terms', description: 'Describe how to use the terms right and left in anatomical reference.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-02-01', parentId: 'AP-19-A-02', title: 'Anatomic planes and sections', description: 'Identify and define the anatomic planes in which a body might be viewed.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-03-01', parentId: 'AP-19-A-03', title: 'Body cavities and organs', description: 'Identify and describe the location of the body cavities and the major organs found in each cavity.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-03-02', parentId: 'AP-19-A-03', title: 'Major anatomical regions', description: 'List and describe the location of the major anatomical regions of the body.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-03-03', parentId: 'AP-19-A-03', title: 'Abdominopelvic quadrants and regions', description: 'Identify and describe the location of the four abdominopelvic quadrants and the nine abdominopelvic regions, and the major structures found in each.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-04-01', parentId: 'AP-19-A-04', title: 'Major directional terms', description: 'List and define the major directional terms used in anatomy.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-04-02', parentId: 'AP-19-A-04', title: 'Location of body structures', description: 'Describe the location of body structures, using appropriate directional terminology.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-05-01', parentId: 'AP-19-A-05', title: 'Anatomy and physiology definitions', description: 'Define the terms anatomy and physiology.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-05-02', parentId: 'AP-19-A-05', title: 'Interrelationship between anatomy and physiology', description: 'Give specific examples to show the interrelationship between anatomy and physiology.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-05-03', parentId: 'AP-19-A-05', title: 'Regional and systemic terminology', description: 'Describe the location of structures of the body, using basic regional and systemic terminology.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-06-01', parentId: 'AP-19-A-06', title: 'Levels of structural organization', description: 'Describe, in order from simplest to most complex, the major levels of organization in the human organism.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-06-02', parentId: 'AP-19-A-06', title: 'Examples of levels of organization', description: 'Give an example of each level of organization.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-07-01', parentId: 'AP-19-A-07', title: 'Organ systems and components', description: 'List the organ systems of the human body and their major components.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-A-07-02', parentId: 'AP-19-A-07', title: 'Organ system functions', description: 'Describe the major functions of each organ system.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },

  // Module B - Homeostasis
  { id: 'AP-19-B-01-01', parentId: 'AP-19-B-01', title: 'Homeostasis definition', description: 'Define homeostasis.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-B-01-02', parentId: 'AP-19-B-01', title: 'Homeostatic mechanism components', description: 'Define the following terms as they relate to homeostasis: setpoint, variable, receptor (sensor), effector (target), and control (integrating) center.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-B-01-03', parentId: 'AP-19-B-01', title: 'Physiological variables', description: 'List the main physiological variables for which the body attempts to maintain homeostasis.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-B-01-05', parentId: 'AP-19-B-01', title: 'Law of mass balance', description: 'Define the law of mass balance and relate it to body homeostasis.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-B-02-01', parentId: 'AP-19-B-02', title: 'Response pathway steps', description: 'List the steps in a response pathway, starting with the stimulus and ending with the response.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-B-02-02', parentId: 'AP-19-B-02', title: 'Feedback loop steps', description: 'List the steps in a feedback mechanism (loop) and explain the function of each step.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-B-02-03', parentId: 'AP-19-B-02', title: 'Positive and negative feedback', description: 'Compare and contrast positive and negative feedback in terms of the relationship between stimulus and response, and describe examples of each.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },
  { id: 'AP-19-B-02-04', parentId: 'AP-19-B-02', title: 'Negative feedback prevalence', description: 'Explain why negative feedback is the most common mechanism used to maintain homeostasis.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '1' },

  // Module C - Chemistry & Cell Biology
  { id: 'AP-19-C-01-01', parentId: 'AP-19-C-01', title: 'Atoms, elements, molecules, compounds', description: 'Compare and contrast the terms atoms, elements, molecules, and compounds.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-01-02', parentId: 'AP-19-C-01', title: 'Subatomic particles', description: 'Describe the charge, mass, and relative location of electrons, protons, and neutrons in an atom.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-01-03', parentId: 'AP-19-C-01', title: 'Electron shells and bonding', description: 'Relate the number of electrons in an electron shell to the atom’s chemical stability and its ability to form chemical bonds.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-02-01', parentId: 'AP-19-C-02', title: 'Chemical bonds mechanisms', description: 'Explain the mechanism of each type of chemical bond and provide biologically significant examples of each: covalent, ionic, and hydrogen bonds.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-03-01', parentId: 'AP-19-C-03', title: 'Properties of water', description: 'Describe the physiologically important properties of water.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-03-03', parentId: 'AP-19-C-03', title: 'Salts, pH, acids, bases, buffers', description: 'Define the terms salt, pH, acid, base, and buffer.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-03-04', parentId: 'AP-19-C-03', title: 'pH scale values', description: 'State the pH values for acidic, neutral, and alkaline (basic) solutions.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-04-01', parentId: 'AP-19-C-04', title: 'Organic molecules', description: 'Define the term organic molecule.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-04-04', parentId: 'AP-19-C-04', title: 'Carbohydrates, proteins, lipids, nucleic acids', description: 'Compare and contrast the general molecular structure of carbohydrates, proteins, lipids, and nucleic acids using chemical formulas', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-04-05', parentId: 'AP-19-C-04', title: 'Building blocks of macromolecules', description: 'Describe the building blocks of carbohydrates, proteins, lipids, and nucleic acids, and explain how these building blocks combine.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-04-07', parentId: 'AP-19-C-04', title: 'Enzymes and factors affecting activity', description: 'Define enzyme and describe factors that affect enzyme activity.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '2' },
  { id: 'AP-19-C-05-01', parentId: 'AP-19-C-05', title: 'Role of ATP in the cell', description: 'Explain the role of ATP in the cell.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '4' },
  { id: 'AP-19-C-06-01', parentId: 'AP-19-C-06', title: 'Three main parts of a cell', description: 'Describe the three main parts of a cell (plasma [cell] membrane, cytoplasm, and nucleus), and explain the general functions of each part.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-06-03', parentId: 'AP-19-C-06', title: 'Structure and roles of cytoskeleton', description: 'Describe the structure and roles of the cytoskeleton.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-07-01', parentId: 'AP-19-C-07', title: 'Fluid mosaic model', description: 'Describe the chemical composition, general structure (i.e., fluid mosaic model), and properties of all cellular membranes.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-07-02', parentId: 'AP-19-C-07', title: 'Plasma membrane structure', description: 'Describe the structure of the plasma (cell) membrane, including its composition and arrangement of lipids, proteins, and carbohydrates.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-08-02', parentId: 'AP-19-C-08', title: 'Diffusion mechanisms', description: 'Compare and contrast simple diffusion across membranes and facilitated diffusion.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-08-04', parentId: 'AP-19-C-08', title: 'Osmosis', description: 'Define osmosis and explain how it differs from simple diffusion across membranes.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-08-07', parentId: 'AP-19-C-08', title: 'Endocytosis and Exocytosis', description: 'Compare and contrast exocytosis, endocytosis, phagocytosis, and pinocytosis in respect to their mechanisms.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-09-01', parentId: 'AP-19-C-09', title: 'Resting membrane potential', description: 'Define resting membrane potential (RMP).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-10-02', parentId: 'AP-19-C-10', title: 'Cellular organelles', description: 'Describe the structure and function of the various cellular organelles.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-11-01', parentId: 'AP-19-C-11', title: 'Genetic code, transcription, and translation', description: 'Define the terms genetic code, transcription, and translation.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-12-01', parentId: 'AP-19-C-12', title: 'Cellular respiration', description: 'Define the term cellular respiration.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '4' },
  { id: 'AP-19-O-01-01', parentId: 'AP-19-O-01', title: 'Anabolism and catabolism in metabolism', description: 'Compare and contrast anabolism and catabolism in cellular metabolism.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '4' },
  { id: 'AP-19-O-01-02', parentId: 'AP-19-O-01', title: 'Coupled metabolic reactions and ATP', description: 'Explain the central role of ATP in coupled metabolic reactions.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '4' },
  { id: 'AP-19-O-01-03', parentId: 'AP-19-O-01', title: 'Metabolic pathways and enzyme regulation', description: 'Describe how metabolic pathways and enzymes are regulated by allosteric mechanisms and feedback inhibition.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '4' },
  { id: 'AP-19-O-01-04', parentId: 'AP-19-O-01', title: 'Cellular respiration phases and pathways', description: 'Explain the phases of cellular respiration: glycolysis, the citric acid cycle (Krebs cycle), and oxidative phosphorylation.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '4' },
  { id: 'AP-19-O-01-05', parentId: 'AP-19-O-01', title: 'Lactic acid fermentation and energy yield', description: 'Describe the anaerobic pathway of lactic acid fermentation and compare its energy yield to aerobic respiration.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '4' },
  { id: 'AP-19-O-01-06', parentId: 'AP-19-O-01', title: 'Macronutrient energy utilization pathways', description: 'Explain how carbohydrates, lipids, and proteins are utilized in metabolic energy pathways.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '4' },
  { id: 'AP-19-C-13-01', parentId: 'AP-19-C-13', title: 'Cell cycle phases', description: 'Describe the general phases of the cell cycle.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-13-02', parentId: 'AP-19-C-13', title: 'Mitosis vs Meiosis', description: 'Compare and contrast somatic cell division (mitosis) and reproductive cell division (meiosis).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },
  { id: 'AP-19-C-13-03', parentId: 'AP-19-C-13', title: 'DNA replication', description: 'Describe DNA replication.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '3' },

  // Module D - Histology
  { id: 'AP-19-D-01-01', parentId: 'AP-19-D-01', title: 'Histology definition', description: 'Define the term histology.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-01-02', parentId: 'AP-19-D-01', title: 'Four major tissue types', description: 'List the four major tissue types.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-01-03', parentId: 'AP-19-D-01', title: 'General features of tissue types', description: 'Compare and contrast the general features of the four major tissue types.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-02-01', parentId: 'AP-19-D-02', title: 'Epithelial structural characteristics', description: 'Describe the structural characteristics common to all types of epithelia.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-02-02', parentId: 'AP-19-D-02', title: 'Epithelial tissue classification', description: 'Classify different types of epithelial tissues based on structural characteristics.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-02-03', parentId: 'AP-19-D-02', title: 'Epithelial anatomy, location, function', description: 'Describe the microscopic anatomy, location, and function of each epithelial tissue type.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-02-05', parentId: 'AP-19-D-02', title: 'Exocrine vs endocrine glands', description: 'Compare and contrast exocrine and endocrine glands, structurally and functionally.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-03-02', parentId: 'AP-19-D-03', title: 'Connective tissue characteristics', description: 'Describe the structural characteristics common to all types of connective tissue.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-03-03', parentId: 'AP-19-D-03', title: 'Connective tissue classification & components', description: 'Classify different types of connective tissues based on their structural characteristics, functions, and locations in the body.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-04-01', parentId: 'AP-19-D-04', title: 'Muscle tissue characteristics', description: 'Describe the structural characteristics common to all types of muscle tissue.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-04-02', parentId: 'AP-19-D-04', title: 'Classification of muscle tissue', description: 'Classify different types of muscle tissue based on structural characteristics, functions, and locations in the body.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-05-01', parentId: 'AP-19-D-05', title: 'Nervous tissue cells', description: 'Recognize the cells of nervous tissue.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-05-02', parentId: 'AP-19-D-05', title: 'Neurons vs Glial cells', description: 'Compare and contrast neurons and glial cells with respect to cell structure and function.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-06-01', parentId: 'AP-19-D-06', title: 'Membranes: mucous, serous, cutaneous, synovial', description: 'Describe the structure and function of mucous, serous, cutaneous, and synovial membranes.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-07-01', parentId: 'AP-19-D-07', title: 'Cell junctions', description: 'Compare and contrast the types of intercellular connections (cell junctions) with respect to structure and function.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },
  { id: 'AP-19-D-08-02', parentId: 'AP-19-D-08', title: 'Tissue repair following injury', description: 'Describe tissue repair following an injury.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '5' },

  // Module E - Integumentary System
  { id: 'AP-19-E-01-01', parentId: 'AP-19-E-01', title: 'Integumentary components', description: 'List the components of the integumentary system.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-01-02', parentId: 'AP-19-E-01', title: 'General integumentary functions', description: 'Describe the general functions of the integumentary system and the subcutaneous layer.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-02-01', parentId: 'AP-19-E-02', title: 'Epidermis tissue type', description: 'Identify and describe the tissue type making up the epidermis.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-02-02', parentId: 'AP-19-E-02', title: 'Layers of epidermis (thin vs thick)', description: 'Identify and describe the layers of the epidermis, indicating which are found in thin skin and which are found in thick skin.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-02-03', parentId: 'AP-19-E-02', title: 'Thin vs thick skin', description: 'Compare and contrast thin and thick skin with respect to location and function.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-02-04', parentId: 'AP-19-E-02', title: 'Growth and keratinization of epidermis', description: 'Describe the processes of growth and keratinization of the epidermis.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-02-05', parentId: 'AP-19-E-02', title: 'Dermis and its layers', description: 'Identify and describe the dermis and its layers, including the tissue types making up each dermal layer.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-02-06', parentId: 'AP-19-E-02', title: 'Subcutaneous layer (hypodermis)', description: 'Identify and describe the subcutaneous layer, including the tissue types.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-02-07', parentId: 'AP-19-E-02', title: 'Factors contributing to skin color', description: 'Describe the factors that contribute to skin color.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-04-01', parentId: 'AP-19-E-04', title: 'Epidermal derivatives / accessory structures', description: 'List the epidermal derivatives of the integument.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-04-02', parentId: 'AP-19-E-04', title: 'Structure and function of hair', description: 'Describe the structure and function of hair.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-04-03', parentId: 'AP-19-E-04', title: 'Structure and function of nails', description: 'Describe the structure and function of nails.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-04-04', parentId: 'AP-19-E-04', title: 'Exocrine glands of the skin', description: 'Describe the structure and function of exocrine glands of the integumentary system.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-05-01', parentId: 'AP-19-E-05', title: 'Thermoregulation and water conservation', description: 'Explain how the integumentary system maintains homeostasis with respect to thermoregulation and water conservation.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },
  { id: 'AP-19-E-06-01', parentId: 'AP-19-E-06', title: 'Burns and integumentary disruptions', description: 'Given a factor or situation (e.g., second-degree burns), predict changes in the integumentary system.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '6' },

  // Module F - Skeletal System & Articulations
  { id: 'AP-19-F-01-01', parentId: 'AP-19-F-01', title: 'Major functions of the skeletal system', description: 'Describe the major functions of the skeletal system.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-02-01', parentId: 'AP-19-F-02', title: 'Bone tissue cellular components', description: 'List and describe the cellular and extracellular components of bone tissue.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-02-02', parentId: 'AP-19-F-02', title: 'Compact vs Spongy bone microscopic structure', description: 'Identify the microscopic structure of compact bone and spongy bone.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-03-01', parentId: 'AP-19-F-03', title: 'Bone shape classification', description: 'Classify bones of the skeleton based on their shape.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-03-02', parentId: 'AP-19-F-03', title: 'Long bone structural components', description: 'Identify and describe the structural components of a long bone, and explain their functions.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-03-05', parentId: 'AP-19-F-03', title: 'Red and yellow bone marrow', description: 'Describe how the location and distribution of red and yellow bone marrow varies during a lifetime.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-04-01', parentId: 'AP-19-F-04', title: 'Bone cells and bone formation', description: 'Explain the roles that specific bone cells play in the formation of bone tissue.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-04-02', parentId: 'AP-19-F-04', title: 'Intramembranous vs Endochondral ossification', description: 'Compare and contrast intramembranous and endochondral (intracartilaginous) bone formation.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-05-01', parentId: 'AP-19-F-05', title: 'Osteoblasts vs Osteoclasts', description: 'Compare and contrast the function of osteoblasts and osteoclasts during bone growth, repair, and remodeling.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-05-02', parentId: 'AP-19-F-05', title: 'Interstitial vs Appositional growth', description: 'Compare and contrast interstitial (lengthwise) and appositional (width or circumferential) growth.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-05-04', parentId: 'AP-19-F-05', title: 'Hormonal regulation of bone (PTH, Calcitriol, Calcitonin)', description: 'Explain the roles of parathyroid hormone, calcitriol, and calcitonin in plasma calcium regulation and bone remodeling.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-05-05', parentId: 'AP-19-F-05', title: 'Bone repair and remodeling with age', description: 'Describe the bone repair and remodeling process and how it changes as humans age.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-05-06', parentId: 'AP-19-F-05', title: 'Steps in fracture repair', description: 'Explain the steps involved in fracture repair.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-07-01', parentId: 'AP-19-F-07', title: 'Skull and Pelvic Girdle bones', description: 'Identify individual bones and their locations within the body (including skull, vertebral column, thoracic cage, pectoral/pelvic girdles).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '7' },
  { id: 'AP-19-F-08-01', parentId: 'AP-19-F-08', title: 'Joint structural classification (fibrous, cartilaginous, synovial)', description: 'Describe the anatomical classification of joints based on structure: fibrous, cartilaginous, and synovial, and provide examples of each type.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '8' },
  { id: 'AP-19-F-08-02', parentId: 'AP-19-F-08', title: 'Joint functional classification (synarthrosis, diarthrosis)', description: 'Describe the functional classification of joints based on the amount of movement permitted, and provide examples of each type.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '8' },
  { id: 'AP-19-F-08-03', parentId: 'AP-19-F-08', title: 'Anatomical vs Functional joint classification', description: 'Explain the relationship between the anatomical classification and the functional classification of joints.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '8' },
  { id: 'AP-19-F-08-04', parentId: 'AP-19-F-08', title: 'Synovial joint structural components', description: 'Identify and describe the major structural components of a typical synovial joint.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '8' },
  { id: 'AP-19-F-08-05', parentId: 'AP-19-F-08', title: 'Six structural types of synovial joints', description: 'For each of the six structural types of synovial joints, describe its anatomic features, identify locations in the body, and predict movements.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '8' },
  { id: 'AP-19-F-08-06', parentId: 'AP-19-F-08', title: 'Joint movements (flexion, extension, etc.)', description: 'Define the movements that typically occur at a joint (e.g., flexion, extension, abduction, adduction, rotation).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '8' },
  { id: 'AP-19-F-09-01', parentId: 'AP-19-F-09', title: 'Skeletal system & calcium homeostasis', description: 'Explain how the skeletal system participates in homeostasis of plasma calcium levels.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '8' },
  { id: 'AP-19-F-10-01', parentId: 'AP-19-F-10', title: 'Disruptions in skeletal system (osteoarthritis/osteoporosis)', description: 'Given a factor or situation (e.g., osteoarthritis), predict the changes that could occur in the skeletal system.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '8' },

  // Module G - Muscular System
  { id: 'AP-19-G-01-01', parentId: 'AP-19-G-01', title: 'Functions of muscle tissue', description: 'Describe the major functions of muscle tissue.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-02-01', parentId: 'AP-19-G-02', title: 'Skeletal, cardiac, and smooth muscle comparison', description: 'Describe the structure, location in the body, and function of skeletal, cardiac, and smooth muscle.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-03-01', parentId: 'AP-19-G-03', title: 'Skeletal muscle organization', description: 'Describe the organization of skeletal muscle, from cell (skeletal muscle fiber) to whole muscle.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-03-03', parentId: 'AP-19-G-03', title: 'Components of a muscle fiber', description: 'Describe the components within a skeletal muscle fiber (sarcolemma, T tubules, SR, myofibrils, myofilaments).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-03-05', parentId: 'AP-19-G-03', title: 'Sarcomere components (A-band, I-band, Z-disc)', description: 'Describe the arrangement and composition of the components of a sarcomere: A-band, I-band, H-zone, Z-disc, and M-line.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-03-06', parentId: 'AP-19-G-03', title: 'Neuromuscular junction structure', description: 'Describe the structure of the neuromuscular junction.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-04-02', parentId: 'AP-19-G-04', title: 'Events of skeletal muscle contraction', description: 'Describe the sequence of events involved in the contraction of a skeletal muscle fiber.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-05-02', parentId: 'AP-19-G-05', title: 'Muscle fatigue factors & oxygen debt', description: 'Explain the factors that are believed to contribute to skeletal muscle fatigue.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-06-02', parentId: 'AP-19-G-06', title: 'Myogram of twitch contraction', description: 'Interpret a myogram of a twitch contraction with respect to latent, contraction, and relaxation periods.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-06-03', parentId: 'AP-19-G-06', title: 'Treppe, summation, and tetanus', description: 'Interpret a graph of tension versus stimulus frequency and explain treppe, summation, and tetanus.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-06-04', parentId: 'AP-19-G-06', title: 'Recruitment and tension vs stimulus intensity', description: 'Interpret a graph of tension vs. stimulus intensity and explain recruitment.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-06-05', parentId: 'AP-19-G-06', title: 'Length-tension relationship', description: 'Interpret a graph of the length-tension relationship and describe its anatomical basis.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-06-07', parentId: 'AP-19-G-06', title: 'Concentric vs Eccentric contraction', description: 'Compare and contrast concentric and eccentric contraction.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-08-01', parentId: 'AP-19-G-08', title: 'Major skeletal muscles attachments & actions', description: 'Identify the location, general attachments, and actions of the major skeletal muscles.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },
  { id: 'AP-19-G-09-01', parentId: 'AP-19-G-09', title: 'Prime mover, antagonist, synergist, fixator', description: 'Define the terms prime mover (agonist), antagonist, synergist, and fixator.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '9' },

  // Module H - Nervous System
  { id: 'AP-19-H-01-01', parentId: 'AP-19-H-01', title: 'General functions of nervous system', description: 'Describe the general functions of the nervous system.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-02-03', parentId: 'AP-19-H-02', title: 'Nervous system response to stimuli', description: 'Describe how the nervous system responds to stimuli (receptors, afferent, center, efferent, target).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-03-01', parentId: 'AP-19-H-03', title: 'White matter vs Gray matter', description: 'Distinguish between the sources and arrangement of white matter and gray matter.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-04-02', parentId: 'AP-19-H-04', title: 'Meninges of brain and spinal cord', description: 'Describe the coverings (meninges) of the brain and spinal cord.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-04-07', parentId: 'AP-19-H-04', title: 'Cerebrospinal fluid formation & function', description: 'Discuss the formation, circulation, and function of cerebrospinal fluid.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-05-01', parentId: 'AP-19-H-05', title: 'Parts of a neuron', description: 'Identify and describe the parts of a neuron (cell body, axon, dendrites, axon hillock).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-05-02', parentId: 'AP-19-H-05', title: 'Structural & functional differences in neurons', description: 'Identify structural and functional differences among neurons (unipolar, bipolar, multipolar, sensory, motor, interneurons).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-06-02', parentId: 'AP-19-H-06', title: 'Myelin, neurilemma, nodes of Ranvier', description: 'Describe the relationships among myelin, the neurilemma, and nodes of Ranvier.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-07-02', parentId: 'AP-19-H-07', title: 'Polarization of cell membrane', description: 'Explain how a cell membrane becomes polarized and the physiological basis of RMP.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-07-07', parentId: 'AP-19-H-07', title: 'Action potentials moving down an axon', description: 'Explain how action potentials move down an axon (propagation).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-07-11', parentId: 'AP-19-H-07', title: 'Myelinated vs unmyelinated conduction', description: 'Compare impulse conduction in myelinated and unmyelinated neurons.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-08-04', parentId: 'AP-19-H-08', title: 'Presynaptic to postsynaptic transmission', description: 'Explain how information passes from a presynaptic neuron to a postsynaptic cell.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-08-06', parentId: 'AP-19-H-08', title: 'Excitatory and inhibitory neurotransmitters', description: 'Identify the changes in membrane potential associated with excitatory and inhibitory neurotransmitters (EPSP and IPSP).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '10' },
  { id: 'AP-19-H-10-04', parentId: 'AP-19-H-10', title: 'Brain, brainstem, spinal cord relationship', description: 'Describe the relationship among the brain, brainstem, and spinal cord.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },
  { id: 'AP-19-H-10-10', parentId: 'AP-19-H-10', title: 'Sensory, association, motor cerebral cortex', description: 'Distinguish among sensory, association, and motor areas of the cerebral cortex.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },
  { id: 'AP-19-H-10-23', parentId: 'AP-19-H-10', title: 'Limbic system and reticular formation', description: 'Explain the functions of the limbic system and the reticular formation.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },
  { id: 'AP-19-H-11-01', parentId: 'AP-19-H-11', title: 'Cranial nerves and major functions', description: 'Identify the cranial nerves and list their major functions.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },
  { id: 'AP-19-H-12-01', parentId: 'AP-19-H-12', title: 'Spinal cord structure & functions', description: 'Describe the structure of the spinal cord and its major functions.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },
  { id: 'AP-19-H-13-01', parentId: 'AP-19-H-13', title: 'Spinal nerves naming & functions', description: 'Explain how spinal nerves are named and their functions.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },
  { id: 'AP-19-H-14-02', parentId: 'AP-19-H-14', title: 'Reflex arc and reflex', description: 'Describe a reflex arc and reflex responses.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },
  { id: 'AP-19-H-16-02', parentId: 'AP-19-H-16', title: 'Sympathetic vs Parasympathetic divisions', description: 'Distinguish between the sympathetic and the parasympathetic divisions of the autonomic nervous system.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },
  { id: 'AP-19-H-16-04', parentId: 'AP-19-H-16', title: 'Autonomic nerve pathways', description: 'Compare sympathetic and parasympathetic nerve pathways.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },
  { id: 'AP-19-H-16-05', parentId: 'AP-19-H-16', title: 'Autonomic neurotransmitters on effectors', description: 'Explain how the autonomic neurotransmitters affect visceral effectors.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '11' },

  // Module I - General & Special Senses
  { id: 'AP-19-I-01-01', parentId: 'AP-19-I-01', title: 'Functions of sensory receptors', description: 'List the functions of sensory receptors.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-01-02', parentId: 'AP-19-I-01', title: 'Sensation and sensory adaptation', description: 'Explain sensation and sensory adaptation.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-01-05', parentId: 'AP-19-I-01', title: 'Five types of receptors', description: 'Name the five types of receptors and state the function of each (thermoreceptor, photoreceptor, chemoreceptor, mechanoreceptor, nociceptor).', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-01-06', parentId: 'AP-19-I-01', title: 'General senses vs Special senses', description: 'Differentiate between general senses and special senses.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-02-01', parentId: 'AP-19-I-02', title: 'Receptors for touch, pressure, temperature, pain', description: 'Describe the differences among receptors associated with the senses of touch, pressure, temperature, and pain.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-04-05', parentId: 'AP-19-I-04', title: 'Rods vs Cones visual pigments', description: 'Distinguish between rods and cones, and discuss their respective visual pigments.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-04-06', parentId: 'AP-19-I-04', title: 'Depth and distance perception', description: 'Explain how the brain perceives depth and distance.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-05-03', parentId: 'AP-19-I-05', title: 'Smell and Taste sensation interpretation', description: 'Describe how the sensations of smell and taste are produced and interpreted.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-07-01', parentId: 'AP-19-I-07', title: 'Parts of ear and auditory functions', description: 'Name the parts of the ear and explain the function of each part.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-09-02', parentId: 'AP-19-I-09', title: 'Static vs Dynamic equilibrium', description: 'Distinguish between static and dynamic equilibrium.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },
  { id: 'AP-19-I-11-01', parentId: 'AP-19-I-11', title: 'Aging-associated sensory changes', description: 'Describe aging-associated changes that diminish the senses.', type: 'LO', semester: 'Anatomy and Physiology I', chapter: '12' },

  // Module J - Endocrine System
  { id: 'AP-19-J-01-02', parentId: 'AP-19-J-01', title: 'Hormone definition', description: 'Define the term hormone.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '1' },
  { id: 'AP-19-J-01-03', parentId: 'AP-19-J-01', title: 'Nervous vs Endocrine control', description: 'Compare and contrast how the nervous and endocrine systems control body functions.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '1' },
  { id: 'AP-19-J-02-01', parentId: 'AP-19-J-02', title: 'Three major chemical classes of hormones', description: 'List the three major chemical classes of hormones found in the human body.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '1' },
  { id: 'AP-19-J-02-04', parentId: 'AP-19-J-02', title: 'Mechanisms of hormone action (cAMP/2nd messenger)', description: 'Compare and contrast the mechanisms of action (including second messenger systems/cAMP).', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '1' },
  { id: 'AP-19-J-04-03', parentId: 'AP-19-J-04', title: 'Anterior pituitary hormones', description: 'Describe major hormones secreted by the anterior pituitary... their control pathways, and primary targets.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '1' },
  { id: 'AP-19-J-05-02', parentId: 'AP-19-J-05', title: 'Parathyroid glands anatomy & hormone', description: 'Describe the anatomy of the parathyroid glands... hormone secreted... and control pathway.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '1' },
  { id: 'AP-19-J-05-03', parentId: 'AP-19-J-05', title: 'Adrenal cortex anatomy & hormones', description: 'Describe the anatomy of the adrenal cortex... major hormones secreted.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '1' },
  { id: 'AP-19-J-05-04', parentId: 'AP-19-J-05', title: 'Pancreas anatomy & insulin/glucagon', description: 'Describe the anatomy of the pancreas... major hormones secreted (insulin/glucagon).', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '1' },
  { id: 'AP-19-J-09-01', parentId: 'AP-19-J-09', title: 'Endocrine disruption & disorders', description: 'Predictions related to disruption of homeostasis (Endocrine Disorders).', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '1' },

  // Module K - Cardiovascular System
  { id: 'AP-19-K-02-03', parentId: 'AP-19-K-02', title: 'Plasma proteins and functions', description: 'List the major types of plasma proteins, their functions, and sites of production.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '2' },
  { id: 'AP-19-K-02-05', parentId: 'AP-19-K-02', title: 'Five types of leukocytes', description: 'List the five types of leukocytes... and describe their major functions.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '2' },
  { id: 'AP-19-K-02-07', parentId: 'AP-19-K-02', title: 'Hematocrit', description: 'Define hematocrit.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '2' },
  { id: 'AP-19-K-03-02', parentId: 'AP-19-K-03', title: 'Erythropoiesis and EPO', description: 'Explain the basic process of erythropoiesis... and regulation through erythropoietin (EPO).', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '2' },
  { id: 'AP-19-K-04-03', parentId: 'AP-19-K-04', title: 'Coagulation steps & thrombus', description: 'Describe the basic steps of coagulation... (including thrombus/embolus).', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '2' },
  { id: 'AP-19-K-05-05', parentId: 'AP-19-K-05', title: 'Blood type compatibility', description: 'Predict which blood types are compatible...', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '2' },
  { id: 'AP-19-K-06-05', parentId: 'AP-19-K-06', title: 'Internal structures of the heart', description: 'Identify and describe the structure and function of the primary internal structures of the heart (chambers, valves, etc.).', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-06-07', parentId: 'AP-19-K-06', title: 'Heart wall layers', description: 'Describe the structure and functions of each layer of the heart wall (i.e., epicardium, myocardium, endocardium).', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-08-01', parentId: 'AP-19-K-08', title: 'Path of blood through the heart', description: 'Trace the path of blood through the right and left sides of the heart... and indicate oxygen-rich or oxygen-poor.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-09-01', parentId: 'AP-19-K-09', title: 'Electrical conduction system sequence', description: 'List the parts of the electrical conduction system of the heart in the correct sequence.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-09-04', parentId: 'AP-19-K-09', title: 'ECG waveforms and electrical events', description: 'Name the waveforms in a normal electrocardiogram... and explain the electrical events.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-10-05', parentId: 'AP-19-K-10', title: 'Heart valves & pressure changes', description: 'Relate the opening and closing of specific heart valves... to pressure changes in the heart chambers.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-10-06', parentId: 'AP-19-K-10', title: 'Heart sounds and cardiac cycle', description: 'Relate the heart sounds to the events of the cardiac cycle.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-11-05', parentId: 'AP-19-K-11', title: 'EDV and Stroke Volume', description: 'Define end diastolic volume (EDV)... and stroke volume (SV).', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-12-03', parentId: 'AP-19-K-12', title: 'Vessel tunics: arteries vs veins', description: 'Compare and contrast tunic thickness, composition, and lumen diameter among arteries, capillaries, and veins.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-13-01', parentId: 'AP-19-K-13', title: 'Systemic and pulmonary circuits', description: 'Describe the systemic and pulmonary circuits (circulations).', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-13-03', parentId: 'AP-19-K-13', title: 'Systemic arteries and veins', description: 'Identify the major arteries and veins of the systemic circuit.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-15-12', parentId: 'AP-19-K-15', title: 'NFP, edema, and lymphatic return', description: 'Explain how changes in net filtration pressure (NFP) can result in edema.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' },
  { id: 'AP-19-K-15-15', parentId: 'AP-19-K-15', title: 'Precapillary sphincter autoregulation', description: 'Explain the role of the precapillary sphincter in autoregulation.', type: 'LO', semester: 'Anatomy and Physiology II', chapter: '3' }
];

export function findHapsCorrelation(sloText: string): { code: string; nominal: string; module: string; chapter: string } {
  const clean = sloText.toLowerCase().replace(/[^a-z0-9]/g, ' ');
  const words = clean.split(/\s+/).filter(w => w.length > 3);

  let bestMatch = HAPS_DATABASE[0];
  let maxScore = -1;

  for (const item of HAPS_DATABASE) {
    let score = 0;
    const descLower = item.description.toLowerCase();
    const titleLower = item.title.toLowerCase();

    for (const w of words) {
      if (descLower.includes(w)) score += 3;
      if (titleLower.includes(w)) score += 2;
    }

    if (descLower === sloText.toLowerCase()) score += 100;

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  // Derive module code
  const moduleLetter = bestMatch.id.split('-')[2] || 'A';
  const moduleNames: Record<string, string> = {
    A: 'Body Plan & Organization',
    B: 'Homeostasis',
    C: 'Chemistry & Cell Biology',
    D: 'Histology',
    E: 'Integumentary System',
    F: 'Skeletal System & Articulations',
    G: 'Muscular System',
    H: 'Nervous System',
    I: 'General and Special Senses',
    J: 'Endocrine System',
    K: 'Cardiovascular System',
    L: 'Lymphatic System and Immunity',
    M: 'Respiratory System',
    N: 'Digestive System',
    O: 'Metabolism',
    P: 'Urinary System',
    Q: 'Fluid/Electrolytes & Acid/Base Balance',
    R: 'Reproductive System',
  };

  return {
    code: bestMatch.id,
    nominal: bestMatch.title,
    module: `Module ${moduleLetter}: ${moduleNames[moduleLetter] || 'Anatomy & Physiology'}`,
    chapter: `Chapter ${bestMatch.chapter || '1'}`,
  };
}
