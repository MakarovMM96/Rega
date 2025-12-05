import { Nomination, RegistrationFormData } from './types';

// NOTE: In a real production app, never hardcode tokens on the frontend.
// This should be in an environment variable or handled by a backend proxy.
export const YANDEX_DISK_TOKEN = 'y0__xDfr5p5GO7dOyCuxPqgFdk1y0sSrcoV8UU-iJfbeZ5Axa2v';

// Derived from the provided URL: 
// https://disk.yandex.ru/edit/disk/disk%2F%D0%9F%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%2F%D0%A0%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.xlsx
export const YANDEX_FILE_PATH = '/Приложения/Регистрация.xlsx';

export const NOMINATIONS_LIST = [
  Nomination.HIP_HOP,
  Nomination.HIP_HOP_PRO,
  Nomination.HIP_HOP_KIDS,
  Nomination.HIP_HOP_BEG,
  Nomination.BBOYS_16_PLUS,
  Nomination.BBOYS_UNDER_9,
  Nomination.BGIRLS,
  Nomination.BBOYS_10_12,
  Nomination.BBOYS_13_15,
];

export const INITIAL_FORM_STATE: RegistrationFormData = {
  fullName: '',
  city: '',
  nickname: '',
  birthDate: '',
  teacher: '',
  nomination: [],
};