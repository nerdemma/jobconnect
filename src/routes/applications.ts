import {Router, Request, Response} from 'express';
import { verifyActionToken } from '../services/tokenService';
import { sendEmployerNotification, sendApplicantStatusEmail} from '../services/mailer';

const router = Router();


router.post('/apply', async (req: Request, res: Response) => {
  try {
    let { jobId, employerEmail, applicantEmail, profileSummary, skills, zkpProof } = req.body;

    const normalizedEmployerEmail = typeof employerEmail === 'string' ? employerEmail.trim() : '';
    const finalEmployerEmail = normalizedEmployerEmail || process.env.SMTP_USER || 'emmanuel.d.breyaue@gmail.com';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmployerEmail)) {
      return res.status(400).json({ error: 'El correo del empleador no es válido.' });
    }

    if (!jobId || !applicantEmail || !zkpProof) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos (jobId, applicantEmail, zkpProof).' });
    }

    const applicationId = `app_${Date.now()}`;

    await sendEmployerNotification(
      finalEmployerEmail,
      applicationId,
      jobId,
      applicantEmail,
      profileSummary,
      skills || []
    );

    return res.status(200).json({ 
      success: true, 
      message: `Postulación procesada. Notificación enviada a ${finalEmployerEmail}`,
      applicationId 
    });
  } catch (error) {
    console.error('Error al procesar la postulación:', error);
    return res.status(500).json({ error: 'Error interno al procesar la postulación.' });
  }
});


router.get('/desicion', async(req: Request, res: Response)=> {
const token = req.query.token as string;

if(!token) 
{
return res.status(400).send('Token de accion no proporcionado');
}

try
{
    const payload = verifyActionToken(token);
    
    if(payload.action === 'accept')
    {
    await sendApplicantStatusEmail(payload.applicantEmail,true);
    console.log('[MIDNIGHT ENGINE] Cerrando Busqueda, JOB_ID ${payload.jobId}');

    return res.send(`
        <div style="font-family: Arial; text-align: center; padding: 40px;">
          <h2 style="color: #38a169;">✅ Postulación ACEPTADA</h2>
          <p>La búsqueda laboral ha sido deshabilitada automáticamente en el sistema.</p>
          <p>Se envió la notificación de confirmación al postulante.</p>
        </div>
      `);
   
    }
    else
    {
    await sendApplicantStatusEmail(payload.applicantEmail,false);

    return res.send(`
        <div style="font-family: Arial; text-align: center; padding: 40px;">
          <h2 style="color: #e53e3e;"> Postulación Rechazada</h2>
          <p>Se ha enviado el correo de agradecimiento estándar al candidato.</p>
        </div>
      `);

    }
}

catch(error)
{

    return res.status(400).send('Token invalido o expirado');
}

});

export default router;