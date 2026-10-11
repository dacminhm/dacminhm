export interface EducationItem {
  period: string;
  degree: string;
  degreeVi?: string;
  institution: string;
  institutionVi?: string;
  variant?: 'blue' | 'slate';
}

export interface CertificationItem {
  title: string;
  titleVi?: string;
  subtitle: string;
  subtitleVi?: string;
  badge?: string;
  badgeColor?: string;
}

export interface ExpertiseItem {
  title: string;
  titleVi?: string;
  tag: string;
  tagVi?: string;
  tagVariant?: 'navy' | 'blue' | 'light-blue' | 'indigo' | 'sky';
}

export interface ExperienceItem {
  id: string;
  period: string;
  periodVi?: string;
  title: string;
  titleVi?: string;
  organization: string;
  organizationVi?: string;
  currentRole?: boolean;
  bullets?: string[];
  bulletsVi?: string[];
}

export interface HonorItem {
  title: string;
  titleVi: string;
  description: string;
  descriptionVi?: string;
  years: {
    year: string;
    special?: boolean;
    icon?: string;
  }[];
}

export interface DossierData {
  name: string;
  titles: {
    en: string;
    vi: string;
  };
  trackRecord: {
    en: string;
    vi: string;
  };
  commission: {
    en: {
      line1: string;
      line2: string;
      line3: string;
    };
    vi: {
      line1: string;
      line2: string;
      line3: string;
    };
  };
  executiveProfileTag: {
    en: string;
    vi: string;
  };
  summary: {
    en: string;
    vi: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    location: string;
    locationVi: string;
    strategicFocus: string;
    strategicFocusVi: string;
    email: string;
    officeAddress: string;
    officeAddressVi: string;
    organizationFull: string;
    organizationFullVi: string;
  };
  education: EducationItem[];
  certifications: CertificationItem[];
  expertise: ExpertiseItem[];
  experience: ExperienceItem[];
  honors: HonorItem;
}
