export default async function handler(req: any, res: any) {
  if (process.env.BACKEND_URL) {
    try {
      const url = `${process.env.BACKEND_URL}/api/auth/login`;
      const body = req.body && typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, redirect: 'manual' });
      const text = await r.text();
      return res.status(r.status).send(text);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock user session');
    }
  }

  // Standalone cloud session for live Vercel showcase
  res.status(200).json({
    success: true,
    user: {
      id: 'demo-user-id',
      name: 'Demo Operator',
      email: 'sayali.google@gmail.com',
      balance: 100.0
    }
  });
}

