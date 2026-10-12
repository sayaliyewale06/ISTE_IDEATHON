export default async function handler(req: any, res: any) {
  if (process.env.BACKEND_URL) {
    try {
      const url = `${process.env.BACKEND_URL}/api/task/agents`;
      const r = await fetch(url, { method: 'GET', headers: { cookie: req.headers?.cookie || '' } });
      const json = await r.json();
      return res.status(r.status).json(json);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock agents');
    }
  }

  return res.status(200).json({
    agents: [
      {
        name: 'Medical Triage AI',
        icon: '🚑',
        desc: 'Coordinates emergency ICU admissions and high-priority trauma ambulance leases.',
        status: 'Online',
        load: '68%',
        latency: '28ms',
        success: '99.4%',
        tags: ['Critical Triage', 'P2P Priority', 'Emergency Mesh']
      },
      {
        name: 'Blood Bank AI',
        icon: '🩸',
        desc: 'Brokers scarce O-negative blood reserves across regional hospital hubs.',
        status: 'Online',
        load: '48%',
        latency: '31ms',
        success: '98.7%',
        tags: ['Cold-Chain', 'Inventory Mesh', 'Priority Barter']
      },
      {
        name: 'Disaster Logistics AI',
        icon: '📦',
        desc: 'Manages convoy transport, oxygen concentrators, and relief supply routes.',
        status: 'Online',
        load: '54%',
        latency: '42ms',
        success: '97.5%',
        tags: ['Multi-Route', 'Distributed Consensus', 'Adaptive Dispatch']
      },
      {
        name: 'Power Grid AI',
        icon: '⚡',
        desc: 'Dynamically shifts micro-grid transformer capacity to preserve emergency ICU supply.',
        status: 'Online',
        load: '32%',
        latency: '14ms',
        success: '99.9%',
        tags: ['Grid Resilience', 'Zero-Latency', 'Automated Shunting']
      },
      {
        name: 'Telemetry Route AI',
        icon: '📡',
        desc: 'Broadcasts distributed road blockage graph updates to vehicle peer nodes.',
        status: 'Online',
        load: '41%',
        latency: '19ms',
        success: '98.2%',
        tags: ['Graph Routing', 'Chandy-Lamport Snapshots', 'Gossip Protocol']
      }
    ]
  });
}
