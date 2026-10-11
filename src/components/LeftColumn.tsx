import React from 'react';
import {
  Phone,
  MapPin,
  Compass,
  GraduationCap,
  ShieldCheck,
  Zap,
  Copy,
} from 'lucide-react';
import { ExecutiveAvatar } from './ExecutiveAvatar';
import { DossierData } from '../types/dossier';

interface LeftColumnProps {
  data: DossierData;
  onZoom: () => void;
  language: 'EN' | 'VI';
  onCopyPhone: () => void;
  imageUrl?: string;
  onUploadImage?: (url: string) => void;
}

export const LeftColumn: React.FC<LeftColumnProps> = ({
  data,
  onZoom,
  language,
  onCopyPhone,
  imageUrl,
  onUploadImage,
}) => {
  return (
    <aside className="w-full lg:w-[340px] xl:w-[360px] shrink-0 flex flex-col gap-5 text-slate-800">
      {/* 1. Executive Avatar */}
      <ExecutiveAvatar
        onZoom={onZoom}
        imageUrl={imageUrl}
        language={language}
      />

      {/* 2. Contact & Dossier Section */}
      <section className="bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-xs">
        <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-800 uppercase mb-3.5">
          <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-slate-600">
            <span className="text-[10px]">👤</span>
          </div>
          <span>{language === 'EN' ? 'CONTACT & DOSSIER' : 'LIÊN HỆ & THÔNG TIN'}</span>
        </h3>

        <div className="space-y-3">
          {/* Phone */}
          <div className="flex items-start gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {language === 'EN' ? 'PHONE' : 'ĐIỆN THOẠI'}
              </div>
              <div className="flex items-center justify-between gap-1">
                <a
                  href={`tel:${data.contact.phone}`}
                  className="text-xs font-semibold text-slate-800 hover:text-[#1e3a8a] transition-colors"
                >
                  {data.contact.phoneFormatted}
                </a>
                <button
                  onClick={onCopyPhone}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 rounded transition-opacity cursor-pointer"
                  title="Copy phone"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {language === 'EN' ? 'LOCATION' : 'ĐỊA ĐIỂM'}
              </div>
              <div className="text-xs font-medium text-slate-700 leading-snug">
                {language === 'EN' ? data.contact.location : data.contact.locationVi}
              </div>
            </div>
          </div>

          {/* Strategic Focus */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0 mt-0.5">
              <Compass className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {language === 'EN' ? 'STRATEGIC FOCUS' : 'LĨNH VỰC TRỌNG TÂM'}
              </div>
              <div className="text-xs font-semibold text-[#1e3a8a] leading-snug">
                {language === 'EN' ? data.contact.strategicFocus : data.contact.strategicFocusVi}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Education Section */}
      <section className="bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-xs">
        <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-800 uppercase mb-3.5">
          <GraduationCap className="w-4 h-4 text-[#1e3a8a]" />
          <span>{language === 'EN' ? 'EDUCATION' : 'HỌC VẤN & BẰNG CẤP'}</span>
        </h3>

        <div className="space-y-3">
          {data.education.map((item, idx) => {
            const degreeText = language === 'EN' ? item.degree : (item.degreeVi || item.degree);
            const instText = language === 'EN' ? item.institution : (item.institutionVi || item.institution);

            return (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  item.variant === 'blue'
                    ? 'border-blue-100 bg-blue-50/20'
                    : 'border-slate-100 bg-slate-50/40'
                }`}
              >
                <div className="mb-1.5">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                      item.variant === 'blue'
                        ? 'bg-[#1e3a8a] text-white'
                        : 'bg-slate-600 text-white'
                    }`}
                  >
                    {item.period}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  {degreeText}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {instText}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Certifications & Languages */}
      <section className="bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-xs">
        <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-800 uppercase mb-3.5">
          <ShieldCheck className="w-4 h-4 text-[#1e3a8a]" />
          <span>{language === 'EN' ? 'CERTIFICATIONS & LANGUAGES' : 'CHỨNG CHỈ & NGOẠI NGỮ'}</span>
        </h3>

        <div className="space-y-3 text-xs">
          {/* English Proficiency */}
          <div className="border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span className="font-semibold text-slate-800">
                {language === 'EN' ? 'English Proficiency' : 'Trình độ Tiếng Anh'}
              </span>
            </div>
            <div className="pl-3.5">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                CEFR B2 Level
              </span>
            </div>
          </div>

          {/* ISO/IEC Guide 65:1996 */}
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span className="font-semibold text-slate-800">
                ISO/IEC Guide 65:1996
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pl-3.5 leading-snug">
              {language === 'EN'
                ? 'Product Certification Systems (Bureau of Accreditation - BoA)'
                : 'Hệ thống chứng nhận sản phẩm (Văn phòng Công nhận Chất lượng - BoA)'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Key Expertise */}
      <section className="bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-xs">
        <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-800 uppercase mb-3.5">
          <Zap className="w-4 h-4 text-[#1e3a8a]" />
          <span>{language === 'EN' ? 'KEY EXPERTISE' : 'NĂNG LỰC CỐT LÕI'}</span>
        </h3>

        <div className="space-y-2">
          {data.expertise.map((item, idx) => {
            const expTitle = language === 'EN' ? item.title : (item.titleVi || item.title);
            const expTag = language === 'EN' ? item.tag : (item.tagVi || item.tag);

            return (
              <div
                key={idx}
                className="p-2.5 rounded-lg border border-slate-200/70 bg-slate-50/50 flex items-center justify-between gap-2"
              >
                <span className="text-xs font-medium text-slate-800 leading-tight">
                  {expTitle}
                </span>
                <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-100 text-[#1e3a8a] border border-blue-200/60">
                  {expTag}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Stamp on Left Column matching Image 1.png */}
      <div className="pt-2 text-[11px] text-slate-400 leading-relaxed">
        <p>© 2025 Nguyen Dac Minh</p>
        <p>
          {language === 'EN'
            ? 'National Barcode Center • STAMEQ Vietnam'
            : 'Trung tâm Mã số Mã vạch Quốc gia • STAMEQ Việt Nam'}
        </p>
      </div>
    </aside>
  );
};
