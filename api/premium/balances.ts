export default async function handler(req: any, res: any) {
  if (process.env.BACKEND_URL) {
    try {
      const url = `${process.env.BACKEND_URL}/api/premium/balances`;
      const r = await fetch(url);
      const json = await r.json();
      return res.status(r.status).json(json);
    } catch (err: any) {
      console.warn('Backend proxy failed, returning mock balances');
    }
  }

  // Standalone response when backend is not configured
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
