const fs = require('fs/promises');

const BASE = 'http://localhost:3001';

async function post(path, body) {
  const res = await fetch(BASE + path, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
  return res.json();
}

async function main(){
  console.log('1) Creando job de prueba...');
  const job = await post('/api/jobs', {company:'ACME E2E', cuit:'123', email:'hr@acme.e2e', phone:'555', address:'CABA', mode:'remoto', contract:'fulltime', currency:'ARS', amount:450000, stack:['React','TS']});
  if(!job?.id){
    console.error('Fallo al crear job', job);
    process.exit(1);
  }
  console.log('Job creado:', job.id);

  console.log('2) Creando empleado de prueba...');
  const emp = await post('/api/employees', {fullName:'E2E User', email:'e2e@dev.test', phone:'551234', dni:'0000', address:'CABA', about:'E2E Tester', github:'https://github.com/e2e', stack:['React','TS']});
  console.log('Empleado creado');

  console.log('3) Generando proof simulado y enviando postulación...');
  const zkp = Buffer.from(JSON.stringify({salary:450000,isFreelance:false})).toString('base64');
  const applyResp = await post('/api/applications/apply', {jobId:job.id, applicantEmail:'e2e@dev.test', profileSummary:'Stack: React,TS | Sobre: E2E', skills:['React','TS'], zkpProof: zkp});
  console.log('Respuesta apply:', applyResp);
  const appId = applyResp?.applicationId;
  if(!appId){ console.error('No applicationId'); process.exit(1);} 

  console.log('4) Leyendo data/store.json para verificar ausencia de "salary" en la aplicación...');
  const storeRaw = await fs.readFile('data/store.json','utf8');
  const store = JSON.parse(storeRaw);
  const app = store.applications.find(a=>a.applicationId===appId);
  if(!app){ console.error('Aplicación no encontrada en data/store.json'); process.exit(1);} 
  if(Object.prototype.hasOwnProperty.call(app,'salary')){ console.error('ERROR: campo salary encontrado en la aplicación'); process.exit(1);} 
  console.log('OK: no hay campo salary en la aplicación guardada');

  console.log('5) Verificando que tokenService no contiene applicantEmail...');
  const tokenSrc = await fs.readFile('src/services/tokenService.ts','utf8');
  if(tokenSrc.includes('applicantEmail')){ console.error('ERROR: tokenService contiene applicantEmail'); process.exit(1);} 
  console.log('OK: tokenService no contiene applicantEmail');

  console.log('\nE2E privacy checks PASSED');
}

main().catch(err=>{ console.error(err); process.exit(1); });
