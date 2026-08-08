//#region node_modules/.nitro/vite/services/ssr/assets/api-k-Zx6zwJ.js
var BASE_URL = "";
async function fetchJson(path, options) {
	const response = await fetch(`${BASE_URL}${path}`, {
		headers: { "Content-Type": "application/json" },
		...options
	});
	const body = await response.json().catch(() => null);
	if (!response.ok) throw new Error(body && body.error || response.statusText || "Error en la API");
	return body;
}
async function postEmployee(employee) {
	return fetchJson("/api/employees", {
		method: "POST",
		body: JSON.stringify(employee)
	});
}
async function fetchWalletRole(address) {
	return fetchJson(`/api/wallets?address=${encodeURIComponent(address)}`);
}
async function registerWallet(address, role) {
	return fetchJson("/api/wallets/register", {
		method: "POST",
		body: JSON.stringify({
			address,
			role
		})
	});
}
async function fetchJobs() {
	return fetchJson("/api/jobs");
}
async function createJob(job) {
	return fetchJson("/api/jobs", {
		method: "POST",
		body: JSON.stringify(job)
	});
}
async function applyToJob(payload) {
	return fetchJson("/api/applications/apply", {
		method: "POST",
		body: JSON.stringify(payload)
	});
}
//#endregion
export { postEmployee as a, fetchWalletRole as i, createJob as n, registerWallet as o, fetchJobs as r, applyToJob as t };
