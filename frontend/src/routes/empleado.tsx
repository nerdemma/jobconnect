import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { StackPicker } from "@/components/StackPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getEmployee, saveEmployee, useStore } from "@/lib/store";
import { postEmployee, fetchEmployee, fetchWalletRole } from "@/lib/api";
import { useWallet } from "@/lib/wallet";

export const Route = createFileRoute("/empleado")({
  head: () => ({
    meta: [
      { title: "Registro de talento — JobConnect" },
      {
        name: "description",
        content:
          "Cargá tu stack técnico y tus datos de contacto para postularte a empleos web3.",
      },
      { property: "og:title", content: "Registro da talento — jobconnect" },
      {
        property: "og:description",
        content: "Cargá tu stack técnico y postulate a empleos web3.",
      },
    ],
  }),
  component: EmpleadoPage,
});

function isValidGithubUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    const segments = parsed.pathname.split("/").filter(Boolean);
    return (
      (hostname === "github.com" || hostname === "www.github.com") &&
      segments.length >= 1
    );
  } catch {
    return false;
  }
}

function EmpleadoPage() {
  const navigate = useNavigate();
  const { address, role, setRole } = useWallet();
  const saved = useStore(() => getEmployee(address), null);
  const [stack, setStack] = useState<string[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dni: "",
    address: "",
    about: "",
    github: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (!address) return;
    if (!role) {
      fetchWalletRole(address)
        .then((wallet) => setRole(wallet.role))
        .catch(() => {
          /* no role found */
        });
    }
  }, [address, role, setRole]);

  useEffect(() => {
    if (!address || role !== "employee") return;

    fetchEmployee(address)
      .then((employee) => {
        saveEmployee(employee, address);
        setForm({
          fullName: employee.fullName,
          email: employee.email,
          phone: employee.phone,
          dni: employee.dni,
          address: employee.address,
          about: employee.about,
          github: employee.github,
        });
        setStack(employee.stack);
      })
      .catch(() => {
        const cached = getEmployee(address);
        if (!cached) return;
        setForm({
          fullName: cached.fullName,
          email: cached.email,
          phone: cached.phone,
          dni: cached.dni,
          address: cached.address,
          about: cached.about,
          github: cached.github,
        });
        setStack(cached.stack);
      });
  }, [address, role]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast.error("Conectá tu wallet para registrar tu perfil.");
      return;
    }

    if (role !== "employee") {
      toast.error(
        "Esta wallet no está registrada como empleado. Seleccioná o registra una wallet con rol empleado.",
      );
      return;
    }

    if (stack.length === 0) {
      toast.error("Seleccioná al menos una tecnología");
      return;
    }

    if (!isValidGithubUrl(form.github)) {
      toast.error(
        "Ingresá una URL válida de GitHub, por ejemplo https://github.com/usuario",
      );
      return;
    }

    try {
      await postEmployee({ ...form, stack, walletAddress: address });
      saveEmployee({ ...form, stack }, address);
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
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Soy empleado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tus datos personales nunca se comparten con las empresas: solo ven tu
          stack.
        </p>
        {!address ? (
          <p className="mt-4 rounded-lg bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
            Conectá tu wallet desde el navegador para registrarte como empleado.
          </p>
        ) : role !== "employee" ? (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900">
            Esta wallet está registrada como "{role}". Usá una wallet con rol
            empleado o registrala como empleado.
          </p>
        ) : null}

        <form onSubmit={submit} className="mt-10 space-y-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nombre completo">
              <Input
                required
                value={form.fullName}
                onChange={set("fullName")}
              />
            </Field>
            <Field label="DNI">
              <Input
                required
                inputMode="numeric"
                value={form.dni}
                onChange={set("dni")}
              />
            </Field>
            <Field label="Mail">
              <Input
                required
                type="email"
                value={form.email}
                onChange={set("email")}
              />
            </Field>
            <Field label="Teléfono">
              <Input required value={form.phone} onChange={set("phone")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Dirección">
                <Input
                  required
                  value={form.address}
                  onChange={set("address")}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="About">
                <Textarea
                  required
                  rows={4}
                  placeholder="Contá tu experiencia, intereses o lo que te gustaría trabajar"
                  value={form.about}
                  onChange={set("about")}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Enlace a GitHub">
                <Input
                  required
                  type="url"
                  value={form.github}
                  onChange={set("github")}
                />
              </Field>
            </div>
          </div>

          <StackPicker value={stack} onChange={setStack} />

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={!address || role !== "employee"}
              className="font-mono text-xs uppercase tracking-widest"
            >
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
