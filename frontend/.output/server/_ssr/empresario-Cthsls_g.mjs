import { n as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Circle } from "../_libs/lucide-react.mjs";
import { a as USD_RATE, c as formatMoney, h as useWallet, i as Navbar, n as MIN_FREELANCE_HOUR_ARS, p as toArs, r as MIN_FULLTIME_ARS, s as cn, t as Button } from "./Navbar-Q-Z7NG4L.mjs";
import { n as Label, r as StackPicker, t as Input } from "./label-DlK7PMTF.mjs";
import { a as fetchWalletRole, n as createJob } from "./api-CVeEec0_.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/@radix-ui/react-radio-group+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empresario-Cthsls_g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
function EmpresarioPage() {
	const navigate = useNavigate();
	const { address, role, setRole } = useWallet();
	const [stack, setStack] = (0, import_react.useState)([]);
	const [contract, setContract] = (0, import_react.useState)("fulltime");
	const [currency, setCurrency] = (0, import_react.useState)("ARS");
	const [mode, setMode] = (0, import_react.useState)("remoto");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		company: "",
		cuit: "",
		email: "",
		phone: "",
		address: ""
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
	const minArs = contract === "fulltime" ? MIN_FULLTIME_ARS : MIN_FREELANCE_HOUR_ARS;
	const minInCurrency = currency === "USD" ? minArs / USD_RATE : minArs;
	const submit = async (e) => {
		e.preventDefault();
		const value = Number(amount);
		if (!value || toArs(value, currency) < minArs) {
			toast.error(`El mínimo es ${formatMoney(Math.ceil(minInCurrency), currency)} ${contract === "fulltime" ? "por mes" : "por hora"}`);
			return;
		}
		if (stack.length === 0) {
			toast.error("Seleccioná al menos una tecnología");
			return;
		}
		if (!address) {
			toast.error("Conectá tu wallet para publicar un anuncio.");
			return;
		}
		if (role !== "employer") {
			toast.error("Esta wallet no está registrada como empresario. Usá una wallet con rol empresario o registrala como empresario.");
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
				walletAddress: address
			});
			toast.success("Anuncio publicado");
			navigate({ to: "/empleos" });
		} catch (error) {
			toast.error(error.message || "No se pudo publicar el aviso.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-6 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-semibold tracking-tight text-foreground",
					children: "Soy empresario"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Tipo de cambio de referencia: 1 USD = ",
						USD_RATE,
						" ARS."
					]
				}),
				!address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-lg bg-yellow-50 px-4 py-3 text-sm text-yellow-900",
					children: "Conectá tu wallet desde el navegador para publicar un anuncio."
				}) : role !== "employer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900",
					children: [
						"Esta wallet está registrada como \"",
						role,
						"\". Usá una wallet con rol empresario o registrala como empresario."
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
									label: "Nombre de la empresa",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: form.company,
										onChange: set("company")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "CUIT",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										value: form.cuit,
										onChange: set("cuit")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Mail (recibe postulaciones)",
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
										label: "Dirección de trabajo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											required: true,
											value: form.address,
											onChange: set("address")
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-8 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Modalidad",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
										value: mode,
										onValueChange: (v) => setMode(v),
										className: "flex gap-6 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
											value: "remoto",
											label: "Remoto"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
											value: "hibrido",
											label: "Híbrido"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Contrato",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
										value: contract,
										onValueChange: (v) => setContract(v),
										className: "flex gap-6 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
											value: "fulltime",
											label: "Full time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
											value: "freelance",
											label: "Freelance"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Moneda",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
										value: currency,
										onValueChange: (v) => setCurrency(v),
										className: "flex gap-6 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
											value: "ARS",
											label: "Pesos ARS"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
											value: "USD",
											label: "Dólares USD"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
									label: `Remuneración ${contract === "fulltime" ? "mensual" : "por hora"} (${currency})`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										required: true,
										type: "number",
										min: 0,
										step: "any",
										value: amount,
										onChange: (e) => setAmount(e.target.value)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: ["Mínimo: ", formatMoney(Math.ceil(minInCurrency), currency)]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackPicker, {
							value: stack,
							onChange: setStack
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: !address || role !== "employer",
							className: "font-mono text-xs uppercase tracking-widest",
							children: "Publicar anuncio"
						})
					]
				})
			]
		})]
	});
}
function Option({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
			value,
			id: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: value,
			className: "text-sm text-foreground",
			children: label
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
export { EmpresarioPage as component };
