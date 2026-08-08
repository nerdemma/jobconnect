import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || 'midnight-hackathon-secret-key';

export interface ActionTokenPayload{
    applicationId: string;
    jobId: string;
    action: 'accept' | 'reject';
}

export function generateActionToken(payload:ActionTokenPayload): string{
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d'});
}

export function verifyActionToken(token:string): ActionTokenPayload
{
    return jwt.verify(token,SECRET_KEY) as ActionTokenPayload;
}