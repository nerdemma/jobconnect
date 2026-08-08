import { useEffect, useState } from "react";

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

export const USD_RATE = 1580;
export const MIN_FULLTIME_ARS = 376600;
export const MIN_FREELANCE_HOUR_ARS = 15000;

const KEYS = {
  employee: "w3jobs.employee",
  jobs: "w3jobs.jobs",
  wallet: "w3jobs.wallet",
  applied: "w3jobs.applied",
};

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

export function getEmployee() {
  return read<Employee | null>(KEYS.employee, null);
}
export function saveEmployee(e: Employee) {
  write(KEYS.employee, e);
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
export function getApplied() {
  return read<string[]>(KEYS.applied, []);
}
export function addApplied(id: string) {
  const list = getApplied();
  if (!list.includes(id)) write(KEYS.applied, [...list, id]);
}

/** Subscribes any component to the local store. */
export function useStore<T>(selector: () => T, initial: T): T {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    const sync = () => setValue(selector());
    sync();
    window.addEventListener("w3jobs:update", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("w3jobs:update", sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
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
