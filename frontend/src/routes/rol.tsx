import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useWallet, shortAddress } from "@/lib/wallet";
import { fetchWalletRole, registerWallet } from "@/lib/api";

export const Route = createFileRoute("/rol")({
  head: () => ({
    meta: [
      { title: "Conectar wallet y elegir rol — chain/work" },
      {
        name: "description",
        content:
          "Conectá tu wallet y elegí si sos empleado o empresario. El rol se fija hasta que desconectes la wallet.",
      },
    ],
  }),
  component: RoleSelectionPage,
});

function RoleSelectionPage() {
  const navigate = useNavigate();
  const { address, role, connect, disconnect, setRole } = useWallet();
  const [loading, setLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState(false);

  useEffect(() => {
    if (!address || role) return;
    setLoadingRole(true);
    fetchWalletRole(address)
      .then((wallet) => {
        if (wallet?.role) {
          setRole(wallet.role);
        }
      })
      .catch(() => {
        // Wallet no registrada aún.
      })
      .finally(() => setLoadingRole(false));
  }, [address, role, setRole]);

  const onConnect = async () => {
    setLoading(true);
    try {
      const result = await connect();
      toast.success(result.demo ? "Wallet demo conectada" : "Wallet conectada");
    } catch {
      toast.error("No se pudo conectar la wallet.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (selectedRole: "employee" | "employer") => {
    if (!address) {
      toast.error("Primero conectá tu wallet.");
      return;
    }

    if (role && role !== selectedRole) {
      toast.error("Esta wallet ya está registrada con otro rol. Desconectá y usa otra wallet.");
      return;
    }

    try {
      const wallet = await registerWallet(address, selectedRole);
      setRole(wallet.role);
      toast.success(`Wallet registrada como ${wallet.role}`);
      navigate({ to: selectedRole === "employee" ? "/empleado" : "/empresario" });
    } catch (error) {
      toast.error((error as Error).message || "No se pudo registrar la wallet.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Elegí tu rol</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Primero conectá tu wallet. Después seleccioná si sos empleado o empresario. Una vez elegido el rol,
          solo podrás cambiarlo desconectando la wallet.
        </p>

        <div className="mt-10 space-y-6 rounded-3xl border border-border bg-card p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Estado de conexión</p>
              {address ? (
                <p className="mt-2 text-base text-foreground">{shortAddress(address)}</p>
              ) : (
                <p className="mt-2 text-base text-foreground">No hay wallet conectada</p>
              )}
              {role ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  Rol actual: <span className="font-semibold text-foreground">{role}</span>
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={onConnect} disabled={loading}>
                {address ? "Reconectar wallet" : "Conectar wallet"}
              </Button>
              {address ? (
                <Button variant="outline" onClick={disconnect}>
                  Desconectar wallet
                </Button>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Paso 2
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">Seleccioná tu rol</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              El rol se fija para esta wallet. Si tu wallet ya está registrada, se mantendrá ese rol.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Button
                type="button"
                onClick={() => handleRegister("employee")}
                disabled={!address || loadingRole || (role !== null && role !== "employee")}
                className="w-full"
              >
                Ser empleado
              </Button>
              <Button
                type="button"
                onClick={() => handleRegister("employer")}
                disabled={!address || loadingRole || (role !== null && role !== "employer")}
                className="w-full"
              >
                Ser empresario
              </Button>
            </div>
            {loadingRole ? (
              <p className="mt-4 text-sm text-muted-foreground">Verificando rol registrado...</p>
            ) : null}
          </div>

          {role ? (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-50 p-6 text-emerald-900">
              <p className="font-semibold">Tu wallet ya está registrada como {role}.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigate({ to: role === "employee" ? "/empleado" : "/empresario" })}
              >
                Ir a mi flujo de {role === "employee" ? "empleado" : "empresario"}
              </Button>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
