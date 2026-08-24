import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  BrainCircuit, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Info,
  Shield,
  Layers,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { Assignment, ExamCategory, Student, SLOItem } from '../types';
import { ALL_EXAM_SLOS, getExamFullName, getSloChapter } from '../data/examSlos';
import { generateNotebookLMPrompt, generateAIGamePrompt, exportToCSV } from '../utils/helpers';

interface SloDistributionTabProps {
  assignments: Assignment[];
  students: Student[];
  isOwner: boolean;
  onUpdateAssignment: (assignment: Assignment) => void;
  onDeleteAssignment: (assignmentId: string) => void;
  onAddAssignment: (assignment: Assignment) => void;
  onResetDefaultDistribution: () => void;
  onRandomizeDistribution: () => void;
  onOpenSubmissionModal: (assignment: Assignment) => void;
}

export const SloDistributionTab: React.FC<SloDistributionTabProps> = ({
  assignments,
  students,
  isOwner,
  onUpdateAssignment,
  onDeleteAssignment,
  onAddAssignment,
  onResetDefaultDistribution,
  onRandomizeDistribution,
  onOpenSubmissionModal,
}) => {
  // State for Filters
  const [selectedExam, setSelectedExam] = useState<string>('ALL');
  const [selectedSection, setSelectedSection] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // State for "Identify SLO / Reverse Lookup" feature (from BIOL-1408 repo concept)
  const [identifyQuery, setIdentifyQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal states for Owner actions
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentId, setNewStudentId] = useState('');
  const [newExam, setNewExam] = useState<ExamCategory>('LE1');
  const [newSloIndex, setNewSloIndex] = useState<number>(0);

  // Copy handler
  const handleCopyPrompt = (assignment: Assignment) => {
    const prompt = assignment.exam === 'Final'
      ? generateAIGamePrompt(assignment.sloText, assignment.hapsCode)
      : generateNotebookLMPrompt(assignment.sloText, assignment.hapsCode, assignment.exam);
    navigator.clipboard.writeText(prompt);
    setCopiedId(assignment.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reverse SLO Identifier matches
  const identifiedResults = useMemo(() => {
    if (!identifyQuery.trim()) return [];
    const q = identifyQuery.toLowerCase();
    
    // Search within all assignments
    return assignments.filter(
      (a) =>
        a.sloText.toLowerCase().includes(q) ||
        a.hapsCode.toLowerCase().includes(q) ||
        a.hapsNominal.toLowerCase().includes(q)
    );
  }, [identifyQuery, assignments]);

  // Main Filtered Assignments
  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      // Exam filter
      if (selectedExam !== 'ALL' && item.exam !== selectedExam) return false;
      // Section filter
      if (selectedSection !== 'ALL' && item.studentSection !== selectedSection) return false;
      // Status filter
      if (selectedStatus !== 'ALL' && item.status !== selectedStatus) return false;
      // Search query (Student Name, Student ID, SLO text, HAPS Code, Nominal)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesStudent = item.studentName.toLowerCase().includes(q) || item.studentId.includes(q);
        const matchesSlo = item.sloText.toLowerCase().includes(q) || item.hapsCode.toLowerCase().includes(q) || item.hapsNominal.toLowerCase().includes(q);
        if (!matchesStudent && !matchesSlo) return false;
      }
      return true;
    });
  }, [assignments, selectedExam, selectedSection, selectedStatus, searchQuery]);

  // Statistics
  const totalCount = assignments.length;
  const submittedCount = assignments.filter((a) => a.status === 'submitted' || a.status === 'reviewed').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner in Ruled Notebook Paper Style */}
      <div className="notebook-ruled-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-hand text-xl sm:text-2xl text-red font-bold">
                BIOL 2401 Master Learning Plan
              </span>
              <span className="pill acid text-[10px]">
                HAPS Standards
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-ink tracking-tight leading-tight">
              SLOs Distribution & Curriculum Matrix
            </h1>
            <p className="text-xs sm:text-sm text-ink/75 max-w-2xl leading-relaxed">
              Equitable distribution of Student Learning Outcomes for BIOL 2401. Each student is assigned specific outcomes for Lecture Exams (LE1–LE4 for NotebookLM) and the Final Exam (Google AI Studio Game extra credit).
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2.5 min-w-[280px]">
            <div className="paper-card-2 p-3 text-center">
              <span className="text-[10px] text-muted font-mono uppercase font-bold tracking-wider">Total Units</span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-ink mt-0.5">{totalCount}</p>
            </div>
            <div className="paper-card-2 p-3 text-center">
              <span className="text-[10px] text-muted font-mono uppercase font-bold tracking-wider">Students</span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-ink mt-0.5">{students.length}</p>
            </div>
            <div className="paper-card-2 p-3 text-center bg-emerald-500/10 border-emerald-500/30">
              <span className="text-[10px] text-emerald-800 font-mono uppercase font-bold tracking-wider">Submitted</span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-emerald-700 mt-0.5">{submittedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Distribution Roadmap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="paper-card p-3.5 border-l-4 border-acid space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-night bg-acid px-2 py-0.5 rounded">LE1</span>
            <span className="text-[11px] font-mono text-muted">Ch. 1, 2, 3</span>
          </div>
          <p className="text-xs font-bold text-ink">Introduction & Cells</p>
          <p className="text-[11px] text-muted leading-tight">1: Intro • 2: Chemistry • 3: Cells</p>
        </div>

        <div className="paper-card p-3.5 border-l-4 border-orange space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-night bg-orange/30 px-2 py-0.5 rounded">LE2</span>
            <span className="text-[11px] font-mono text-muted">Ch. 4, 5, 6</span>
          </div>
          <p className="text-xs font-bold text-ink">Metabolism & Skin</p>
          <p className="text-[11px] text-muted leading-tight">4: Metabolism • 5: Tissues • 6: Skin</p>
        </div>

        <div className="paper-card p-3.5 border-l-4 border-blue-500 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-white bg-blue-600 px-2 py-0.5 rounded">LE3</span>
            <span className="text-[11px] font-mono text-muted">Ch. 7, 8, 9</span>
          </div>
          <p className="text-xs font-bold text-ink">Skeletal & Muscular</p>
          <p className="text-[11px] text-muted leading-tight">7: Bones • 8: Joints • 9: Muscles</p>
        </div>

        <div className="paper-card p-3.5 border-l-4 border-purple-500 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-white bg-purple-600 px-2 py-0.5 rounded">LE4</span>
            <span className="text-[11px] font-mono text-muted">Ch. 10, 11, 12</span>
          </div>
          <p className="text-xs font-bold text-ink">Nervous & Senses</p>
          <p className="text-[11px] text-muted leading-tight">10: Neural • 11: CNS/PNS • 12: Senses</p>
        </div>

        <div className="paper-card p-3.5 border-l-4 border-emerald-500 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-white bg-emerald-600 px-2 py-0.5 rounded">Final</span>
            <span className="text-[11px] font-mono text-muted">Ch. 1–12</span>
          </div>
          <p className="text-xs font-bold text-ink">Comprehensive & AI Game</p>
          <p className="text-[11px] text-muted leading-tight">Integrated Synthesis & Extra Credits</p>
        </div>
      </div>

      {/* FEATURE 1: SLO & Student Reverse Identifier */}
      <div className="paper-card p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-night text-acid">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-ink flex items-center gap-2">
                <span>Instant SLO & Assigned Student Identifier</span>
                <span className="pill acid text-[10px]">
                  Reverse Lookup
                </span>
              </h2>
              <p className="text-xs text-muted">
                Type any phrase or keyword from an SLO to immediately identify its Exam, HAPS code, and assigned students.
              </p>
            </div>
          </div>
          {identifyQuery && (
            <button
              onClick={() => setIdentifyQuery('')}
              className="text-xs text-muted hover:text-ink underline font-mono"
            >
              Clear lookup
            </button>
          )}
        </div>

        <div className="relative">
          <input
            id="input-identify-slo"
            type="text"
            value={identifyQuery}
            onChange={(e) => setIdentifyQuery(e.target.value)}
            placeholder="e.g., 'homeostasis', 'valves', 'connective tissue', 'AP-19-K', 'mitosis', 'cerebrospinal'..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paper-2 border border-line text-sm text-ink placeholder-muted focus:outline-none focus:border-ink font-sans"
          />
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Real-time Reverse Lookup Results */}
        {identifyQuery.trim() && (
          <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
            {identifiedResults.length === 0 ? (
              <p className="text-xs text-muted italic py-2">
                No outcomes found matching "{identifyQuery}". Try another keyword or HAPS standard code.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {identifiedResults.map((res) => (
                  <div
                    key={res.id}
                    className="p-3.5 rounded-xl bg-paper-2 border border-line hover:border-ink transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="pill lecture-exam text-[10px]">
                          {res.exam} ({getExamFullName(res.exam).split('(')[0]})
                        </span>
                        <span className="pill text-[10px] font-mono font-bold bg-amber-500/15 text-amber-900 border border-amber-500/30">
                          {res.chapter || getSloChapter(res.sloText, res.exam)}
                        </span>
                      </div>
                      <span className="pill text-[10px] font-mono">
                        {res.hapsCode}
                      </span>
                    </div>

                    <p className="text-xs text-ink font-medium line-clamp-2">
                      "{res.sloText}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-line text-muted">
                      <div className="flex items-center space-x-1.5 text-ink font-semibold">
                        <UserCheck className="w-3.5 h-3.5 text-orange" />
                        <span>{res.studentName} ({res.studentSection})</span>
                      </div>
                      <button
                        onClick={() => handleCopyPrompt(res)}
                        className="btn-primary py-1 px-2.5 text-[10px] shadow-none"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Prompt</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FILTER CONTROLS & OWNER ACTIONS */}
      <div className="paper-card p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative flex-1">
            <input
              id="input-search-distribution"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Student Name, 7-digit ID, SLO description, or HAPS standard..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paper-2 border border-line text-sm text-ink placeholder-muted focus:outline-none focus:border-ink font-sans"
            />
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Select Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Exam Selector */}
            <select
              id="select-filter-exam"
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-3 py-2 rounded-full bg-paper-2 border border-line text-xs font-bold text-ink focus:border-ink focus:outline-none"
            >
              <option value="ALL">All Exams (LE1–LE4 & Final)</option>
              <option value="LE1">LE1 (Ch. 1: Intro, Ch. 2: Chemistry, Ch. 3: Cells)</option>
              <option value="LE2">LE2 (Ch. 4: Metabolism, Ch. 5: Tissues, Ch. 6: Integumentary)</option>
              <option value="LE3">LE3 (Ch. 7: Bones, Ch. 8: Joints, Ch. 9: Muscles)</option>
              <option value="LE4">LE4 (Ch. 10: Nervous Overview, Ch. 11: CNS/PNS, Ch. 12: Senses)</option>
              <option value="Final">Final Exam (Comprehensive Ch. 1–12 & AI Game)</option>
            </select>

            {/* Section Selector */}
            <select
              id="select-filter-section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-2 rounded-full bg-paper-2 border border-line text-xs font-bold text-ink focus:border-ink focus:outline-none"
            >
              <option value="ALL">All Sections</option>
              <option value="1101">Section 1101</option>
              <option value="1201">Section 1201</option>
              <option value="1501">Section 1501</option>
              <option value="Instructor">Instructor (Dr. Garcia)</option>
              <option value="Mock">Mock Students</option>
            </select>

            {/* Status Selector */}
            <select
              id="select-filter-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-full bg-paper-2 border border-line text-xs font-bold text-ink focus:border-ink focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="assigned">Assigned</option>
              <option value="in-progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="reviewed">Reviewed / Graded</option>
            </select>

            {/* Export CSV */}
            <button
              id="btn-export-csv"
              onClick={() => exportToCSV('BIOL2401_SLO_Distribution.csv', filteredAssignments)}
              className="btn-secondary py-2 px-3.5 text-xs font-bold"
              title="Download filtered assignments to CSV"
            >
              <Download className="w-3.5 h-3.5 text-ink" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Owner Controls Row */}
        {isOwner && (
          <div className="pt-3 border-t border-line flex flex-wrap items-center justify-between gap-3 bg-acid/20 p-3 rounded-xl border border-acid/50">
            <div className="flex items-center space-x-2 text-xs text-night font-bold font-mono">
              <Shield className="w-4 h-4 text-night" />
              <span>Instructor Controls: Dr. Victor Garcia M</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="btn-add-allocation"
                onClick={() => setShowAddModal(true)}
                className="btn-primary py-1 px-3 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Allocation</span>
              </button>

              <button
                id="btn-randomize"
                onClick={() => {
                  if (confirm('Randomize/Re-distribute SLOs across all students? This will preserve students and reshuffle outcomes equitably.')) {
                    onRandomizeDistribution();
                  }
                }}
                className="btn-dark py-1 px-3 text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reshuffle SLOs</span>
              </button>

              <button
                id="btn-reset-default"
                onClick={() => {
                  if (confirm('Reset to original standard distribution?')) {
                    onResetDefaultDistribution();
                  }
                }}
                className="btn-secondary py-1 px-3 text-xs"
              >
                <span>Reset Default</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ASSIGNMENTS LIST TABLE */}
      <div className="paper-card shadow-md overflow-hidden">
        <div className="px-5 py-4 border-b border-line flex items-center justify-between bg-paper-2">
          <div>
            <h2 className="text-sm font-display font-bold text-ink">
              Showing {filteredAssignments.length} of {assignments.length} Total Allocations
            </h2>
            <p className="text-xs text-muted">
              Select any student row to view submission status, generate study prompts, or submit notebook links.
            </p>
          </div>
        </div>

        {filteredAssignments.length === 0 ? (
          <div className="p-12 text-center text-muted space-y-3">
            <Info className="w-8 h-8 mx-auto text-muted" />
            <p className="text-sm">No assignments match your active search and filter criteria.</p>
            <button
              onClick={() => {
                setSelectedExam('ALL');
                setSelectedSection('ALL');
                setSelectedStatus('ALL');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-ink underline font-mono"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-paper-3 text-ink font-bold font-mono border-b border-line">
                  <th className="py-3 px-4">Student & ID</th>
                  <th className="py-3 px-3">Sec</th>
                  <th className="py-3 px-3">Exam</th>
                  <th className="py-3 px-4">Assigned Student Learning Outcome (SLO)</th>
                  <th className="py-3 px-3">HAPS Standard</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-ink">
                {filteredAssignments.map((item) => {
                  const isSubmitted = item.status === 'submitted' || item.status === 'reviewed';
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-paper-2 transition group"
                    >
                      {/* Student Info */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-ink flex items-center gap-1.5">
                          <span>{item.studentName}</span>
                          {item.studentId === '9990001' && (
                            <span className="pill acid text-[10px] py-0 px-1 font-mono">
                              Instructor
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-muted font-mono mt-0.5">
                          ID: {item.studentId}
                        </div>
                      </td>

                      {/* Section */}
                      <td className="py-3 px-3">
                        <span className="pill text-[11px] font-mono">
                          {item.studentSection}
                        </span>
                      </td>

                      {/* Exam Category */}
                      <td className="py-3 px-3">
                        <span
                          className={`pill ${
                            item.exam === 'Final'
                              ? 'class'
                              : 'lecture-exam'
                          }`}
                        >
                          {item.exam}
                        </span>
                      </td>

                      {/* SLO Text */}
                      <td className="py-3 px-4 max-w-md">
                        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                          <span className="pill text-[10px] font-mono font-bold bg-amber-500/15 text-amber-900 border border-amber-500/30 px-2 py-0.5">
                            {item.chapter || getSloChapter(item.sloText, item.exam)}
                          </span>
                        </div>
                        <p className="font-medium text-ink line-clamp-2 leading-relaxed">
                          {item.sloText}
                        </p>
                        <p className="text-[11px] text-muted mt-1 italic line-clamp-1">
                          <span className="font-semibold text-ink/75 font-mono not-italic">{item.chapter || getSloChapter(item.sloText, item.exam)}</span>
                          <span className="mx-1.5 text-muted/50">•</span>
                          <span>Nominal: {item.hapsNominal}</span>
                        </p>
                      </td>

                      {/* HAPS Code */}
                      <td className="py-3 px-3">
                        <span className="inline-block font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-night text-acid whitespace-nowrap">
                          {item.hapsCode}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span
                          className={`due-badge ${
                            item.status === 'reviewed' || item.status === 'submitted'
                              ? 'done'
                              : item.status === 'in-progress'
                              ? 'pending'
                              : 'future'
                          }`}
                        >
                          {item.status}
                        </span>
                        {item.grade && (
                          <span className="block text-[10px] font-mono font-bold text-emerald-700 mt-0.5">
                            {item.grade}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Copy Prompt Button */}
                          <button
                            onClick={() => handleCopyPrompt(item)}
                            className="p-1.5 rounded-full bg-paper-2 hover:bg-paper-3 border border-line text-ink transition"
                            title={
                              item.exam === 'Final'
                                ? 'Copy Google AI Studio Game Prompt'
                                : 'Copy NotebookLM Prompt'
                            }
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Submit / View Link */}
                          <button
                            onClick={() => onOpenSubmissionModal(item)}
                            className="btn-primary py-1 px-2.5 text-xs shadow-none"
                          >
                            <span>{isSubmitted ? 'View' : 'Submit'}</span>
                          </button>

                          {/* Owner Edit / Erase Actions */}
                          {isOwner && (
                            <>
                              <button
                                onClick={() => setEditingAssignment(item)}
                                className="p-1.5 rounded-full bg-paper-2 hover:bg-amber-100 border border-line text-amber-800 transition"
                                title="Edit this assignment"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Erase assignment for ${item.studentName} (${item.exam})?`)) {
                                    onDeleteAssignment(item.id);
                                  }
                                }}
                                className="p-1.5 rounded-full bg-paper-2 hover:bg-red-100 border border-line text-red transition"
                                title="Erase assignment"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* OWNER MODAL: Edit Allocation */}
      {isOwner && editingAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm">
          <div className="paper-card p-6 max-w-lg w-full text-ink space-y-4 shadow-2xl">
            <h3 className="text-lg font-display font-bold">Edit Assignment (Owner Mode)</h3>
            <p className="text-xs text-muted">
              Student: <span className="text-ink font-bold">{editingAssignment.studentName}</span> | Exam: <span className="pill lecture-exam text-[11px] font-bold">{editingAssignment.exam}</span>
            </p>

            <div>
              <label className="block text-xs font-bold font-mono text-ink mb-1">Assigned SLO Text</label>
              <textarea
                value={editingAssignment.sloText}
                onChange={(e) =>
                  setEditingAssignment({ ...editingAssignment, sloText: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink focus:border-ink font-sans"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold font-mono text-ink mb-1">Chapter</label>
                <input
                  type="text"
                  value={editingAssignment.chapter || getSloChapter(editingAssignment.sloText, editingAssignment.exam)}
                  onChange={(e) =>
                    setEditingAssignment({ ...editingAssignment, chapter: e.target.value })
                  }
                  placeholder="e.g. Chapter 1"
                  className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono text-ink mb-1">HAPS Code</label>
                <input
                  type="text"
                  value={editingAssignment.hapsCode}
                  onChange={(e) =>
                    setEditingAssignment({ ...editingAssignment, hapsCode: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono text-ink mb-1">HAPS Nominal Title</label>
                <input
                  type="text"
                  value={editingAssignment.hapsNominal}
                  onChange={(e) =>
                    setEditingAssignment({ ...editingAssignment, hapsNominal: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold font-mono text-ink mb-1">Status</label>
                <select
                  value={editingAssignment.status}
                  onChange={(e) =>
                    setEditingAssignment({
                      ...editingAssignment,
                      status: e.target.value as Assignment['status'],
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs font-bold text-ink"
                >
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="reviewed">Reviewed / Graded</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold font-mono text-ink mb-1">Grade / Score</label>
                <input
                  type="text"
                  value={editingAssignment.grade || ''}
                  onChange={(e) =>
                    setEditingAssignment({ ...editingAssignment, grade: e.target.value })
                  }
                  placeholder="e.g., 95 / 100"
                  className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold font-mono text-ink mb-1">Instructor Feedback</label>
              <textarea
                value={editingAssignment.feedback || ''}
                onChange={(e) =>
                  setEditingAssignment({ ...editingAssignment, feedback: e.target.value })
                }
                placeholder="Comments, strengths, or suggestions for NotebookLM..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-sans"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-line">
              <button
                onClick={() => setEditingAssignment(null)}
                className="btn-secondary py-1.5 px-3 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpdateAssignment({
                    ...editingAssignment,
                    updatedAt: new Date().toISOString().split('T')[0],
                  });
                  setEditingAssignment(null);
                }}
                className="btn-primary py-1.5 px-4 text-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OWNER MODAL: Add New Allocation */}
      {isOwner && showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm">
          <div className="paper-card p-6 max-w-lg w-full text-ink space-y-4 shadow-2xl">
            <h3 className="text-lg font-display font-bold">Create New Allocation (Owner Mode)</h3>

            <div>
              <label className="block text-xs font-bold font-mono text-ink mb-1">Select Student</label>
              <select
                value={newStudentId}
                onChange={(e) => setNewStudentId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-bold"
              >
                <option value="">-- Select a student --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id}) - Sec {s.section}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold font-mono text-ink mb-1">Select Exam</label>
              <select
                value={newExam}
                onChange={(e) => {
                  setNewExam(e.target.value as ExamCategory);
                  setNewSloIndex(0);
                }}
                className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-bold"
              >
                <option value="LE1">LE1 (Ch. 1: Intro, Ch. 2: Chemistry, Ch. 3: Cells)</option>
                <option value="LE2">LE2 (Ch. 4: Metabolism, Ch. 5: Tissues, Ch. 6: Integumentary)</option>
                <option value="LE3">LE3 (Ch. 7: Bones, Ch. 8: Joints, Ch. 9: Muscles)</option>
                <option value="LE4">LE4 (Ch. 10: Nervous Overview, Ch. 11: CNS/PNS, Ch. 12: Senses)</option>
                <option value="Final">Final Exam (Comprehensive Ch. 1–12 & AI Game)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold font-mono text-ink mb-1">Select SLO Outcome</label>
              <select
                value={newSloIndex}
                onChange={(e) => setNewSloIndex(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-mono"
              >
                {ALL_EXAM_SLOS[newExam]?.map((s, idx) => (
                  <option key={s.id} value={idx}>
                    #{idx + 1}: [{s.chapter}] [{s.hapsCode}] {s.text.slice(0, 60)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-line">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary py-1.5 px-3 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const student = students.find((s) => s.id === newStudentId);
                  const slo = ALL_EXAM_SLOS[newExam]?.[newSloIndex];
                  if (!student || !slo) {
                    alert('Please select both a student and an SLO.');
                    return;
                  }
                  const newAssign: Assignment = {
                    id: `${newExam}-${student.id}-${Date.now().toString().slice(-4)}`,
                    studentId: student.id,
                    studentName: student.name,
                    studentSection: student.section,
                    exam: newExam,
                    sloId: slo.id,
                    sloText: slo.text,
                    hapsCode: slo.hapsCode,
                    hapsNominal: slo.hapsNominal,
                    chapter: slo.chapter,
                    status: 'assigned',
                    updatedAt: new Date().toISOString().split('T')[0],
                  };
                  onAddAssignment(newAssign);
                  setShowAddModal(false);
                }}
                className="btn-primary py-1.5 px-4 text-xs"
              >
                Assign Outcome
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
