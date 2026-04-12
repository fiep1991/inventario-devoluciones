// API Mock para Vercel (usa localStorage)
const STORAGE_KEY = 'devoluciones_mock';

// Cargar devoluciones desde localStorage
const cargarDevoluciones = () => {
    const guardadas = localStorage.getItem(STORAGE_KEY);
    return guardadas ? JSON.parse(guardadas) : [];
};

// Guardar devoluciones en localStorage
const guardarDevoluciones = (datos: any[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
};

// Obtener siguiente ID
const getNextId = () => {
    const devoluciones = cargarDevoluciones();
    const maxId = devoluciones.reduce((max: number, d: any) => {
        const id = parseInt(d.id) || 0;
        return id > max ? id : max;
    }, 0);
    return (maxId + 1).toString();
};

export const devolucionesAPIMock = {
    // Obtener devoluciones por etapa
    getByetapa: async (etapa: string) => {
        await new Promise(resolve => setTimeout(resolve, 300)); // simular delay
        const devoluciones = cargarDevoluciones();
        const filtradas = devoluciones.filter((d: any) => d.etapa === etapa);
        return { data: filtradas };
    },

    // Crear una nueva devolución
    create: async (data: any) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const devoluciones = cargarDevoluciones();
        const nuevaDevolucion = {
            ...data,
            id: getNextId(),
            imagenes: data.imagenes || []
        };
        devoluciones.push(nuevaDevolucion);
        guardarDevoluciones(devoluciones);

        return { data: nuevaDevolucion };
    },

    // Actualizar una devolución
    update: async (id: string, data: any) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const devoluciones = cargarDevoluciones();
        const index = devoluciones.findIndex((d: any) => d.id === id);
        if (index !== -1) {
            devoluciones[index] = { ...devoluciones[index], ...data };
            guardarDevoluciones(devoluciones);
            return { data: devoluciones[index] };
        }
        return { data: null };
    },
};