import { Router } from 'express';
import { getEmployeeByEmail, saveEmployee, getWalletAccountByAddress, type Employee } from '../data/store';

const router = Router();

function isValidGithubUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    const segments = parsed.pathname.split('/').filter(Boolean);
    return (hostname === 'github.com' || hostname === 'www.github.com') && segments.length >= 1;
  } catch {
    return false;
  }
}

router.post('/', (req, res) => {
  const { fullName, email, phone, dni, address, about, github, stack, walletAddress } = req.body as Employee & { walletAddress?: string };

  if (!fullName || !email || !phone || !dni || !address || !about || !github || !Array.isArray(stack) || stack.length === 0 || !walletAddress) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos para guardar el perfil del empleado.' });
  }

  if (!isValidGithubUrl(github)) {
    return res.status(400).json({ error: 'La URL de GitHub no es válida.' });
  }

  const normalizedWallet = walletAddress.trim().toLowerCase();
  const walletAccount = getWalletAccountByAddress(normalizedWallet);
  if (!walletAccount || walletAccount.role !== 'employee') {
    return res.status(403).json({ error: 'Solo una wallet registrada como empleado puede guardar el perfil.' });
  }

  const employee = saveEmployee({
    fullName,
    email,
    phone,
    dni,
    address,
    about,
    github,
    stack,
    walletAddress: normalizedWallet,
  });
  return res.status(201).json(employee);
});

router.get('/', (req, res) => {
  const email = (req.query.email as string | undefined)?.trim();
  if (!email) {
    return res.status(400).json({ error: 'Email del empleado requerido para consultar el perfil.' });
  }
  const employee = getEmployeeByEmail(email);
  if (!employee) {
    return res.status(404).json({ error: 'Empleado no encontrado.' });
  }
  return res.status(200).json(employee);
});

export default router;
