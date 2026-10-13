export default async function handler(req: any, res: any) {
  const queryStr = req.query ? JSON.stringify(req.query) : '';
  const urlPath = `${req.url || ''} ${queryStr}`;

  if (process.env.BACKEND_URL) {
    try {
      const sub = urlPath.includes('logout') ? '/logout' : urlPath.includes('register') ? '/register' : urlPath.includes('me') ? '/me' : '/login';
      const url = `${process.env.BACKEND_URL}/api/auth${sub}`;
      const body = req.body && typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
      const r = await fetch(url, {
        method: req.method || 'POST',
        headers: { 'Content-Type': 'application/json', cookie: req.headers?.cookie || '' },
        body: req.method === 'GET' ? undefined : body,
        redirect: 'manual'
      });
      const text = await r.text();
      return res.status(r.status).send(text);
    } catch (err: any) {
      console.warn('Backend proxy failed, using standalone auth handler');
    }
  }

  // Logout
  if (urlPath.includes('logout')) {
    res.setHeader('Set-Cookie', 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  }

  // Me
  if (urlPath.includes('me')) {
    return res.status(200).json({
      success: true,
      user: {
        id: 'demo-user-id',
        name: 'Demo Operator',
        email: 'sayali.google@gmail.com',
        balance: 100.0
      }
    });
  }

  // Register / Login
  return res.status(200).json({
    success: true,
    user: {
      id: 'demo-user-id',
      name: 'Demo Operator',
      email: 'sayali.google@gmail.com',
      balance: 100.0
    }
  });
}
