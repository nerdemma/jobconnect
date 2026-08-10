import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  addApplied,
  formatMoney,
  getApplied,
  getEmployee,
  saveEmployee,
  useStore,
  type Job,
} from "@/lib/store";
import { applyToJob, fetchEmployee, fetchJobs } from "@/lib/api";
import { useWallet } from "@/lib/wallet";

export const Route = createFileRoute("/empleos")({
  head: () => ({
    meta: [
      { title: "Publicaciones — chain/work" },
      {
        name: "description",
        content:
          "Explorá búsquedas técnicas web3 y postulate compartiendo solo tu stack.",
      },
      { property: "og:title", content: "Publicaciones — chain/work" },
      {
        property: "og:description",
        content: "Búsquedas técnicas web3 abiertas ahora.",
      },
    ],
  }),
  component: EmpleosPage,
});

function EmpleosPage() {
  const { address } = useWallet();
  const employee = useStore(() => getEmployee(address), null, [address]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const applied = useStore(() => getApplied(address), [] as string[], [
    address,
  ]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const payload = await fetchJobs();
        setJobs(payload);
      } catch (err) {
        setError(
          (err as Error).message || "No se pudieron cargar las publicaciones.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  useEffect(() => {
    if (!address) return;

    fetchEmployee(address)
      .then((profile) => {
        saveEmployee(profile, address);
      })
      .catch(() => {
        /* Profile does not exist yet or API is unavailable. */
      });
  }, [address]);

  if (!address || !employee) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="text-3xl font-semibold text-foreground">
            Registrate para ver los avisos
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Conectá tu wallet y cargá tu stack para acceder a las publicaciones.
          </p>
          <Link
            to="/empleado"
            className="mt-8 inline-flex items-center rounded-md bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground"
          >
            Cargar mi perfil
          </Link>
        </main>
      </div>
    );
  }

  const apply = async (job: Job) => {
    try {
      // Solicitar al postulante (cliente) su remuneración pretendida en forma privada
      // No se guarda en el perfil ni se envía en texto claro al empleador.
      const input = window.prompt(
        `Ingresá tu remuneración pretendida en ${job.currency} (ej: 450000) para postular a #${job.id}`,
      );

      if (!input) {
        toast.error(
          "Postulación cancelada: necesitás ingresar tu remuneración privada para generar la prueba.",
        );
        return;
      }

      const salary = Number(input);
      if (Number.isNaN(salary) || salary <= 0) {
        toast.error("Remuneración inválida. Intentalo de nuevo.");
        return;
      }

      const isFreelance = job.contract === "freelance";

      // Generamos un proof simulado: codificamos la información mínima en base64.
      // En producción esto lo reemplazará la generación real del proof con Compact/Midnight SDK.
      const proofPayload = { salary, isFreelance };
      const zkpProof = btoa(JSON.stringify(proofPayload));

      // Perfil anónimo que se comparte con el empleador (no incluye email/telefono/nombre)
      const profileSummary = [
        `Stack: ${employee.stack.join(", ")}`,
        employee.about ? `Sobre: ${employee.about}` : undefined,
      ]
        .filter(Boolean)
        .join(" | ");

      await applyToJob({
        jobId: job.id,
        applicantEmail: employee.email,
        applicantWalletAddress: address,
        profileSummary,
        skills: employee.stack,
        zkpProof,
      });

      addApplied(job.id, address);
      toast.success("Postulación enviada al empleador");
    } catch (error) {
      toast.error(
        (error as Error).message || "No se pudo enviar la postulación.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Publicaciones
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {jobs.length} aviso{jobs.length === 1 ? "" : "s"} · tu stack:{" "}
              {employee.stack.length} tecnologías
            </p>
          </div>
          <Link
            to="/empresario"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Publicar aviso →
          </Link>
        </div>

        {loading ? (
          <p className="mt-16 font-mono text-sm text-muted-foreground">
            Cargando publicaciones...
          </p>
        ) : error ? (
          <p className="mt-16 font-mono text-sm text-destructive">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="mt-16 font-mono text-sm text-muted-foreground">
            Todavía no hay publicaciones.
          </p>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => {
              const matches = job.stack.filter((t) =>
                employee.stack.includes(t),
              );
              return (
                <article
                  key={job.id}
                  className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground"
                >
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    <Building2 className="size-3.5" /> {job.company}
                  </div>
                  <h2 className="mt-3 text-2xl font-medium text-card-foreground">
                    {formatMoney(job.amount, job.currency)}
                    <span className="ml-1 text-sm text-muted-foreground">
                      /{job.contract === "fulltime" ? "mes" : "hora"}
                    </span>
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {job.contract === "fulltime" ? "Full time" : "Freelance"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3" />
                      {job.mode === "remoto"
                        ? "Remoto"
                        : `Híbrido · ${job.address}`}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full border px-2 py-0.5 font-mono text-[11px] ${
                          matches.includes(t)
                            ? "border-foreground text-foreground"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {matches.length} match{matches.length === 1 ? "" : "es"}
                    </span>
                    <Button
                      size="sm"
                      variant={applied.includes(job.id) ? "outline" : "default"}
                      disabled={applied.includes(job.id)}
                      onClick={() => apply(job)}
                      className="font-mono text-xs uppercase tracking-widest"
                    >
                      {applied.includes(job.id) ? "Postulado" : "Aplicar"}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
