import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { StackPicker } from "@/components/StackPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  MIN_FREELANCE_HOUR_ARS,
  MIN_FULLTIME_ARS,
  USD_RATE,
  formatMoney,
  toArs,
} from "@/lib/store";
import { createJob } from "@/lib/api";

export const Route = createFileRoute("/empresario")({
  head: () => ({
    meta: [
      { title: "Publicar anuncio — chain/work" },
      {
        name: "description",
        content:
          "Publicá una búsqueda técnica con remuneración, modalidad y stack, y recibí postulaciones por mail.",
      },
      { property: "og:title", content: "Publicar anuncio — chain/work" },
      {
        property: "og:description",
        content: "Publicá tu búsqueda técnica y recibí postulaciones por mail.",
      },
    ],
  }),
  component: EmpresarioPage,
});

function EmpresarioPage() {
  const navigate = useNavigate();
  const [stack, setStack] = useState<string[]>([]);
  const [contract, setContract] = useState<"fulltime" | "freelance">("fulltime");
  const [currency, setCurrency] = useState<"ARS" | "USD">("ARS");
  const [mode, setMode] = useState<"hibrido" | "remoto">("remoto");
  const [amount, setAmount] = useState("");
  const [form, setForm] = useState({ company: "", cuit: "", email: "", phone: "", address: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const minArs = contract === "fulltime" ? MIN_FULLTIME_ARS : MIN_FREELANCE_HOUR_ARS;
  const minInCurrency = currency === "USD" ? minArs / USD_RATE : minArs;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || toArs(value, currency) < minArs) {
      toast.error(
        `El mínimo es ${formatMoney(Math.ceil(minInCurrency), currency)} ${
          contract === "fulltime" ? "por mes" : "por hora"
        }`,
      );
      return;
    }
    if (stack.length === 0) {
      toast.error("Seleccioná al menos una tecnología");
      return;
    }

    try {
      await createJob({
        ...form,
        mode,
        contract,
        currency,
        amount: value,
        stack,
      });
      toast.success("Anuncio publicado");
      navigate({ to: "/empleos" });
    } catch (error) {
      toast.error((error as Error).message || "No se pudo publicar el aviso.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Soy empresario</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tipo de cambio de referencia: 1 USD = {USD_RATE} ARS.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nombre de la empresa">
              <Input required value={form.company} onChange={set("company")} />
            </Field>
            <Field label="CUIT">
              <Input required value={form.cuit} onChange={set("cuit")} />
            </Field>
            <Field label="Mail (recibe postulaciones)">
              <Input required type="email" value={form.email} onChange={set("email")} />
            </Field>
            <Field label="Teléfono">
              <Input required value={form.phone} onChange={set("phone")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Dirección de trabajo">
                <Input required value={form.address} onChange={set("address")} />
              </Field>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <Field label="Modalidad">
              <RadioGroup
                value={mode}
                onValueChange={(v) => setMode(v as typeof mode)}
                className="flex gap-6 pt-1"
              >
                <Option value="remoto" label="Remoto" />
                <Option value="hibrido" label="Híbrido" />
              </RadioGroup>
            </Field>
            <Field label="Contrato">
              <RadioGroup
                value={contract}
                onValueChange={(v) => setContract(v as typeof contract)}
                className="flex gap-6 pt-1"
              >
                <Option value="fulltime" label="Full time" />
                <Option value="freelance" label="Freelance" />
              </RadioGroup>
            </Field>
            <Field label="Moneda">
              <RadioGroup
                value={currency}
                onValueChange={(v) => setCurrency(v as typeof currency)}
                className="flex gap-6 pt-1"
              >
                <Option value="ARS" label="Pesos ARS" />
                <Option value="USD" label="Dólares USD" />
              </RadioGroup>
            </Field>
            <Field
              label={`Remuneración ${contract === "fulltime" ? "mensual" : "por hora"} (${currency})`}
            >
              <Input
                required
                type="number"
                min={0}
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="font-mono text-[11px] text-muted-foreground">
                Mínimo: {formatMoney(Math.ceil(minInCurrency), currency)}
              </p>
            </Field>
          </div>

          <StackPicker value={stack} onChange={setStack} />

          <Button type="submit" className="font-mono text-xs uppercase tracking-widest">
            Publicar anuncio
          </Button>
        </form>
      </main>
    </div>
  );
}

function Option({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value} className="text-sm text-foreground">
        {label}
      </Label>
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
