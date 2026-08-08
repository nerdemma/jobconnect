import { TECH_STACK } from "@/lib/tech-stack";

export function StackPicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (tech: string) =>
    onChange(value.includes(tech) ? value.filter((t) => t !== tech) : [...value, tech]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>Stack técnico</span>
        <span>{value.length} seleccionadas</span>
      </div>
      <div className="max-h-72 overflow-y-auto rounded-lg border border-border p-3">
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => {
            const active = value.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(tech)}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
