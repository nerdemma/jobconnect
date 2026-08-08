import { n as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { s as cn } from "./Navbar-B8YV-LUC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-CO2vJS3b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TECH_STACK = [
	"JavaScript",
	"TypeScript",
	"Python",
	"Java",
	"C#",
	"C++",
	"C",
	"Go",
	"Rust",
	"PHP",
	"Ruby",
	"Swift",
	"Kotlin",
	"Dart",
	"Scala",
	"Elixir",
	"Haskell",
	"Solidity",
	"Vyper",
	"Move",
	"React",
	"Next.js",
	"Vue",
	"Nuxt",
	"Angular",
	"Svelte",
	"SvelteKit",
	"Astro",
	"Remix",
	"Qwik",
	"Node.js",
	"Deno",
	"Bun",
	"Express",
	"NestJS",
	"Fastify",
	"Django",
	"Flask",
	"FastAPI",
	"Laravel",
	"Rails",
	"Spring Boot",
	".NET",
	"Phoenix",
	"GraphQL",
	"tRPC",
	"REST APIs",
	"gRPC",
	"WebSockets",
	"Redis",
	"PostgreSQL",
	"MySQL",
	"SQLite",
	"MongoDB",
	"Cassandra",
	"DynamoDB",
	"Supabase",
	"Firebase",
	"Prisma",
	"Drizzle",
	"Docker",
	"Kubernetes",
	"Terraform",
	"Ansible",
	"AWS",
	"GCP",
	"Azure",
	"Cloudflare",
	"Vercel",
	"CI/CD",
	"Git",
	"Linux",
	"Nginx",
	"Kafka",
	"RabbitMQ",
	"Elasticsearch",
	"Grafana",
	"Prometheus",
	"Datadog",
	"Sentry",
	"Solana",
	"Ethereum",
	"EVM",
	"Hardhat",
	"Foundry",
	"Web3.js",
	"Ethers.js",
	"Viem",
	"Wagmi",
	"IPFS",
	"The Graph",
	"Rollups / L2",
	"Zero Knowledge",
	"Smart Contract Audit",
	"Tailwind CSS",
	"Figma",
	"React Native",
	"Flutter",
	"TensorFlow",
	"PyTorch"
];
function StackPicker({ value, onChange }) {
	const toggle = (tech) => onChange(value.includes(tech) ? value.filter((t) => t !== tech) : [...value, tech]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stack técnico" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [value.length, " seleccionadas"] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-h-72 overflow-y-auto rounded-lg border border-border p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: TECH_STACK.map((tech) => {
					const active = value.includes(tech);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": active,
						onClick: () => toggle(tech),
						className: `rounded-full border px-3 py-1 font-mono text-xs transition-colors ${active ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`,
						children: tech
					}, tech);
				})
			})
		})]
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
//#endregion
export { Label as n, StackPicker as r, Input as t };
