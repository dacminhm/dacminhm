import React, { useState } from 'react';
import { X, QrCode, ArrowRight, ShieldCheck, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

interface GS1DigitalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'EN' | 'VI';
  onToast: (msg: string) => void;
}

export const GS1DigitalLinkModal: React.FC<GS1DigitalLinkModalProps> = ({
  isOpen,
  onClose,
  language,
  onToast,
}) => {
  const [gtin, setGtin] = useState('8938500000012'); // Standard Vietnam 893 prefix
  const [batch, setBatch] = useState('LOT2026-VN');
  const [serial, setSerial] = useState('SER998677');
  const [domain, setDomain] = useState('id.gs1.org.vn');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Compute GS1 Digital Link standard URI
  const digitalLinkUri = `https://${domain}/01/${gtin}${batch ? `/10/${encodeURIComponent(batch)}` : ''}${
    serial ? `/21/${encodeURIComponent(serial)}` : ''
  }`;

  const handleCopyUri = () => {
    navigator.clipboard.writeText(digitalLinkUri);
    setCopied(true);
    onToast(language === 'EN' ? 'Copied GS1 Digital Link URI' : 'Đã sao chép chuẩn GS1 Digital Link URI');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 no-print">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#006a61] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-800/80 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-teal-200" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-teal-200">
                {language === 'EN' ? 'RESEARCH DOMAIN SHOWCASE' : 'CÔNG TRÌNH NGHIÊN CỨU & TIÊU CHUẨN'}
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                GS1 Digital Link & 2D Traceability Resolver
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Executive Context */}
          <div className="p-3.5 rounded-lg bg-teal-50/70 border border-teal-200 text-xs text-teal-900 leading-relaxed">
            <span className="font-bold">GS1 Vietnam / STAMEQ Mandate:</span>{' '}
            {language === 'EN'
              ? 'This interactive tool demonstrates the national transition from legacy 1D EAN-13 barcodes to GS1 Digital Link 2D QR standards led by Nguyen Dac Minh. It bridges consumer web access, regulatory verification, and B2B supply chain scanning into a unified web URI.'
              : 'Công cụ mô phỏng quá trình chuyển đổi từ mã vạch 1D (EAN-13) sang chuẩn GS1 Digital Link mã QR 2 chiều do Nguyễn Đắc Minh chủ trì nghiên cứu tại NBC/STAMEQ, hợp nhất tra cứu người tiêu dùng và kiểm định chuỗi cung ứng.'}
          </div>

          {/* Configuration Inputs */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  GTIN (Mã số thương phẩm - AI 01)
                </label>
                <input
                  type="text"
                  value={gtin}
                  onChange={(e) => setGtin(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="893..."
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Prefix 893 = GS1 Vietnam</span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Batch / Lot (Số lô - AI 10)
                </label>
                <input
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="LOT..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Serial Number (Số seri - AI 21)
                </label>
                <input
                  type="text"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="SER..."
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Resolver Domain
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-teal-700 bg-white"
                >
                  <option value="id.gs1.org.vn">id.gs1.org.vn (GS1 Vietnam)</option>
                  <option value="id.gs1.org">id.gs1.org (GS1 Global)</option>
                  <option value="txng.gov.vn">txng.gov.vn (National Portal)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generated Digital Link URI & Barcode representation */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Standard GS1 Digital Link Web URI
              </span>
              <button
                onClick={handleCopyUri}
                className="px-2.5 py-1 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy URI'}</span>
              </button>
            </div>

            <div className="p-2.5 rounded bg-white border border-slate-300 font-mono text-xs text-[#006a61] break-all select-all font-semibold">
              {digitalLinkUri}
            </div>

            {/* Visual 2D DataMatrix Simulation */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
              <div className="flex items-center gap-3">
                {/* SVG 2D Barcode pattern */}
                <div className="w-16 h-16 bg-white border border-slate-300 p-1.5 rounded flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 40 40" className="w-full h-full text-slate-900">
                    {/* Finder patterns */}
                    <rect x="2" y="2" width="10" height="10" fill="currentColor" />
                    <rect x="4" y="4" width="6" height="6" fill="white" />
                    <rect x="5" y="5" width="4" height="4" fill="currentColor" />

                    <rect x="28" y="2" width="10" height="10" fill="currentColor" />
                    <rect x="30" y="4" width="6" height="6" fill="white" />
                    <rect x="31" y="5" width="4" height="4" fill="currentColor" />

                    <rect x="2" y="28" width="10" height="10" fill="currentColor" />
                    <rect x="4" y="30" width="6" height="6" fill="white" />
                    <rect x="5" y="31" width="4" height="4" fill="currentColor" />

                    {/* Data dots */}
                    <rect x="15" y="4" width="3" height="3" fill="currentColor" />
                    <rect x="21" y="4" width="3" height="3" fill="currentColor" />
                    <rect x="18" y="9" width="3" height="3" fill="currentColor" />
                    <rect x="14" y="14" width="3" height="3" fill="currentColor" />
                    <rect x="20" y="15" width="3" height="3" fill="currentColor" />
                    <rect x="26" y="16" width="3" height="3" fill="currentColor" />
                    <rect x="4" y="18" width="3" height="3" fill="currentColor" />
                    <rect x="9" y="22" width="3" height="3" fill="currentColor" />
                    <rect x="15" y="22" width="3" height="3" fill="currentColor" />
                    <rect x="22" y="22" width="3" height="3" fill="currentColor" />
                    <rect x="28" y="22" width="3" height="3" fill="currentColor" />
                    <rect x="33" y="16" width="3" height="3" fill="currentColor" />
                    <rect x="16" y="28" width="3" height="3" fill="currentColor" />
                    <rect x="22" y="29" width="3" height="3" fill="currentColor" />
                    <rect x="28" y="33" width="3" height="3" fill="currentColor" />
                    <rect x="33" y="29" width="3" height="3" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">2D Sunrise Migration Ready</div>
                  <div className="text-[11px] text-slate-500">
                    Complies with GS1 General Specifications & Vietnam TCVN standard
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ISO/IEC 15418
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
