import { n as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as saveEmployee, h as useWallet, i as Navbar, m as useStore, s as cn, t as Button, u as getEmployee } from "./Navbar-B8YV-LUC.mjs";
import { n as Label, r as StackPicker, t as Input } from "./label-CO2vJS3b.mjs";
import { a as postEmployee, i as fetchWalletRole } from "./api-k-Zx6zwJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empleado-C-qEibeN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function isValidGithubUrl(value) {
	const trimmed = value.trim();
	if (!trimmed) return false;
	try {
		const parsed = new URL(trimmed);
		const hostname = parsed.hostname.toLowerCase();
		const segments = parsed.pathname.split("/").filter(Boolean);
		return (hostname === "github.com" || hostname === "www.github.com") && segments.length >= 1;
	} catch {
		return false;
	}
}
function EmpleadoPage() {
	const navigate = useNavigate();
	const saved = useStore(() => getEmployee(), null);
	const { address, role, setRole } = useWallet();
	const [stack, setStack] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)({
		fullName: "",
		email: "",
		phone: "",
		dni: "",
		address: "",
		about: "",
		github: ""
	});
	const set = (k) => (e) => setForm((f) => ({
		...f,
		[k]: e.target.value
	}));
	(0, import_react.useEffect)(() => {
		if (!address) return;
		if (!role) fetchWalletRole(address).then((wallet) => setRole(wallet.role)).catch(() => {});
	}, [
		address,
		role,
		setRole
	]);
	const submit = async (e) => {
		e.preventDefault();
		if (!address) {
			toast.error("Conectá tu wallet para registrar tu perfil.");
			return;
		}
		if (role !== "employee") {
			toast.error("Esta wallet no está registrada como empleado. Seleccioná o registra una wallet con rol empleado.");
			return;
		}
		if (stack.length === 0) {
			toast.error("Seleccioná al menos una tecnología");
			return;
		}
		if (!isValidGithubUrl(form.github)) {
			toast.error("Ingresá una URL válida de GitHub, por ejemplo https://github.com/usuario");
			return;
		}
		try {
			await postEmployee({
				...form,
				stack,
				walletAddress: address
			});
			saveEmployee({
				...form,
				stack
			});
			toast.success("Perfil registrado");
			navigate({ to: "/empleos" });
		} catch (error) {
			toast.error(error.message || "No se pudo guardar el perfil.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-6 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-semibold tracking-tight text-foreground",
					children: "Soy empleado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Tus datos personales nunca se comparten con las empresas: solo ven tu stack."
				}),
				!address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-lg bg-yellow-50 px-4 py-3 text-sm text-yellow-900",
					children: "Conectá tu wallet desde el navegador para registrarte como empleado."
				}) : role !== "employee" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900",
					children: [
						"Esta wallet está registrada como \"",
						role,
						"\". Usá una wallet con rol empleado o registrala como empleado."
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-10 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Nombre completo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: form.fullName,
										onChange: set("fullName")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "DNI",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										inputMode: "numeric",
										value: form.dni,
										onChange: set("dni")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Mail",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										type: "email",
										value: form.email,
										onChange: set("email")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Teléfono",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: form.phone,
										onChange: set("phone")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Dirección",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											required: true,
											value: form.address,
											onChange: set("address")
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "About",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											required: true,
											rows: 4,
											placeholder: "Contá tu experiencia, intereses o lo que te gustaría trabajar",
											value: form.about,
											onChange: set("about")
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Enlace a GitHub",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											required: true,
											type: "url",
											value: form.github,
											onChange: set("github")
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackPicker, {
							value: stack,
							onChange: setStack
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: !address || role !== "employee",
								className: "font-mono text-xs uppercase tracking-widest",
								children: "Registrarme"
							}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "font-mono text-xs uppercase tracking-widest",
								onClick: () => navigate({ to: "/empleos" }),
								children: "Ver publicaciones"
							})]
						})
					]
				})
			]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { EmpleadoPage as component };
