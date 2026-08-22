import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, AlertCircle } from 'lucide-react';
import { DrGarciaAvatar } from './DrGarciaAvatar';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Zulybeth97@') {
      setError('');
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError('Incorrect password. Access is restricted to Dr. Victor Garcia M.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm animate-fade-in">
      <div className="paper-card shadow-2xl max-w-md w-full p-6 sm:p-8 text-ink relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-ink p-1 rounded-full hover:bg-paper-2 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3.5 mb-6">
          <DrGarciaAvatar size="md" />
          <div>
            <h2 className="text-xl font-display font-bold text-ink">Owner Authentication</h2>
            <p className="text-xs text-muted font-mono">Dr. Victor Garcia M — Full Administrative Rights</p>
          </div>
        </div>

        <p className="text-xs text-ink/80 mb-5 leading-relaxed bg-paper-2 p-3.5 rounded-xl border border-line">
          This procedure of creation, erasure, and editing of Notebooks, SLO allocations, and AI Game scoring is restricted to the course owner.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold font-mono text-ink mb-1.5 uppercase tracking-wider">
              Owner Password
            </label>
            <div className="relative">
              <input
                id="input-owner-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password..."
                className="w-full px-4 py-2.5 rounded-xl bg-paper-2 border border-line focus:border-ink text-ink placeholder-muted text-xs font-mono outline-none transition"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red text-xs bg-red/10 p-2.5 rounded-xl border border-red/30 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary py-1.5 px-3.5 text-xs"
            >
              Cancel
            </button>
            <button
              id="btn-submit-login"
              type="submit"
              className="btn-primary py-1.5 px-4 text-xs flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify & Unlock</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
