// Runtime API base for client-side requests.
// When deployed to Vercel we want relative `/api` calls, so default to empty string.
const base = import.meta.env.VITE_API_BASE ?? '';
export const API_BASE = base.replace(/\/$/, '');

export default API_BASE;
