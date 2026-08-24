import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  ExternalLink, 
  Award, 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  ShieldCheck,
  Zap,
  Flame
} from 'lucide-react';
import { AIGameData, Assignment, Student } from '../types';
import { ALL_EXAM_SLOS, getSloChapter } from '../data/examSlos';
import { generateAIGamePrompt } from '../utils/helpers';

interface AiGameTabProps {
  games: AIGameData[];
  finalAssignments: Assignment[];
  isOwner: boolean;
  onAddGame: (game: AIGameData) => void;
  onUpdateGame: (game: AIGameData) => void;
  onDeleteGame: (gameId: string) => void;
  onOpenSubmissionModal: (assignment: Assignment) => void;
}

export const AiGameTab: React.FC<AiGameTabProps> = ({
  games,
  finalAssignments,
  isOwner,
  onAddGame,
  onUpdateGame,
  onDeleteGame,
  onOpenSubmissionModal,
}) => {
  // State for AI Prompt Builder
  const finalSlos = ALL_EXAM_SLOS.Final;
  const [selectedSloIndex, setSelectedSloIndex] = useState<number>(0);
  const [selectedGameType, setSelectedGameType] = useState<string>('clinical-scenario');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Active Playable Game Simulator State
  const [activePlayGame, setActivePlayGame] = useState<AIGameData | null>(games[0] || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Owner Review Modal
  const [reviewingGame, setReviewingGame] = useState<AIGameData | null>(null);
  const [extraCreditScore, setExtraCreditScore] = useState<number>(100);
  const [ownerFeedback, setOwnerFeedback] = useState<string>('');

  const currentSlo = finalSlos[selectedSloIndex] || finalSlos[0];
  const generatedPrompt = generateAIGamePrompt(currentSlo.text, currentSlo.hapsCode);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Game Simulator controls
  const handleStartGame = (game: AIGameData) => {
    setActivePlayGame(game);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswerSubmitted(false);
    setIsGameOver(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activePlayGame?.questions) return;
    setIsAnswerSubmitted(true);
    const q = activePlayGame.questions[currentQuestionIndex];
    if (selectedOption === q.correctIndex) {
      setScore((prev) => prev + 100);
    }
  };

  const handleNextQuestion = () => {
    if (!activePlayGame?.questions) return;
    if (currentQuestionIndex + 1 < activePlayGame.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsGameOver(true);
    }
  };

  const handleSaveReview = () => {
    if (!reviewingGame) return;
    onUpdateGame({
      ...reviewingGame,
      extraCreditScore: extraCreditScore,
      status: 'ready',
    });
    setReviewingGame(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner with Notebook Ruled Styling */}
      <div className="notebook-ruled-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-hand text-lg text-red font-bold">
                Final Exam Extra Credit
              </span>
              <span className="pill acid text-[10px]">
                Google AI Studio
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-ink tracking-tight">
              AI Game Development & Challenge Arena
            </h1>
            <p className="text-xs sm:text-sm text-ink/75 max-w-2xl leading-relaxed">
              Create and test interactive Anatomy & Physiology educational games using Google AI Studio and Gemini models. Correlated with the Final Exam SLOs for comprehensive mastery and extra credit points.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://aistudio.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark py-2.5 px-4 text-xs font-bold flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-orange" />
              <span>Open Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 1: GOOGLE AI STUDIO PROMPT BUILDER */}
      <div className="paper-card p-6 shadow-sm space-y-5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-paper-2 text-ink border border-line">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-display font-bold text-ink">Google AI Studio Game Prompt Generator</h2>
            <p className="text-xs text-muted">
              Select your assigned Final Exam SLO to generate ready-to-run system prompts for Gemini in Google AI Studio.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold font-mono text-ink mb-1.5 uppercase tracking-wider">
              Select Target Final Exam SLO (69 Available)
            </label>
            <select
              id="select-game-slo"
              value={selectedSloIndex}
              onChange={(e) => setSelectedSloIndex(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-paper-2 border border-line text-xs text-ink font-mono focus:border-ink focus:outline-none"
            >
              {finalSlos.map((s, idx) => (
                <option key={s.id} value={idx}>
                  Final #{idx + 1}: [{s.chapter}] {s.text.slice(0, 55)}... ({s.hapsCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold font-mono text-ink mb-1.5 uppercase tracking-wider">
              Game Archetype
            </label>
            <select
              value={selectedGameType}
              onChange={(e) => setSelectedGameType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-paper-2 border border-line text-xs text-ink font-mono focus:border-ink focus:outline-none"
            >
              <option value="clinical-scenario">Clinical Case Diagnostic & Emergency Response</option>
              <option value="quiz">Speed Physiology Board Quiz (3 Rounds)</option>
              <option value="escape-room">Homeostatic Disruption Escape Room</option>
              <option value="pathway-runner">Biochemical Pathway Sequencer</option>
            </select>
          </div>
        </div>

        {/* Generated Prompt Codebox */}
        <div className="p-4 rounded-2xl bg-paper-2 border border-line space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold font-mono text-ink uppercase tracking-wider">
              Gemini / AI Studio System Prompt:
            </span>
            <button
              id="btn-copy-game-prompt"
              onClick={handleCopyPrompt}
              className="btn-primary py-1 px-3 text-xs flex items-center space-x-1.5"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-xs text-ink/90 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto p-3 rounded-xl bg-paper border border-line leading-relaxed">
            {generatedPrompt}
          </pre>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE IN-APP GAME SIMULATOR */}
      {activePlayGame && activePlayGame.questions && activePlayGame.questions.length > 0 && (
        <div className="paper-card p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="pill acid text-[10px] font-mono font-bold">
                  Playable Game Simulator
                </span>
                <span className="text-xs font-mono text-muted">
                  {activePlayGame.hapsCode}
                </span>
              </div>
              <h2 className="text-xl font-display font-extrabold text-ink">{activePlayGame.gameTitle}</h2>
              <p className="text-xs text-muted">
                Created by: <strong className="text-ink">{activePlayGame.studentName}</strong> ({activePlayGame.studentSection})
              </p>
            </div>

            {/* Score & Streak */}
            <div className="flex items-center space-x-4 bg-paper-2 p-3 rounded-2xl border border-line">
              <div className="text-center">
                <span className="text-[10px] text-muted font-bold font-mono uppercase">Current Score</span>
                <div className="text-xl font-display font-extrabold text-emerald-800 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-orange" />
                  <span>{score} pts</span>
                </div>
              </div>
              <div className="text-center border-l border-line pl-4">
                <span className="text-[10px] text-muted font-bold font-mono uppercase">Progress</span>
                <div className="text-sm font-mono font-bold text-ink">
                  {currentQuestionIndex + 1} / {activePlayGame.questions.length}
                </div>
              </div>
            </div>
          </div>

          {!isGameOver ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Question */}
              <div className="p-5 rounded-2xl bg-paper-2 border border-line shadow-sm">
                <span className="text-xs font-bold font-mono text-red uppercase tracking-wider block mb-1">
                  Question {currentQuestionIndex + 1} of {activePlayGame.questions.length}
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-ink leading-snug">
                  {activePlayGame.questions[currentQuestionIndex].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {activePlayGame.questions[currentQuestionIndex].options.map((option, idx) => {
                  const q = activePlayGame.questions![currentQuestionIndex];
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === q.correctIndex;

                  let buttonStyle = 'bg-paper-2 border-line hover:border-ink text-ink';
                  if (isSelected && !isAnswerSubmitted) {
                    buttonStyle = 'bg-paper border-ink text-ink ring-2 ring-ink';
                  } else if (isAnswerSubmitted) {
                    if (isCorrect) {
                      buttonStyle = 'bg-emerald-500/20 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-600';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = 'bg-red/20 border-red text-red font-bold ring-2 ring-red';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between ${buttonStyle}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full bg-paper border border-line text-ink text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-2xl bg-paper-2 border border-line text-xs text-ink space-y-1.5 animate-fade-in">
                  <span className="font-bold text-ink flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-orange" />
                    <span>Physiology Explanation & Rationale:</span>
                  </span>
                  <p className="leading-relaxed text-ink/80">
                    {activePlayGame.questions[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="btn-primary py-2 px-6 text-xs"
                  >
                    Lock in Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="btn-dark py-2 px-6 text-xs"
                  >
                    {currentQuestionIndex + 1 < activePlayGame.questions.length
                      ? 'Next Question →'
                      : 'View Results'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Game Over Screen */
            <div className="text-center py-8 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-800 mx-auto flex items-center justify-center border border-emerald-500/30">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-black text-ink">Challenge Completed!</h3>
              <p className="text-sm text-ink">
                Final Score: <strong className="text-emerald-800 text-lg font-mono">{score} Points</strong>
              </p>
              <p className="text-xs text-muted">
                Excellent mastery of the HAPS outcome principles demonstrated in this game.
              </p>
              <button
                onClick={() => handleStartGame(activePlayGame)}
                className="btn-primary py-2.5 px-5 text-xs inline-flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: SUBMITTED GAMES GALLERY & LEADERBOARD */}
      <div className="paper-card p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-display font-bold text-ink">Submitted AI Games Showcase & Extra Credit Log</h2>
            <p className="text-xs text-muted">
              Browse submitted Google AI Studio games created by students for their Final Exam SLOs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="paper-card p-5 shadow-sm space-y-3 flex flex-col justify-between hover:border-ink transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="pill acid text-[10px] font-mono font-bold">
                      {game.gameType}
                    </span>
                    <span className="pill text-[10px] font-mono font-bold bg-amber-500/15 text-amber-900 border border-amber-500/30">
                      {getSloChapter(game.sloText, 'Final')}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-muted font-semibold">{game.hapsCode}</span>
                </div>

                <h3 className="text-sm font-bold text-ink">{game.gameTitle}</h3>
                <p className="text-xs text-ink/75 line-clamp-2 italic">
                  "{game.sloText}"
                </p>
                <p className="text-[11px] text-muted">
                  Student: <strong className="text-ink">{game.studentName}</strong> ({game.studentSection})
                </p>

                {game.extraCreditScore && (
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-900 font-bold bg-emerald-500/15 p-2 rounded-xl border border-emerald-500/30">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Extra Credit: +{game.extraCreditScore} pts</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-line flex items-center justify-between gap-2">
                <button
                  onClick={() => handleStartGame(game)}
                  className="btn-primary py-1.5 px-3 text-xs flex items-center space-x-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Play In-App</span>
                </button>

                {game.aiStudioUrl && (
                  <a
                    href={game.aiStudioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-paper-2 hover:bg-paper-3 border border-line text-ink transition"
                    title="Open AI Studio Project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {/* Owner Review / Grade */}
                {isOwner && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setReviewingGame(game);
                        setExtraCreditScore(game.extraCreditScore || 100);
                      }}
                      className="p-1.5 rounded-full bg-paper-2 hover:bg-emerald-100 border border-line text-emerald-800 transition"
                      title="Grade extra credit"
                    >
                      <Award className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Erase game record for ${game.gameTitle}?`)) {
                          onDeleteGame(game.id);
                        }
                      }}
                      className="p-1.5 rounded-full bg-paper-2 hover:bg-red-100 border border-line text-red transition"
                      title="Erase game"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OWNER MODAL: Review Game & Award Extra Credit */}
      {isOwner && reviewingGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm">
          <div className="paper-card p-6 max-w-md w-full text-ink space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-display font-bold text-ink">
                Award Extra Credit (Dr. Victor Garcia M)
              </h3>
            </div>

            <p className="text-xs text-muted">
              Game: <strong className="text-ink">{reviewingGame.gameTitle}</strong>
              <br />
              Student: <strong className="text-ink">{reviewingGame.studentName}</strong>
            </p>

            <div>
              <label className="block text-xs font-bold font-mono text-ink mb-1">
                Extra Credit Points (Max 100)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={extraCreditScore}
                onChange={(e) => setExtraCreditScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink font-mono"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-line">
              <button
                onClick={() => setReviewingGame(null)}
                className="btn-secondary py-1.5 px-3 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReview}
                className="btn-primary py-1.5 px-4 text-xs"
              >
                Approve Extra Credit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
