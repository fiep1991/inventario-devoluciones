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
    const [filtro, setFiltro] = useState('');

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
        return <div className="p-8 text-xl font-medium text-neutral-500 flex items-center gap-3">
            <i className="ti ti-loader-2 animate-spin text-2xl"></i>
            Cargando las devoluciones...
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
                    <h1 className="text-3xl font-bold text-secondary">Coordinador de Transporte</h1>
                    <p className="text-neutral-500 mt-1">Revisa y edita los datos de las devoluciones antes de verificarlas.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4 min-w-50">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <i className="ti ti-clock-pause text-xl"></i>
                        </div>
                        <div>
                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Pendientes</p>
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
                            Coordinación
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
                                className="pl-10 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none w-full md:w-64 transition-all"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-600 bg-white hover:bg-neutral-50">
                            <i className="ti ti-filter"></i>
                            Filtros
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {devoluciones.length === 0 ? (
                        <div className="p-20 text-center">
                            <i className="ti ti-package-off text-5xl text-neutral-200 mb-4 block"></i>
                            <p className="text-neutral-500 font-medium">No hay devoluciones pendientes de verificación</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 border-b border-neutral-200">
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Producto / Código</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Lote</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Cantidad</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                                {devoluciones.map((dev: Devolucion, index: number) => (
                                    <tr 
                                        key={dev.id}
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/30'} hover:bg-neutral-50 transition-colors group cursor-pointer`}
                                        onClick={(e) => {
                                            if (e.target instanceof HTMLElement && e.target.closest('button')) return;
                                            abrirModal(dev);
                                        }}
                                    >
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-secondary">{formatearFecha(dev.fecha)}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-700 font-medium">
                                            {dev.cliente}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-neutral-700">{dev.producto}</p>
                                            <p className="text-[11px] font-mono text-neutral-400 mt-0.5">SKU: {dev.codigo}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-500 font-mono">
                                            {dev.lote}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-secondary">{dev.cantidad}</span>
                                            <span className="text-[10px] text-neutral-400 ml-1">unid.</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                                                <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                                                En Recepción
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => abrirModal(dev)}
                                                    className="p-2 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                                >
                                                    <i className="ti ti-edit text-lg"></i>
                                                </button>
                                                <button 
                                                    onClick={() => verifyMutation.mutate(dev.id)}
                                                    disabled={verifyMutation.isPending}
                                                    className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-sm disabled:opacity-50"
                                                >
                                                    {verifyMutation.isPending ? '...' : 'Verificar'}
                                                </button>
                                            </div>
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

            <ModalDevolucion
                devolucion={devolucionSeleccionada}
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onSave={handleSaveFromModal}
            />
        </div>
    );
};
