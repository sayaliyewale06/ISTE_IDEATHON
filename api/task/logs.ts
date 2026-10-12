export default async function handler(req: any, res: any) {
  if (process.env.BACKEND_URL) {
    try {
      const url = `${process.env.BACKEND_URL}/api/task/logs`;
      const r = await fetch(url, { method: 'GET', headers: { cookie: req.headers?.cookie || '' } });
      const json = await r.json();
      return res.status(r.status).json(json);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock logs');
    }
  }

  res.status(200).json({
    success: true,
    logs: [
      { id: 'log-1', level: 'INFO', message: 'Decentralized Peer-to-Peer Mesh initialized.', createdAt: new Date().toISOString() },
      { id: 'log-2', level: 'x402', message: 'USDC Resource Escrow App 61298349 committed.', createdAt: new Date().toISOString() }
    ]
  });
}

