import { Router } from 'express';
import { addJob, getJobs, toArs, USD_RATE, MIN_FULLTIME_ARS, MIN_FREELANCE_HOUR_ARS, getWalletAccountByAddress, type Job } from '../data/store';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json(getJobs());
});

router.post('/', (req, res) => {
  const {
    company,
    cuit,
    email,
    phone,
    address,
    mode,
    contract,
    currency,
    amount,
    stack,
    walletAddress,
  } = req.body as Omit<Job, 'id' | 'createdAt'> & { walletAddress?: string };

  if (
    !company || !cuit || !email || !phone || !address || !mode || !contract || !currency ||
    typeof amount !== 'number' || amount <= 0 || !Array.isArray(stack) || stack.length === 0 || !walletAddress
  ) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos para publicar el aviso.' });
  }

  const normalizedWallet = walletAddress?.trim().toLowerCase();
  const walletAccount = normalizedWallet ? getWalletAccountByAddress(normalizedWallet) : null;
  if (!walletAccount || walletAccount.role !== 'employer') {
    return res.status(403).json({ error: 'Solo una wallet registrada como empresario puede publicar avisos.' });
  }

  const salaryArs = toArs(amount, currency);
  const required = contract === 'fulltime' ? MIN_FULLTIME_ARS : MIN_FREELANCE_HOUR_ARS;

  if (salaryArs < required) {
    return res.status(400).json({
      error: `La remuneración mínima es ${required} ARS para ${contract}.`,
    });
  }

  const job: Job = {
    id: `job_${Date.now()}`,
    company,
    cuit,
    email,
    phone,
    address,
    mode,
    contract,
    currency,
    amount,
    stack,
    walletAddress: normalizedWallet,
    createdAt: Date.now(),
  };

  addJob(job);
  return res.status(201).json(job);
});

export default router;
