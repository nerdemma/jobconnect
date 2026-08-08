import { getWallet, setWallet, useStore } from "./store";

type Eip1193 = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };

export function useWallet() {
  const address = useStore(() => getWallet(), null);

  const connect = async () => {
    const eth = (window as unknown as { ethereum?: Eip1193 }).ethereum;
    if (!eth) {
      // Modo demo: sin extensión de wallet generamos una dirección local.
      const demo =
        "0x" +
        Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
      setWallet(demo);
      return { address: demo, demo: true };
    }
    const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
    const addr = accounts?.[0] ?? null;
    setWallet(addr);
    return { address: addr, demo: false };
  };

  const disconnect = () => setWallet(null);

  return { address, connect, disconnect };
}

export function shortAddress(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}
