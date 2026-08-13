export default async function handler(req: any, res: any) {
  const url = `${process.env.BACKEND_URL ?? 'http://localhost:3001'}/api/premium/run-simulation`;
  try {
    const body = req.body && typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    const json = await r.json();
    res.status(r.status).json(json);
  } catch (err: any) {
    res.status(502).json({ error: true, message: 'Proxy error: ' + err.message });
  }
}
