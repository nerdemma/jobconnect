import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/wallet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "chain/work — Empleo web3 minimalista" },
      {
        name: "description",
        content:
          "Plataforma de empleo web3: conectá tu wallet, publicá anuncios o cargá tu stack técnico y postulate sin exponer datos sensibles.",
      },
      { property: "og:title", content: "chain/work — Empleo web3 minimalista" },
      {
        property: "og:description",
        content: "Empleo web3 en Argentina: publicá o postulate con tu wallet.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { address, role } = useWallet();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6">
        <section className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
            web3 · trabajo · argentina
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl">
            Talento y empresas,
            <br />
            <span className="text-muted-foreground">sin intermediarios.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            Conectá tu wallet, cargá tu stack y postulate. Las empresas reciben perfiles técnicos
            sin datos personales expuestos.
          </p>

          <div className="mt-12 sm:mt-16">
            <div className="rounded-3xl border border-border bg-card p-10 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Paso 1</p>
              <h2 className="mt-5 text-4xl font-semibold text-foreground">Conectá tu wallet</h2>
              <p className="mt-4 text-base text-muted-foreground">
                Primero conectá MetaMask (o wallet de desarrollo) desde la barra superior.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button onClick={() => navigate({ to: '/rol' })} className="font-mono text-xs uppercase tracking-widest">
                  Elegir rol
                </Button>
              </div>
              {address ? (
                <p className="mt-6 text-sm text-foreground">Wallet conectada: {address}</p>
              ) : (
                <p className="mt-6 text-sm text-muted-foreground">
                  Conectá tu wallet usando el botón de la esquina superior derecha.
                </p>
              )}
              {role ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Rol actual: <span className="font-semibold text-foreground">{role}</span>
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
