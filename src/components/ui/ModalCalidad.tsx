import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';

interface Devolucion {
    id: number;
    fecha: string;
    cliente: string;
    producto: string;
    codigo: string;
    lote: string;
    estado: string;
    cantidad: number;
    observaciones: string;
}

interface Props {
    devolucion: Devolucion | null;
    isOpen: boolean;
    onClose: () => void;
    onFinalizar: (id: number, disposicion: string, comentario?: string) => void;
}

export const ModalCalidad = ({ devolucion, isOpen, onClose, onFinalizar }: Props) => {
    const [disposicion, setDisposicion] = useState('');
    const [comentario, setComentario] = useState('');

    useEffect(() => {
        if (devolucion) {
            setDisposicion('');
            setComentario('');
        }
    }, [devolucion]);

    if (!devolucion) return null;

    const formatearFecha = (fechaISO: string) => {
        if (!fechaISO) return '';
        const [anio, mes, dia] = fechaISO.split('-');
        return `${dia}/${mes}/${anio}`;
    };

    const mostrarComentario = disposicion !== '';

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 focus:outline-none" onClose={onClose}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-xl font-bold text-gray-800 mb-4">
                                Inspección de Calidad
                            </DialogTitle>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Fecha */}
                                <div>
                                    <label className="text-sm text-gray-500">Fecha</label>
                                    <p className="font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        {formatearFecha(devolucion.fecha)}
                                    </p>
                                </div>

                                {/* Cliente */}
                                <div>
                                    <label className="text-sm text-gray-500">Cliente</label>
                                    <p className="font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        {devolucion.cliente}
                                    </p>
                                </div>

                                {/* Producto */}
                                <div>
                                    <label className="text-sm text-gray-500">Producto</label>
                                    <p className="font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        {devolucion.producto}
                                    </p>
                                </div>

                                {/* Código */}
                                <div>
                                    <label className="text-sm text-gray-500">Código</label>
                                    <p className="font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        {devolucion.codigo}
                                    </p>
                                </div>

                                {/* Lote */}
                                <div>
                                    <label className="text-sm text-gray-500">Lote</label>
                                    <p className="font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        {devolucion.lote}
                                    </p>
                                </div>

                                {/* Estado */}
                                <div>
                                    <label className="text-sm text-gray-500">Estado</label>
                                    <p className="font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        {devolucion.estado}
                                    </p>
                                </div>

                                {/* Cantidad */}
                                <div>
                                    <label className="text-sm text-gray-500">Cantidad</label>
                                    <p className="font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        {devolucion.cantidad}
                                    </p>
                                </div>

                                {/* Observaciones */}
                                <div className="col-span-2">
                                    <label className="text-sm text-gray-500">Observaciones</label>
                                    <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        <p className="font-medium">{devolucion.observaciones || 'Sin observaciones'}</p>
                                    </div>
                                </div>

                                {/* Disposición */}
                                <div className="col-span-2 mt-2">
                                    <label className="text-sm text-gray-700 font-medium block mb-1">
                                        Disposición Final *
                                    </label>
                                    <select
                                        value={disposicion}
                                        onChange={(e) => setDisposicion(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                    >
                                        <option value="">Seleccionar disposición...</option>
                                        <option value="venta">Reintegrar al inventario</option>
                                        <option value="analisis">Muestra para análisis</option>
                                        <option value="destruccion">Enviar a NO CONFORME</option>
                                    </select>
                                </div>

                                {/* Comentario (opcional) */}
                                {mostrarComentario && (
                                    <div className="col-span-2 mt-2">
                                        <label className="text-sm text-gray-700 font-medium block mb-1">
                                            Comentario <span className="text-gray-400 text-xs font-normal">(opcional)</span>
                                        </label>
                                        <textarea
                                            value={comentario}
                                            onChange={(e) => setComentario(e.target.value)}
                                            rows={3}
                                            placeholder="Agrega un comentario sobre la disposición..."
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-y"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        if (disposicion) {
                                            onFinalizar(devolucion.id, disposicion, comentario);
                                            onClose();
                                        }
                                    }}
                                    disabled={!disposicion}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};