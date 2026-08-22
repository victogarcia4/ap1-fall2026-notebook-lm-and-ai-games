import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SloDistributionTab } from './components/SloDistributionTab';
import { NotebooksTab } from './components/NotebooksTab';
import { AiGameTab } from './components/AiGameTab';
import { LoginModal } from './components/LoginModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { HapsCatalogModal } from './components/HapsCatalogModal';
import { SubmissionModal } from './components/SubmissionModal';
import { Assignment, Student, AIGameData, ExamCategory } from './types';
import { INITIAL_STUDENTS } from './data/students';
import { ALL_EXAM_SLOS } from './data/examSlos';
import { 
  generateInitialAssignments, 
  generateInitialAIGames,
  LOCAL_STORAGE_ASSIGNMENTS_KEY,
  LOCAL_STORAGE_GAMES_KEY,
  LOCAL_STORAGE_STUDENTS_KEY
} from './data/initialAssignments';
import { GraduationCap, ShieldCheck, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import { DrGarciaAvatar } from './components/DrGarciaAvatar';

export default function App() {
  // Main Tab State: 'slos' | 'notebooks' | 'aigame'
  const [activeTab, setActiveTab] = useState<'slos' | 'notebooks' | 'aigame'>('slos');

  // Owner Authentication State (Dr. Victor Garcia M, password: Zulybeth97@)
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Other Modals
  const [showStudentLookup, setShowStudentLookup] = useState<boolean>(false);
  const [showHapsCatalog, setShowHapsCatalog] = useState<boolean>(false);
  const [submissionModalAssignment, setSubmissionModalAssignment] = useState<Assignment | null>(null);

  // Core Data in State with localStorage persistence
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_STUDENTS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ASSIGNMENTS_KEY);
      if (saved) {
        const parsed: Assignment[] = JSON.parse(saved);
        // Normalize any sample demo assignments so that they are 'assigned' unless actively submitted/reviewed
        return parsed.map((a) => {
          if (a.status === 'in-progress' && !a.notebookUrl && !a.gameUrl) {
            return { ...a, status: 'assigned' as const };
          }
          return a;
        });
      }
      return generateInitialAssignments();
    } catch {
      return generateInitialAssignments();
    }
  });

  const [games, setGames] = useState<AIGameData[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_GAMES_KEY);
      return saved ? JSON.parse(saved) : generateInitialAIGames();
    } catch {
      return generateInitialAIGames();
    }
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ASSIGNMENTS_KEY, JSON.stringify(assignments));
    } catch (e) {
      console.error('Failed to persist assignments', e);
    }
  }, [assignments]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_GAMES_KEY, JSON.stringify(games));
    } catch (e) {
      console.error('Failed to persist games', e);
    }
  }, [games]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_STUDENTS_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to persist students', e);
    }
  }, [students]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Auth Handlers
  const handleLoginSuccess = () => {
    setIsOwner(true);
    showToast('Welcome, Dr. Victor Garcia M! Administrative owner rights unlocked.');
  };

  const handleLogout = () => {
    setIsOwner(false);
    showToast('Logged out. You are now in Reader mode.');
  };

  // Assignment CRUD Handlers
  const handleUpdateAssignment = (updated: Assignment) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
    showToast(`Assignment for ${updated.studentName} updated successfully.`);
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    showToast('Assignment record erased.');
  };

  const handleAddAssignment = (newAssign: Assignment) => {
    setAssignments((prev) => [newAssign, ...prev]);
    showToast(`New allocation created for ${newAssign.studentName}.`);
  };

  const handleResetDefaultDistribution = () => {
    const initial = generateInitialAssignments();
    setAssignments(initial);
    showToast('Reset to original standard distribution complete.');
  };

  const handleRandomizeDistribution = () => {
    const exams: ExamCategory[] = ['LE1', 'LE2', 'LE3', 'LE4', 'Final'];
    const newAssignments: Assignment[] = [];

    // Shuffle helper
    const shuffle = <T,>(arr: T[]): T[] => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    // Group students by section
    const sections: Record<string, Student[]> = {};
    students.forEach((s) => {
      const sec = s.section || 'General';
      if (!sections[sec]) sections[sec] = [];
      sections[sec].push(s);
    });

    exams.forEach((exam) => {
      const baseSlos = ALL_EXAM_SLOS[exam] || [];
      if (baseSlos.length === 0) return;

      Object.entries(sections).forEach(([secName, secStudents]) => {
        const shuffledSlos = shuffle(baseSlos);
        secStudents.forEach((student, idx) => {
          const slo = shuffledSlos[idx % shuffledSlos.length];
          newAssignments.push({
            id: `${exam}-${student.id}`,
            studentId: student.id,
            studentName: student.name,
            studentSection: student.section,
            exam,
            sloId: slo.id,
            sloText: slo.text,
            hapsCode: slo.hapsCode,
            hapsNominal: slo.hapsNominal,
            status: student.isInstructor ? 'reviewed' : 'assigned',
            grade: student.isInstructor ? '100 / 100' : undefined,
            updatedAt: new Date().toISOString().split('T')[0],
          });
        });
      });
    });

    setAssignments(newAssignments);
    showToast('SLOs redistributed equitably across all sections.');
  };

  // Game Handlers
  const handleAddGame = (game: AIGameData) => {
    setGames((prev) => [game, ...prev]);
    showToast(`AI Game "${game.gameTitle}" submitted.`);
  };

  const handleUpdateGame = (game: AIGameData) => {
    setGames((prev) => prev.map((g) => (g.id === game.id ? game : g)));
    showToast(`AI Game "${game.gameTitle}" updated.`);
  };

  const handleDeleteGame = (gameId: string) => {
    setGames((prev) => prev.filter((g) => g.id !== gameId));
    showToast('AI Game record deleted.');
  };

  const finalAssignments = assignments.filter((a) => a.exam === 'Final');

  return (
    <div className="min-h-screen text-ink flex flex-col font-sans selection:bg-acid selection:text-night">
      
      {/* Top Banner for Instructor Status */}
      {isOwner && (
        <div className="bg-acid text-night text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center space-x-2 border-b border-ink/20 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-night" />
          <span className="font-mono">Owner Mode Active: Dr. Victor Garcia M • Creation / Edit / Erase Privileges Enabled</span>
        </div>
      )}

      {/* Floating Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-night text-paper border border-acid/50 px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 text-xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-acid shrink-0" />
          <span className="font-medium">{notification}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOwner={isOwner}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onOpenStudentLookup={() => setShowStudentLookup(true)}
        onOpenHapsCatalog={() => setShowHapsCatalog(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'slos' && (
          <SloDistributionTab
            assignments={assignments}
            students={students}
            isOwner={isOwner}
            onUpdateAssignment={handleUpdateAssignment}
            onDeleteAssignment={handleDeleteAssignment}
            onAddAssignment={handleAddAssignment}
            onResetDefaultDistribution={handleResetDefaultDistribution}
            onRandomizeDistribution={handleRandomizeDistribution}
            onOpenSubmissionModal={(a) => setSubmissionModalAssignment(a)}
          />
        )}

        {activeTab === 'notebooks' && (
          <NotebooksTab
            assignments={assignments}
            isOwner={isOwner}
            onUpdateAssignment={handleUpdateAssignment}
            onDeleteAssignment={handleDeleteAssignment}
            onOpenSubmissionModal={(a) => setSubmissionModalAssignment(a)}
          />
        )}

        {activeTab === 'aigame' && (
          <AiGameTab
            games={games}
            finalAssignments={finalAssignments}
            isOwner={isOwner}
            onAddGame={handleAddGame}
            onUpdateGame={handleUpdateGame}
            onDeleteGame={handleDeleteGame}
            onOpenSubmissionModal={(a) => setSubmissionModalAssignment(a)}
          />
        )}
      </main>

      {/* Site Footer with Author Credits and Photo */}
      <footer className="max-w-7xl w-[calc(100%-2rem)] mx-auto mb-6 p-4 sm:p-6 bg-night text-paper rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center space-x-3.5">
          <DrGarciaAvatar size="lg" />
          <div>
            <div className="footer-title text-acid font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>built by Dr. Victor Garcia M</span>
              <span className="pill acid text-[10px] py-0 px-1.5 font-mono">Course Architect</span>
            </div>
            <p className="text-xs text-paper/80 m-0 font-sans mt-0.5">
              BIOL 2401 • Human Anatomy & Physiology I • Fall Semester 2026
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <a
            href="https://ap1-fall2026-notebook-lm.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn acid-btn py-1.5 px-3 text-xs font-bold"
          >
            <span>Live Vercel App</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href="https://notebooklm.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn slo-btn py-1.5 px-3 text-xs"
          >
            <span>Google NotebookLM</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href="https://aistudio.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn tutor-btn py-1.5 px-3 text-xs"
          >
            <span>Google AI Studio</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href="https://github.com/victogarcia4/ap1-fall2026-notebook-lm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs text-paper/80 hover:text-acid transition font-mono"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repo</span>
          </a>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

      <StudentPortalModal
        isOpen={showStudentLookup}
        onClose={() => setShowStudentLookup(false)}
        students={students}
        assignments={assignments}
        onOpenSubmissionModal={(a) => {
          setShowStudentLookup(false);
          setSubmissionModalAssignment(a);
        }}
      />

      <HapsCatalogModal
        isOpen={showHapsCatalog}
        onClose={() => setShowHapsCatalog(false)}
      />

      <SubmissionModal
        assignment={submissionModalAssignment}
        isOpen={!!submissionModalAssignment}
        onClose={() => setSubmissionModalAssignment(null)}
        onSubmit={handleUpdateAssignment}
      />
    </div>
  );
}
