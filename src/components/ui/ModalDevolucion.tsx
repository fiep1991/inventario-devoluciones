import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';

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
    onSave: (id: number, data: Partial<Devolucion>) => void;
}

export const ModalDevolucion = ({ devolucion, isOpen, onClose, onSave }: Props) => {
    const [editedData, setEditedData] = useState<Partial<Devolucion>>({});

    useEffect(() => {
        if (devolucion) {
            setEditedData(devolucion);
        }
    }, [devolucion]);

    const handleChange = (field: keyof Devolucion, value: string | number) => {
        setEditedData((prev) => ({ ...prev, [field]: value }));
    };

    if (!devolucion) return null;

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
                                Editar Devolución
                            </DialogTitle>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Fecha */}
                                <div>
                                    <label className="text-sm text-gray-500">Fecha</label>
                                    <input
                                        type="date"
                                        value={editedData.fecha || ''}
                                        onChange={(e) => handleChange('fecha', e.target.value)}
                                        className="w-full border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {/* Cliente */}
                                <div>
                                    <label className="text-sm text-gray-500">Cliente</label>
                                    <input
                                        type="text"
                                        value={editedData.cliente || ''}
                                        onChange={(e) => handleChange('cliente', e.target.value)}
                                        className="w-full border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {/* Producto */}
                                <div>
                                    <label className="text-sm text-gray-500">Producto</label>
                                    <input
                                        type="text"
                                        value={editedData.producto || ''}
                                        onChange={(e) => handleChange('producto', e.target.value)}
                                        className="w-full border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {/* Código */}
                                <div>
                                    <label className="text-sm text-gray-500">Código</label>
                                    <input
                                        type="text"
                                        value={editedData.codigo || ''}
                                        onChange={(e) => handleChange('codigo', e.target.value)}
                                        className="w-full border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {/* Lote */}
                                <div>
                                    <label className="text-sm text-gray-500">Lote</label>
                                    <input
                                        type="text"
                                        value={editedData.lote || ''}
                                        onChange={(e) => handleChange('lote', e.target.value)}
                                        className="w-full border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {/* Estado */}
                                <div>
                                    <label className="text-sm text-gray-500">Estado</label>
                                    <input
                                        type="text"
                                        value={editedData.estado || ''}
                                        onChange={(e) => handleChange('estado', e.target.value)}
                                        className="w-full border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {/* Cantidad */}
                                <div>
                                    <label className="text-sm text-gray-500">Cantidad</label>
                                    <input
                                        type="number"
                                        value={editedData.cantidad || 0}
                                        onChange={(e) => handleChange('cantidad', parseInt(e.target.value) || 0)}
                                        className="w-full border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {/* Observaciones (ocupa 2 columnas) */}
                                <div className="col-span-2">
                                    <label className="text-sm text-gray-500">Observaciones</label>
                                    <textarea
                                        value={editedData.observaciones || ''}
                                        onChange={(e) => handleChange('observaciones', e.target.value)}
                                        rows={3}
                                        className="w-full border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
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
                                        onSave(devolucion.id, editedData);
                                        onClose();
                                    }}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
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