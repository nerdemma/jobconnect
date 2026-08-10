import { n as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Sun, r as Moon, t as Wallet } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Navbar-Q-Z7NG4L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const initial = window.localStorage.getItem("w3jobs.theme") ?? "dark";
		setTheme(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);
	return {
		theme,
		toggle: (0, import_react.useCallback)(() => {
			setTheme((prev) => {
				const next = prev === "dark" ? "light" : "dark";
				window.localStorage.setItem("w3jobs.theme", next);
				document.documentElement.classList.toggle("dark", next === "dark");
				return next;
			});
		}, [])
	};
}
var USD_RATE = 1580;
var MIN_FULLTIME_ARS = 376600;
var MIN_FREELANCE_HOUR_ARS = 15e3;
var KEYS = {
	employee: "w3jobs.employee",
	jobs: "w3jobs.jobs",
	wallet: "w3jobs.wallet",
	role: "w3jobs.role",
	applied: "w3jobs.applied"
};
function walletKey(baseKey, walletAddress) {
	return walletAddress ? `${baseKey}.${walletAddress.trim().toLowerCase()}` : baseKey;
}
function read(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
function write(key, value) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(key, JSON.stringify(value));
	window.dispatchEvent(new Event("w3jobs:update"));
}
function getEmployee(walletAddress) {
	return read(walletKey(KEYS.employee, walletAddress), null);
}
function saveEmployee(e, walletAddress) {
	write(walletKey(KEYS.employee, walletAddress), e);
}
function getWallet() {
	return read(KEYS.wallet, null);
}
function setWallet(address) {
	write(KEYS.wallet, address);
}
function getWalletRole() {
	return read(KEYS.role, null);
}
function setWalletRole(role) {
	write(KEYS.role, role);
}
function getApplied(walletAddress) {
	return read(walletKey(KEYS.applied, walletAddress), []);
}
function addApplied(id, walletAddress) {
	const key = walletKey(KEYS.applied, walletAddress);
	const list = read(key, []);
	if (!list.includes(id)) write(key, [...list, id]);
}
/** Subscribes any component to the local store. */
function useStore(selector, initial, deps = []) {
	const [value, setValue] = (0, import_react.useState)(initial);
	(0, import_react.useEffect)(() => {
		const sync = () => setValue(selector());
		sync();
		window.addEventListener("w3jobs:update", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("w3jobs:update", sync);
			window.removeEventListener("storage", sync);
		};
	}, deps);
	return value;
}
function toArs(amount, currency) {
	return currency === "USD" ? amount * USD_RATE : amount;
}
function formatMoney(amount, currency) {
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency,
		maximumFractionDigits: 0
	}).format(amount);
}
function useWallet() {
	return {
		address: useStore(() => getWallet(), null),
		role: useStore(() => getWalletRole(), null),
		connect: (0, import_react.useCallback)(async () => {
			const eth = window.ethereum;
			if (!eth || typeof eth.request !== "function") {
				const demo = "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
				setWallet(demo);
				setWalletRole(null);
				return {
					address: demo,
					demo: true
				};
			}
			let accounts = null;
			try {
				accounts = await eth.request({
					method: "eth_requestAccounts",
					params: []
				});
			} catch (error) {
				if (error?.code === 4001) throw new Error("Conexión rechazada por el usuario.");
				throw error;
			}
			const addr = accounts?.[0] ?? null;
			if (!addr) throw new Error("No se obtuvo una dirección de wallet.");
			const previousAddress = getWallet();
			setWallet(addr);
			if (addr && previousAddress && previousAddress.toLowerCase() !== addr.toLowerCase()) setWalletRole(null);
			return {
				address: addr,
				demo: false
			};
		}, []),
		disconnect: (0, import_react.useCallback)(() => {
			setWallet(null);
			setWalletRole(null);
		}, []),
		setRole: (0, import_react.useCallback)((newRole) => {
			setWalletRole(newRole);
		}, [])
	};
}
function shortAddress(a) {
	return `${a.slice(0, 6)}…${a.slice(-4)}`;
}
function Navbar() {
	const { theme, toggle } = useTheme();
	const { address, connect, disconnect } = useWallet();
	const onConnect = async () => {
		try {
			const res = await connect();
			toast.success(res.demo ? "Wallet demo conectada" : "Wallet conectada");
		} catch (error) {
			console.error("Wallet connect error:", error);
			toast.error(error.message || "No se pudo conectar la wallet");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "font-mono text-sm tracking-[0.3em] uppercase text-foreground",
				children: ["job", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "connect"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Cambiar tema",
					onClick: toggle,
					children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
				}), address ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "font-mono text-xs",
					onClick: disconnect,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }),
						" ",
						shortAddress(address)
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: onConnect,
					className: "font-mono text-xs uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }), " Conectar wallet"]
				})]
			})]
		})
	});
}
//#endregion
export { USD_RATE as a, formatMoney as c, saveEmployee as d, shortAddress as f, useWallet as h, Navbar as i, getApplied as l, useStore as m, MIN_FREELANCE_HOUR_ARS as n, addApplied as o, toArs as p, MIN_FULLTIME_ARS as r, cn as s, Button as t, getEmployee as u };
