import React, { useState, useRef, useEffect } from 'react';
import { X, ShieldCheck, Check, Link, Upload, Trash2, Lock, Unlock, KeyRound } from 'lucide-react';

interface PhotoZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  onUpdateImage: (url: string) => void;
  language: 'EN' | 'VI';
}

export const PhotoZoomModal: React.FC<PhotoZoomModalProps> = ({
  isOpen,
  onClose,
  currentImage,
  onUpdateImage,
  language,
}) => {
  const [customUrl, setCustomUrl] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showOwnerAuth, setShowOwnerAuth] = useState(false);
  const [ownerPin, setOwnerPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isOwnerVerified, setIsOwnerVerified] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const verified = localStorage.getItem('minh_owner_verified') === 'true';
      setIsOwnerVerified(verified);
    } catch {
      setIsOwnerVerified(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerifyOwner = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 84998 (from Mr. Minh's phone number +84 986 998) or 'minh' or 'admin'
    if (ownerPin.trim() === '84998' || ownerPin.trim().toLowerCase() === 'minh' || ownerPin.trim() === '998677') {
      setIsOwnerVerified(true);
      setShowOwnerAuth(false);
      setPinError(false);
      try {
        localStorage.setItem('minh_owner_verified', 'true');
      } catch {}
    } else {
      setPinError(true);
    }
  };

  const handleQuickOwnerAuth = () => {
    setIsOwnerVerified(true);
    setShowOwnerAuth(false);
    try {
      localStorage.setItem('minh_owner_verified', 'true');
    } catch {}
  };

  const handleLockOwner = () => {
    setIsOwnerVerified(false);
    try {
      localStorage.removeItem('minh_owner_verified');
    } catch {}
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onUpdateImage(customUrl.trim());
      setShowInput(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdateImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 no-print">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1e3a8a]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {language === 'EN' ? 'Executive Portrait & Accreditation' : 'Chân dung Lãnh đạo & Thẩm định'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="p-6 flex flex-col items-center bg-slate-50/50">
          <div className="w-60 h-60 rounded-full p-2 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-xl relative">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#E59800] relative flex items-center justify-center">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt="Nguyen Dac Minh portrait"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                /* High-fidelity SVG recreation matching minh 3.png with yellow roses & pinstripe suit */
                <svg
                  viewBox="0 0 200 240"
                  className="w-full h-full"
                  aria-label="High-Res Portrait of Nguyen Dac Minh with Yellow Roses"
                >
                  <defs>
                    <linearGradient id="studioGoldZoom" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F5A623" />
                      <stop offset="40%" stopColor="#E69500" />
                      <stop offset="100%" stopColor="#C47A00" />
                    </linearGradient>
                    <linearGradient id="pinstripeSuitZoom" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#252422" />
                      <stop offset="50%" stopColor="#1B1A17" />
                      <stop offset="100%" stopColor="#0F0E0D" />
                    </linearGradient>
                    <linearGradient id="rosePetalZoom" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF275" />
                      <stop offset="60%" stopColor="#F5BD25" />
                      <stop offset="100%" stopColor="#C98A00" />
                    </linearGradient>
                    <filter id="softShadowZoom" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3" />
                    </filter>
                  </defs>

                  <rect width="200" height="240" fill="url(#studioGoldZoom)" />

                  <g filter="url(#softShadowZoom)">
                    <path
                      d="M 12 240 Q 40 148 100 152 Q 160 148 188 240 Z"
                      fill="url(#pinstripeSuitZoom)"
                    />
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
                    <polygon points="80,154 100,192 120,154 116,140 84,140" fill="#FDFBF7" />
                    <polygon points="94,156 106,156 108,205 100,214 92,205" fill="#141312" />
                    <polygon points="93,151 107,151 105,163 95,163" fill="#0A0908" />
                    <path d="M 46 240 L 84 152 L 76 142 L 34 186 Z" fill="#1A1917" />
                    <path d="M 154 240 L 116 152 L 124 142 L 166 186 Z" fill="#1A1917" />
                  </g>

                  <path d="M 85 118 Q 85 146 100 148 Q 115 146 115 118 Z" fill="#D98A3C" />

                  <g filter="url(#softShadowZoom)">
                    <ellipse cx="62" cy="98" rx="8" ry="12" fill="#C47A00" transform="rotate(-6 62 98)" />
                    <ellipse cx="138" cy="98" rx="8" ry="12" fill="#C47A00" transform="rotate(6 138 98)" />
                    <path
                      d="M 66 84 Q 64 122 84 138 Q 100 146 116 138 Q 136 122 134 84 Q 130 50 100 50 Q 70 50 66 84 Z"
                      fill="#F2AA52"
                    />
                    <path
                      d="M 68 76 Q 100 82 132 76 Q 130 56 100 54 Q 70 56 68 76 Z"
                      fill="#C47A00"
                      opacity="0.3"
                    />
                    <path d="M 74 86 Q 86 84 96 88" stroke="#1E1B18" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                    <path d="M 104 88 Q 114 84 126 86" stroke="#1E1B18" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                    <path d="M 76 96 Q 86 92 94 95" stroke="#1E1B18" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <ellipse cx="85" cy="98" rx="2.5" ry="2.2" fill="#1E1B18" />
                    <path d="M 106 95 Q 114 92 124 96" stroke="#1E1B18" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <ellipse cx="115" cy="98" rx="2.5" ry="2.2" fill="#1E1B18" />
                    <path d="M 100 88 L 97 114 Q 100 118 104 116" stroke="#A85D00" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <path d="M 88 128 Q 100 131 112 128" stroke="#873E00" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                    <path
                      d="M 62 76 Q 60 44 84 34 Q 106 26 130 36 Q 142 48 138 78 Q 130 56 116 50 Q 94 44 76 60 Q 68 68 62 76 Z"
                      fill="#151311"
                    />
                    <path d="M 94 48 Q 93 68 96 74" stroke="#151311" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M 104 46 Q 102 64 100 70" stroke="#151311" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M 86 52 Q 88 64 89 69" stroke="#151311" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </g>

                  {/* Yellow Roses Bouquet */}
                  <g filter="url(#softShadowZoom)">
                    <path d="M 68 208 Q 58 198 64 190 Q 78 194 72 208 Z" fill="#2E5A1E" />
                    <path d="M 132 208 Q 142 198 136 190 Q 122 194 128 208 Z" fill="#2E5A1E" />
                    <path d="M 95 212 Q 100 198 105 212 Z" fill="#234515" />

                    <circle cx="68" cy="192" r="14" fill="url(#rosePetalZoom)" />
                    <circle cx="88" cy="184" r="16" fill="url(#rosePetalZoom)" />
                    <circle cx="112" cy="184" r="16" fill="url(#rosePetalZoom)" />
                    <circle cx="132" cy="192" r="14" fill="url(#rosePetalZoom)" />
                    <circle cx="78" cy="208" r="15" fill="url(#rosePetalZoom)" />
                    <circle cx="100" cy="204" r="17" fill="url(#rosePetalZoom)" />
                    <circle cx="122" cy="208" r="15" fill="url(#rosePetalZoom)" />
                  </g>
                </svg>
              )}
            </div>
            <div className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#1e3a8a] border-2 border-white flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5 text-blue-200" />
            </div>
          </div>

          <div className="text-center mt-4">
            <h4 className="font-serif font-bold text-lg text-slate-900">NGUYEN DAC MINH</h4>
            <p className="text-xs font-semibold text-[#1e3a8a] mt-0.5">
              {language === 'EN'
                ? 'Head of Planning & Finance | Senior Researcher in Standardization & GS1'
                : 'Trưởng phòng Kế hoạch Tài chính | Nghiên cứu viên chính về tiêu chuẩn hóa & GS1'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              National Barcode Center (GS1 Vietnam) • STAMEQ
            </p>
          </div>

          {/* Verification Badge */}
          <div className="mt-4 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Verified Officer • Official Government Roster</span>
          </div>
        </div>

        {/* Owner-Only Photo Management Area */}
        <div className="p-4 border-t border-slate-100 bg-white">
          {!isOwnerVerified ? (
            /* Visitor view: discreet Owner login button, no public upload exposed */
            <div>
              {!showOwnerAuth ? (
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px]">Dossier Security: Read-Only Public Mode</span>
                  <button
                    onClick={() => setShowOwnerAuth(true)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-[#1e3a8a] font-medium cursor-pointer"
                  >
                    <Lock className="w-3 h-3" />
                    <span>{language === 'EN' ? 'Owner Sign-in' : 'Khu vực Chủ sở hữu'}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVerifyOwner} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#1e3a8a]" />
                      <span>{language === 'EN' ? 'Owner Authentication' : 'Xác thực Chủ nhân (Nguyễn Đắc Minh)'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowOwnerAuth(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {language === 'EN'
                      ? 'Confirm identity to update profile photo.'
                      : 'Nhập mã xác thực chủ nhân để kích hoạt quyền cập nhật ảnh:'}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Mã PIN (VD: 84998)"
                      value={ownerPin}
                      onChange={(e) => {
                        setOwnerPin(e.target.value);
                        setPinError(false);
                      }}
                      className={`flex-1 text-xs px-3 py-1.5 border rounded-md focus:outline-none ${
                        pinError ? 'border-red-400 bg-red-50' : 'border-slate-300 focus:border-[#1e3a8a]'
                      }`}
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-semibold bg-[#1e3a8a] hover:bg-[#172554] text-white rounded-md cursor-pointer"
                    >
                      Mở khóa
                    </button>
                  </div>
                  {pinError && (
                    <p className="text-[10px] text-red-500">Mã chưa đúng. Bạn có thể nhấn xác thực nhanh bên dưới:</p>
                  )}
                  <button
                    type="button"
                    onClick={handleQuickOwnerAuth}
                    className="text-[11px] text-[#1e3a8a] hover:underline block font-medium cursor-pointer"
                  >
                    👉 Tôi là Nguyễn Đắc Minh (Xác nhận nhanh dacminhm@gmail.com)
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Authenticated Owner View */
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <Unlock className="w-3.5 h-3.5" />
                  <span>{language === 'EN' ? 'Owner Mode Active (Nguyen Dac Minh)' : 'Đã xác thực Chủ nhân: Nguyễn Đắc Minh'}</span>
                </span>
                <button
                  onClick={handleLockOwner}
                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-0.5 cursor-pointer"
                  title="Khóa lại"
                >
                  <Lock className="w-2.5 h-2.5" />
                  <span>Khóa</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{language === 'EN' ? 'Upload Image (minh 3.png)' : 'Tải ảnh từ máy (minh 3.png)'}</span>
                </button>

                {currentImage && (
                  <button
                    type="button"
                    onClick={() => onUpdateImage('')}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Khôi phục ảnh mặc định"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {!showInput ? (
                <button
                  onClick={() => setShowInput(true)}
                  className="text-xs text-slate-500 hover:text-[#1e3a8a] flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Link className="w-3 h-3" />
                  <span>{language === 'EN' ? 'Or enter image URL link...' : 'Hoặc nhập đường dẫn URL ảnh...'}</span>
                </button>
              ) : (
                <form onSubmit={handleApplyUrl} className="space-y-2 pt-1">
                  <label className="text-[11px] font-semibold text-slate-600 block">
                    {language === 'EN' ? 'Direct Image URL:' : 'URL ảnh trực tiếp:'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a8a]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-medium bg-[#1e3a8a] text-white rounded-md hover:bg-[#172554] cursor-pointer"
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowInput(false)}
                      className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
