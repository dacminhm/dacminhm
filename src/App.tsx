import React, { useState } from 'react';
import { dossierData } from './data/dossierData';
import { HeaderActions } from './components/HeaderActions';
import { LeftColumn } from './components/LeftColumn';
import { RightColumn } from './components/RightColumn';
import { PhotoZoomModal } from './components/PhotoZoomModal';
import { ContactModal } from './components/ContactModal';
import { GS1DigitalLinkModal } from './components/GS1DigitalLinkModal';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { Toast } from './components/Toast';

export default function App() {
  const [language, setLanguage] = useState<'EN' | 'VI'>('EN');
  const [isPhotoZoomOpen, setIsPhotoZoomOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isGS1ToolOpen, setIsGS1ToolOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('minh_avatar_data') || '';
    } catch {
      return '';
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleUpdateAvatar = (url: string) => {
    setCustomAvatarUrl(url);
    try {
      if (url) {
        localStorage.setItem('minh_avatar_data', url);
        showToast(language === 'EN' ? 'Avatar updated successfully' : 'Đã cập nhật ảnh đại diện thành công');
      } else {
        localStorage.removeItem('minh_avatar_data');
        showToast(language === 'EN' ? 'Restored default avatar' : 'Đã khôi phục ảnh mặc định');
      }
    } catch {
      // In case storage quota is exceeded
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(dossierData.contact.phoneFormatted);
    showToast(
      language === 'EN'
        ? 'Copied phone (+84) 986 998 677 to clipboard'
        : 'Đã sao chép số điện thoại (+84) 986 998 677'
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] py-4 sm:py-8 md:py-10 px-3 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900 print:bg-white print:p-0">
      {/* Central Dossier Container */}
      <div className="max-w-[1240px] mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-8 lg:p-11 print-page">
        {/* Top Header Actions matching Image 1.png */}
        <HeaderActions
          onPrint={() => setIsPrintModalOpen(true)}
          onContact={() => setIsContactOpen(true)}
          onOpenGS1Tool={() => setIsGS1ToolOpen(true)}
          language={language}
          onToggleLanguage={() => setLanguage((l) => (l === 'EN' ? 'VI' : 'EN'))}
        />

        {/* 2-Column Desktop Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Left Column (Identity, Contact, Education, Certifications, Key Expertise) */}
          <LeftColumn
            data={dossierData}
            onZoom={() => setIsPhotoZoomOpen(true)}
            language={language}
            onCopyPhone={handleCopyPhone}
            imageUrl={customAvatarUrl}
            onUploadImage={handleUpdateAvatar}
          />

          {/* Vertical Divider for Desktop */}
          <div className="hidden lg:block w-[1px] bg-slate-200/80 self-stretch" />

          {/* Right Column (Executive Header, Summary, Timeline Experience, Honors) */}
          <RightColumn
            data={dossierData}
            language={language}
          />
        </div>
      </div>

      {/* Discreet Footer Note outside dossier container matching bottom text in screenshot */}
      <footer className="max-w-[1240px] mx-auto mt-6 mb-2 text-center text-xs text-slate-400 no-print">
        <p>
          Executive Curriculum Vitae • Designed with semantic HTML5 & Tailwind CSS • Responsive 2-Column Desktop Layout
        </p>
      </footer>

      {/* Modals & Dialogs */}
      <PhotoZoomModal
        isOpen={isPhotoZoomOpen}
        onClose={() => setIsPhotoZoomOpen(false)}
        currentImage={customAvatarUrl}
        onUpdateImage={handleUpdateAvatar}
        language={language}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        data={dossierData}
        language={language}
        onToast={showToast}
      />

      <GS1DigitalLinkModal
        isOpen={isGS1ToolOpen}
        onClose={() => setIsGS1ToolOpen(false)}
        language={language}
        onToast={showToast}
      />

      <PrintPreviewModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        language={language}
      />

      {/* Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
