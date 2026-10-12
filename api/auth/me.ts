export default async function handler(req: any, res: any) {
  if (process.env.BACKEND_URL) {
    try {
      const url = `${process.env.BACKEND_URL}/api/auth/me`;
      const r = await fetch(url, { method: 'GET', headers: { cookie: req.headers?.cookie || '' } });
      const text = await r.text();
      return res.status(r.status).send(text);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock me session');
    }
  }

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

