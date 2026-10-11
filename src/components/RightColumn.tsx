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
              {data.name}
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
          <div className="shrink-0 p-3 sm:p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 text-right sm:min-w-[150px]">
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

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <p className="text-sm leading-relaxed text-slate-700 font-normal">
            {language === 'EN' ? (
              <>
                <strong className="font-semibold text-slate-900">
                  Senior Researcher and Planning & Finance Department Lead
                </strong>{' '}
                at the National Barcode Center (GS1 Vietnam – STAMEQ). Over 16 years of dedicated experience
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
                {/* Timeline Node */}
                <div
                  className={`absolute -left-[23px] sm:-left-[27px] top-3.5 z-10 transition-transform duration-200 group-hover:scale-110 ${
                    role.currentRole
                      ? 'w-4 h-4 rounded-full border-2 border-[#1e3a8a] bg-white flex items-center justify-center -translate-x-[1px]'
                      : 'w-3 h-3 rounded-full border-2 border-slate-400 bg-white group-hover:border-[#1e3a8a]'
                  }`}
                >
                  {role.currentRole && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a]" />
                  )}
                </div>

                {/* Experience Card */}
                <div
                  className={`rounded-xl border p-4.5 sm:p-5 transition-shadow shadow-xs hover:shadow-sm ${
                    role.currentRole
                      ? 'border-blue-200/90 bg-white'
                      : 'border-slate-200/90 bg-white'
                  }`}
                >
                  {/* Period & Current Role Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-[#1e3a8a] border border-blue-200/50">
                      {rolePeriod}
                    </span>
                    {role.currentRole && (
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {language === 'EN' ? 'Current Role' : 'Đang công tác'}
                      </span>
                    )}
                  </div>

                  {/* Role Title */}
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                    {roleTitle}
                  </h3>

                  {/* Organization */}
                  <div className="text-xs text-slate-500 font-medium mt-1 mb-2">
                    {roleOrg}
                  </div>

                  {/* Bullets */}
                  {roleBullets && roleBullets.length > 0 && (
                    <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                      {roleBullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
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

      {/* 4. Honors & Recognition Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1e3a8a]"></span>
          <h2 className="text-xs font-bold tracking-wider text-slate-800 uppercase">
            {language === 'EN' ? 'HONORS & RECOGNITION' : 'KHEN THƯỞNG & DANH HIỆU'}
          </h2>
        </div>

        <div className="bg-[#FFFBEB]/60 rounded-xl border border-amber-200/80 p-5 shadow-xs">
          <div className="flex items-start gap-3.5">
            {/* Star badge icon matching Image 1.png */}
            <div className="w-9 h-9 rounded-lg bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
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
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold ${
                      y.special
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white border border-amber-200 text-slate-800'
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
