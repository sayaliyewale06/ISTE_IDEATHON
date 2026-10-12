export default async function handler(req: any, res: any) {
  if (process.env.BACKEND_URL) {
    try {
      const url = `${process.env.BACKEND_URL}/api/task/db-inspector`;
      const r = await fetch(url, { method: 'GET', headers: { cookie: req.headers?.cookie || '' } });
      const json = await r.json();
      return res.status(r.status).json(json);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock db records');
    }
  }

  return res.status(200).json({
    users: [
      { id: 'usr-1', name: 'Demo Operator', email: 'demo@algoverse.ai', balance: 100.0, createdAt: '2026-10-12' }
    ],
    tasks: [
      { id: 'task_e4892c90', goal: 'Coordinate 4 trauma ambulances and 3 ICU beds for Pune Disaster Center', status: 'SUCCESS', totalCost: '8.50', createdAt: 'Just now' },
      { id: 'task_b1088491', goal: 'Dispatch oxygen concentrator convoy to West Sector Hospital', status: 'SUCCESS', totalCost: '5.00', createdAt: '12 mins ago' }
    ],
    escrows: [
      { id: 'escrow_61298349', taskId: 'task_e4892c90', amount: 8.50, status: 'CLAIMED', txId: 'TXID_4F0D944E64F92EAAB586FD0E', createdAt: 'Just now' },
      { id: 'escrow_61298350', taskId: 'task_b1088491', amount: 5.00, status: 'CLAIMED', txId: 'TXID_331E987F4F0D944E64F92EAA', createdAt: '12 mins ago' }
    ]
  });
}
