import React, { useState, useEffect } from 'react';
import { ZoomIn, ShieldCheck } from 'lucide-react';

interface ExecutiveAvatarProps {
  onZoom: () => void;
  imageUrl?: string;
  language?: 'EN' | 'VI';
}

export const ExecutiveAvatar: React.FC<ExecutiveAvatarProps> = ({
  onZoom,
  imageUrl,
  language = 'VI',
}) => {
  const candidateUrls = imageUrl
    ? [imageUrl]
    : ['./avatar.png', './minh 3.png', './minh-3.png', './avatar.jpg', './minh.png'];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  useEffect(() => {
    setCurrentIdx(0);
    setAllFailed(false);
  }, [imageUrl]);

  const handleImgError = () => {
    if (currentIdx + 1 < candidateUrls.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative group cursor-pointer"
        onClick={onZoom}
        title={language === 'EN' ? 'Click photo to zoom' : 'Bấm vào ảnh để phóng to'}
      >
        {/* Outer subtle golden ring matching Image 1.png & minh 3.png */}
        <div className="w-36 h-36 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-md group-hover:scale-[1.02] transition-transform duration-200">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[#E59800]">
            {!allFailed && candidateUrls[currentIdx] ? (
              <img
                src={candidateUrls[currentIdx]}
                alt="Nguyen Dac Minh"
                className="w-full h-full object-cover object-top"
                onError={handleImgError}
              />
            ) : (
              /* High-fidelity SVG recreation matching minh 3.png with yellow roses & pinstripe suit */
              <svg
                viewBox="0 0 200 240"
                className="w-full h-full"
                aria-label="Executive Portrait of Nguyen Dac Minh with Yellow Roses"
              >
                <defs>
                  {/* Rich Amber Studio Gradient matching minh 3.png */}
                  <linearGradient id="studioGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5A623" />
                    <stop offset="40%" stopColor="#E69500" />
                    <stop offset="100%" stopColor="#C47A00" />
                  </linearGradient>

                  {/* Dark Pinstripe Suit Gradient */}
                  <linearGradient id="pinstripeSuit" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#252422" />
                    <stop offset="50%" stopColor="#1B1A17" />
                    <stop offset="100%" stopColor="#0F0E0D" />
                  </linearGradient>

                  {/* Golden Rose Gradient */}
                  <linearGradient id="rosePetal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF275" />
                    <stop offset="60%" stopColor="#F5BD25" />
                    <stop offset="100%" stopColor="#C98A00" />
                  </linearGradient>

                  {/* Shadow filter */}
                  <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Golden Studio Background */}
                <rect width="200" height="240" fill="url(#studioGold)" />

                {/* Suit Shoulders & Torso */}
                <g filter="url(#softShadow)">
                  <path
                    d="M 12 240 Q 40 148 100 152 Q 160 148 188 240 Z"
                    fill="url(#pinstripeSuit)"
                  />

                  {/* Fine vertical pinstripes */}
                  <path
                    d="
                      M 28 240 L 48 165
                      M 44 240 L 62 160
                      M 60 240 L 74 156
                      M 76 240 L 86 154
                      M 124 240 L 114 154
                      M 140 240 L 126 156
                      M 156 240 L 138 160
                      M 172 240 L 152 165
                    "
                    stroke="#ECC94B"
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                    strokeDasharray="2,1"
                  />

                  {/* White Collared Shirt */}
                  <polygon points="80,154 100,192 120,154 116,140 84,140" fill="#FDFBF7" />

                  {/* Dark Necktie */}
                  <polygon points="94,156 106,156 108,205 100,214 92,205" fill="#141312" />
                  {/* Tie Knot */}
                  <polygon points="93,151 107,151 105,163 95,163" fill="#0A0908" />

                  {/* Lapels */}
                  <path d="M 46 240 L 84 152 L 76 142 L 34 186 Z" fill="#1A1917" />
                  <path d="M 154 240 L 116 152 L 124 142 L 166 186 Z" fill="#1A1917" />
                </g>

                {/* Neck */}
                <path d="M 85 118 Q 85 146 100 148 Q 115 146 115 118 Z" fill="#D98A3C" />

                {/* Head (tilted downwards in thoughtful reflection) */}
                <g filter="url(#softShadow)">
                  {/* Ears */}
                  <ellipse cx="62" cy="98" rx="8" ry="12" fill="#C47A00" transform="rotate(-6 62 98)" />
                  <ellipse cx="138" cy="98" rx="8" ry="12" fill="#C47A00" transform="rotate(6 138 98)" />

                  {/* Face */}
                  <path
                    d="M 66 84 Q 64 122 84 138 Q 100 146 116 138 Q 136 122 134 84 Q 130 50 100 50 Q 70 50 66 84 Z"
                    fill="#F2AA52"
                  />

                  {/* Forehead Shadow from downward angle */}
                  <path
                    d="M 68 76 Q 100 82 132 76 Q 130 56 100 54 Q 70 56 68 76 Z"
                    fill="#C47A00"
                    opacity="0.3"
                  />

                  {/* Downward looking eyebrows */}
                  <path d="M 74 86 Q 86 84 96 88" stroke="#1E1B18" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                  <path d="M 104 88 Q 114 84 126 86" stroke="#1E1B18" strokeWidth="3.2" strokeLinecap="round" fill="none" />

                  {/* Downward looking eyes with eyelids slightly lowered */}
                  <path d="M 76 96 Q 86 92 94 95" stroke="#1E1B18" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <ellipse cx="85" cy="98" rx="2.5" ry="2.2" fill="#1E1B18" />

                  <path d="M 106 95 Q 114 92 124 96" stroke="#1E1B18" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <ellipse cx="115" cy="98" rx="2.5" ry="2.2" fill="#1E1B18" />

                  {/* Nose */}
                  <path d="M 100 88 L 97 114 Q 100 118 104 116" stroke="#A85D00" strokeWidth="2.2" strokeLinecap="round" fill="none" />

                  {/* Thoughtful, calm lips */}
                  <path d="M 88 128 Q 100 131 112 128" stroke="#873E00" strokeWidth="2.4" strokeLinecap="round" fill="none" />

                  {/* Hair matching minh 3.png: styled dark hair with strands falling forward */}
                  <path
                    d="M 62 76 Q 60 44 84 34 Q 106 26 130 36 Q 142 48 138 78 Q 130 56 116 50 Q 94 44 76 60 Q 68 68 62 76 Z"
                    fill="#151311"
                  />
                  {/* Distinctive loose hair fringe strands on forehead as in photo */}
                  <path d="M 94 48 Q 93 68 96 74" stroke="#151311" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 104 46 Q 102 64 100 70" stroke="#151311" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 86 52 Q 88 64 89 69" stroke="#151311" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>

                {/* Bouquet of Yellow Roses held in front (prominent in minh 3.png) */}
                <g filter="url(#softShadow)">
                  {/* Green Leaves/Stems Backdrop */}
                  <path d="M 68 208 Q 58 198 64 190 Q 78 194 72 208 Z" fill="#2E5A1E" />
                  <path d="M 132 208 Q 142 198 136 190 Q 122 194 128 208 Z" fill="#2E5A1E" />
                  <path d="M 95 212 Q 100 198 105 212 Z" fill="#234515" />

                  {/* Rose 1 (Left) */}
                  <circle cx="68" cy="192" r="14" fill="url(#rosePetal)" />
                  <path d="M 60 190 Q 68 184 76 190 Q 68 196 60 190 Z" fill="#D98A00" opacity="0.7" />
                  <path d="M 64 186 Q 72 188 68 194 Z" fill="#B36B00" opacity="0.6" />

                  {/* Rose 2 (Center Left) */}
                  <circle cx="88" cy="184" r="16" fill="url(#rosePetal)" />
                  <path d="M 78 182 Q 88 174 98 182 Q 88 190 78 182 Z" fill="#D98A00" opacity="0.7" />
                  <path d="M 83 178 Q 93 180 88 188 Z" fill="#B36B00" opacity="0.6" />

                  {/* Rose 3 (Center Right) */}
                  <circle cx="112" cy="184" r="16" fill="url(#rosePetal)" />
                  <path d="M 102 182 Q 112 174 122 182 Q 112 190 102 182 Z" fill="#D98A00" opacity="0.7" />
                  <path d="M 107 178 Q 117 180 112 188 Z" fill="#B36B00" opacity="0.6" />

                  {/* Rose 4 (Right) */}
                  <circle cx="132" cy="192" r="14" fill="url(#rosePetal)" />
                  <path d="M 124 190 Q 132 184 140 190 Q 132 196 124 190 Z" fill="#D98A00" opacity="0.7" />
                  <path d="M 128 186 Q 136 188 132 194 Z" fill="#B36B00" opacity="0.6" />

                  {/* Lower Foreground Rose Blooms */}
                  <circle cx="78" cy="208" r="15" fill="url(#rosePetal)" />
                  <circle cx="100" cy="204" r="17" fill="url(#rosePetal)" />
                  <circle cx="122" cy="208" r="15" fill="url(#rosePetal)" />
                </g>
              </svg>
            )}
          </div>
        </div>

        {/* Circular badge in corner */}
        <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#1e3a8a] border-2 border-white flex items-center justify-center text-white shadow-sm group-hover:bg-[#172554] transition-colors">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
        </div>

        {/* Clean Zoom Magnifier on hover */}
        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="p-2.5 rounded-full bg-white/95 text-slate-900 shadow-md transform group-hover:scale-105 transition-transform">
            <ZoomIn className="w-5 h-5 text-[#1e3a8a]" />
          </span>
        </div>
      </div>

      {/* Clean Caption matching Image 1.png exactly without public upload button */}
      <div className="mt-2.5 text-center">
        <button
          onClick={onZoom}
          className="text-[12px] text-slate-500 hover:text-blue-900 transition-colors inline-flex items-center gap-1 group font-medium cursor-pointer"
        >
          <span className="text-slate-400 group-hover:text-blue-800 transition-colors">↖</span>
          <span>{language === 'EN' ? 'Click photo to zoom' : 'Bấm vào ảnh để phóng to'}</span>
        </button>
      </div>
    </div>
  );
};
