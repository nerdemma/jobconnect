import { Router } from 'express';
import { getEmployeeByEmail, saveEmployee, type Employee } from '../data/store';

const router = Router();

router.post('/', (req, res) => {
  const { fullName, email, phone, dni, address, stack } = req.body as Employee;

  if (!fullName || !email || !phone || !dni || !address || !Array.isArray(stack) || stack.length === 0) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos para guardar el perfil del empleado.' });
  }

  const employee = saveEmployee({ fullName, email, phone, dni, address, stack });
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
