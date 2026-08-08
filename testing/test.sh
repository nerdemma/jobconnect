#!/bin/bash

PORT=3001
URL="http://localhost:${PORT}/api/applications/apply"

echo "=================================================="
echo "🚀 ENVIANDO POSTULACIÓN DE PRUEBA A $URL"
echo "=================================================="

curl -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "job_dev_2026",
    "applicantEmail": "hello@nerdemma.lan",
    "profileSummary": "Especialista en Infraestructura y Desarrollo C/TypeScript con foco en sistemas de alta privacidad.",
    "skills": ["TypeScript", "Node.js", "Compact", "Midnight ZKP"],
    "zkpProof": "proof_zkp_mock_hash_9876543210"
  }'

echo -e "\n\n=================================================="
echo "✅ Solicitud completada."
echo "=================================================="