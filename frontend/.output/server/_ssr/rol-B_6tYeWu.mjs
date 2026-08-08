import { n as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as shortAddress, h as useWallet, i as Navbar, t as Button } from "./Navbar-B8YV-LUC.mjs";
import { i as fetchWalletRole, o as registerWallet } from "./api-k-Zx6zwJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rol-B_6tYeWu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RoleSelectionPage() {
	const navigate = useNavigate();
	const { address, role, connect, disconnect, setRole } = useWallet();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [loadingRole, setLoadingRole] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!address || role) return;
		setLoadingRole(true);
		fetchWalletRole(address).then((wallet) => {
			if (wallet?.role) setRole(wallet.role);
		}).catch(() => {}).finally(() => setLoadingRole(false));
	}, [
		address,
		role,
		setRole
	]);
	const onConnect = async () => {
		setLoading(true);
		try {
			const result = await connect();
			toast.success(result.demo ? "Wallet demo conectada" : "Wallet conectada");
		} catch {
			toast.error("No se pudo conectar la wallet.");
		} finally {
			setLoading(false);
		}
	};
	const handleRegister = async (selectedRole) => {
		if (!address) {
			toast.error("Primero conectá tu wallet.");
			return;
		}
		if (role && role !== selectedRole) {
			toast.error("Esta wallet ya está registrada con otro rol. Desconectá y usa otra wallet.");
			return;
		}
		try {
			const wallet = await registerWallet(address, selectedRole);
			setRole(wallet.role);
			toast.success(`Wallet registrada como ${wallet.role}`);
			navigate({ to: selectedRole === "employee" ? "/empleado" : "/empresario" });
		} catch (error) {
			toast.error(error.message || "No se pudo registrar la wallet.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-4xl px-6 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-semibold tracking-tight text-foreground",
					children: "Elegí tu rol"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm text-muted-foreground",
					children: "Primero conectá tu wallet. Después seleccioná si sos empleado o empresario. Una vez elegido el rol, solo podrás cambiarlo desconectando la wallet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 space-y-6 rounded-3xl border border-border bg-card p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Estado de conexión"
								}),
								address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-base text-foreground",
									children: shortAddress(address)
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-base text-foreground",
									children: "No hay wallet conectada"
								}),
								role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: ["Rol actual: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: role
									})]
								}) : null
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: onConnect,
									disabled: loading,
									children: address ? "Reconectar wallet" : "Conectar wallet"
								}), address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: disconnect,
									children: "Desconectar wallet"
								}) : null]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-background p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground",
									children: "Paso 2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-2xl font-semibold text-foreground",
									children: "Seleccioná tu rol"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "El rol se fija para esta wallet. Si tu wallet ya está registrada, se mantendrá ese rol."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										onClick: () => handleRegister("employee"),
										disabled: !address || loadingRole || role !== null && role !== "employee",
										className: "w-full",
										children: "Ser empleado"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										onClick: () => handleRegister("employer"),
										disabled: !address || loadingRole || role !== null && role !== "employer",
										className: "w-full",
										children: "Ser empresario"
									})]
								}),
								loadingRole ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-muted-foreground",
									children: "Verificando rol registrado..."
								}) : null
							]
						}),
						role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-emerald-400/30 bg-emerald-50 p-6 text-emerald-900",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold",
								children: [
									"Tu wallet ya está registrada como ",
									role,
									"."
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "mt-4",
								onClick: () => navigate({ to: role === "employee" ? "/empleado" : "/empresario" }),
								children: ["Ir a mi flujo de ", role === "employee" ? "empleado" : "empresario"]
							})]
						}) : null
					]
				})
			]
		})]
	});
}
//#endregion
export { RoleSelectionPage as component };
