import React, { useState } from 'react';
import { 
  X, 
  Search, 
  UserCheck, 
  BookOpen, 
  Gamepad2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Award,
  Share2
} from 'lucide-react';
import { Assignment, Student, ExamCategory } from '../types';
import { getExamFullName } from '../data/examSlos';
import { generateNotebookLMPrompt, generateAIGamePrompt } from '../utils/helpers';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  assignments: Assignment[];
  onOpenSubmissionModal: (assignment: Assignment) => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  students,
  assignments,
  onOpenSubmissionModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  const studentAssignments = selectedStudent
    ? assignments.filter((a) => a.studentId === selectedStudent.id)
    : [];

  const handleCopy = (assignment: Assignment) => {
    const prompt = assignment.exam === 'Final'
      ? generateAIGamePrompt(assignment.sloText, assignment.hapsCode)
      : generateNotebookLMPrompt(assignment.sloText, assignment.hapsCode, assignment.exam);
    navigator.clipboard.writeText(prompt);
    setCopiedId(assignment.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm animate-fade-in">
      <div className="paper-card shadow-2xl max-w-2xl w-full p-6 sm:p-8 text-ink relative max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ink p-1 rounded-full hover:bg-paper-2 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-night text-acid flex items-center justify-center shadow-md">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold text-ink">Student Personal SLO Dashboard</h2>
            <p className="text-xs text-muted font-mono">Search by your 7-digit ID or Name to view all 5 assigned outcomes</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <input
            id="input-student-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type your Student ID (e.g. 7890863) or Name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paper-2 border border-line text-sm text-ink placeholder-muted focus:outline-none focus:border-ink font-sans"
            autoFocus
          />
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Search Results / Student Selector */}
        {!selectedStudent ? (
          <div className="flex-1 overflow-y-auto space-y-2 max-h-80 pr-1">
            <p className="text-xs font-bold font-mono text-ink uppercase tracking-wider mb-2">
              Select your student profile:
            </p>
            {filteredStudents.length === 0 ? (
              <p className="text-xs text-muted italic py-4 text-center">
                No matching student found. Please verify your ID or name.
              </p>
            ) : (
              filteredStudents.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectStudent(s)}
                  className="w-full text-left p-3 rounded-xl bg-paper-2 hover:bg-paper-3 border border-line hover:border-ink transition flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-ink block">{s.name}</span>
                    <span className="text-[11px] text-muted font-mono">ID: {s.id}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-paper border border-line text-ink font-mono text-[11px]">
                    Sec {s.section}
                  </span>
                </button>
              ))
            )}
          </div>
        ) : (
          /* Student Detail View with 5 Assignments */
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            <div className="flex items-center justify-between bg-paper-2 p-3 rounded-xl border border-line">
              <div>
                <h3 className="text-sm font-bold text-ink">{selectedStudent.name}</h3>
                <p className="text-xs text-muted font-mono">ID: {selectedStudent.id} • Section {selectedStudent.section}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-xs text-ink font-bold hover:underline font-mono"
              >
                ← Change Student
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-ink">
                Your 5 Course Allocations (LE1–LE4 & Final AI Game):
              </h4>

              {studentAssignments.map((a) => {
                const isFinal = a.exam === 'Final';
                return (
                  <div
                    key={a.id}
                    className="p-4 rounded-2xl bg-paper border border-line space-y-2.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="pill acid text-xs font-mono font-bold">
                          {a.exam}
                        </span>
                        <span className="text-xs text-muted font-medium">
                          {getExamFullName(a.exam).split('(')[0]}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-ink bg-paper-2 px-2 py-0.5 rounded border border-line font-bold">
                        {a.hapsCode}
                      </span>
                    </div>

                    <p className="text-xs text-ink font-medium leading-relaxed">
                      "{a.sloText}"
                    </p>
                    <p className="text-[11px] text-muted italic">
                      Standard Nominal: {a.hapsNominal}
                    </p>

                    {a.notebookUrl && (
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] flex items-center justify-between text-emerald-950 font-medium">
                        <span>Notebook Link: {a.notebookUrl.slice(0, 35)}...</span>
                        <a
                          href={a.notebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink font-bold hover:underline flex items-center gap-0.5 font-mono"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    <div className="pt-2 border-t border-line flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleCopy(a)}
                        className="p-1.5 rounded-full bg-paper-2 hover:bg-paper-3 border border-line text-ink text-xs font-bold transition flex items-center gap-1 px-2.5"
                      >
                        {copiedId === a.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy {isFinal ? 'Game' : 'NotebookLM'} Prompt</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          onOpenSubmissionModal(a);
                        }}
                        className="btn-primary py-1 px-3 text-xs"
                      >
                        {a.notebookUrl || a.gameUrl ? 'Update' : 'Submit Link'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
