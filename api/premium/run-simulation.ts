import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = `${process.env.BACKEND_URL ?? 'http://localhost:3001'}/api/premium/run-simulation`;
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: req.body });
    const json = await r.json();
    res.status(r.status).json(json);
  } catch (err: any) {
    res.status(502).json({ error: true, message: 'Proxy error: ' + err.message });
  }
}
