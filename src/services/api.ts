import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // la URL de json-server
});

export const devolucionesAPI = {
    getByetapa: (etapa: string) => api.get(`/devoluciones?etapa=${etapa}`), // se hace GET a la etapa de recepción
    create: (data: any) => api.post('/devoluciones', data),  // crea una nueva devolución
    update: (id: number, data: any) => api.patch(`/devoluciones/${id}`, data), // Se actualiza la etapa rececpión a coordinador cuanto la verifica
}