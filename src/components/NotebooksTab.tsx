import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Headphones, 
  Award, 
  Search, 
  Edit3, 
  Trash2, 
  Plus, 
  ShieldCheck,
  Share2,
  FolderOpen
} from 'lucide-react';
import { Assignment, ExamCategory, Student } from '../types';
import { getExamFullName } from '../data/examSlos';
import { generateNotebookLMPrompt, generateAIGamePrompt } from '../utils/helpers';

interface NotebooksTabProps {
  assignments: Assignment[];
  isOwner: boolean;
  onUpdateAssignment: (assignment: Assignment) => void;
  onDeleteAssignment: (assignmentId: string) => void;
  onOpenSubmissionModal: (assignment: Assignment) => void;
}

export const NotebooksTab: React.FC<NotebooksTabProps> = ({
  assignments,
  isOwner,
  onUpdateAssignment,
  onDeleteAssignment,
  onOpenSubmissionModal,
}) => {
  // Subdivided tabs as explicitly requested: LE1, LE2, LE3, LE4, Final
  const [subTab, setSubTab] = useState<ExamCategory>('LE1');
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Grading modal state for Dr. Victor Garcia M
  const [gradingAssignment, setGradingAssignment] = useState<Assignment | null>(null);
  const [gradeScore, setGradeScore] = useState('');
  const [gradeFeedback, setGradeFeedback] = useState('');

  // Subtab assignments
  const examAssignments = useMemo(() => {
    return assignments.filter((a) => a.exam === subTab);
  }, [assignments, subTab]);

  const filteredExamAssignments = useMemo(() => {
    if (!searchFilter.trim()) return examAssignments;
    const q = searchFilter.toLowerCase();
    return examAssignments.filter(
      (a) =>
        a.studentName.toLowerCase().includes(q) ||
        a.studentId.includes(q) ||
        a.sloText.toLowerCase().includes(q) ||
        a.hapsCode.toLowerCase().includes(q)
    );
  }, [examAssignments, searchFilter]);

  // Exam stats
  const totalCount = examAssignments.length;
  const submittedCount = examAssignments.filter((a) => a.status === 'submitted' || a.status === 'reviewed').length;
  const reviewedCount = examAssignments.filter((a) => a.status === 'reviewed').length;

  const handleCopyPrompt = (assignment: Assignment) => {
    const prompt = assignment.exam === 'Final'
      ? generateAIGamePrompt(assignment.sloText, assignment.hapsCode)
      : generateNotebookLMPrompt(assignment.sloText, assignment.hapsCode, assignment.exam);
    navigator.clipboard.writeText(prompt);
    setCopiedId(assignment.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenGradeModal = (assignment: Assignment) => {
    setGradingAssignment(assignment);
    setGradeScore(assignment.grade || '');
    setGradeFeedback(assignment.feedback || '');
  };

  const handleSaveGrade = () => {
    if (!gradingAssignment) return;
    onUpdateAssignment({
      ...gradingAssignment,
      grade: gradeScore,
      feedback: gradeFeedback,
      status: gradeScore.trim() ? 'reviewed' : gradingAssignment.status,
      updatedAt: new Date().toISOString().split('T')[0],
    });
    setGradingAssignment(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Subdivided Navigation Tabs for Exams */}
      <div className="paper-card p-2 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1 max-w-full">
          {(['LE1', 'LE2', 'LE3', 'LE4', 'Final'] as ExamCategory[]).map((tab) => (
            <button
              key={tab}
              id={`subtab-${tab}`}
              onClick={() => setSubTab(tab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold font-mono transition whitespace-nowrap ${
                subTab === tab
                  ? 'bg-night text-acid shadow-sm'
                  : 'bg-paper-2 text-ink hover:bg-paper-3 border border-line'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{tab}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-paper-3 text-ink font-mono">
                {assignments.filter((a) => a.exam === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* NotebookLM Launcher Link */}
        <a
          href="https://notebooklm.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dark py-2 px-3.5 text-xs font-bold flex items-center space-x-1.5"
        >
          <span>Open Google NotebookLM</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Subtab Header Banner with Ruled Card styling & Rubric Guide */}
      <div className="notebook-ruled-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-hand text-lg text-red font-bold">
                Assigned Unit Notebooks
              </span>
              <span className="pill acid text-[10px]">
                {subTab}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink tracking-tight">
              {getExamFullName(subTab)}
            </h2>
            <p className="text-xs sm:text-sm text-ink/75 max-w-2xl leading-relaxed">
              {subTab === 'Final'
                ? 'Final Exam comprehensive learning outcomes for synthesis, Google AI Studio game development, and extra credits.'
                : `Targeted student notebooks for ${subTab}. Students ingest OpenStax A&P chapters and lecture notes into NotebookLM to generate Audio Overviews, study guides, and flashcards.`}
            </p>
          </div>

          {/* Subtab Progress Metrics */}
          <div className="grid grid-cols-3 gap-2 min-w-[260px]">
            <div className="paper-card-2 p-2.5 text-center">
              <span className="text-[10px] text-muted font-mono uppercase font-bold">Assigned</span>
              <p className="text-lg font-display font-extrabold text-ink">{totalCount}</p>
            </div>
            <div className="paper-card-2 p-2.5 text-center">
              <span className="text-[10px] text-muted font-mono uppercase font-bold">Submitted</span>
              <p className="text-lg font-display font-extrabold text-ink">{submittedCount}</p>
            </div>
            <div className="paper-card-2 p-2.5 text-center bg-emerald-500/10 border-emerald-500/30">
              <span className="text-[10px] text-emerald-800 font-mono uppercase font-bold">Graded</span>
              <p className="text-lg font-display font-extrabold text-emerald-700">{reviewedCount}</p>
            </div>
          </div>
        </div>

        {/* NotebookLM Standard Rubric & Prompt Guide */}
        <div className="paper-card-2 p-4 text-xs text-ink space-y-2">
          <div className="flex items-center space-x-2 text-ink font-bold">
            <Sparkles className="w-4 h-4 text-orange" />
            <span className="font-display">NotebookLM Submission Rubric & Requirements (BIOL 2401 Standard)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px] pt-1">
            <div className="p-3 rounded-xl bg-paper border border-line space-y-1">
              <div className="font-bold text-ink flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-orange" />
                <span>1. Audio Overview</span>
              </div>
              <span className="text-muted leading-tight block">Generate a 2-host audio deep-dive explicitly debating your assigned SLO mechanism.</span>
            </div>
            <div className="p-3 rounded-xl bg-paper border border-line space-y-1">
              <div className="font-bold text-ink flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>2. Study Brief</span>
              </div>
              <span className="text-muted leading-tight block">400-word structured guide with physiological steps & homeostatic relevance.</span>
            </div>
            <div className="p-3 rounded-xl bg-paper border border-line space-y-1">
              <div className="font-bold text-ink flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>3. 5 Practice Questions</span>
              </div>
              <span className="text-muted leading-tight block">Board-style multiple-choice questions with thorough clinical explanations.</span>
            </div>
            <div className="p-3 rounded-xl bg-paper border border-line space-y-1">
              <div className="font-bold text-ink flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-purple-700" />
                <span>4. Shareable Link</span>
              </div>
              <span className="text-muted leading-tight block">Share link set to "Anyone with the link can view" submitted in this portal.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="paper-card p-3 shadow-sm">
        <div className="relative">
          <input
            id="input-search-notebooks"
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={`Filter ${subTab} notebooks by student name, ID, or outcome topic...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paper-2 border border-line text-sm text-ink placeholder-muted focus:outline-none focus:border-ink font-sans"
          />
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Grid of Student Notebook Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExamAssignments.map((assignment) => {
          const isSubmitted = assignment.status === 'submitted' || assignment.status === 'reviewed';
          return (
            <div
              key={assignment.id}
              className="paper-card p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-ink transition group"
            >
              <div className="space-y-3">
                
                {/* Card Top: Student & Status Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-ink flex items-center gap-1.5">
                      <span>{assignment.studentName}</span>
                      {assignment.studentId === '9990001' && (
                        <span className="pill acid text-[10px] py-0 px-1 font-mono">
                          Instructor
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-muted font-mono mt-0.5">
                      ID: {assignment.studentId} • Sec {assignment.studentSection}
                    </p>
                  </div>
                  <span
                    className={`due-badge ${
                      assignment.status === 'reviewed' || assignment.status === 'submitted'
                        ? 'done'
                        : assignment.status === 'in-progress'
                        ? 'pending'
                        : 'future'
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>

                {/* Assigned SLO Box */}
                <div className="p-3 rounded-xl bg-paper-2 border border-line space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="pill acid text-[10px] font-mono font-bold">{assignment.hapsCode}</span>
                    <span className="text-[10px] text-muted italic truncate max-w-[150px]">
                      {assignment.hapsNominal}
                    </span>
                  </div>
                  <p className="text-xs text-ink font-medium line-clamp-3 leading-relaxed">
                    "{assignment.sloText}"
                  </p>
                </div>

                {/* Submitted Notebook URL or Notes */}
                {assignment.notebookUrl ? (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-emerald-900 font-bold">
                      <span className="flex items-center gap-1">
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>NotebookLM Link Attached</span>
                      </span>
                      <a
                        href={assignment.notebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink font-bold hover:underline flex items-center gap-0.5 font-mono"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    {assignment.notebookNotes && (
                      <p className="text-[11px] text-ink/80 italic line-clamp-2">
                        "{assignment.notebookNotes}"
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] text-muted italic">
                    No NotebookLM link submitted yet.
                  </p>
                )}

                {/* Grade & Instructor Feedback */}
                {assignment.grade && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-emerald-900">
                      <span>Evaluation / Grade:</span>
                      <span className="font-mono font-bold text-emerald-800">{assignment.grade}</span>
                    </div>
                    {assignment.feedback && (
                      <p className="text-ink/80 italic">"{assignment.feedback}"</p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-line flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyPrompt(assignment)}
                  className="p-1.5 rounded-full bg-paper-2 hover:bg-paper-3 border border-line text-ink text-xs font-bold transition flex items-center gap-1 px-2.5"
                  title="Copy tailored prompt to paste into NotebookLM"
                >
                  {copiedId === assignment.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Prompt</span>
                    </>
                  )}
                </button>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onOpenSubmissionModal(assignment)}
                    className="btn-primary py-1 px-3 text-xs"
                  >
                    {isSubmitted ? 'Edit' : 'Submit'}
                  </button>

                  {/* Owner Controls */}
                  {isOwner && (
                    <>
                      <button
                        onClick={() => handleOpenGradeModal(assignment)}
                        className="p-1.5 rounded-full bg-paper-2 hover:bg-emerald-100 border border-line text-emerald-800 transition"
                        title="Grade & review submission"
                      >
                        <Award className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Erase notebook record for ${assignment.studentName}?`)) {
                            onDeleteAssignment(assignment.id);
                          }
                        }}
                        className="p-1.5 rounded-full bg-paper-2 hover:bg-red-100 border border-line text-red transition"
                        title="Erase record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OWNER MODAL: Grading & Review */}
      {isOwner && gradingAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm">
          <div className="paper-card p-6 max-w-md w-full text-ink space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-display font-bold text-ink">
                Grade NotebookLM Submission (Dr. Victor Garcia M)
              </h3>
            </div>
            
            <p className="text-xs text-muted">
              Student: <strong className="text-ink">{gradingAssignment.studentName}</strong> ({gradingAssignment.studentId})
              <br />
              Outcome: "{gradingAssignment.sloText.slice(0, 60)}..."
            </p>

            <div>
              <label className="block text-xs font-bold font-mono text-ink mb-1">Grade / Score</label>
              <input
                type="text"
                value={gradeScore}
                onChange={(e) => setGradeScore(e.target.value)}
                placeholder="e.g., 98 / 100 or Complete"
                className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold font-mono text-ink mb-1">Instructor Review & Feedback</label>
              <textarea
                value={gradeFeedback}
                onChange={(e) => setGradeFeedback(e.target.value)}
                rows={3}
                placeholder="Detailed critique on audio overview clarity, study guide completeness..."
                className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-sans"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-line">
              <button
                onClick={() => setGradingAssignment(null)}
                className="btn-secondary py-1.5 px-3 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGrade}
                className="btn-primary py-1.5 px-4 text-xs"
              >
                Save Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
