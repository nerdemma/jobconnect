# 🛡️ JobConnect — Midnight ZKP Job Board

<div align="center">

  ![Midnight Network](https://img.shields.io/badge/Midnight-ZKP%20Privacy-purple?style=for-the-badge&logo=shield)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=for-the-badge&logo=typescript)
  ![Node.js](https://img.shields.io/badge/Node.js-v20.x-green?style=for-the-badge&logo=node.js)
  ![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=for-the-badge&logo=express)
  ![License](https://img.shields.io/badge/License-APACHE-red?style=for-the-badge)

  <p align="center">
    <b>Plataforma de postulación laboral con preservación estricta de privacidad impulsada por Zero-Knowledge Proofs (ZKP) en Midnight Network.</b>
  </p>

  <sub>Construido durante la Hackathon Midnight 2026</sub>

</div>

---

## 📌 Descripción General

**DevMatch** resuelve la falta de privacidad en los procesos de selección IT tradicionales. Permite a los desarrolladores postularse a búsquedas laborales **probando on-chain que cumplen con las pretensiones salariales y requisitos mínimos** mediante circuitos en **Compact (ZKP)**, sin revelar sus datos personales ni su salario exacto pretendido al empleador o la red pública.

El sistema notifica al empleador mediante un motor de correos seguro con acciones directas de un solo clic (**Aceptar / Rechazar**) usando tokens JWT de un solo uso. Si la postulación es aceptada, el puesto se deshabilita automáticamente on-chain.

---

## 🏗️ Arquitectura del Sistema

```text
       ┌────────────────────────┐
       │   Frontend Candidate   │
       └───────────┬────────────┘
                   │ 1. Genera ZKP Proof (Compact SDK)
                   v
       ┌────────────────────────┐
       │ Express Backend Server │ ── 2. Verifica ZKP & Emite JWT Tokens
       └───────────┬────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         v                   v
┌─────────────────┐ ┌──────────────────────────┐
│ Employer Mail   │ │  Midnight Blockchain     │
│ (Action Buttons)│ │  Smart Contract          │
└────────┬────────┘ └────────────┬─────────────┘
         │                       │
         └───────> 3. close_job() ┘ (On Accept)

      ## Modo REAL Midnight (producción)

      Para integrar la verificación real con Midnight/Compact sustituye el modo de simulación:

      - Agrega las credenciales en el entorno: `REAL_MIDNIGHT=true` y `MIDNIGHT_API_KEY=...`
      - Instala el SDK oficial según la documentación de Midnight (ej: `npm install @midnight/sdk`).
      - El servicio `src/services/midnightService.ts` intentará importar dinámicamente `@midnight/sdk` cuando `REAL_MIDNIGHT=true` y delegará la verificación al cliente real. Adapta la inicialización según la API del SDK.

      En caso de no contar con el SDK instalado, el proyecto seguirá funcionando en modo simulación (útil para demos y MVP).

      ## Pruebas E2E de privacidad (local)

      Hay un script de verificación rápida que comprueba las garantías de privacidad del MVP:

      ```bash
      chmod +x scripts/test-privacy.sh
      ./scripts/test-privacy.sh
      ```

      El script crea un `job`, un `employee`, envía una `application` con un proof simulado y valida que:
      - El objeto `application` guardado en `data/store.json` no contiene campo `salary`.
      - Los tokens de acción generados no exponen `applicantEmail`.

      Recomendación: ejecutar estas pruebas en un entorno de desarrollo local donde el backend y la base de datos en `data/store.json` sean temporales.
