import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CodeXml, l as Briefcase, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as Navbar } from "./Navbar-Cs6M6wYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BqLcrdYp.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/empleado",
							className: "group rounded-xl border border-border bg-card p-8 transition-colors hover:border-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "size-5 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-6 text-2xl font-medium text-card-foreground",
									children: "Soy empleado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Cargá tu stack técnico y accedé a todas las publicaciones."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground",
									children: ["Empezar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3 transition-transform group-hover:translate-x-1" })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/empresario",
							className: "group rounded-xl border border-border bg-card p-8 transition-colors hover:border-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-5 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-6 text-2xl font-medium text-card-foreground",
									children: "Soy empresario"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Publicá un anuncio y recibí postulaciones en tu mail."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground",
									children: ["Publicar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3 transition-transform group-hover:translate-x-1" })]
								})
							]
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { Index as component };
