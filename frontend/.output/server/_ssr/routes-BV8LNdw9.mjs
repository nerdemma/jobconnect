import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useWallet, i as Navbar, t as Button } from "./Navbar-B8YV-LUC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BV8LNdw9.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { address, role } = useWallet();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-6xl px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground",
						children: "web3 · trabajo · argentina"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl",
						children: [
							"Talento y empresas,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "sin intermediarios."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-base text-muted-foreground",
						children: "Conectá tu wallet, cargá tu stack y postulate. Las empresas reciben perfiles técnicos sin datos personales expuestos."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 sm:mt-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-card p-10 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm uppercase tracking-[0.3em] text-muted-foreground",
									children: "Paso 1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 text-4xl font-semibold text-foreground",
									children: "Conectá tu wallet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-base text-muted-foreground",
									children: "Primero conectá MetaMask (o wallet de desarrollo) desde la barra superior."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => navigate({ to: "/rol" }),
										className: "font-mono text-xs uppercase tracking-widest",
										children: "Elegir rol"
									})
								}),
								address ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-6 text-sm text-foreground",
									children: ["Wallet conectada: ", address]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-sm text-muted-foreground",
									children: "Conectá tu wallet usando el botón de la esquina superior derecha."
								}),
								role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: ["Rol actual: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: role
									})]
								}) : null
							]
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { Index as component };
