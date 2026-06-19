import { Inputs } from "./components/forms/Inputs";
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { devolucionesAPI } from "../../services/api.index";
import { useState } from "react";
import { Toast } from "../../components/ui/Toast";

type FormData = {
    fecha: string;
    cliente: string;
    producto: string;
    codigo: string;
    lote: string;
    estado: string;
    cantidad: number;
    observaciones: string;
    imagenes: FileList | null;
};

export const DevolucionForm = () => {

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMensaje, setToastMensaje] = useState('');
    const [toastTipo, setToastTipo] = useState<'exito' | 'error'>('exito');

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        mode: 'onChange'
    });

    const mutation = useMutation({
        mutationFn: (nuevaDevolucion: FormData) => {
            return devolucionesAPI.create({
                ...nuevaDevolucion,
                etapa: 'recepcion'
            });
        },
        onSuccess: () => {
            console.log('✅ Devolución guardada');
            setToastMensaje('✅ Devolución registrada correctamente');
            setToastTipo('exito');
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
                reset();
            }, 3000);
        },
        onError: (error) => {
            console.error('❌ Error al guardar:', error);
            setToastMensaje('❌ Error al guardar la devolución');
            setToastTipo('error');
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
            }, 3000);
        }
    });

    const onSubmit = (data: FormData) => {
        console.log('Formulario enviado:', data);
        mutation.mutate(data);
    };

    return (
        <div className="max-w-6xl mx-auto p-2">
            <div className="bg-white rounded-2xl shadow-xl p-3 md:p-4">
                <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-2 text-center">
                    Ingreso de Devolución
                </h1>

                <form className="flex flex-col gap-1 w-full" onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                        {/* Fila 1: Fecha, Cliente, Producto */}
                        <div>
                            <Inputs
                                etiqueta="Fecha"
                                tipo="date"
                                id="fecha"
                                placeholder=""
                                className="flex flex-col gap-0 w-full"
                                register={register('fecha', {
                                    required: "La fecha es obligatoria"
                                })}
                                error={!!errors.fecha}
                            />
                            {errors.fecha && (
                                <p className="text-red-500 text-xs mt-0">
                                    {errors.fecha.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Inputs
                                etiqueta="Cliente"
                                tipo="text"
                                id="cliente"
                                placeholder="Colombina"
                                className="flex flex-col gap-0 w-full"
                                register={register('cliente', {
                                    required: "El cliente es obligatorio",
                                    minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                                    maxLength: { value: 50, message: 'Máximo 50 caracteres' }
                                })}
                                error={!!errors.cliente}
                            />
                            {errors.cliente && (
                                <p className="text-red-500 text-xs mt-0">
                                    {errors.cliente.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Inputs
                                etiqueta="Producto"
                                tipo="text"
                                id="producto"
                                placeholder="Acido Estearico"
                                className="flex flex-col gap-0 w-full"
                                register={register('producto', {
                                    required: "El nombre del producto es obligatorio",
                                    minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                                    maxLength: { value: 50, message: 'Máximo 50 caracteres' }
                                })}
                                error={!!errors.producto}
                            />
                            {errors.producto && (
                                <p className="text-red-500 text-xs mt-0">
                                    {errors.producto.message}
                                </p>
                            )}
                        </div>

                        {/* Fila 2: Código, Lote, Estado */}
                        <div>
                            <Inputs
                                etiqueta="Código"
                                tipo="text"
                                id="codigo"
                                placeholder="001.0000000"
                                className="flex flex-col gap-0 w-full"
                                register={register('codigo', {
                                    required: "El código es obligatorio",
                                    pattern: {
                                        value: /^\d{3}\.\d{7}$/,
                                        message: 'Formato: 001.0000000'
                                    }
                                })}
                                error={!!errors.codigo}
                            />
                            {errors.codigo && (
                                <p className="text-red-500 text-xs mt-0">
                                    {errors.codigo.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Inputs
                                etiqueta="Lote"
                                tipo="text"
                                id="lote"
                                placeholder="1010000000"
                                className="flex flex-col gap-0 w-full"
                                register={register('lote', {
                                    required: "El lote es obligatorio",
                                    minLength: { value: 11, message: 'Mínimo 11 caracteres' },
                                    maxLength: { value: 11, message: 'Máximo 11 caracteres' }
                                })}
                                error={!!errors.lote}
                            />
                            {errors.lote && (
                                <p className="text-red-500 text-xs mt-0">
                                    {errors.lote.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Inputs
                                etiqueta="Estado"
                                tipo="text"
                                id="estado"
                                placeholder="Buen estado"
                                className="flex flex-col gap-0 w-full"
                                register={register('estado', {
                                    required: "El estado es obligatorio"
                                })}
                                error={!!errors.estado}
                            />
                            {errors.estado && (
                                <p className="text-red-500 text-xs mt-0">
                                    {errors.estado.message}
                                </p>
                            )}
                        </div>

                        {/* Fila 3: Cantidad (1 col) + Imágenes (2 col) */}
                        <div>
                            <Inputs
                                etiqueta="Cantidad"
                                tipo="number"
                                id="cantidad"
                                placeholder="1"
                                className="flex flex-col gap-0 w-full"
                                register={register('cantidad', {
                                    required: 'La cantidad es obligatoria',
                                    min: { value: 1, message: 'Mínimo 1' },
                                    max: { value: 100, message: 'Máximo 100' },
                                    valueAsNumber: true
                                })}
                                error={!!errors.cantidad}
                            />
                            {errors.cantidad && (
                                <p className="text-red-500 text-xs mt-0">
                                    {errors.cantidad.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <div className="flex flex-col gap-0 w-full">
                                <label className="block text-gray-700 font-medium text-sm mb-0">
                                    Imágenes:
                                </label>
                                <div className="flex justify-center">
                                    <Inputs
                                        etiqueta=""
                                        tipo="file"
                                        id="imagenes"
                                        accept="image/*"
                                        multiple
                                        placeholder=""
                                        className="flex flex-col gap-0 w-full"
                                        register={register('imagenes')}
                                        error={!!errors.imagenes}
                                    />
                                </div>
                                {errors.imagenes && (
                                    <p className="text-red-500 text-xs mt-0 text-center">
                                        {errors.imagenes.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Fila 4: Observaciones (3 columnas) */}
                        <div className="md:col-span-3">
                            <Inputs
                                etiqueta="Observaciones"
                                tipo="textarea"
                                id="observaciones"
                                placeholder="Sellado, limpio, etc..."
                                className="flex flex-col gap-0 w-full"
                                register={register('observaciones', {
                                    maxLength: { value: 200, message: 'Máximo 200 caracteres' }
                                })}
                                error={!!errors.observaciones}
                            />
                            {errors.observaciones && (
                                <p className="text-red-500 text-xs mt-0">
                                    {errors.observaciones.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* BOTÓN ENVIAR */}
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full md:w-1/2 mx-auto mt-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-1.5 px-4 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        {mutation.isPending ? 'Guardando...' : 'Enviar'}
                    </button>
                </form>
            </div>

            <Toast
                mensaje={toastMensaje}
                tipo={toastTipo}
                visible={toastVisible}
                onClose={() => setToastVisible(false)}
            />
        </div>
    );
};