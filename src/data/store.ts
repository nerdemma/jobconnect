import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export type Employee = {
  fullName: string;
  email: string;
  phone: string;
  dni: string;
  address: string;
  about: string;
  github: string;
  stack: string[];
  walletAddress?: string;
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
  walletAddress?: string;
  createdAt: number;
};

export type Application = {
  applicationId: string;
  jobId: string;
  applicantEmail: string;
  applicantWalletAddress?: string;
  profileSummary: string;
  skills: string[];
  createdAt: number;
  status: "pending" | "accepted" | "rejected";
};

export type WalletAccount = {
  address: string;
  role: "employee" | "employer";
  createdAt: number;
};

export const USD_RATE = 1580;
export const MIN_FULLTIME_ARS = 376600;
export const MIN_FREELANCE_HOUR_ARS = 15000;

type StorageShape = {
  jobs: Job[];
  employees: Employee[];
  applications: Application[];
  wallets: WalletAccount[];
};

const STORAGE_PATH = path.resolve(process.cwd(), "data", "store.json");

function ensureStorageFile() {
  mkdirSync(path.dirname(STORAGE_PATH), { recursive: true });
  if (!existsSync(STORAGE_PATH)) {
    writeFileSync(
      STORAGE_PATH,
      JSON.stringify(
        { jobs: [], employees: [], applications: [], wallets: [] },
        null,
        2,
      ),
    );
  }
}

function readStorage(): StorageShape {
  ensureStorageFile();
  const raw = JSON.parse(
    readFileSync(STORAGE_PATH, "utf8"),
  ) as Partial<StorageShape>;
  return {
    jobs: raw.jobs ?? [],
    employees: raw.employees ?? [],
    applications: raw.applications ?? [],
    wallets: raw.wallets ?? [],
  };
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
  const normalizedWallet = employee.walletAddress?.trim().toLowerCase();
  const existingIndex = normalizedWallet
    ? storage.employees.findIndex(
        (item) => item.walletAddress?.toLowerCase() === normalizedWallet,
      )
    : storage.employees.findIndex(
        (item) => item.email.toLowerCase() === employee.email.toLowerCase(),
      );
  const employees = [...storage.employees];
  const nextEmployee = normalizedWallet
    ? { ...employee, walletAddress: normalizedWallet }
    : employee;
  if (existingIndex >= 0) {
    employees[existingIndex] = nextEmployee;
  } else {
    employees.push(nextEmployee);
  }
  const next = { ...storage, employees };
  writeStorage(next);
  return nextEmployee;
}

export function getEmployeeByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return (
    readStorage().employees.find(
      (item) => item.email.toLowerCase() === normalized,
    ) ?? null
  );
}

export function getEmployeeByWalletAddress(address: string) {
  const normalized = address.trim().toLowerCase();
  return (
    readStorage().employees.find(
      (item) => item.walletAddress?.toLowerCase() === normalized,
    ) ?? null
  );
}

export function getWalletAccountByAddress(address: string) {
  const normalized = address.trim().toLowerCase();
  return (
    readStorage().wallets.find(
      (item) => item.address.toLowerCase() === normalized,
    ) ?? null
  );
}

export function addWalletAccount(account: WalletAccount) {
  const storage = readStorage();
  const normalized = account.address.trim().toLowerCase();
  const existing = storage.wallets.find(
    (item) => item.address.toLowerCase() === normalized,
  );
  if (existing) {
    if (existing.role !== account.role) {
      throw new Error("Esta wallet ya está registrada con otro rol.");
    }
    return existing;
  }
  const next = {
    ...storage,
    wallets: [...storage.wallets, { ...account, address: normalized }],
  };
  writeStorage(next);
  return { ...account, address: normalized };
}

export function saveApplication(application: Application) {
  const storage = readStorage();
  const next = {
    ...storage,
    applications: [application, ...storage.applications],
  };
  writeStorage(next);
  return application;
}

export function getApplicationById(applicationId: string) {
  return (
    readStorage().applications.find(
      (item) => item.applicationId === applicationId,
    ) ?? null
  );
}

export function updateApplicationStatus(
  applicationId: string,
  status: Application["status"],
) {
  const storage = readStorage();
  const applications = storage.applications.map((item) =>
    item.applicationId === applicationId ? { ...item, status } : item,
  );
  const updated =
    applications.find((item) => item.applicationId === applicationId) ?? null;
  if (!updated) return null;

  writeStorage({ ...storage, applications });
  return updated;
}

export function toArs(amount: number, currency: "ARS" | "USD") {
  return currency === "USD" ? amount * USD_RATE : amount;
}
