// Este archivo decide qué API usar según el entorno
const isProduction = import.meta.env.PROD;

// En desarrollo (local) usa json-server
// En producción (Vercel) usa mock con localStorage
export const devolucionesAPI = isProduction
    ? (await import('./api.mock')).devolucionesAPIMock
    : (await import('./api')).devolucionesAPI;