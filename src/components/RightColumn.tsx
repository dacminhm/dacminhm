import React from 'react';
import { Star } from 'lucide-react';
import { DossierData } from '../types/dossier';

interface RightColumnProps {
  data: DossierData;
  language: 'EN' | 'VI';
}

export const RightColumn: React.FC<RightColumnProps> = ({ data, language }) => {
  const comm = language === 'EN' ? data.commission.en : data.commission.vi;

  return (
    <main className="flex-1 min-w-0 space-y-7">
      {/* 1. Header Banner & Identity */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            {/* Tag Pill */}
            <span className="inline-block px-3 py-1 rounded text-[11px] font-semibold tracking-wider uppercase bg-blue-50 text-[#1e3a8a] border border-blue-200/60">
              {language === 'EN' ? data.executiveProfileTag.en : data.executiveProfileTag.vi}
            </span>

            {/* Authoritative Serif Name matching Image 1.png */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#0d1c2f] uppercase leading-none">
              {typeof data.name === 'string' ? data.name : (language === 'EN' ? data.name.en : data.name.vi)}
            </h1>

            {/* Professional Subtitles */}
            <div className="text-xs sm:text-[13px] font-bold tracking-wide text-[#1e3a8a] uppercase leading-relaxed">
              {language === 'EN' ? (
                <>
                  <span>HEAD OF PLANNING & FINANCE</span>
                  <span className="text-slate-300 mx-1.5 font-normal">|</span>
                  <span>SENIOR RESEARCHER IN DATA STANDARDIZATION & GS1</span>
                </>
              ) : (
                <>
                  <span>TRƯỞNG PHÒNG KẾ HOẠCH TÀI CHÍNH</span>
                  <span className="text-slate-300 mx-1.5 font-normal">|</span>
                  <span>NGHIÊN CỨU VIÊN CHÍNH VỀ TIÊU CHUẨN HÓA & GS1</span>
                </>
              )}
            </div>
          </div>

          {/* GS1 Vietnam (NBC) STAMEQ Commission Seal Box matching top right */}
          <div className="shrink-0 p-3 sm:p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 text-right sm:min-w-[150px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-500 hover:ring-4 hover:ring-blue-400/20 hover:shadow-[0_0_22px_rgba(59,130,246,0.25),0_8px_20px_-3px_rgba(30,58,138,0.15)] hover:bg-white">
            <div className="text-xs font-bold text-slate-800 tracking-tight">
              {comm.line1}
            </div>
            <div className="text-[11px] font-semibold text-[#1e3a8a]">
              {comm.line2}
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
              {comm.line3}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Executive Summary & Profile Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1e3a8a]"></span>
          <h2 className="text-xs font-bold tracking-wider text-slate-800 uppercase">
            {language === 'EN' ? 'EXECUTIVE SUMMARY & PROFILE' : 'TÓM TẮT HỒ SƠ LÃNH ĐẠO'}
          </h2>
        </div>

        {/* Luminous interactive card - glowing highlight effect */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500 hover:ring-4 hover:ring-blue-400/25 hover:shadow-[0_0_30px_rgba(37,99,235,0.25),0_14px_32px_-4px_rgba(30,58,138,0.18)] hover:bg-gradient-to-br hover:from-white hover:via-blue-50/60 hover:to-indigo-50/30">
          <p className="text-sm leading-relaxed text-slate-700 font-normal">
            {language === 'EN' ? (
              <>
                <strong className="font-semibold text-slate-900">
                  Senior Researcher and Planning & Finance Department Lead
                </strong>{' '}
                at the National Numbering & Barcode Center (GS1 Vietnam – STAMEQ). Over 16 years of dedicated experience
                driving national technical standards, IT standardization, and traceability solutions. Expert in
                bridging regulatory governance with advanced technologies, including GS1 Digital Link, digital
                product passports, and secure data architecture.
              </>
            ) : (
              <>
                <strong className="font-semibold text-slate-900">
                  Nghiên cứu viên chính kiêm Trưởng phòng Kế hoạch Tài chính
                </strong>{' '}
                tại Trung tâm Mã số Mã vạch Quốc gia (GS1 Việt Nam – STAMEQ). Hơn 16 năm cống hiến và đóng góp chuyên sâu
                trong xây dựng tiêu chuẩn kỹ thuật quốc gia, chuẩn hóa CNTT và các giải pháp truy xuất nguồn gốc. Chuyên gia
                kết nối quản trị chính sách với công nghệ tiên tiến: GS1 Digital Link, hộ chiếu sản phẩm số (DPP) và kiến trúc
                dữ liệu an toàn.
              </>
            )}
          </p>
        </div>
      </section>

      {/* 3. Professional Experience Section (Timeline) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1e3a8a]"></span>
            <h2 className="text-xs font-bold tracking-wider text-slate-800 uppercase">
              {language === 'EN' ? 'PROFESSIONAL EXPERIENCE' : 'QUÁ TRÌNH CÔNG TÁC'}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {language === 'EN' ? data.trackRecord.en : data.trackRecord.vi}
          </span>
        </div>

        {/* Timeline with vertical continuous spine */}
        <div className="relative pl-6 sm:pl-7 space-y-4">
          {/* Vertical Connecting Spine */}
          <div className="absolute left-[7px] sm:left-[9px] top-3 bottom-4 w-[2px] bg-slate-200" />

          {data.experience.map((role) => {
            const rolePeriod = language === 'EN' ? role.period : (role.periodVi || role.period);
            const roleTitle = language === 'EN' ? role.title : (role.titleVi || role.title);
            const roleOrg = language === 'EN' ? role.organization : (role.organizationVi || role.organization);
            const roleBullets = language === 'EN' ? role.bullets : (role.bulletsVi || role.bullets);

            return (
              <div key={role.id} className="relative group">
                {/* Timeline Node - glows and pulses on card hover */}
                <div
                  className={`absolute -left-[23px] sm:-left-[27px] top-3.5 z-10 transition-all duration-300 group-hover:scale-130 ${
                    role.currentRole
                      ? 'w-4 h-4 rounded-full border-2 border-[#1e3a8a] bg-white flex items-center justify-center -translate-x-[1px] group-hover:border-blue-600 group-hover:ring-4 group-hover:ring-blue-300/40 group-hover:shadow-[0_0_14px_rgba(37,99,235,0.7)]'
                      : 'w-3 h-3 rounded-full border-2 border-slate-400 bg-white group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:ring-4 group-hover:ring-blue-300/40 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.6)]'
                  }`}
                >
                  {role.currentRole && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] group-hover:bg-blue-600" />
                  )}
                </div>

                {/* Experience Card with Luminous Highlight Hover Effect (sáng lên, tạo hiệu ứng nổi bật) */}
                <div
                  className={`rounded-xl border p-4.5 sm:p-5 transition-all duration-300 ease-out transform hover:-translate-y-1 ${
                    role.currentRole
                      ? 'border-blue-300/90 bg-white hover:border-blue-600 hover:ring-4 hover:ring-blue-400/30 hover:shadow-[0_0_32px_rgba(37,99,235,0.3),0_16px_36px_-6px_rgba(30,58,138,0.22)] hover:bg-gradient-to-br hover:from-white hover:via-blue-50/70 hover:to-indigo-50/40'
                      : 'border-slate-200/90 bg-white hover:border-blue-500 hover:ring-4 hover:ring-blue-400/25 hover:shadow-[0_0_28px_rgba(37,99,235,0.26),0_14px_32px_-5px_rgba(30,58,138,0.18)] hover:bg-gradient-to-br hover:from-white hover:via-blue-50/60 hover:to-indigo-50/30'
                  }`}
                >
                  {/* Period & Current Role Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-[#1e3a8a] border border-blue-200/50 group-hover:bg-blue-100 group-hover:border-blue-300 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all">
                      {rolePeriod}
                    </span>
                    {role.currentRole && (
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-100 group-hover:border-emerald-300 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all">
                        {language === 'EN' ? 'Current Role' : 'Đang công tác'}
                      </span>
                    )}
                  </div>

                  {/* Role Title with title illumination */}
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                    {roleTitle}
                  </h3>

                  {/* Organization */}
                  <div className="text-xs text-slate-500 group-hover:text-slate-800 font-medium mt-1 mb-2 transition-colors">
                    {roleOrg}
                  </div>

                  {/* Bullets */}
                  {roleBullets && roleBullets.length > 0 && (
                    <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 group-hover:text-slate-800 transition-colors">
                      {roleBullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-blue-600 group-hover:scale-125 group-hover:shadow-[0_0_6px_rgba(37,99,235,0.6)] mt-1.5 shrink-0 transition-all" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Honors & Recognition Section with luminous warm glow on hover */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1e3a8a]"></span>
          <h2 className="text-xs font-bold tracking-wider text-slate-800 uppercase">
            {language === 'EN' ? 'HONORS & RECOGNITION' : 'KHEN THƯỞNG & DANH HIỆU'}
          </h2>
        </div>

        <div className="bg-[#FFFBEB]/60 rounded-xl border border-amber-200/80 p-5 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-400 hover:ring-4 hover:ring-amber-300/40 hover:shadow-[0_0_32px_rgba(245,158,11,0.35),0_16px_36px_-6px_rgba(217,119,6,0.22)] hover:bg-gradient-to-br hover:from-amber-50/90 hover:via-[#FFFBEB] hover:to-amber-50/60">
          <div className="flex items-start gap-3.5">
            {/* Star badge icon matching Image 1.png */}
            <div className="w-9 h-9 rounded-lg bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs group-hover:scale-105 transition-transform">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {language === 'EN' ? (
                    <>
                      {data.honors.title}{' '}
                      <span className="font-semibold text-slate-700">
                        ({data.honors.titleVi})
                      </span>
                    </>
                  ) : (
                    <>
                      {data.honors.titleVi}{' '}
                      <span className="font-normal text-slate-500 text-xs">
                        ({data.honors.title})
                      </span>
                    </>
                  )}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {language === 'EN' ? data.honors.description : data.honors.descriptionVi}
                </p>
              </div>

              {/* Awarded Years Badges Row matching Image 1.png */}
              <div className="flex items-center flex-wrap gap-2 pt-1">
                {data.honors.years.map((y, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-transform duration-200 hover:scale-110 cursor-default ${
                      y.special
                        ? 'bg-amber-500 text-white shadow-xs hover:bg-amber-600'
                        : 'bg-white border border-amber-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/60'
                    }`}
                  >
                    {y.special ? (
                      <>
                        <span>🏆</span>
                        <span>{y.year}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-amber-500">⭐</span>
                        <span>{y.year}</span>
                      </>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
