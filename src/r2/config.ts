export const r2ApiUrl = (import.meta.env.VITE_R2_API_URL || '').replace(/\/$/, '');
export const isR2Configured = Boolean(r2ApiUrl);
