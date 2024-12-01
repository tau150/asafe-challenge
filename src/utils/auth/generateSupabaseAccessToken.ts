import { SignJWT, JWTPayload } from 'jose';

interface Payload extends JWTPayload {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  role: string;
}

export async function generateSupabaseAccessToken(payload: Payload, signingSecret: string) {

  const encoder = new TextEncoder();
  const secretKey = encoder.encode(signingSecret);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secretKey);

  return token;
}