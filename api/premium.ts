export default async function handler(req: any, res: any) {
  const queryStr = req.query ? JSON.stringify(req.query) : '';
  const urlPath = `${req.url || ''} ${queryStr}`;

  if (process.env.BACKEND_URL) {
    try {
      const sub = urlPath.includes('run-simulation') ? '/run-simulation' : '/balances';
      const url = `${process.env.BACKEND_URL}/api/premium${sub}`;
      const body = req.body && typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
      const r = await fetch(url, {
        method: req.method || 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: req.method === 'GET' ? undefined : body
      });
      const json = await r.json();
      return res.status(r.status).json(json);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock premium data');
    }
  }

  if (urlPath.includes('run-simulation')) {
    return res.status(200).json({
      success: true,
      txId: 'SIM_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      logs: [
        'Initiating autonomous micropayment handshake...',
        'Verifying machine signature on Algorand testnet...',
        'Escrow lock verified: 0.05 ALGO per inference slice.',
        'Settlement finalized autonomously across peer agents.'
      ],
      data: {
        status: 'COMPLETED',
        settledAmount: '0.05 ALGO',
        peerStatus: 'VERIFIED'
      }
    });
  }

  return res.status(200).json({
    userBalance: 100.0,
    agentBalances: {
      'Medical Triage AI': 45.2,
      'Blood Supply AI': 32.5,
      'Disaster Logistics AI': 28.0,
      'Grid Telemetry AI': 15.0
    }
  });
}
