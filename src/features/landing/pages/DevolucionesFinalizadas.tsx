import { useQuery } from '@tanstack/react-query';
import { devolucionesAPI } from "../../../services/api.index";
import { useState } from 'react';

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
    disposicion?: string;
    comentario?: string;
};

export const DevolucionesFinalizadas = () => {
    const [filtro, setFiltro] = useState('');

    const { data, isPending, error } = useQuery({
        queryKey: ['devoluciones', 'calidad'],
        queryFn: () => devolucionesAPI.getByetapa('calidad')
    });

    const formatearFecha = (fechaISO: string) => {
        if (!fechaISO) return '';
        const [anio, mes, dia] = fechaISO.split('-');
        return `${dia}/${mes}/${anio}`;
    };

    const getDisposicionLabel = (disposicion?: string) => {
        switch (disposicion) {
            case 'venta': return { label: 'Reintegrar a inventario', color: 'bg-green-100 text-green-700' };
            case 'analisis': return { label: 'Muestra para análisis', color: 'bg-yellow-100 text-yellow-700' };
            case 'destruccion': return { label: 'NO CONFORME', color: 'bg-red-100 text-red-700' };
            default: return { label: 'Sin disposición', color: 'bg-gray-100 text-gray-700' };
        }
    };

    if (isPending) {
        return <div className="p-8 text-xl font-medium text-neutral-500 flex items-center gap-3">
            <i className="ti ti-loader-2 animate-spin text-2xl"></i>
            Cargando devoluciones finalizadas...
        </div>;
    }

    if (error) {
        return <div className="p-8 text-xl text-red-600 bg-red-50 rounded-xl border border-red-100">
            Error al cargar las Devoluciones
        </div>;
    }

    const devoluciones = (data?.data || []).filter((dev: Devolucion) =>
        dev.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
        dev.producto.toLowerCase().includes(filtro.toLowerCase()) ||
        dev.lote.includes(filtro)
    );

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Devoluciones Finalizadas</h1>
                    <p className="text-neutral-500 mt-1">Historial de devoluciones con disposición final asignada.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4 min-w-45">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <i className="ti ti-check-circle text-xl"></i>
                        </div>
                        <div>
                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Finalizadas</p>
                            <p className="text-xl font-bold text-secondary">{devoluciones.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="border-b border-neutral-200 bg-neutral-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-1 bg-neutral-200/50 p-1 rounded-lg w-fit">
                        <button className="px-4 py-1.5 text-sm font-semibold rounded-md bg-white text-secondary shadow-sm">
                            Historial
                        </button>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="relative">
                            <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none w-full md:w-64 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {devoluciones.length === 0 ? (
                        <div className="p-20 text-center">
                            <i className="ti ti-archive text-5xl text-neutral-200 mb-4 block"></i>
                            <p className="text-neutral-500 font-medium">No hay devoluciones finalizadas</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 border-b border-neutral-200">
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Producto</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Código</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Lote</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Cantidad</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Disposición</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Comentario</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                                {devoluciones.map((dev: Devolucion, index: number) => {
                                    const disp = getDisposicionLabel(dev.disposicion);
                                    return (
                                        <tr
                                            key={dev.id}
                                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/30'} hover:bg-neutral-50 transition-colors`}
                                        >
                                            <td className="px-6 py-4 text-sm text-neutral-600">
                                                {formatearFecha(dev.fecha)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-700 font-medium">
                                                {dev.cliente}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-neutral-700">{dev.producto}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-neutral-500">
                                                {dev.codigo}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-neutral-500">
                                                {dev.lote}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-secondary">
                                                {dev.cantidad} kg
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${disp.color}`}>
                                                    {disp.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-neutral-600 max-w-37.5 truncate">
                                                    {dev.comentario || '—'}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
                    <p className="text-xs text-neutral-500">Mostrando <span className="font-semibold">{devoluciones.length}</span> resultados</p>
                </div>
            </div>
        </div>
    );
};