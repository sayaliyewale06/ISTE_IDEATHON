export default async function handler(req: any, res: any) {
  const queryStr = req.query ? JSON.stringify(req.query) : '';
  const urlPath = `${req.url || ''} ${queryStr}`;

  if (process.env.BACKEND_URL) {
    try {
      let sub = '';
      if (urlPath.includes('db-inspector')) sub = '/db-inspector';
      else if (urlPath.includes('agents')) sub = '/agents';
      else if (urlPath.includes('dashboard')) sub = '/dashboard';
      else if (urlPath.includes('logs')) sub = '/logs';
      else if (urlPath.includes('payments')) sub = '/payments';

      const url = `${process.env.BACKEND_URL}/api/task${sub}`;
      const body = req.body && typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
      const r = await fetch(url, {
        method: req.method || 'GET',
        headers: { 'Content-Type': 'application/json', cookie: req.headers?.cookie || '' },
        body: req.method === 'GET' ? undefined : body
      });
      const text = await r.text();
      return res.status(r.status).send(text);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock task data');
    }
  }

  // DB Inspector
  if (urlPath.includes('db-inspector')) {
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

  // Agents
  if (urlPath.includes('agents')) {
    return res.status(200).json({
      agents: [
        { name: 'Medical Triage AI', icon: '🚑', desc: 'Coordinates emergency ICU admissions and high-priority trauma ambulance leases.', status: 'Online', load: '68%', latency: '28ms', success: '99.4%', tags: ['Critical Triage', 'P2P Priority', 'Emergency Mesh'] },
        { name: 'Blood Bank AI', icon: '🩸', desc: 'Brokers scarce O-negative blood reserves across regional hospital hubs.', status: 'Online', load: '48%', latency: '31ms', success: '98.7%', tags: ['Cold-Chain', 'Inventory Mesh', 'Priority Barter'] },
        { name: 'Disaster Logistics AI', icon: '📦', desc: 'Manages convoy transport, oxygen concentrators, and relief supply routes.', status: 'Online', load: '54%', latency: '42ms', success: '97.5%', tags: ['Multi-Route', 'Distributed Consensus', 'Adaptive Dispatch'] },
        { name: 'Power Grid AI', icon: '⚡', desc: 'Dynamically shifts micro-grid transformer capacity to preserve emergency ICU supply.', status: 'Online', load: '32%', latency: '14ms', success: '99.9%', tags: ['Grid Resilience', 'Zero-Latency', 'Automated Shunting'] },
        { name: 'Telemetry Route AI', icon: '📡', desc: 'Broadcasts distributed road blockage graph updates to vehicle peer nodes.', status: 'Online', load: '41%', latency: '19ms', success: '98.2%', tags: ['Graph Routing', 'Chandy-Lamport Snapshots', 'Gossip Protocol'] }
      ]
    });
  }

  // Dashboard
  if (urlPath.includes('dashboard')) {
    return res.status(200).json({
      metrics: {
        totalRequests: '42',
        activeAgents: '5',
        successRate: '98.5%',
        settledVolume: '148.50',
        paymentCount: '38'
      },
      recentExecutions: [
        { id: 'task_e4892c90', goal: 'Coordinate 4 trauma ambulances and 3 ICU beds for Pune Disaster Center while reserving 5 units of O-negative blood.', status: 'SUCCESS', createdAt: 'Just now', totalCost: '8.50' },
        { id: 'task_b1088491', goal: 'Dispatch oxygen concentrator convoy to West Sector Hospital and run telemetry route optimization.', status: 'SUCCESS', createdAt: '12 mins ago', totalCost: '5.00' }
      ],
      timelineActivity: [
        { id: 'act-1', type: 'TASK_SUCCESS', description: 'Autonomous emergency coordination completed across 3 agents', timestamp: 'Just now' },
        { id: 'act-2', type: 'PAYMENT_SETTLED', description: 'x402 micro-escrow settled on Algorand Testnet (8.50 USDC)', timestamp: '3 mins ago' },
        { id: 'act-3', type: 'AGENT_LEASE', description: 'Disaster Logistics AI leased convoy capacity to Medical Triage AI', timestamp: '14 mins ago' }
      ],
      agentOverview: [
        { name: 'Medical Triage AI', icon: '🚑', load: '68%', status: 'Online', success: '99.4%' },
        { name: 'Blood Bank AI', icon: '🩸', load: '48%', status: 'Online', success: '98.7%' },
        { name: 'Disaster Logistics AI', icon: '📦', load: '54%', status: 'Online', success: '97.5%' },
        { name: 'Power Grid AI', icon: '⚡', load: '32%', status: 'Online', success: '99.9%' },
        { name: 'Telemetry Route AI', icon: '📡', load: '41%', status: 'Online', success: '98.2%' }
      ]
    });
  }

  // Logs
  if (urlPath.includes('logs')) {
    return res.status(200).json({
      success: true,
      logs: [
        { id: 'log-1', level: 'INFO', message: 'Decentralized Peer-to-Peer Mesh initialized.', createdAt: new Date().toISOString() },
        { id: 'log-2', level: 'x402', message: 'USDC Resource Escrow App 61298349 committed.', createdAt: new Date().toISOString() }
      ]
    });
  }

  // Payments
  if (urlPath.includes('payments')) {
    return res.status(200).json({
      payments: [
        { txId: 'TXID_4F0D944E64F92EAAB586FD0E', taskId: 'task_e4892c90', agent: 'Medical Triage AI', agentWallet: 'ALGO_TRIAGE_W4812A4789X012', amount: '3.50', currency: 'USDC', nonce: 'nonce_981240a1', status: 'SETTLED', timestamp: 'Just now' },
        { txId: 'TXID_7821943CB586FD0E4F0D944E', taskId: 'task_e4892c90', agent: 'Blood Bank AI', agentWallet: 'ALGO_BLOOD_W1023B4789X013', amount: '2.00', currency: 'USDC', nonce: 'nonce_7821943c', status: 'SETTLED', timestamp: '12 mins ago' },
        { txId: 'TXID_331E987F4F0D944E64F92EAA', taskId: 'task_b1088491', agent: 'Disaster Logistics AI', agentWallet: 'ALGO_LOGIS_W9312C4789X014', amount: '3.00', currency: 'USDC', nonce: 'nonce_331e987f', status: 'SETTLED', timestamp: '28 mins ago' }
      ]
    });
  }

  // POST Create task
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

  // GET default tasks
  return res.status(200).json({
    success: true,
    tasks: []
  });
}
