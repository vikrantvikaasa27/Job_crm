export type TBucket = 'images' | 'resumes';

export type TMenu = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export type TAccount = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type TBenefit = {
  id?: string;
  name: string;
  description: string;
};

export type TCategory = {
  id: string;
  name: string;
};

export type TLink = {
  id?: string;
  name: string;
  link: string;
  jobseekerId?: string;
  companyId?: string;
};

export type TJobseeker = {
  id?: string;
  fullName: string;
  photo: string;
  phoneNumber: string;
  address: string;
  summary: string;
  accountId: string;
  account?: TAccount;
  educations?: [];
  experiences?: [];
  organizations?: [];
  socialMedia?: TLink[];
  applicants?: TApplicant[];
};

export type TApplicant = {
  id?: string;
  resume: string;
  coverLetter?: string;
  status: string;
  applyDate: Date;
  jobseekerId: string;
  jobseeker?: TJobseeker;
  jobId: string;
  job?: TJob;
};

export type TJob = {
  id: string;
  role: string;
  description: string;
  datePosted: Date;
  dueDate: Date;
  jobType: string;
  totalApplicants: number;
  totalNeeds: number;
  salaryFrom: string;
  salaryTo: string;
  requiredSkills: string[];
  benefits: TBenefit[];
  companyId: string;
  company?: TCompany;
  categoryId: string;
  category?: TCategory;
  applicants?: TApplicant[];
};

export type TCompany = {
  id?: string;
  name: string;
  logo: string;
  overview: string;
  industry: string;
  website: string;
  location: string;
  employee: string;
  dateFounded: Date;
  accountId: string;
  account?: [];
  socialMedia?: TLink[];
  jobs?: [];
};
