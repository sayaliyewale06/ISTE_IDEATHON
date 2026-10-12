export default async function handler(req: any, res: any) {
  if (process.env.BACKEND_URL) {
    try {
      const url = `${process.env.BACKEND_URL}/api/task/payments`;
      const r = await fetch(url, { method: 'GET', headers: { cookie: req.headers?.cookie || '' } });
      const json = await r.json();
      return res.status(r.status).json(json);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock payments');
    }
  }

  return res.status(200).json({
    payments: [
      {
        txId: 'TXID_4F0D944E64F92EAAB586FD0E',
        taskId: 'task_e4892c90',
        agent: 'Medical Triage AI',
        agentWallet: 'ALGO_TRIAGE_W4812A4789X012',
        amount: '3.50',
        currency: 'USDC',
        nonce: 'nonce_981240a1',
        status: 'SETTLED',
        timestamp: 'Just now'
      },
      {
        txId: 'TXID_7821943CB586FD0E4F0D944E',
        taskId: 'task_e4892c90',
        agent: 'Blood Bank AI',
        agentWallet: 'ALGO_BLOOD_W1023B4789X013',
        amount: '2.00',
        currency: 'USDC',
        nonce: 'nonce_7821943c',
        status: 'SETTLED',
        timestamp: '12 mins ago'
      },
      {
        txId: 'TXID_331E987F4F0D944E64F92EAA',
        taskId: 'task_b1088491',
        agent: 'Disaster Logistics AI',
        agentWallet: 'ALGO_LOGIS_W9312C4789X014',
        amount: '3.00',
        currency: 'USDC',
        nonce: 'nonce_331e987f',
        status: 'SETTLED',
        timestamp: '28 mins ago'
      }
    ]
  });
}
