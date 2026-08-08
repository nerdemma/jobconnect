import { getWallet, setWallet, getWalletRole, setWalletRole, useStore } from "./store";

type Eip1193 = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };

export function useWallet() {
  const address = useStore(() => getWallet(), null);
  const role = useStore(() => getWalletRole(), null);

  const connect = async () => {
    const eth = (window as unknown as { ethereum?: Eip1193 }).ethereum;
    if (!eth || typeof eth.request !== 'function') {
      // Modo demo: sin extensión de wallet generamos una dirección local.
      const demo =
        '0x' +
        Array.from({ length: 40 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
      setWallet(demo);
      setWalletRole(null);
      return { address: demo, demo: true };
    }

    let accounts: string[] | null = null;
    try {
      accounts = (await eth.request({ method: 'eth_requestAccounts', params: [] })) as string[];
    } catch (error) {
      if ((error as any)?.code === 4001) {
        throw new Error('Conexión rechazada por el usuario.');
      }
      throw error;
    }

    const addr = accounts?.[0] ?? null;
    if (!addr) {
      throw new Error('No se obtuvo una dirección de wallet.');
    }

    const previousAddress = getWallet();
    setWallet(addr);
    if (addr && previousAddress && previousAddress.toLowerCase() !== addr.toLowerCase()) {
      setWalletRole(null);
    }
    return { address: addr, demo: false };
  };

  const disconnect = () => {
    setWallet(null);
    setWalletRole(null);
  };

  const setRole = (newRole: 'employee' | 'employer' | null) => {
    setWalletRole(newRole);
  };

  return { address, role, connect, disconnect, setRole };
}

export function shortAddress(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}
