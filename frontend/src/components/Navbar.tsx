import { Link } from "@tanstack/react-router";
import { Moon, Sun, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { shortAddress, useWallet } from "@/lib/wallet";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { address, connect, disconnect } = useWallet();

  const onConnect = async () => {
    try {
      const res = await connect();
      toast.success(res.demo ? "Wallet demo conectada" : "Wallet conectada");
    } catch {
      toast.error("No se pudo conectar la wallet");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-mono text-sm tracking-[0.3em] uppercase text-foreground">
          chain<span className="text-muted-foreground">/work</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Cambiar tema" onClick={toggle}>
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          {address ? (
            <Button variant="outline" className="font-mono text-xs" onClick={disconnect}>
              <Wallet className="size-4" /> {shortAddress(address)}
            </Button>
          ) : (
            <Button onClick={onConnect} className="font-mono text-xs uppercase tracking-wider">
              <Wallet className="size-4" /> Conectar wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
