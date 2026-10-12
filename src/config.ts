// Runtime API base for client-side requests.
// In dev (localhost), point directly to the Hono backend on port 3001.
// In production or custom env, use VITE_API_BASE.
const base = import.meta.env.VITE_API_BASE ?? (import.meta.env.DEV ? 'http://localhost:3001/api' : '/api');
export const API_BASE = base.replace(/\/$/, '');

export default API_BASE;

