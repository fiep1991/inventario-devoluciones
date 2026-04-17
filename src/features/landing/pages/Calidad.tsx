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

            {devoluciones.length === 0 ? (
                <p>No hay devoluciones pendientes de disposición</p>
            ) : (
                <table className="w-full border-collapse bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Fecha</th>
                            <th className="p-3 text-left">Cliente</th>
                            <th className="p-3 text-left">Producto</th>
                            <th className="p-3 text-left">Código</th>
                            <th className="p-3 text-left">Lote</th>
                            <th className="p-3 text-left">Estado</th>
                            <th className="p-3 text-left">Cantidad</th>
                            <th className="p-3 text-left">Observaciones</th>
                            <th className="p-3 text-left">Acción</th>
                            <th className="p-3 text-left"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {devoluciones.map((dev:any) => (
                            <tr key={dev.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{dev.fecha}</td>
                                <td className="p-2">{dev.cliente}</td>
                                <td className="p-2">{dev.producto}</td>
                                <td className="p-2">{dev.codigo}</td>
                                <td className="p-2">{dev.lote}</td>
                                <td className="p-2">{dev.estado}</td>
                                <td className="p-2">{dev.cantidad}</td>
                                <td className="p-2">{dev.observaciones}</td>

                                <td className="p-2">
                                    <select className="border rounded px-2 py-1">
                                        <option value="">Seleccionar...</option>
                                        <option value="venta">Aprobado para venta</option>
                                        <option value="analisis">Enviar a análisis</option>
                                        <option value="planta">Enviar a planta</option>
                                        <option value="devolver_proveedor">Devolver a proveedor</option>
                                    </select>
                                </td>
                                <td className="p-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                        Finalizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

