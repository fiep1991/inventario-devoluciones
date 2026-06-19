import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { devolucionesAPI } from "../../../services/api.index";
import { useState } from "react";
import { ModalDevolucion } from "../../../components/ui/ModalDevolucion";

type Devolucion = {
    id: number;
    fecha: string;
    cliente: string;
    producto: string;
    codigo: string;
    lote: string;
    estado: string;
    cantidad: number;
    observaciones: string;
    etapa: string;
};

export const Coordinador = () => {

    const queryClient = useQueryClient();

    const [modalAbierto, setModalAbierto] = useState(false);
    const [devolucionSeleccionada, setDevolucionSeleccionada] = useState<any>(null);

    const { data, isPending, error } = useQuery({
        queryKey: ['devoluciones', 'recepcion'],
        queryFn: () => devolucionesAPI.getByetapa('recepcion')
    });

    const verifyMutation = useMutation({
        mutationFn: (id: number) => devolucionesAPI.update(String(id), { etapa: 'coordinador' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devoluciones', 'recepcion'] });
        },
    });

    const abrirModal = (devolucion: any) => {
        setDevolucionSeleccionada(devolucion);
        setModalAbierto(true);
    };

    const handleSaveFromModal = (id: number, data: Partial<Devolucion>) => {
        devolucionesAPI.update(String(id), data).then(() => {
            queryClient.invalidateQueries({ queryKey: ['devoluciones', 'recepcion'] });
        });
    };

    const formatearFecha = (fechaISO: string) => {
        if (!fechaISO) return '';
        const [anio, mes, dia] = fechaISO.split('-');
        return `${dia}/${mes}/${anio}`;
    };

    if (isPending) {
        return <div className="p-8 text-3xl">Cargando las devoluciones...</div>;
    }

    if (error) {
        return <div className="p-8 text-2xl text-red-600">Error al cargar las Devoluciones</div>;
    }

    const devoluciones = data?.data || [];

    return (
        <div className="bg-[#C4C4C4] rounded-2xl shadow-xl/30 p-8 w-auto min-h-auto">
            <h1 className="text-3xl font-bold mb-4">Coordinador de Transporte</h1>
            <p className="text-gray-600 mb-4">Revisa y edita los datos de las devoluciones antes de verificarlas</p>

            {devoluciones.length === 0 ? (
                <p>No hay devoluciones pendientes de verificación</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left text-sm">Fecha</th>
                                <th className="p-3 text-left text-sm">Cliente</th>
                                <th className="p-3 text-left text-sm">Producto</th>
                                <th className="p-3 text-left text-sm">Código</th>
                                <th className="p-3 text-left text-sm">Lote</th>
                                <th className="p-3 text-left text-sm">Estado</th>
                                <th className="p-3 text-left text-sm">Cantidad</th>
                                <th className="p-3 text-left text-sm">Observaciones</th>
                                <th className="p-3 text-left text-sm">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devoluciones.map((dev: Devolucion) => (
                                <tr
                                    key={dev.id}
                                    onClick={(e) => {
                                        if (e.target instanceof HTMLElement && e.target.closest('button')) {
                                            return;
                                        }
                                        abrirModal(dev);
                                    }}
                                    className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <td className="p-2 text-sm">{formatearFecha(dev.fecha)}</td>
                                    <td className="p-2 text-sm">{dev.cliente}</td>
                                    <td className="p-2 text-sm">{dev.producto}</td>
                                    <td className="p-2 text-sm">{dev.codigo}</td>
                                    <td className="p-2 text-sm">{dev.lote}</td>
                                    <td className="p-2 text-sm">{dev.estado}</td>
                                    <td className="p-2 text-sm">{dev.cantidad}</td>
                                    <td className="p-2 text-sm truncate max-w-30">{dev.observaciones}</td>
                                    <td className="p-2 text-sm">
                                        <button
                                            onClick={() => verifyMutation.mutate(dev.id)}
                                            disabled={verifyMutation.isPending}
                                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors disabled:opacity-50"
                                        >
                                            {verifyMutation.isPending ? 'Verificando...' : 'Verificar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ModalDevolucion
                devolucion={devolucionSeleccionada}
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onSave={handleSaveFromModal}
            />
        </div>
    );
};