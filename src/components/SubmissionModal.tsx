import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Send, 
  BookOpen, 
  Gamepad2, 
  CheckCircle2, 
  Headphones, 
  Video, 
  Presentation, 
  Image as ImageIcon, 
  Layers 
} from 'lucide-react';
import { Assignment, AssignmentDeliverables } from '../types';

interface SubmissionModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updated: Assignment) => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  assignment,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const isFinal = assignment?.exam === 'Final';
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [status, setStatus] = useState<Assignment['status']>('submitted');

  const [deliverables, setDeliverables] = useState<AssignmentDeliverables>({
    audio: true,
    video: true,
    slideDeck: true,
    infographic: true,
    flashcards: true,
  });

  useEffect(() => {
    if (assignment) {
      setUrl(assignment.notebookUrl || assignment.gameUrl || '');
      setNotes(assignment.notebookNotes || '');
      setGameTitle(assignment.gameTitle || '');
      setStatus(assignment.status || 'submitted');
      setDeliverables({
        audio: assignment.deliverables?.audio ?? true,
        video: assignment.deliverables?.video ?? true,
        slideDeck: assignment.deliverables?.slideDeck ?? true,
        infographic: assignment.deliverables?.infographic ?? true,
        flashcards: assignment.deliverables?.flashcards ?? true,
      });
    }
  }, [assignment]);

  if (!isOpen || !assignment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      alert('Please enter a valid URL.');
      return;
    }

    const updated: Assignment = {
      ...assignment,
      notebookUrl: !isFinal ? url : assignment.notebookUrl,
      gameUrl: isFinal ? url : assignment.gameUrl,
      notebookNotes: notes,
      gameTitle: isFinal ? gameTitle : assignment.gameTitle,
      deliverables: !isFinal ? deliverables : undefined,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onSubmit(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm animate-fade-in">
      <div className="paper-card shadow-2xl max-w-lg w-full p-6 sm:p-8 text-ink relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ink p-1 rounded-full hover:bg-paper-2 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-night text-acid flex items-center justify-center shadow-md">
            {isFinal ? <Gamepad2 className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-lg font-display font-bold text-ink">
              {isFinal ? 'Submit Google AI Studio Game' : `Submit ${assignment.exam} NotebookLM`}
            </h2>
            <p className="text-xs text-muted font-mono">
              Student: <strong className="text-ink">{assignment.studentName}</strong> (ID: {assignment.studentId})
            </p>
          </div>
        </div>

        {/* SLO Info Card */}
        <div className="bg-paper-2 p-3.5 rounded-2xl border border-line mb-4 text-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="font-bold text-ink">{assignment.exam} Assignment</span>
            <span className="pill acid text-[10px] font-bold">{assignment.hapsCode}</span>
          </div>
          <p className="text-ink font-medium">"{assignment.sloText}"</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isFinal && (
            <div>
              <label className="block text-xs font-bold font-mono text-ink mb-1.5 uppercase tracking-wider">
                Game Title
              </label>
              <input
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                placeholder="e.g. Homeostatic Temperature Escape Room"
                className="w-full px-4 py-2.5 rounded-xl bg-paper-2 border border-line text-xs text-ink placeholder-muted focus:outline-none focus:border-ink font-sans"
              />
            </div>
          )}

          {/* 5 Deliverables Checklist for NotebookLM */}
          {!isFinal && (
            <div className="space-y-2 p-3 rounded-2xl bg-paper-2 border border-line">
              <label className="block text-xs font-bold font-mono text-ink uppercase tracking-wider">
                Included Deliverables Checklist:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliverables.audio}
                    onChange={(e) => setDeliverables({ ...deliverables, audio: e.target.checked })}
                    className="rounded border-line text-night focus:ring-acid"
                  />
                  <span className="flex items-center gap-1 text-ink font-medium">
                    <Headphones className="w-3.5 h-3.5 text-orange" />
                    <span>Audio (Overview)</span>
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliverables.video}
                    onChange={(e) => setDeliverables({ ...deliverables, video: e.target.checked })}
                    className="rounded border-line text-night focus:ring-acid"
                  />
                  <span className="flex items-center gap-1 text-ink font-medium">
                    <Video className="w-3.5 h-3.5 text-red" />
                    <span>Video (Shorts)</span>
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliverables.slideDeck}
                    onChange={(e) => setDeliverables({ ...deliverables, slideDeck: e.target.checked })}
                    className="rounded border-line text-night focus:ring-acid"
                  />
                  <span className="flex items-center gap-1 text-ink font-medium">
                    <Presentation className="w-3.5 h-3.5 text-blue-600" />
                    <span>Slide Deck</span>
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliverables.infographic}
                    onChange={(e) => setDeliverables({ ...deliverables, infographic: e.target.checked })}
                    className="rounded border-line text-night focus:ring-acid"
                  />
                  <span className="flex items-center gap-1 text-ink font-medium">
                    <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                    <span>Infographic</span>
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={deliverables.flashcards}
                    onChange={(e) => setDeliverables({ ...deliverables, flashcards: e.target.checked })}
                    className="rounded border-line text-night focus:ring-acid"
                  />
                  <span className="flex items-center gap-1 text-ink font-medium">
                    <Layers className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Flashcard Set</span>
                  </span>
                </label>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold font-mono text-ink mb-1.5 uppercase tracking-wider">
              {isFinal ? 'Google AI Studio / Shared Web Game URL' : 'NotebookLM Shareable Link'}
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={
                isFinal
                  ? 'https://aistudio.google.com/... or https://...'
                  : 'https://notebooklm.google.com/notebook/...'
              }
              className="w-full px-4 py-2.5 rounded-xl bg-paper-2 border border-line text-xs text-ink placeholder-muted focus:outline-none focus:border-ink font-mono"
              required
            />
            <p className="text-[10px] text-muted mt-1">
              Ensure permission is set so anyone with the link can view.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold font-mono text-ink mb-1.5 uppercase tracking-wider">
              Synthesis Notes, Highlights & Takeaways (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Brief summary of your audio, video shorts, slides, infographic, and flashcard set..."
              className="w-full px-4 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink placeholder-muted focus:outline-none focus:border-ink font-sans"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary py-1.5 px-3.5 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary py-1.5 px-4 text-xs flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Assignment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
