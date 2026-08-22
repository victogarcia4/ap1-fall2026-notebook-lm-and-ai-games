import React, { useState, useMemo } from 'react';
import { X, Search, BookOpen, BrainCircuit, Copy, Check, Filter } from 'lucide-react';
import { HAPS_DATABASE } from '../data/hapsData';
import { HapsOutcome } from '../types';

interface HapsCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HapsCatalogModal: React.FC<HapsCatalogModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const modules = [
    { code: 'ALL', name: 'All Modules' },
    { code: 'AP-19-A', name: 'Module A - Body Plan & Organization' },
    { code: 'AP-19-B', name: 'Module B - Homeostasis' },
    { code: 'AP-19-C', name: 'Module C - Chemistry & Cell Biology' },
    { code: 'AP-19-D', name: 'Module D - Histology' },
    { code: 'AP-19-E', name: 'Module E - Integumentary System' },
    { code: 'AP-19-F', name: 'Module F - Skeletal System & Articulations' },
    { code: 'AP-19-G', name: 'Module G - Muscular System' },
    { code: 'AP-19-H', name: 'Module H - Nervous System' },
    { code: 'AP-19-I', name: 'Module I - General & Special Senses' },
    { code: 'AP-19-J', name: 'Module J - Endocrine System' },
    { code: 'AP-19-K', name: 'Module K - Cardiovascular System' },
  ];

  const filteredHaps = useMemo(() => {
    return HAPS_DATABASE.filter((item) => {
      if (selectedModule !== 'ALL' && !item.id.startsWith(selectedModule)) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          item.id.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.chapter.includes(q)
        );
      }
      return true;
    });
  }, [searchTerm, selectedModule]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm animate-fade-in">
      <div className="paper-card shadow-2xl max-w-3xl w-full p-6 sm:p-8 text-ink relative max-h-[90vh] flex flex-col">
        
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
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold text-ink">HAPS Learning Outcomes Reference Catalog</h2>
            <p className="text-xs text-muted font-mono">Official Human Anatomy & Physiology Society (HAPS) Standards</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search HAPS code, topic, or description..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink placeholder-muted focus:outline-none focus:border-ink font-sans"
            />
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-paper-2 border border-line text-xs text-ink focus:border-ink focus:outline-none font-sans font-medium"
          >
            {modules.map((m) => (
              <option key={m.code} value={m.code}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 max-h-96 pr-1">
          <p className="text-xs text-muted font-mono">
            Showing <strong className="text-ink">{filteredHaps.length}</strong> HAPS Outcomes
          </p>

          {filteredHaps.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-paper border border-line hover:border-ink transition space-y-1.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="pill acid font-mono text-xs font-bold">
                    {item.id}
                  </span>
                  <span className="text-xs font-bold text-ink">
                    {item.title}
                  </span>
                </div>
                <button
                  onClick={() => handleCopyCode(item.id)}
                  className="text-muted hover:text-ink p-1 rounded hover:bg-paper-2 transition"
                  title="Copy HAPS Code"
                >
                  {copiedCode === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <p className="text-xs text-ink leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center space-x-2 text-[10px] text-muted pt-1 font-mono">
                <span>{item.semester}</span>
                <span>•</span>
                <span>Chapter {item.chapter}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 mt-2 border-t border-line text-[11px] text-muted text-center font-mono">
          The HAPS A&P Learning Outcomes (LOs) are copyrighted by the Human Anatomy & Physiology Society under CC BY-NC-SA 4.0.
        </div>
      </div>
    </div>
  );
};
