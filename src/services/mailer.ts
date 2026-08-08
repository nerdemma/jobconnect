// src/services/mailer.ts
import nodemailer from 'nodemailer';
import { generateActionToken } from './tokenService';

async function getTransporter() {
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT) || 2525;
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  if (smtpHost) {
    const transportConfig: any = {
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
    };

    if (smtpUser && smtpPass && smtpUser !== 'user_placeholder') {
      transportConfig.auth = {
        user: smtpUser,
        pass: smtpPass,
      };
    }

    return nodemailer.createTransport(transportConfig);
  }

  // Si no hay host SMTP configurado, usa una cuenta temporal de Ethereal.
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function sendEmployerNotification(
  employerEmail: string,
  applicationId: string,
  jobId: string,
  applicantEmail: string,
  profileSummary: string,
  skills: string[] = []
) {
  const recipientEmail = employerEmail?.trim();

  if (!recipientEmail) {
    throw new Error('Se requiere un correo del empleador para enviar la notificación.');
  }

  const baseUrl = process.env.BASE_URL || "http://localhost:3001";
  
  const acceptToken = generateActionToken({ applicationId, jobId, applicantEmail, action: 'accept' });
  const rejectToken = generateActionToken({ applicationId, jobId, applicantEmail, action: 'reject' });

  const acceptUrl = `${baseUrl}/api/applications/decision?token=${acceptToken}`;
  const rejectUrl = `${baseUrl}/api/applications/decision?token=${rejectToken}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #1a365d;">Nueva Postulación Recibida</h2>
      <p style="background-color: #f0f4f8; padding: 10px; border-left: 4px solid #3182ce; font-size: 13px; color: #2d3748;">
        🛡️ <strong>Verificado con Midnight ZKP:</strong> La remuneración pretendida y datos sensibles del postulante cumplen con las condiciones sin ser expuestos on-chain.
      </p>
      
      <p><strong>Perfil del candidato:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc; margin: 0;">
        ${profileSummary}
      </blockquote>

      <p><strong>Stack Tecnológico:</strong></p>
      <p>
        ${skills.map(skill => `<span style="background: #edf2f7; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; display: inline-block; margin-bottom: 4px;">${skill}</span>`).join('')}
      </p>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

      <div style="text-align: center; margin-top: 25px;">
        <a href="${acceptUrl}" style="background-color: #38a169; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 15px; display: inline-block;">Aceptar Candidato</a>
        <a href="${rejectUrl}" style="background-color: #e53e3e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Rechazar</a>
      </div>
    </div>
  `;

  try {
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: '"DevMatch Privacy Engine" <no-reply@devmatch.io>',
      to: recipientEmail,
      subject: `Nueva postulación anónima (Job ID: #${jobId})`,
      html: htmlContent,
    });

    console.log("--------------------------------------------------");
    console.log(`📬 NOTIFICACIÓN ENVIADA A: ${recipientEmail}`);
    
    const testUrl = nodemailer.getTestMessageUrl(info as any);
    if (testUrl) {
      console.log("🔗 Ver correo renderizado (Ethereal):", testUrl);
    }
    console.log("--------------------------------------------------");
  } catch (error) {
    console.error(`Error enviando notificación al empleador ${recipientEmail}:`, error);
    throw error;
  }
}

export async function sendApplicantStatusEmail(applicantEmail: string, accepted: boolean) {
  const subject = accepted 
    ? "¡Felicitaciones! Tu postulación ha sido ACEPTADA" 
    : "Actualización sobre tu postulación laboral";

  const htmlContent = accepted
    ? `<p>El empleador ha aceptado tu postulación. Se pondrán en contacto contigo en breve para formalizar la propuesta manteniendo la remuneración acordada.</p>`
    : `<p>Gracias por aplicar. Lamentablemente continuaremos con otros candidatos. Te animamos a seguir aplicando a futuras oportunidades.</p>`;

  try {
    const transporter = await getTransporter();

    await transporter.sendMail({
      from: '"DevMatch Privacy Engine" <no-reply@devmatch.io>',
      to: applicantEmail,
      subject: subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error(`Error enviando estado de postulación a ${applicantEmail}:`, error);
    throw error;
  }
}