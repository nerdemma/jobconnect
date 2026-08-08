// src/routes/applications.ts
import { Router, Request, Response } from 'express';
import { verifyActionToken } from '../services/tokenService';
import { MidnightService } from '../services/midnightService';
import {
  getJobById,
  saveApplication,
  getApplicationById,
  MIN_FULLTIME_ARS,
  MIN_FREELANCE_HOUR_ARS,
} from '../data/store';
import { sendEmployerNotification, sendApplicantStatusEmail } from '../services/mailer';

const router = Router();

// Endpoint de postulación para el Frontend
router.post('/apply', async (req: Request, res: Response) => {
  try {
    const { jobId, applicantEmail, profileSummary, skills, zkpProof } = req.body;

    if (!jobId || !applicantEmail || !profileSummary || !Array.isArray(skills) || !zkpProof) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos (jobId, applicantEmail, profileSummary, skills, zkpProof).' });
    }

    const job = getJobById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Aviso de trabajo no encontrado.' });
    }

    const minimumSalary = job.contract === 'fulltime' ? MIN_FULLTIME_ARS : MIN_FREELANCE_HOUR_ARS;
    const midnightService = MidnightService.getInstance();
    const proofIsValid = await midnightService.verifyApplicationProof(zkpProof, minimumSalary);

    if (!proofIsValid) {
      return res.status(400).json({ error: 'La prueba ZKP no es válida o no cumple con el requisito de salario mínimo.' });
    }

    const applicationId = `app_${Date.now()}`;
    saveApplication({
      applicationId,
      jobId,
      applicantEmail,
      profileSummary,
      skills,
      createdAt: Date.now(),
      status: 'pending',
    });

    await sendEmployerNotification(job.email, applicationId, jobId, applicantEmail, profileSummary, skills);

    return res.status(200).json({
      success: true,
      message: 'Postulación procesada correctamente con validación ZKP.',
      applicationId,
    });
  } catch (error) {
    console.error('Error al procesar la postulación:', error);
    return res.status(500).json({ error: 'Error interno al procesar la postulación.' });
  }
});

// Endpoint de decisión del empleador
router.get('/decision', async (req: Request, res: Response) => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).send('<h2>Error: Token de acción no proporcionado.</h2>');
  }

  try {
    const payload = verifyActionToken(token);
    const accepted = payload.action === 'accept';

    const application = getApplicationById(payload.applicationId);
    if (application) {
      application.status = accepted ? 'accepted' : 'rejected';
    }

    await sendApplicantStatusEmail(payload.applicantEmail, accepted).catch((mailError) => {
      console.error('Error enviando notificación al postulante:', mailError);
    });

    if (accepted) {
      const midnightService = MidnightService.getInstance();
      const result = await midnightService.closeJobOnChain(payload.jobId);

      return res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 40px;">
          <h2 style="color: #38a169;">✅ Postulación ACEPTADA</h2>
          <p>La búsqueda <strong>#${payload.jobId}</strong> ha sido cerrada on-chain mediante Midnight.</p>
          <p><small style="color: #666;">Tx Hash: ${result.txHash}</small></p>
        </div>
      `);
    }

    return res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 40px;">
        <h2 style="color: #e53e3e;">Postulación Rechazada</h2>
        <p>Se ha registrado la decisión en el sistema.</p>
      </div>
    `);
  } catch (error) {
    console.error('Error al procesar decisión de postulación:', error);
    return res.status(400).send('<h2>Error: Token inválido o expirado.</h2>');
  }
});

export default router;
