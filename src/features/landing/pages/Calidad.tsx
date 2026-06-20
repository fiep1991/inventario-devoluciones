import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
};

export const Calidad = () => {
    const queryClient = useQueryClient();
    const [filtro, setFiltro] = useState('');
    const { data, isPending, error } = useQuery({
        queryKey: ['devoluciones', 'coordinador'],
        queryFn: () => devolucionesAPI.getByetapa('coordinador')
    });

    const [disposiciones, setDisposiciones] = useState<{ [key: number]: string }>({});

    const finalizeMutation = useMutation({
        mutationFn: ({ id, disposicion }: { id: number, disposicion: string }) => 
            devolucionesAPI.update(String(id), { etapa: 'finalizado', disposicion }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devoluciones', 'coordinador'] });
        },
    });

    const handleDisposicionChange = (id: number, valor: string) => {
        setDisposiciones(prev => ({ ...prev, [id]: valor }));
    };

    const handleFinalize = (id: number) => {
        const disposicion = disposiciones[id];
        if (disposicion) {
            finalizeMutation.mutate({ id, disposicion });
        }
    };

    const formatearFecha = (fechaISO: string) => {
        if (!fechaISO) return '';
        const [anio, mes, dia] = fechaISO.split('-');
        return `${dia}/${mes}/${anio}`;
    };

    if (isPending) {
        return <div className="p-8 text-xl font-medium text-neutral-500 flex items-center gap-3">
            <i className="ti ti-loader-2 animate-spin text-2xl"></i>
            Cargando devoluciones para calidad...
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
                    <h1 className="text-3xl font-bold text-neutral-900">Control de Calidad</h1>
                    <p className="text-neutral-500 mt-1">Realiza la inspección final y define el destino de los productos.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4 min-w-[200px]">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <i className="ti ti-microscope text-xl"></i>
                        </div>
                        <div>
                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">En Inspección</p>
                            <p className="text-xl font-bold text-neutral-900">{devoluciones.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="border-b border-neutral-200 bg-neutral-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-1 bg-neutral-200/50 p-1 rounded-lg w-fit">
                        <button className="px-4 py-1.5 text-sm font-semibold rounded-md bg-white text-neutral-900 shadow-sm">
                            Calidad
                        </button>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="relative">
                            <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>
                            <input 
                                type="text" 
                                placeholder="Buscar devolución..." 
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-morado/20 focus:border-morado outline-none w-full md:w-64 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {devoluciones.length === 0 ? (
                        <div className="p-20 text-center">
                            <i className="ti ti-shield-check text-5xl text-neutral-200 mb-4 block"></i>
                            <p className="text-neutral-500 font-medium">No hay devoluciones pendientes de inspección</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 border-b border-neutral-200">
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Lote / Fecha</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Producto</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Cantidad</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Disposición</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                                {devoluciones.map((dev: Devolucion, index: number) => (
                                    <tr 
                                        key={dev.id}
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/30'} hover:bg-neutral-50 transition-colors`}
                                    >
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-neutral-900">#LT-{dev.lote.slice(-4)}</p>
                                            <p className="text-[11px] text-neutral-400 mt-0.5">{formatearFecha(dev.fecha)}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-700 font-medium">
                                            {dev.cliente}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-neutral-700">{dev.producto}</p>
                                            <p className="text-[11px] font-mono text-neutral-400 mt-0.5">SKU: {dev.codigo}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-neutral-800">{dev.cantidad}</span>
                                            <span className="text-[10px] text-neutral-400 ml-1">unid.</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                                                <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                                                En Calidad
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select 
                                                className="w-full h-9 bg-gray-50 border border-gray-200 rounded-lg px-2 text-xs text-gray-700 outline-none focus:bg-white focus:border-morado transition-all"
                                                value={disposiciones[dev.id] || ''}
                                                onChange={(e) => handleDisposicionChange(dev.id, e.target.value)}
                                            >
                                                <option value="">Seleccionar...</option>
                                                <option value="venta">Aprobado para Venta</option>
                                                <option value="analisis">Análisis Profundo</option>
                                                <option value="planta">Regreso a Planta</option>
                                                <option value="proveedor">Devolución Proveedor</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleFinalize(dev.id)}
                                                disabled={!disposiciones[dev.id] || finalizeMutation.isPending}
                                                className="px-3 py-1.5 bg-morado text-white text-xs font-bold rounded-lg hover:bg-morado/90 transition-colors shadow-sm disabled:opacity-30"
                                            >
                                                {finalizeMutation.isPending ? '...' : 'Finalizar'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
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
