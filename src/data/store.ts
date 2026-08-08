export type Employee = {
  fullName: string;
  email: string;
  phone: string;
  dni: string;
  address: string;
  stack: string[];
};

export type Job = {
  id: string;
  company: string;
  cuit: string;
  email: string;
  phone: string;
  address: string;
  mode: "hibrido" | "remoto";
  contract: "fulltime" | "freelance";
  currency: "ARS" | "USD";
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
  status: "pending" | "accepted" | "rejected";
};

export const USD_RATE = 1580;
export const MIN_FULLTIME_ARS = 376600;
export const MIN_FREELANCE_HOUR_ARS = 15000;

const jobs: Job[] = [];
const employees: Employee[] = [];
const applications: Application[] = [];

export function getJobs() {
  return jobs;
}

export function getJobById(jobId: string) {
  return jobs.find((job) => job.id === jobId) ?? null;
}

export function addJob(job: Job) {
  jobs.unshift(job);
  return job;
}

export function saveEmployee(employee: Employee) {
  const existingIndex = employees.findIndex((item) => item.email === employee.email);
  if (existingIndex >= 0) {
    employees[existingIndex] = employee;
  } else {
    employees.push(employee);
  }
  return employee;
}

export function getEmployeeByEmail(email: string) {
  return employees.find((item) => item.email === email) ?? null;
}

export function saveApplication(application: Application) {
  applications.unshift(application);
  return application;
}

export function getApplicationById(applicationId: string) {
  return applications.find((item) => item.applicationId === applicationId) ?? null;
}

export function toArs(amount: number, currency: "ARS" | "USD") {
  return currency === "USD" ? amount * USD_RATE : amount;
}
