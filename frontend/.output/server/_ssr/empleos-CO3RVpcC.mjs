import { n as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Clock, i as MapPin, s as Building2 } from "../_libs/lucide-react.mjs";
import { c as formatMoney, d as saveEmployee, h as useWallet, i as Navbar, l as getApplied, m as useStore, o as addApplied, t as Button, u as getEmployee } from "./Navbar-Q-Z7NG4L.mjs";
import { i as fetchJobs, r as fetchEmployee, t as applyToJob } from "./api-CVeEec0_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empleos-CO3RVpcC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmpleosPage() {
	const { address } = useWallet();
	const employee = useStore(() => getEmployee(address), null, [address]);
	const [jobs, setJobs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const applied = useStore(() => getApplied(address), [], [address]);
	(0, import_react.useEffect)(() => {
		const loadJobs = async () => {
			try {
				setLoading(true);
				setError(null);
				const payload = await fetchJobs();
				setJobs(payload);
			} catch (err) {
				setError(err.message || "No se pudieron cargar las publicaciones.");
			} finally {
				setLoading(false);
			}
		};
		loadJobs();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!address) return;
		fetchEmployee(address).then((profile) => {
			saveEmployee(profile, address);
		}).catch(() => {});
	}, [address]);
	if (!address || !employee) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-6 py-24 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold text-foreground",
					children: "Registrate para ver los avisos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Conectá tu wallet y cargá tu stack para acceder a las publicaciones."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/empleado",
					className: "mt-8 inline-flex items-center rounded-md bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground",
					children: "Cargar mi perfil"
				})
			]
		})]
	});
	const apply = async (job) => {
		try {
			const input = window.prompt(`Ingresá tu remuneración pretendida en ${job.currency} (ej: 450000) para postular a #${job.id}`);
			if (!input) {
				toast.error("Postulación cancelada: necesitás ingresar tu remuneración privada para generar la prueba.");
				return;
			}
			const salary = Number(input);
			if (Number.isNaN(salary) || salary <= 0) {
				toast.error("Remuneración inválida. Intentalo de nuevo.");
				return;
			}
			const proofPayload = {
				salary,
				isFreelance: job.contract === "freelance"
			};
			const zkpProof = btoa(JSON.stringify(proofPayload));
			const profileSummary = [`Stack: ${employee.stack.join(", ")}`, employee.about ? `Sobre: ${employee.about}` : void 0].filter(Boolean).join(" | ");
			await applyToJob({
				jobId: job.id,
				applicantEmail: employee.email,
				applicantWalletAddress: address,
				profileSummary,
				skills: employee.stack,
				zkpProof
			});
			addApplied(job.id, address);
			toast.success("Postulación enviada al empleador");
		} catch (error) {
			toast.error(error.message || "No se pudo enviar la postulación.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-6 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-semibold tracking-tight text-foreground",
					children: "Publicaciones"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						jobs.length,
						" aviso",
						jobs.length === 1 ? "" : "s",
						" · tu stack:",
						" ",
						employee.stack.length,
						" tecnologías"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/empresario",
					className: "font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground",
					children: "Publicar aviso →"
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-16 font-mono text-sm text-muted-foreground",
				children: "Cargando publicaciones..."
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-16 font-mono text-sm text-destructive",
				children: error
			}) : jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-16 font-mono text-sm text-muted-foreground",
				children: "Todavía no hay publicaciones."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: jobs.map((job) => {
					const matches = job.stack.filter((t) => employee.stack.includes(t));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }),
									" ",
									job.company
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-3 text-2xl font-medium text-card-foreground",
								children: [formatMoney(job.amount, job.currency), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 text-sm text-muted-foreground",
									children: ["/", job.contract === "fulltime" ? "mes" : "hora"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), job.contract === "fulltime" ? "Full time" : "Freelance"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), job.mode === "remoto" ? "Remoto" : `Híbrido · ${job.address}`]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-1.5",
								children: job.stack.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full border px-2 py-0.5 font-mono text-[11px] ${matches.includes(t) ? "border-foreground text-foreground" : "border-border text-muted-foreground"}`,
									children: t
								}, t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center justify-between pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: [
										matches.length,
										" match",
										matches.length === 1 ? "" : "es"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: applied.includes(job.id) ? "outline" : "default",
									disabled: applied.includes(job.id),
									onClick: () => apply(job),
									className: "font-mono text-xs uppercase tracking-widest",
									children: applied.includes(job.id) ? "Postulado" : "Aplicar"
								})]
							})
						]
					}, job.id);
				})
			})]
		})]
	});
}
//#endregion
export { EmpleosPage as component };
