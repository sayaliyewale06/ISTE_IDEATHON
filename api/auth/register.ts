export default async function handler(req: any, res: any) {
  const url = `${process.env.BACKEND_URL ?? 'http://localhost:3001'}/api/auth/register`;
  try {
    const body = req.body && typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err: any) {
    res.status(502).json({ error: true, message: 'Proxy error: ' + err.message });
  }
}
