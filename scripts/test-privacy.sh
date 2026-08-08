#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

echo "1) Creando job de prueba..."
JOB_ID=$(curl -s -X POST http://localhost:3001/api/jobs -H 'Content-Type: application/json' -d '{"company":"ACME E2E","cuit":"12345678","email":"hr@acme.e2e","phone":"555-0000","address":"CABA","mode":"remoto","contract":"fulltime","currency":"ARS","amount":450000,"stack":["React","TypeScript"]}' | jq -r '.id')
if [ -z "$JOB_ID" ] || [ "$JOB_ID" = "null" ]; then
  echo "Error creando job" >&2
  exit 1
fi

echo "Job creado: $JOB_ID"

echo "2) Creando empleado de prueba..."
EMP_EMAIL="e2e@dev.test"
curl -s -X POST http://localhost:3001/api/employees -H 'Content-Type: application/json' -d "{\"fullName\":\"E2E User\",\"email\":\"$EMP_EMAIL\",\"phone\":\"551234\",\"dni\":\"0000\",\"address\":\"CABA\",\"about\":\"E2E Tester\",\"github\":\"https://github.com/e2e\",\"stack\":[\"React\",\"TypeScript\"]}"

echo "3) Generando proof simulado y enviando postulación..."
ZKP_PROOF=$(node -e "console.log(Buffer.from(JSON.stringify({salary:450000,isFreelance:false})).toString('base64'))")
RESP=$(curl -s -X POST http://localhost:3001/api/applications/apply -H 'Content-Type: application/json' -d "{\"jobId\":\"$JOB_ID\",\"applicantEmail\":\"$EMP_EMAIL\",\"profileSummary\":\"Stack: React,TypeScript | Sobre: E2E Tester\",\"skills\":[\"React\",\"TypeScript\"],\"zkpProof\":\"$ZKP_PROOF\"}")
echo "Respuesta apply: $RESP"

echo "4) Verificando que la aplicación guardada no contiene salario..."
APP_ID=$(jq -r '.applicationId' <<< "$RESP")
if [ -z "$APP_ID" ] || [ "$APP_ID" = "null" ]; then
  echo "No se creó la aplicación" >&2
  exit 1
fi

APP_JSON=$(jq -r ".applications[] | select(.applicationId==\"$APP_ID\")" data/store.json)
if echo "$APP_JSON" | jq -e '.salary' >/dev/null 2>&1; then
  echo "ERROR: se encontró campo salary en la aplicación" >&2
  exit 1
else
  echo "OK: no hay campo salary en la aplicación guardada"
fi

echo "5) Verificando token no contiene applicantEmail (generado por tokenService)
"
NODE_CHECK=$(node -e "const ts=require('./src/services/tokenService'); const t=ts.generateActionToken({applicationId:'$APP_ID',jobId:'$JOB_ID',action:'accept'}); console.log('token:',t); const dec=require('jsonwebtoken').decode(t); console.log(JSON.stringify(dec));")

echo "$NODE_CHECK"
if echo "$NODE_CHECK" | grep -q 'applicantEmail'; then
  echo "ERROR: token contiene applicantEmail" >&2
  exit 1
else
  echo "OK: token no contiene applicantEmail"
fi

echo "E2E privacy checks PASSED"
