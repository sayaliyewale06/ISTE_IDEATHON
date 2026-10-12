export default async function handler(req: any, res: any) {
  if (process.env.BACKEND_URL) {
    try {
      const url = `${process.env.BACKEND_URL}/api/task`;
      const body = req.body && typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
      const r = await fetch(url, { method: req.method, headers: { 'Content-Type': 'application/json', cookie: req.headers?.cookie || '' }, body: req.method === 'GET' ? undefined : body });
      const text = await r.text();
      return res.status(r.status).send(text);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock task');
    }
  }

  if (req.method === 'POST') {
    return res.status(202).json({
      success: true,
      taskId: 'task_' + Math.random().toString(36).substring(2, 9),
      status: 'IN_PROGRESS',
      escrow: {
        appId: '61298349',
        txid: '4f0d944e64f92eaab586fd0edd71627cb717580716d6f7d9362386efe33df9fb',
        amount: 8.50
      }
    });
  }

  res.status(200).json({
    success: true,
    tasks: []
  });
}

