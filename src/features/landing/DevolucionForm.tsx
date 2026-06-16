import { Inputs } from "./components/forms/Inputs";
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { devolucionesAPI } from "../../services/api.index";
import { useState } from "react";


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

    const [mensajeExito, setMensajeExito] = useState<string | null>(null);

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
            setMensajeExito('✅ Devolución registrada correctamente');
            reset();
            setTimeout(() => setMensajeExito(null), 3000);
        },
        onError: (error) => {
            console.error('❌ Error al guardar:', error);
            setMensajeExito('❌ Error al guardar la devolución');
            setTimeout(() => setMensajeExito(null), 3000);
        }
    });

    const onSubmit = (data: FormData) => {
        console.log('Formulario enviado:', data);
        mutation.mutate(data);
    };

    return (
        <div className="bg-[#C4C4C4] rounded-2xl shadow-xl/30 p-8 w-auto min-h-auto">
            <h1 className="p-5 text-4xl font-bold text-center text-gris mb-4">Ingreso de Devolución</h1>

            {mensajeExito && (
                <div className={`p-3 rounded-lg mb-4 text-center ${mensajeExito.includes('Error')
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-green-100 text-green-700 border border-green-300'
                    }`}>
                    {mensajeExito}
                </div>
            )}

            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>

                {/* FECHA */}
                <div>
                    <Inputs
                        etiqueta="Fecha"
                        tipo="date"
                        id="fecha"
                        placeholder=""
                        className="flex items-center gap-2 w-full"
                        register={register('fecha', {
                            required: "La fecha es obligatoria"
                        })}
                        error={!!errors.fecha}
                    />
                    <div className="h-6 mt-1">
                        {errors.fecha && (
                            <p className="text-red-500 text-sm ml-28">
                                {errors.fecha.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* CLIENTE */}
                <div>
                    <Inputs
                        etiqueta="Cliente"
                        tipo="text"
                        id="cliente"
                        placeholder="Colombina"
                        className="flex items-center gap-2 w-full"
                        register={register('cliente', {
                            required: "El cliente es obligatorio",
                            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                            maxLength: { value: 50, message: 'Máximo 50 caracteres' }
                        })}
                        error={!!errors.cliente}
                    />
                    <div className="h-6 mt-1">
                        {errors.cliente && (
                            <p className="text-red-500 text-sm ml-28">
                                {errors.cliente.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* PRODUCTO */}
                <div>
                    <Inputs
                        etiqueta="Producto"
                        tipo="text"
                        id="producto"
                        placeholder="Acido Estearico"
                        className="flex items-center gap-2 w-full"
                        register={register('producto', {
                            required: "El nombre del producto es obligatorio",
                            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                            maxLength: { value: 50, message: 'Máximo 50 caracteres' }
                        })}
                        error={!!errors.producto}
                    />
                    <div className="h-6 mt-1">
                        {errors.producto && (
                            <p className="text-red-500 text-sm ml-28">
                                {errors.producto.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* CÓDIGO Y LOTE */}
                <div className="flex gap-3 w-full">
                    {/* Código */}
                    <div className="w-1/2">
                        <Inputs
                            etiqueta="Código"
                            tipo="text"
                            id="codigo"
                            placeholder="001.0000000"
                            className="flex items-center gap-2 w-full"
                            register={register('codigo', {
                                required: "El código es obligatorio",
                                pattern: {
                                    value: /^\d{3}\.\d{7}$/,
                                    message: 'Formato: 001.0000000'
                                }
                            })}
                            error={!!errors.codigo}
                        />
                        <div className="h-6 mt-1">
                            {errors.codigo && (
                                <p className="text-red-500 text-sm ml-28">
                                    {errors.codigo.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Lote */}
                    <div className="w-1/2">
                        <Inputs
                            etiqueta="Lote"
                            tipo="text"
                            id="lote"
                            placeholder="1010000000"
                            className="flex items-center gap-2 w-full"
                            register={register('lote', {
                                required: "El lote es obligatorio",
                                minLength: { value: 11, message: 'Mínimo 11 caracteres' },
                                maxLength: { value: 11, message: 'Máximo 11 caracteres' }
                            })}
                            error={!!errors.lote}
                        />
                        <div className="h-6 mt-1">
                            {errors.lote && (
                                <p className="text-red-500 text-sm ml-28">
                                    {errors.lote.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ESTADO Y CANTIDAD */}
                <div className="flex gap-3 w-full">
                    {/* Estado */}
                    <div className="w-1/2">
                        <Inputs
                            etiqueta="Estado"
                            tipo="text"
                            id="estado"
                            placeholder="Buen estado"
                            className="flex items-center gap-2 w-full"
                            register={register('estado', {
                                required: "El estado es obligatorio"
                            })}
                            error={!!errors.estado}
                        />
                        <div className="h-6 mt-1">
                            {errors.estado && (
                                <p className="text-red-500 text-sm ml-28">
                                    {errors.estado.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Cantidad */}
                    <div className="w-1/2">
                        <Inputs
                            etiqueta="Cantidad"
                            tipo="number"
                            id="cantidad"
                            placeholder="1"
                            className="flex items-center gap-2 w-full"
                            register={register('cantidad', {
                                required: 'La cantidad es obligatoria',
                                min: { value: 1, message: 'Mínimo 1' },
                                max: { value: 100, message: 'Máximo 100' },
                                valueAsNumber: true
                            })}
                            error={!!errors.cantidad}
                        />
                        <div className="h-6 mt-1">
                            {errors.cantidad && (
                                <p className="text-red-500 text-sm ml-28">
                                    {errors.cantidad.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* OBSERVACIONES */}
                <div>
                    <Inputs
                        etiqueta="Observaciones"
                        tipo="textarea"
                        id="observaciones"
                        placeholder="Sellado, limpio, etc..."
                        className="flex items-start gap-2 w-full"
                        register={register('observaciones', {
                            maxLength: { value: 200, message: 'Máximo 200 caracteres' }
                        })}
                        error={!!errors.observaciones}
                    />
                    <div className="h-6 mt-1">
                        {errors.observaciones && (
                            <p className="text-red-500 text-sm ml-28">
                                {errors.observaciones.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* IMÁGENES */}
                <div>
                    <Inputs
                        etiqueta="Imágenes"
                        tipo="file"
                        id="imagenes"
                        accept="image/*"
                        multiple
                        placeholder=""
                        className="flex items-start gap-2 w-full mt-6 pt-4 border-t border-gray-400/30"
                        register={register('imagenes')}
                        error={!!errors.imagenes}
                    />
                    <div className="h-6 mt-1">
                        {errors.imagenes && (
                            <p className="text-red-500 text-sm ml-28">
                                {errors.imagenes.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* BOTÓN ENVIAR */}
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-1/2 mx-auto block bg-linear-to-r from-morado to-lila text-white font-bold py-4 text-lg uppercase tracking-wider rounded-2xl pt-2.5 hover:from-naranja cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {mutation.isPending ? 'Guardando...' : 'Enviar'}
                </button>
            </form>
        </div>
    );
};