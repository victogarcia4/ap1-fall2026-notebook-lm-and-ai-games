import React, { useState, useEffect } from 'react';

interface DrGarciaAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

const LOCAL_STORAGE_CUSTOM_AVATAR_KEY = 'ap1_dr_garcia_avatar_custom';

export const DrGarciaAvatar: React.FC<DrGarciaAvatarProps> = ({
  size = 'md',
  className = '',
  showBadge = true,
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(() => {
    return localStorage.getItem(LOCAL_STORAGE_CUSTOM_AVATAR_KEY) || '/dr_victor_garcia.png';
  });
  const [hasError, setHasError] = useState(false);
  const [attemptIndex, setAttemptIndex] = useState(0);

  const fallbackSources = [
    '/dr_victor_garcia.png',
    '/VHGM_traje_azul.png',
    '/VHGM profesional profile.png',
    '/VHGM  foto.jpg',
  ];

  const handleImageError = () => {
    if (attemptIndex < fallbackSources.length - 1) {
      const nextIdx = attemptIndex + 1;
      setAttemptIndex(nextIdx);
      setImgSrc(fallbackSources[nextIdx]);
    } else {
      setHasError(true);
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-[9px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-13 h-13 text-sm',
    xl: 'w-16 h-16 text-base',
  }[size];

  const badgeSizeClasses = {
    sm: 'w-3 h-3 text-[7px] -bottom-0.5 -right-0.5',
    md: 'w-4 h-4 text-[8px] -bottom-0.5 -right-0.5',
    lg: 'w-5 h-5 text-[9px] -bottom-1 -right-1',
    xl: 'w-6 h-6 text-[10px] -bottom-1 -right-1',
  }[size];

  return (
    <div className={`relative shrink-0 select-none ${className}`}>
      <div
        className={`${sizeClasses} rounded-full overflow-hidden border-2 border-acid shadow-md bg-[#0e1626] flex items-center justify-center`}
      >
        {!hasError && imgSrc ? (
          <img
            src={imgSrc}
            alt="Dr. Victor Garcia M"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        ) : (
          /* Prestigious Medical Professor SVG Avatar fallback when binary is corrupt */
          <div className="w-full h-full bg-gradient-to-b from-[#1b2a4a] via-[#101b30] to-[#0a1120] flex flex-col items-center justify-center relative text-white">
            {/* Elegant SVG Doctor Silhouette in Navy Suit & Tie */}
            <svg
              className="w-full h-full text-[#c8e972] p-1"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Suit shoulders */}
              <path
                d="M15 92C15 76 30 65 50 65C70 65 85 76 85 92"
                fill="#1e3a8a"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              {/* White Shirt Collar */}
              <polygon points="50,65 40,78 60,78" fill="#f8fafc" />
              {/* Navy/Gold Tie */}
              <polygon points="50,70 47,88 50,92 53,88" fill="#eab308" />
              {/* Head / Face */}
              <circle cx="50" cy="40" r="22" fill="#d4a373" />
              {/* Hair */}
              <path
                d="M28 38C28 24 38 18 50 18C62 18 72 24 72 38C72 30 65 24 50 24C35 24 28 30 28 38Z"
                fill="#2c1810"
              />
              {/* Professor Glasses */}
              <circle cx="42" cy="39" r="6" stroke="#1e293b" strokeWidth="1.8" fill="none" />
              <circle cx="58" cy="39" r="6" stroke="#1e293b" strokeWidth="1.8" fill="none" />
              <line x1="48" y1="39" x2="52" y2="39" stroke="#1e293b" strokeWidth="1.8" />
              {/* Stethoscope Accent */}
              <path
                d="M32 68C32 78 40 86 50 86C60 86 68 78 68 68"
                stroke="#c8e972"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="50" cy="88" r="3" fill="#c8e972" />
            </svg>
          </div>
        )}
      </div>

      {showBadge && (
        <div
          className={`absolute ${badgeSizeClasses} brand-mark bg-acid text-night font-bold shadow flex items-center justify-center rounded-full`}
        >
          ✓
        </div>
      )}
    </div>
  );
};
