import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

export type Employee = {
  fullName: string;
  email: string;
  phone: string;
  dni: string;
  address: string;
  about: string;
  github: string;
  stack: string[];
};

export type Job = {
  id: string;
  company: string;
  cuit: string;
  email: string;
  phone: string;
  address: string;
  mode: 'hibrido' | 'remoto';
  contract: 'fulltime' | 'freelance';
  currency: 'ARS' | 'USD';
  amount: number;
  stack: string[];
  createdAt: number;
};

export type Application = {
  applicationId: string;
  jobId: string;
  applicantEmail: string;
  profileSummary: string;
  skills: string[];
  createdAt: number;
  status: 'pending' | 'accepted' | 'rejected';
};

export const USD_RATE = 1580;
export const MIN_FULLTIME_ARS = 376600;
export const MIN_FREELANCE_HOUR_ARS = 15000;

type StorageShape = {
  jobs: Job[];
  employees: Employee[];
  applications: Application[];
};

const STORAGE_PATH = path.resolve(process.cwd(), 'data', 'store.json');

function ensureStorageFile() {
  mkdirSync(path.dirname(STORAGE_PATH), { recursive: true });
  if (!existsSync(STORAGE_PATH)) {
    writeFileSync(STORAGE_PATH, JSON.stringify({ jobs: [], employees: [], applications: [] }, null, 2));
  }
}

function readStorage(): StorageShape {
  ensureStorageFile();
  return JSON.parse(readFileSync(STORAGE_PATH, 'utf8')) as StorageShape;
}

function writeStorage(next: StorageShape) {
  ensureStorageFile();
  writeFileSync(STORAGE_PATH, JSON.stringify(next, null, 2));
}

export function getJobs() {
  return readStorage().jobs;
}

export function getJobById(jobId: string) {
  return getJobs().find((job) => job.id === jobId) ?? null;
}

export function addJob(job: Job) {
  const storage = readStorage();
  const next = { ...storage, jobs: [job, ...storage.jobs] };
  writeStorage(next);
  return job;
}

export function saveEmployee(employee: Employee) {
  const storage = readStorage();
  const existingIndex = storage.employees.findIndex((item) => item.email === employee.email);
  const employees = [...storage.employees];
  if (existingIndex >= 0) {
    employees[existingIndex] = employee;
  } else {
    employees.push(employee);
  }
  const next = { ...storage, employees };
  writeStorage(next);
  return employee;
}

export function getEmployeeByEmail(email: string) {
  return readStorage().employees.find((item) => item.email === email) ?? null;
}

export function saveApplication(application: Application) {
  const storage = readStorage();
  const next = { ...storage, applications: [application, ...storage.applications] };
  writeStorage(next);
  return application;
}

export function getApplicationById(applicationId: string) {
  return readStorage().applications.find((item) => item.applicationId === applicationId) ?? null;
}

export function toArs(amount: number, currency: 'ARS' | 'USD') {
  return currency === 'USD' ? amount * USD_RATE : amount;
}
