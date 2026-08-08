import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { StackPicker } from "@/components/StackPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getEmployee, saveEmployee, useStore } from "@/lib/store";
import { postEmployee } from "@/lib/api";

export const Route = createFileRoute("/empleado")({
  head: () => ({
    meta: [
      { title: "Registro de talento — chain/work" },
      {
        name: "description",
        content: "Cargá tu stack técnico y tus datos de contacto para postularte a empleos web3.",
      },
      { property: "og:title", content: "Registro de talento — chain/work" },
      { property: "og:description", content: "Cargá tu stack técnico y postulate a empleos web3." },
    ],
  }),
  component: EmpleadoPage,
});

function EmpleadoPage() {
  const navigate = useNavigate();
  const saved = useStore(() => getEmployee(), null);
  const [stack, setStack] = useState<string[]>([]);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", dni: "", address: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stack.length === 0) {
      toast.error("Seleccioná al menos una tecnología");
      return;
    }

    try {
      await postEmployee({ ...form, stack });
      saveEmployee({ ...form, stack });
      toast.success("Perfil registrado");
      navigate({ to: "/empleos" });
    } catch (error) {
      toast.error((error as Error).message || "No se pudo guardar el perfil.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Soy empleado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tus datos personales nunca se comparten con las empresas: solo ven tu stack.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nombre completo">
              <Input required value={form.fullName} onChange={set("fullName")} />
            </Field>
            <Field label="DNI">
              <Input required inputMode="numeric" value={form.dni} onChange={set("dni")} />
            </Field>
            <Field label="Mail">
              <Input required type="email" value={form.email} onChange={set("email")} />
            </Field>
            <Field label="Teléfono">
              <Input required value={form.phone} onChange={set("phone")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Dirección">
                <Input required value={form.address} onChange={set("address")} />
              </Field>
            </div>
          </div>

          <StackPicker value={stack} onChange={setStack} />

          <div className="flex items-center gap-3">
            <Button type="submit" className="font-mono text-xs uppercase tracking-widest">
              Registrarme
            </Button>
            {saved && (
              <Button
                type="button"
                variant="outline"
                className="font-mono text-xs uppercase tracking-widest"
                onClick={() => navigate({ to: "/empleos" })}
              >
                Ver publicaciones
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
