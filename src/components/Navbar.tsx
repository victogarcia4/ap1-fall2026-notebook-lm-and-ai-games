import React from 'react';
import { 
  BookOpen, 
  BrainCircuit, 
  Gamepad2, 
  Search, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Layers,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'slos' | 'notebooks' | 'aigame';
  setActiveTab: (tab: 'slos' | 'notebooks' | 'aigame') => void;
  isOwner: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenStudentLookup: () => void;
  onOpenHapsCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isOwner,
  onOpenLogin,
  onLogout,
  onOpenStudentLookup,
  onOpenHapsCatalog,
}) => {
  return (
    <>
      {/* Top Ticker Marquee Strip */}
      <div className="top-strip">
        <div className="marquee">
          <span>BIOL 2401 • Human Anatomy & Physiology I</span>
          <span>Dr. Victor Garcia M</span>
          <span>Google NotebookLM Audio Podcasts & Briefs</span>
          <span>Google AI Studio Game Arena</span>
          <span>HAPS Standard Outcomes</span>
          <span>Fall 2026</span>
          {/* Repeating for seamless loop */}
          <span>BIOL 2401 • Human Anatomy & Physiology I</span>
          <span>Dr. Victor Garcia M</span>
          <span>Google NotebookLM Audio Podcasts & Briefs</span>
          <span>Google AI Studio Game Arena</span>
          <span>HAPS Standard Outcomes</span>
          <span>Fall 2026</span>
        </div>
      </div>

      {/* Floating Pill Site Header */}
      <header className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-2 sticky top-2 z-40">
        <div className="site-header flex-wrap sm:flex-nowrap">
          
          {/* Brand Mark & Title */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer select-none"
            onClick={() => setActiveTab('slos')}
          >
            <div className="brand-mark">
              <span>2401</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-ink leading-tight">
                  BIOL 2401
                </span>
                <span className="pill class text-[10px] py-0 px-2 font-mono">
                  Fall 2026
                </span>
              </div>
              <p className="text-[11px] text-muted leading-none font-medium flex items-center gap-1">
                <span>NotebookLM & AI Game SLO Portal</span>
                <span className="opacity-40">•</span>
                <span className="font-semibold text-ink">Dr. Victor Garcia M</span>
              </p>
            </div>
          </div>

          {/* Navigation Pill Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-paper-2 p-1 rounded-full border border-line">
            <button
              id="nav-tab-slos"
              onClick={() => setActiveTab('slos')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'slos'
                  ? 'bg-night text-acid shadow-sm'
                  : 'text-ink/70 hover:text-ink hover:bg-paper'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>SLOs Matrix</span>
            </button>

            <button
              id="nav-tab-notebooks"
              onClick={() => setActiveTab('notebooks')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'notebooks'
                  ? 'bg-night text-acid shadow-sm'
                  : 'text-ink/70 hover:text-ink hover:bg-paper'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Notebooks (LE1–LE4 & Final)</span>
            </button>

            <button
              id="nav-tab-aigame"
              onClick={() => setActiveTab('aigame')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'aigame'
                  ? 'bg-night text-acid shadow-sm'
                  : 'text-ink/70 hover:text-ink hover:bg-paper'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>AI Games Arena</span>
              <span className="pill acid text-[9px] py-0 px-1 font-mono leading-tight">
                Extra Credits
              </span>
            </button>
          </nav>

          {/* Quick Actions & Auth */}
          <div className="flex items-center space-x-2">
            {/* Student Quick Search */}
            <button
              id="btn-student-lookup"
              onClick={onOpenStudentLookup}
              className="btn-secondary py-1.5 px-3 text-xs"
              title="Find my assigned SLOs by ID or Name"
            >
              <Search className="w-3.5 h-3.5 text-orange" />
              <span className="hidden sm:inline">My SLO Lookup</span>
            </button>

            {/* HAPS Reference Catalog */}
            <button
              id="btn-haps-catalog"
              onClick={onOpenHapsCatalog}
              className="hidden lg:inline-flex btn-secondary py-1.5 px-3 text-xs"
              title="Browse HAPS Learning Outcomes Standards"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-blue" />
              <span>HAPS Catalog</span>
            </button>

            {/* External NotebookLM Launcher */}
            <a
              href="https://notebooklm.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex btn-secondary py-1.5 px-3 text-xs"
              title="Launch Google NotebookLM in a new tab"
            >
              <span>NotebookLM</span>
              <ExternalLink className="w-3 h-3 text-muted" />
            </a>

            {/* Owner Auth Button */}
            {isOwner ? (
              <div className="flex items-center space-x-1.5 pl-1.5 border-l border-line">
                <div className="pill acid py-1 px-2.5 font-mono text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-ink" />
                  <span className="hidden sm:inline">Owner: Dr. Garcia</span>
                </div>
                <button
                  id="btn-logout"
                  onClick={onLogout}
                  className="p-1.5 rounded-full text-muted hover:text-red hover:bg-paper-2 transition"
                  title="Logout from Owner mode"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="btn-owner-login"
                onClick={onOpenLogin}
                className="btn-primary py-1.5 px-3.5 text-xs shadow-none hover:shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Owner Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around mt-2 p-1 bg-paper rounded-2xl border border-line shadow-sm">
          <button
            onClick={() => setActiveTab('slos')}
            className={`flex-1 flex justify-center items-center py-1.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'slos' ? 'bg-night text-acid' : 'text-ink/70'
            }`}
          >
            SLOs Matrix
          </button>
          <button
            onClick={() => setActiveTab('notebooks')}
            className={`flex-1 flex justify-center items-center py-1.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'notebooks' ? 'bg-night text-acid' : 'text-ink/70'
            }`}
          >
            Notebooks
          </button>
          <button
            onClick={() => setActiveTab('aigame')}
            className={`flex-1 flex justify-center items-center py-1.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'aigame' ? 'bg-night text-acid' : 'text-ink/70'
            }`}
          >
            AI Games
          </button>
        </div>
      </header>
    </>
  );
};

