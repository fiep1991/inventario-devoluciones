import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
    etiqueta: string;
    tipo: string;
    id: string;
    placeholder: string;
    className?: string;
    register?: UseFormRegisterReturn;
    error?: boolean;
    accept?: string;
    multiple?: boolean;
}

export const Inputs = ({ etiqueta, tipo, id, placeholder, className, register, error, accept, multiple }: Props) => {
    const baseInputStyles = `w-full h-11 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 text-sm text-gray-700 outline-none focus:bg-white focus:border-morado focus:ring-4 focus:ring-morado/10 transition-all`;

    return (
        <div className={`space-y-1.5 ${className}`}>
            {etiqueta && (
                <label 
                    htmlFor={id} 
                    className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1"
                >
                    {etiqueta}
                </label>
            )}
            
            {tipo === 'textarea' ? (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    className={`${baseInputStyles} h-32 py-3 resize-none`}
                    {...register}
                />
            ) : tipo === 'file' ? (
                <div className="relative group">
                    <input
                        type="file"
                        id={id}
                        accept={accept}
                        multiple={multiple}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        {...register}
                    />
                    <div className="w-full h-24 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 bg-gray-50 group-hover:bg-white group-hover:border-morado transition-all">
                        <i className="ti ti-camera text-2xl text-gray-400 group-hover:text-morado"></i>
                        <span className="text-xs font-medium text-gray-500 group-hover:text-morado">
                            Click o arrastre para subir imágenes
                        </span>
                    </div>
                </div>
            ) : (
                <div className="relative group">
                    <input
                        type={tipo}
                        id={id}
                        placeholder={placeholder}
                        className={baseInputStyles}
                        {...register}
                    />
                    {tipo === 'date' && (
                        <i className="ti ti-calendar absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-morado"></i>
                    )}
                </div>
            )}
        </div>
    );
};
