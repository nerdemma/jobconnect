import type { Employee, Job } from './store';

const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001'
  : import.meta.env.VITE_API_BASE_URL ?? '';

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error((body && (body as any).error) || response.statusText || 'Error en la API');
  }
  return body as T;
}

export async function postEmployee(employee: Employee & { walletAddress: string }) {
  return fetchJson<Employee>('/api/employees', {
    method: 'POST',
    body: JSON.stringify(employee),
  });
}

export async function fetchWalletRole(address: string) {
  return fetchJson<{ address: string; role: 'employee' | 'employer' }>(
    `/api/wallets?address=${encodeURIComponent(address)}`,
  );
}

export async function registerWallet(address: string, role: 'employee' | 'employer') {
  return fetchJson<{ address: string; role: 'employee' | 'employer' }>('/api/wallets/register', {
    method: 'POST',
    body: JSON.stringify({ address, role }),
  });
}

export async function fetchJobs() {
  return fetchJson<Job[]>('/api/jobs');
}

export async function createJob(job: Omit<Job, 'id' | 'createdAt'> & { walletAddress: string }) {
  return fetchJson<Job>('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(job),
  });
}

export async function applyToJob(payload: {
  jobId: string;
  applicantEmail: string;
  profileSummary: string;
  skills: string[];
  zkpProof: string;
}) {
  return fetchJson<{ success: boolean; message: string }>('/api/applications/apply', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
