export enum Nomination {
  HIP_HOP = 'HIP-HOP',
  HIP_HOP_PRO = 'HIP-HOP PRO',
  HIP_HOP_KIDS = 'HIP-HOP KIDS',
  HIP_HOP_BEG = 'HIP-HOP BEG',
  BBOYS_16_PLUS = 'BBOYS 16+',
  BBOYS_UNDER_9 = 'BBOYS ДО 9ЛЕТ',
  BGIRLS = 'BGIRLS',
  BBOYS_10_12 = 'BBOYS 10-12 ЛЕТ',
  BBOYS_13_15 = 'BBOYS 13-15'
}

export interface RegistrationFormData {
  fullName: string;
  city: string;
  nickname: string;
  birthDate: string;
  teacher: string;
  nomination: Nomination[];
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  aiMessage?: string;
}

export interface YandexDiskError {
  message: string;
  description: string;
  error: string;
}