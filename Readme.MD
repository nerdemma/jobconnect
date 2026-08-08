# 🛡️ DevMatch — Midnight ZKP Job Board

<div align="center">

  ![Midnight Network](https://img.shields.io/badge/Midnight-ZKP%20Privacy-purple?style=for-the-badge&logo=shield)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=for-the-badge&logo=typescript)
  ![Node.js](https://img.shields.io/badge/Node.js-v20.x-green?style=for-the-badge&logo=node.js)
  ![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=for-the-badge&logo=express)
  ![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

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