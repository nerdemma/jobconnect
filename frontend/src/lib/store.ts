import { useSyncExternalStore } from "react";

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
  mode: "hibrido" | "remoto";
  contract: "fulltime" | "freelance";
  currency: "ARS" | "USD";
  amount: number;
  stack: string[];
  createdAt: number;
};

export const USD_RATE = 1580;
export const MIN_FULLTIME_ARS = 376600;
export const MIN_FREELANCE_HOUR_ARS = 15000;

const KEYS = {
  employee: "w3jobs.employee",
  jobs: "w3jobs.jobs",
  wallet: "w3jobs.wallet",
  role: "w3jobs.role",
  applied: "w3jobs.applied",
};

function walletKey(baseKey: string, walletAddress?: string | null) {
  return walletAddress
    ? `${baseKey}.${walletAddress.trim().toLowerCase()}`
    : baseKey;
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("w3jobs:update"));
}

export function getEmployee(walletAddress?: string | null) {
  return read<Employee | null>(walletKey(KEYS.employee, walletAddress), null);
}
export function saveEmployee(e: Employee, walletAddress?: string | null) {
  write(walletKey(KEYS.employee, walletAddress), e);
}
export function getJobs() {
  return read<Job[]>(KEYS.jobs, []);
}
export function saveJob(job: Job) {
  write(KEYS.jobs, [job, ...getJobs()]);
}
export function getWallet() {
  return read<string | null>(KEYS.wallet, null);
}
export function setWallet(address: string | null) {
  write(KEYS.wallet, address);
}
export function getWalletRole() {
  return read<"employee" | "employer" | null>(KEYS.role, null);
}
export function setWalletRole(role: "employee" | "employer" | null) {
  write(KEYS.role, role);
}
export function getApplied(walletAddress?: string | null) {
  return read<string[]>(walletKey(KEYS.applied, walletAddress), []);
}
export function addApplied(id: string, walletAddress?: string | null) {
  const key = walletKey(KEYS.applied, walletAddress);
  const list = read<string[]>(key, []);
  if (!list.includes(id)) write(key, [...list, id]);
}

/** Subscribes any component to the local store. */
export function useStore<T>(selector: () => T, initial: T): T {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      window.addEventListener("w3jobs:update", onStoreChange);
      window.addEventListener("storage", onStoreChange);
      return () => {
        window.removeEventListener("w3jobs:update", onStoreChange);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    selector,
    () => initial,
  );
}

export function toArs(amount: number, currency: "ARS" | "USD") {
  return currency === "USD" ? amount * USD_RATE : amount;
}

export function formatMoney(amount: number, currency: "ARS" | "USD") {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
