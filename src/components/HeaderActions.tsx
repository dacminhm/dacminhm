import React from 'react';
import { Printer, PhoneCall, QrCode, Globe } from 'lucide-react';

interface HeaderActionsProps {
  onPrint: () => void;
  onContact: () => void;
  onOpenGS1Tool: () => void;
  language: 'EN' | 'VI';
  onToggleLanguage: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  onPrint,
  onContact,
  onOpenGS1Tool,
  language,
  onToggleLanguage,
}) => {
  return (
    <header className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-200/80 no-print">
      {/* Official Status Indicator matching Image 1.png */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
        </span>
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-700 uppercase">
          <span>{language === 'EN' ? 'OFFICIAL DOSSIER & EXECUTIVE CV' : 'HỒ SƠ CÔNG TÁC & LÝ LỊCH CHUYÊN GIA'}</span>
          <span className="text-slate-400 font-normal">•</span>
          <span className="text-[#1e3a8a] font-bold">NBC / STAMEQ</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center flex-wrap gap-2.5 self-end sm:self-auto">
        {/* Language switch button */}
        <button
          onClick={onToggleLanguage}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs cursor-pointer"
          title="Chuyển đổi ngôn ngữ / Switch Language"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-blue-900">{language}</span>
          <span className="text-[10px] text-slate-400">{language === 'EN' ? 'VI' : 'EN'}</span>
        </button>

        {/* GS1 Digital Link & Traceability Tool */}
        <button
          onClick={onOpenGS1Tool}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-teal-200 bg-teal-50/70 text-teal-800 hover:bg-teal-100 hover:border-teal-300 transition-all shadow-xs cursor-pointer"
          title="GS1 Digital Link & QR Architecture Resolver"
        >
          <QrCode className="w-3.5 h-3.5 text-teal-700" />
          <span className="hidden md:inline">GS1 Digital Link</span>
          <span className="md:hidden">GS1</span>
        </button>

        {/* Print / Save PDF Button matching Image 1.png */}
        <button
          onClick={onPrint}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-xs cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>{language === 'EN' ? 'Print / Save PDF' : 'In / Lưu PDF'}</span>
        </button>

        {/* Direct Contact Button matching Image 1.png */}
        <button
          onClick={onContact}
          className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-md bg-[#1e3a8a] hover:bg-[#172554] text-white shadow-xs transition-all cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{language === 'EN' ? 'Direct Contact' : 'Liên hệ Trực tiếp'}</span>
        </button>
      </div>
    </header>
  );
};
