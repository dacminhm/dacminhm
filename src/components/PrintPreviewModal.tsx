import React, { useState } from 'react';
import { X, Printer, FileText, Check, Download } from 'lucide-react';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'EN' | 'VI';
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [layoutMode, setLayoutMode] = useState<'full' | 'summary'>('full');

  if (!isOpen) return null;

  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 no-print">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-slate-300" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {language === 'EN' ? 'Print & Export Dossier (PDF)' : 'In & Xuất Hồ Sơ PDF'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="text-xs text-slate-600 leading-relaxed">
            {language === 'EN'
              ? 'Prepare official high-resolution executive document formatted for A4 standard paper.'
              : 'Chuẩn bị bản in hồ sơ lý lịch chính thức chuẩn A4, phù hợp lưu trữ hoặc đính kèm hồ sơ bổ nhiệm.'}
          </div>

          <div className="space-y-2.5">
            <label
              onClick={() => setLayoutMode('full')}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                layoutMode === 'full'
                  ? 'border-[#1e3a8a] bg-blue-50/40 shadow-xs'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#1e3a8a]" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {language === 'EN' ? 'Complete 2-Column Official Dossier' : 'Toàn văn Hồ sơ 2 Cột (Tiêu chuẩn)'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === 'EN'
                      ? 'Includes career timeline, honors, education & credentials'
                      : 'Bao gồm toàn bộ quá trình công tác, khen thưởng & bằng cấp'}
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="printLayout"
                checked={layoutMode === 'full'}
                onChange={() => setLayoutMode('full')}
                className="text-[#1e3a8a]"
              />
            </label>

            <label
              onClick={() => setLayoutMode('summary')}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                layoutMode === 'summary'
                  ? 'border-[#1e3a8a] bg-blue-50/40 shadow-xs'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#1e3a8a]" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {language === 'EN' ? 'Executive Brief (1-Page Fit)' : 'Bản Tóm tắt Lãnh đạo (1 Trang)'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === 'EN' ? 'Condensed for board and ministerial review' : 'Thu gọn phục vụ báo cáo nhanh'}
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="printLayout"
                checked={layoutMode === 'summary'}
                onChange={() => setLayoutMode('summary')}
                className="text-[#1e3a8a]"
              />
            </label>
          </div>

          <div className="pt-2">
            <button
              onClick={handlePrint}
              className="w-full py-2.5 px-4 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'EN' ? 'Proceed to System Print / Save PDF' : 'Mở Cửa Sổ In / Lưu PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
