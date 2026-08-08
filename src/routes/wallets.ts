import { Router } from 'express';
import { addWalletAccount, getWalletAccountByAddress } from '../data/store';

const router = Router();

router.post('/register', (req, res) => {
  const address = (req.body.address as string | undefined)?.trim();
  const role = req.body.role as 'employee' | 'employer' | undefined;

  if (!address || !role) {
    return res.status(400).json({ error: 'Se requiere dirección de wallet y rol.' });
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Dirección de wallet inválida.' });
  }

  try {
    const wallet = addWalletAccount({ address: address.toLowerCase(), role, createdAt: Date.now() });
    return res.status(200).json(wallet);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/', (req, res) => {
  const address = (req.query.address as string | undefined)?.trim();
  if (!address) {
    return res.status(400).json({ error: 'La dirección de wallet es requerida.' });
  }

  const wallet = getWalletAccountByAddress(address);
  if (!wallet) {
    return res.status(404).json({ error: 'Wallet no registrada.' });
  }

  return res.status(200).json(wallet);
});

export default router;
