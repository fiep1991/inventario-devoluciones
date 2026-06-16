import { PageTitle } from "../../../components/ui/PageTitle"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { devolucionesAPI } from "../../../services/api.index";
import { useState } from "react";

export const Coordinador = () => {

    const queryClient = useQueryClient();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedValues, setEditedValues] = useState<{ [key: string]: any }>({});
    const [errors, setErrors] = useState<{ [key: string]: { [field: string]: string | null } }>({});

    // VALIDACIONES
    const validateCodigo = (codigo: string) => {
        const regex = /^\d{3}\.\d{7}$/;
        return regex.test(codigo);
    };

    const validateLote = (lote: string) => {
        return lote.length === 11;
    };

    const validateCantidad = (cantidad: number) => {
        return cantidad >= 1 && cantidad <= 100;
    };

    const validateField = (field: string, value: any): string | null => {
        if (field === 'codigo') {
            if (!value) return 'El código es obligatorio';
            if (!validateCodigo(value)) return 'Formato: 001.0000000 (11 caracteres)';
        }
        if (field === 'lote') {
            if (!value) return 'El lote es obligatorio';
            if (!validateLote(value)) return 'El lote debe tener exactamente 11 caracteres';
        }
        if (field === 'cantidad') {
            if (!value && value !== 0) return 'La cantidad es obligatoria';
            if (!validateCantidad(Number(value))) return 'Mínimo 1, máximo 100';
        }
        if (field === 'cliente' && !value) return 'El cliente es obligatorio';
        if (field === 'estado' && !value) return 'El estado es obligatorio';
        if (field === 'fecha' && !value) return 'La fecha es obligatoria';
        if (field === 'producto' && !value) return 'El producto es obligatorio';
        return null;
    };

    // useQuery se encarga de obtener los datos de las devoluciones que están en la etapa de "recepcion"
    const { data, isPending, error } = useQuery({
        queryKey: ['devoluciones', 'recepcion'],
        queryFn: () => devolucionesAPI.getByetapa('recepcion')
    });

    const verifyMutation = useMutation({
        mutationFn: (id: string) => devolucionesAPI.update(id, { etapa: 'coordinador' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devoluciones', 'recepcion'] });
        },
    });

    const handleChange = (id: string, field: string, value: string | number) => {
        const errorMessage = validateField(field, value);

        setErrors((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: errorMessage,
            },
        }));

        setEditedValues((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleSave = (id: string) => {
        const erroresFila = errors[id];
        if (erroresFila && Object.keys(erroresFila).some(key => erroresFila[key])) {
            alert('Corrige los errores antes de guardar');
            return;
        }

        const cambios = editedValues[id];
        if (cambios && Object.keys(cambios).length > 0) {
            devolucionesAPI.update(id, cambios).then(() => {
                queryClient.invalidateQueries({ queryKey: ['devoluciones', 'recepcion'] });
                setEditingId(null);

                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[id];
                    return newErrors;
                });
                setEditedValues((prev) => {
                    const newValues = { ...prev };
                    delete newValues[id];
                    return newValues;
                });
            });
        } else {
            setEditingId(null);
        }
    };

    if (isPending) {
        return <div className="p-8 text-3xl"> Cargando las devoluciones... </div>
    }

    if (error) {
        return <div className="p-8 text-2xl text-red-600"> Error al cargar las Devoluciones</div>
    }

    const devoluciones = data?.data || [];

    return (
        <div className="bg-[#C4C4C4] rounded-2xl shadow-xl/30 p-8 w-auto min-h-auto">
            <PageTitle estilo="text-4xl font-bold text-center" estiloSubtitle="text-3xl py-5" title="Coordinador de Transporte" subtitle="Revisa y edita los datos de las devoluciones antes de verificarlas" />

            {devoluciones.length === 0 ? (
                <p>No hay devoluciones pendientes de verificación</p>
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
                            <th className="p-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                        {devoluciones.map((dev: any) => (
                            <tr key={dev.id} className="border-b hover:bg-gray-100">

                                {/* FECHA */}
                                <td className="p-2">
                                    {editingId === dev.id ? (
                                        <input
                                            type="date"
                                            value={editedValues[dev.id]?.fecha ?? dev.fecha}
                                            onChange={(e) => handleChange(dev.id, 'fecha', e.target.value)}
                                            className="border rounded px-2 py-1 w-32"
                                        />
                                    ) : (
                                        <span className="block px-2 py-1">{dev.fecha}</span>
                                    )}
                                </td>

                                {/* CLIENTE */}
                                <td className="p-2">
                                    {editingId === dev.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editedValues[dev.id]?.cliente ?? dev.cliente}
                                                onChange={(e) => handleChange(dev.id, 'cliente', e.target.value)}
                                                className={`border rounded px-2 py-1 w-40 ${errors[dev.id]?.cliente ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors[dev.id]?.cliente && (
                                                <p className="text-red-500 text-xs mt-1">{errors[dev.id].cliente}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="block px-2 py-1">{dev.cliente}</span>
                                    )}
                                </td>

                                {/* PRODUCTO */}
                                <td className="p-2">
                                    {editingId === dev.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editedValues[dev.id]?.producto ?? dev.producto}
                                                onChange={(e) => handleChange(dev.id, 'producto', e.target.value)}
                                                className={`border rounded px-2 py-1 w-40 ${errors[dev.id]?.producto ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors[dev.id]?.producto && (
                                                <p className="text-red-500 text-xs mt-1">{errors[dev.id].producto}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="block px-2 py-1">{dev.producto}</span>
                                    )}
                                </td>

                                {/* CÓDIGO */}
                                <td className="p-2">
                                    {editingId === dev.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editedValues[dev.id]?.codigo ?? dev.codigo}
                                                onChange={(e) => handleChange(dev.id, 'codigo', e.target.value)}
                                                className={`border rounded px-2 py-1 w-32 ${errors[dev.id]?.codigo ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors[dev.id]?.codigo && (
                                                <p className="text-red-500 text-xs mt-1">{errors[dev.id].codigo}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="block px-2 py-1">{dev.codigo}</span>
                                    )}
                                </td>

                                {/* LOTE */}
                                <td className="p-2">
                                    {editingId === dev.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editedValues[dev.id]?.lote ?? dev.lote}
                                                onChange={(e) => handleChange(dev.id, 'lote', e.target.value)}
                                                maxLength={11}
                                                className={`border rounded px-2 py-1 w-32 ${errors[dev.id]?.lote ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors[dev.id]?.lote && (
                                                <p className="text-red-500 text-xs mt-1">{errors[dev.id].lote}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="block px-2 py-1">{dev.lote}</span>
                                    )}
                                </td>

                                {/* ESTADO */}
                                <td className="p-2">
                                    {editingId === dev.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editedValues[dev.id]?.estado ?? dev.estado}
                                                onChange={(e) => handleChange(dev.id, 'estado', e.target.value)}
                                                className={`border rounded px-2 py-1 w-32 ${errors[dev.id]?.estado ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors[dev.id]?.estado && (
                                                <p className="text-red-500 text-xs mt-1">{errors[dev.id].estado}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="block px-2 py-1">{dev.estado}</span>
                                    )}
                                </td>

                                {/* CANTIDAD */}
                                <td className="p-2">
                                    {editingId === dev.id ? (
                                        <div>
                                            <input
                                                type="number"
                                                value={editedValues[dev.id]?.cantidad ?? dev.cantidad}
                                                onChange={(e) => handleChange(dev.id, 'cantidad', parseInt(e.target.value) || 0)}
                                                className={`border rounded px-2 py-1 w-20 ${errors[dev.id]?.cantidad ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors[dev.id]?.cantidad && (
                                                <p className="text-red-500 text-xs mt-1">{errors[dev.id].cantidad}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="block px-2 py-1">{dev.cantidad}</span>
                                    )}
                                </td>

                                {/* OBSERVACIONES */}
                                <td className="p-2">
                                    {editingId === dev.id ? (
                                        <textarea
                                            value={editedValues[dev.id]?.observaciones ?? dev.observaciones}
                                            onChange={(e) => handleChange(dev.id, 'observaciones', e.target.value)}
                                            rows={2}
                                            className="border rounded px-2 py-1 w-40 resize-y"
                                        />
                                    ) : (
                                        <span className="block px-2 py-1 truncate max-w-37.5">{dev.observaciones}</span>
                                    )}
                                </td>

                                {/* ACCIONES */}
                                <td className="p-2">
                                    {editingId === dev.id ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleSave(dev.id)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingId(null);
                                                    setEditedValues((prev) => {
                                                        const newValues = { ...prev };
                                                        delete newValues[dev.id];
                                                        return newValues;
                                                    });
                                                    setErrors((prev) => {
                                                        const newErrors = { ...prev };
                                                        delete newErrors[dev.id];
                                                        return newErrors;
                                                    });
                                                }}
                                                className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingId(dev.id)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => verifyMutation.mutate(dev.id)}
                                                disabled={verifyMutation.isPending}
                                                className="bg-green-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                                            >
                                                {verifyMutation.isPending ? 'Verificando...' : 'Verificar'}
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}