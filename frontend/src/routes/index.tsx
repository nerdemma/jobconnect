import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Code2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";

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

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Link
              to="/empleado"
              className="group rounded-xl border border-border bg-card p-8 transition-colors hover:border-foreground"
            >
              <Code2 className="size-5 text-muted-foreground" />
              <h2 className="mt-6 text-2xl font-medium text-card-foreground">Soy empleado</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Cargá tu stack técnico y accedé a todas las publicaciones.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground">
                Empezar <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              to="/empresario"
              className="group rounded-xl border border-border bg-card p-8 transition-colors hover:border-foreground"
            >
              <Briefcase className="size-5 text-muted-foreground" />
              <h2 className="mt-6 text-2xl font-medium text-card-foreground">Soy empresario</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Publicá un anuncio y recibí postulaciones en tu mail.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground">
                Publicar <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
