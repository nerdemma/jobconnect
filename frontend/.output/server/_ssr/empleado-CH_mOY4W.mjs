import { n as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as saveEmployee, i as Navbar, p as useStore, t as Button, u as getEmployee } from "./Navbar-Cs6M6wYA.mjs";
import { n as Label, r as StackPicker, t as Input } from "./label-KB_SKN9C.mjs";
import { i as postEmployee } from "./api-CmYpQ1cc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empleado-CH_mOY4W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmpleadoPage() {
	const navigate = useNavigate();
	const saved = useStore(() => getEmployee(), null);
	const [stack, setStack] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)({
		fullName: "",
		email: "",
		phone: "",
		dni: "",
		address: ""
	});
	const set = (k) => (e) => setForm((f) => ({
		...f,
		[k]: e.target.value
	}));
	const submit = async (e) => {
		e.preventDefault();
		if (stack.length === 0) {
			toast.error("Seleccioná al menos una tecnología");
			return;
		}
		try {
			await postEmployee({
				...form,
				stack
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
