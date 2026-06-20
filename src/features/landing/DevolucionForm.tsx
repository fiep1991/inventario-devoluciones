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
    const [step, setStep] = useState(1);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMensaje, setToastMensaje] = useState('');
    const [toastTipo, setToastTipo] = useState<'exito' | 'error'>('exito');

    const { register, handleSubmit, formState: { errors, isValid }, reset, trigger } = useForm<FormData>({
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
            setToastMensaje('✅ Devolución registrada correctamente');
            setToastTipo('exito');
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
                reset();
                setStep(1);
            }, 3000);
        },
        onError: () => {
            setToastMensaje('❌ Error al guardar la devolución');
            setToastTipo('error');
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
            }, 3000);
        }
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    const nextStep = async () => {
        let fieldsToValidate: (keyof FormData)[] = [];
        if (step === 1) fieldsToValidate = ['fecha', 'cliente', 'producto'];
        if (step === 2) fieldsToValidate = ['codigo', 'lote', 'cantidad', 'estado'];

        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) {
            setStep(prev => prev + 1);
        }
    };

    const prevStep = () => setStep(prev => prev - 1);

    const steps = [
        { id: 1, title: "Datos Generales", desc: "Cliente y producto base." },
        { id: 2, title: "Detalles Técnicos", desc: "Código, lote y estado." },
        { id: 3, title: "Documentación", desc: "Fotos y observaciones." },
    ];

    return (
        <div className="relative">
            {/* Header Section */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">Registro de Devolución</h1>
                    <p className="text-neutral-500 mt-1">Siga los pasos para completar el registro.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        type="button"
                        onClick={() => { reset(); setStep(1); }}
                        className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    {step === 3 && (
                        <button 
                            onClick={handleSubmit(onSubmit)}
                            disabled={mutation.isPending || !isValid}
                            className="px-6 py-2 text-sm font-medium text-white bg-morado rounded-lg hover:bg-morado/90 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {mutation.isPending ? 'Guardando...' : 'Guardar Registro'}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Stepper Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="space-y-1">
                        {steps.map((s, idx) => (
                            <div key={s.id}>
                                <div className={`flex items-start gap-4 p-4 rounded-xl transition-all ${step === s.id ? 'bg-white border border-neutral-200 shadow-sm' : 'opacity-40'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${step >= s.id ? 'bg-morado text-white' : 'bg-white border-2 border-neutral-300 text-neutral-400'}`}>
                                        {step > s.id ? <i className="ti ti-check"></i> : s.id}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold ${step === s.id ? 'text-neutral-900' : 'text-neutral-500'}`}>{s.title}</p>
                                        <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className={`ml-8 w-0.5 h-6 ${step > s.id ? 'bg-morado' : 'bg-neutral-200'}`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Form Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 min-h-[400px] flex flex-col">
                        <form className="space-y-8 flex-1" onSubmit={handleSubmit(onSubmit)}>
                            
                            {/* Step 1: General Info */}
                            {step === 1 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
                                        <i className="ti ti-info-circle text-morado text-xl"></i>
                                        <h2 className="text-lg font-bold text-neutral-800">1. Datos de la Devolución</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Inputs
                                                etiqueta="Fecha de Ingreso"
                                                tipo="date"
                                                id="fecha"
                                                placeholder=""
                                                register={register('fecha', { required: "La fecha es obligatoria" })}
                                                error={!!errors.fecha}
                                            />
                                            {errors.fecha && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.fecha.message}</p>}
                                        </div>

                                        <div>
                                            <Inputs
                                                etiqueta="Cliente / Proveedor"
                                                tipo="text"
                                                id="cliente"
                                                placeholder="Ej. Colombina S.A."
                                                register={register('cliente', { required: "El cliente es obligatorio" })}
                                                error={!!errors.cliente}
                                            />
                                            {errors.cliente && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.cliente.message}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <Inputs
                                                etiqueta="Producto"
                                                tipo="text"
                                                id="producto"
                                                placeholder="Nombre completo del producto"
                                                register={register('producto', { required: "El nombre del producto es obligatorio" })}
                                                error={!!errors.producto}
                                            />
                                            {errors.producto && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.producto.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Technical Details */}
                            {step === 2 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
                                        <i className="ti ti-settings text-morado text-xl"></i>
                                        <h2 className="text-lg font-bold text-neutral-800">2. Detalles Técnicos</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <Inputs
                                                etiqueta="Código SAP"
                                                tipo="text"
                                                id="codigo"
                                                placeholder="001.0000000"
                                                register={register('codigo', { 
                                                    required: "El código es obligatorio",
                                                    pattern: { value: /^\d{3}\.\d{7}$/, message: 'Formato: 001.0000000' }
                                                })}
                                                error={!!errors.codigo}
                                            />
                                            {errors.codigo && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.codigo.message}</p>}
                                        </div>

                                        <div>
                                            <Inputs
                                                etiqueta="Lote"
                                                tipo="text"
                                                id="lote"
                                                placeholder="1010000000"
                                                register={register('lote', { required: "El lote es obligatorio" })}
                                                error={!!errors.lote}
                                            />
                                            {errors.lote && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.lote.message}</p>}
                                        </div>

                                        <div>
                                            <Inputs
                                                etiqueta="Cantidad"
                                                tipo="number"
                                                id="cantidad"
                                                placeholder="0"
                                                register={register('cantidad', { required: 'La cantidad es obligatoria', valueAsNumber: true })}
                                                error={!!errors.cantidad}
                                            />
                                            {errors.cantidad && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.cantidad.message}</p>}
                                        </div>
                                        
                                        <div className="md:col-span-3">
                                            <Inputs
                                                etiqueta="Estado Físico"
                                                tipo="text"
                                                id="estado"
                                                placeholder="Ej. Buen estado, empaque dañado"
                                                register={register('estado', { required: "El estado es obligatorio" })}
                                                error={!!errors.estado}
                                            />
                                            {errors.estado && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.estado.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Documentation */}
                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
                                        <i className="ti ti-camera text-morado text-xl"></i>
                                        <h2 className="text-lg font-bold text-neutral-800">3. Documentación</h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <Inputs
                                            etiqueta="Evidencia Fotográfica"
                                            tipo="file"
                                            id="imagenes"
                                            accept="image/*"
                                            multiple
                                            placeholder=""
                                            register={register('imagenes')}
                                        />
                                        
                                        <Inputs
                                            etiqueta="Observaciones Adicionales"
                                            tipo="textarea"
                                            id="observaciones"
                                            placeholder="Detalles sobre el sello, limpieza o anomalías detectadas..."
                                            register={register('observaciones')}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Form Navigation */}
                            <div className="pt-8 mt-auto flex justify-between gap-3">
                                {step > 1 ? (
                                    <button 
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2.5 text-sm font-semibold text-neutral-600 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-all flex items-center gap-2"
                                    >
                                        <i className="ti ti-chevron-left"></i>
                                        Anterior
                                    </button>
                                ) : <div />}

                                {step < 3 ? (
                                    <button 
                                        type="button"
                                        onClick={nextStep}
                                        className="px-6 py-2.5 text-sm font-semibold text-white bg-morado rounded-lg hover:bg-morado/90 transition-all flex items-center gap-2 shadow-sm"
                                    >
                                        Siguiente paso
                                        <i className="ti ti-chevron-right"></i>
                                    </button>
                                ) : (
                                    <button 
                                        type="submit"
                                        disabled={mutation.isPending}
                                        className="px-8 py-3 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
                                    >
                                        {mutation.isPending ? 'Guardando...' : 'Finalizar Registro'}
                                        <i className="ti ti-circle-check"></i>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
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
