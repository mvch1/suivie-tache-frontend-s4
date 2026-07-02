// lib/session.ts
import { cookies } from 'next/headers';

interface Session {
  token: string | null;
  userId: string | null;
  role?:  string | null;
}

function parseJwt(token: string): Record<string, any> | null {
  try {
    const base64 = token.split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const json = Buffer.from(base64, 'base64').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session> {
  const cookieStore = await cookies();                // 👈 await here
  const token = cookieStore.get('auth_token')?.value ?? null;

  if (!token) return { token: null, userId: null };

  const payload = parseJwt(token);
  return {
    token,
    userId: payload?.user_id || payload?.id || payload?.sub || null,
    role:   payload?.role ?? null,
  };
}
