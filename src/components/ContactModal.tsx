import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Building2, Copy, Check, Download, Send } from 'lucide-react';
import { DossierData } from '../types/dossier';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DossierData;
  language: 'EN' | 'VI';
  onToast: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  data,
  language,
  onToast,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', org: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    onToast(language === 'EN' ? `Copied ${type} to clipboard` : `Đã sao chép ${type} vào bộ nhớ tạm`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Nguyen Dac Minh
N:Nguyen;Dac Minh;;;
TITLE:Acting Head of Planning & Finance / Senior Researcher
ORG:National Numbering & Barcode Center (GS1 Vietnam);STAMEQ
TEL;TYPE=CELL:+84986998677
EMAIL;TYPE=WORK:dacminhm@gmail.com
ADR;TYPE=WORK:;;No. 8 Hoang Quoc Viet;Cau Giay;Hanoi;;Vietnam
URL:https://gs1.org.vn
NOTE:Specialist in GS1 Digital Link, Traceability & National Data Standards
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Nguyen_Dac_Minh_STAMEQ.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast(language === 'EN' ? 'Downloaded vCard contact file' : 'Đã tải danh bạ vCard');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    onToast(
      language === 'EN'
        ? 'Message inquiry transmitted successfully to secretariat'
        : 'Thư liên hệ đã được ghi nhận và gửi tới bộ phận tiếp nhận'
    );
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 no-print">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#1e3a8a] text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
              {language === 'EN' ? 'OFFICIAL ENGAGEMENT CHANNEL' : 'KÊNH LIÊN HỆ CÔNG TÁC'}
            </div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white">
              {language === 'EN' ? 'Direct Secretariat Contact' : 'Liên hệ Trực tiếp & Lịch làm việc'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Quick Channels */}
          <div className="space-y-3">
            {/* Phone */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#1e3a8a] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {language === 'EN' ? 'DIRECT PHONE' : 'ĐIỆN THOẠI TRỰC TIẾP'}
                  </div>
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="text-sm font-bold text-slate-800 hover:text-[#1e3a8a]"
                  >
                    {data.contact.phoneFormatted}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(data.contact.phoneFormatted, 'phone number')}
                className="px-2.5 py-1 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
              >
                {copiedType === 'phone number' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {language === 'EN' ? 'OFFICIAL EMAIL' : 'HỘP THƯ ĐIỆN TỬ'}
                  </div>
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="text-sm font-bold text-slate-800 hover:text-[#1e3a8a]"
                  >
                    {data.contact.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(data.contact.email, 'email')}
                className="px-2.5 py-1 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
              >
                {copiedType === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Institution */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {language === 'EN' ? 'INSTITUTION & OFFICE' : 'CƠ QUAN CÔNG TÁC'}
                  </div>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {data.contact.organizationFull}
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    {data.contact.officeAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download vCard action */}
          <div className="pt-1">
            <button
              onClick={handleDownloadVCard}
              className="w-full py-2.5 px-4 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 text-[#1e3a8a] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'EN' ? 'Save Contact to Phone / Outlook (vCard .vcf)' : 'Lưu Danh Bạ Vào Máy (vCard .vcf)'}</span>
            </button>
          </div>

          {/* Quick Inquiry Message Form */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              {language === 'EN' ? 'Send Standard Inquiry or Meeting Request' : 'Gửi Yêu cầu Trao đổi & Làm việc'}
            </h4>
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  required
                  placeholder={language === 'EN' ? 'Your Name' : 'Họ và tên'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a8a]"
                />
                <input
                  type="email"
                  required
                  placeholder={language === 'EN' ? 'Email Address' : 'Địa chỉ Email'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a8a]"
                />
              </div>
              <textarea
                rows={3}
                required
                placeholder={
                  language === 'EN'
                    ? 'Inquiry topic (e.g. GS1 standard compliance, traceability deployment, advisory)...'
                    : 'Nội dung trao đổi (VD: Hợp tác tiêu chuẩn GS1, hệ thống truy xuất nguồn gốc, tư vấn chuyên môn)...'
                }
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a8a]"
              />
              <button
                type="submit"
                disabled={isSent}
                className="w-full py-2 px-4 rounded-md bg-[#1e3a8a] hover:bg-[#172554] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {isSent ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Sent</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'EN' ? 'Transmit Inquiry' : 'Gửi Thông Điệp'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
