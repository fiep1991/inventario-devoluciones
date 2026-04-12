import { devolucionesAPI as devolucionesAPIReal } from './api';
import { devolucionesAPIMock } from './api.mock';

const isProduction = import.meta.env.PROD;

export const devolucionesAPI = isProduction ? devolucionesAPIMock : devolucionesAPIReal;