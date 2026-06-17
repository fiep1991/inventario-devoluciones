import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment } from 'react';

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
}

export const ModalDevolucion = ({ devolucion, isOpen, onClose }: Props) => {
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
                                Detalle de Devolución
                            </DialogTitle>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">Fecha</label>
                                    <p className="font-medium">{devolucion.fecha}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Cliente</label>
                                    <p className="font-medium">{devolucion.cliente}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Producto</label>
                                    <p className="font-medium">{devolucion.producto}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Código</label>
                                    <p className="font-medium">{devolucion.codigo}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Lote</label>
                                    <p className="font-medium">{devolucion.lote}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Estado</label>
                                    <p className="font-medium">{devolucion.estado}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Cantidad</label>
                                    <p className="font-medium">{devolucion.cantidad}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-sm text-gray-500">Observaciones</label>
                                    <p className="font-medium">{devolucion.observaciones || 'Sin observaciones'}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};