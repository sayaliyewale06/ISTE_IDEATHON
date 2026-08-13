import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = `${process.env.BACKEND_URL ?? 'http://localhost:3001'}/api/auth/me`;
  try {
    const r = await fetch(url, { method: 'GET', headers: { cookie: req.headers.cookie || '' } });
    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err: any) {
    res.status(502).json({ error: true, message: 'Proxy error: ' + err.message });
  }
}
