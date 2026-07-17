export interface Skill {
  name: string;
  level: number; // 1-5 dots
}

export interface IndustryExperience {
  label: string;
  icon: "plane" | "chip" | "store" | "building" | "shield" | "car";
}

export interface WorkRole {
  title: string;
  company: string;
  dateRange: string;
  subRoles?: {
    heading: string;
    bullets: string[];
  }[];
  bullets?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  dateRange: string;
}

export interface Certification {
  name: string;
  dateEarned: string;
}

export interface CVData {
  personal: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    location: string;
    photoUrl: string;
  };
  highlights: string[];
  executiveSummary: {
    paragraphs: string[];
    links: { label: string; url: string }[];
  };
  certifications: Certification[];
  skills: Skill[];
  industryExperience: IndustryExperience[];
  workExperience: WorkRole[];
  education: Education[];
}
