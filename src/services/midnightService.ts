import { toArs, type Job } from "../data/store";

export class MidnightService {
  private static instance: MidnightService;
  private realClient: any | null = null;

  private constructor() {}

  public static getInstance(): MidnightService {
    if (!MidnightService.instance) {
      MidnightService.instance = new MidnightService();
    }
    return MidnightService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      console.log("[Midnight SDK] Conectando con el entorno Midnight...");
      // Si se requiere la integración real con Midnight, intentamos cargarla
      if (process.env.REAL_MIDNIGHT === "true") {
        try {
          const mod = await importSdkModule("@midnight/sdk");
          if (mod && (mod as any).MidnightClient) {
            this.realClient = new (mod as any).MidnightClient({
              apiKey: process.env.MIDNIGHT_API_KEY,
            });
            console.log("[Midnight SDK] Cliente real inicializado.");
          } else {
            console.warn(
              "[Midnight SDK] SDK no disponible en node_modules. Manteniendo modo simulación.",
            );
          }
        } catch (err) {
          console.error("[Midnight SDK] Error cargando SDK real:", err);
        }
      }

      console.log("[Midnight SDK] Instancia cargada correctamente.");
    } catch (error) {
      console.error("[Midnight SDK] Error inicializando el contrato:", error);
      throw error;
    }
  }

  public async verifyApplicationProof(
    proofData: string,
    minSalaryArs: number,
    currency: Job["currency"],
  ): Promise<boolean> {
    console.log(
      `[Midnight SDK] Verificando ZKP Proof para salario >= ${minSalaryArs} ARS...`,
    );

    // Si existe un cliente real, delegar la verificación al SDK/servicio de Midnight.
    if (this.realClient) {
      try {
        const ok = await this.realClient.verifyApplicationProof(proofData, {
          minSalaryArs,
          currency,
        });
        console.log(
          `[Midnight SDK] Verificación real: ${ok ? "VALID" : "INVALID"}`,
        );
        return !!ok;
      } catch (err) {
        console.error(
          "[Midnight SDK] Error verificando con cliente real:",
          err,
        );
        return false;
      }
    }

    // Modo simulación (MVP): aceptamos proofs generados por el cliente como
    // base64(JSON.stringify({ salary, isFreelance })) y verificamos el umbral localmente.
    try {
      const decoded = Buffer.from(proofData, "base64").toString("utf8");
      const parsed = JSON.parse(decoded);

      const salary = Number(parsed.salary);
      if (Number.isNaN(salary)) return false;

      const result = toArs(salary, currency) >= minSalaryArs;

      console.log(
        `[Midnight SDK] Proof verificación local: ${result ? "VALID" : "INVALID"}`,
      );
      return result;
    } catch (err) {
      console.log(
        "[Midnight SDK] Proof no reconocible en modo simulación. Rechazando.",
      );
      return false;
    }
  }
  public async closeJobOnChain(
    jobId: string,
  ): Promise<{ success: boolean; txHash: string }> {
    console.log(
      `[Midnight SDK] Transaccionando close_job() para Job ID: ${jobId}`,
    );
    const txHash = `0x_midnight_${Buffer.from(jobId + Date.now().toString())
      .toString("hex")
      .substring(0, 32)}`;
    return {
      success: true,
      txHash,
    };
  }
}

function importSdkModule(moduleName: string): Promise<any | null> {
  return import(moduleName).catch(() => null);
}
