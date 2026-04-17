import { useQuery } from '@tanstack/react-query';
import { devolucionesAPI } from "../../../services/api.index";


export const Calidad = () => {

    const { data, isPending, error } = useQuery({
        queryKey: ['devoluciones', 'coordinador'],
        queryFn: () => devolucionesAPI.getByetapa('coordinador')
    });

    if (isPending) {
        return <div className="p-8">Cargando devoluciones verificadas...</div>;
    }


    if (error) {
        return <div className="p-8 text-red-600">Error al cargar las devoluciones</div>;
    }



    const devoluciones = data?.data || [];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Control de Calidad</h1>
            <p>Hay {devoluciones.length} devolución(es) pendiente(s) para disposición de calidad</p>
        </div>
    );
};

