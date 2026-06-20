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
    const [pasosCompletados, setPasosCompletados] = useState({ 1: false, 2: false });
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
                setPasosCompletados({ 1: false, 2: false });
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
            setPasosCompletados(prev => ({ ...prev, [step]: true }));
            setStep(prev => prev + 1);
        }
    };

    const prevStep = () => setStep(prev => prev - 1);

    const isFormValid = pasosCompletados[1] && pasosCompletados[2] && isValid;

    const steps = [
        { id: 1, title: "Datos Generales", desc: "Cliente y producto base." },
        { id: 2, title: "Detalles Técnicos", desc: "Código, lote y estado." },
        { id: 3, title: "Documentación", desc: "Fotos y observaciones." },
    ];

    return (
        <div className="max-w-6xl mx-auto p-2">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
                {/* Header Section */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-secondary">Ingreso de Devolución</h1>
                        <p className="text-gray-500 text-sm mt-1">Complete todos los pasos para registrar la devolución.</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            type="button"
                            onClick={() => { reset(); setStep(1); setPasosCompletados({ 1: false, 2: false }); }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        {step === 3 && (
                            <button 
                                type="button"
                                onClick={handleSubmit(onSubmit)}
                                disabled={mutation.isPending || !isFormValid}
                                className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {mutation.isPending ? 'Guardando...' : 'Guardar Registro'}
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Stepper Sidebar */}
                    <aside className="w-full md:w-56 shrink-0">
                        <div className="space-y-1">
                            {steps.map((s, idx) => (
                                <div key={s.id}>
                                    <div className={`flex items-start gap-3 p-3 rounded-xl transition-all ${step === s.id ? 'bg-primary/5 border border-primary/20 shadow-sm' : 'opacity-40'}`}>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${step >= s.id ? 'bg-primary text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                                            {pasosCompletados[s.id as keyof typeof pasosCompletados] ? '✓' : s.id}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${step === s.id ? 'text-secondary' : 'text-neutral-500'}`}>{s.title}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                                        </div>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div className={`ml-4 w-0.5 h-5 ${pasosCompletados[s.id as keyof typeof pasosCompletados] ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Form Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6 min-h-100 flex flex-col">
                            <form className="space-y-4 flex-1" onSubmit={(e) => e.preventDefault()}>
                                
                                {/* Step 1: General Info */}
                                {step === 1 && (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                            <h2 className="text-base font-bold text-secondary">1. Datos de la Devolución</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <Inputs
                                                    etiqueta="Fecha"
                                                    tipo="date"
                                                    id="fecha"
                                                    placeholder=""
                                                    className="flex flex-col gap-0 w-full"
                                                    register={register('fecha', { required: "La fecha es obligatoria" })}
                                                    error={!!errors.fecha}
                                                />
                                                {errors.fecha && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.fecha.message}</p>}
                                            </div>

                                            <div>
                                                <Inputs
                                                    etiqueta="Cliente"
                                                    tipo="text"
                                                    id="cliente"
                                                    placeholder="Ej. Colombina S.A."
                                                    className="flex flex-col gap-0 w-full"
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
                                                    className="flex flex-col gap-0 w-full"
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
                                    <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                            <h2 className="text-base font-bold text-secondary">2. Detalles Técnicos</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div>
                                                <Inputs
                                                    etiqueta="Código SAP"
                                                    tipo="text"
                                                    id="codigo"
                                                    placeholder="001.0000000"
                                                    className="flex flex-col gap-0 w-full"
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
                                                    className="flex flex-col gap-0 w-full"
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
                                                    className="flex flex-col gap-0 w-full"
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
                                                    className="flex flex-col gap-0 w-full"
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
                                    <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                            <h2 className="text-base font-bold text-secondary">3. Documentación</h2>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            <Inputs
                                                etiqueta="Evidencia Fotográfica"
                                                tipo="file"
                                                id="imagenes"
                                                accept="image/*"
                                                multiple
                                                placeholder=""
                                                className="flex flex-col gap-0 w-full"
                                                register={register('imagenes')}
                                            />
                                            
                                            <Inputs
                                                etiqueta="Observaciones"
                                                tipo="textarea"
                                                id="observaciones"
                                                placeholder="Detalles sobre el sello, limpieza..."
                                                className="flex flex-col gap-0 w-full"
                                                register={register('observaciones')}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Form Navigation */}
                                <div className="pt-4 mt-auto flex justify-between gap-3">
                                    {step > 1 ? (
                                        <button 
                                            type="button"
                                            onClick={prevStep}
                                            className="px-6 py-2 text-sm font-semibold text-neutral-600 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-all"
                                        >
                                            ← Anterior
                                        </button>
                                    ) : <div />}

                                    {step < 3 ? (
                                        <button 
                                            type="button"
                                            onClick={nextStep}
                                            className="px-7 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all"
                                        >
                                            Siguiente →
                                        </button>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={mutation.isPending || !isFormValid}
                                            className="px-7 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {mutation.isPending ? 'Guardando...' : 'Finalizar Registro'}
                                            ✓
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
        </div>
    );
};
