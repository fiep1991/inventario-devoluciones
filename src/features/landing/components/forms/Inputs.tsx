import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
    etiqueta: string;
    tipo: string;
    id: string;
    placeholder?: string;
    className?: string;
    accept?: string;
    multiple?: boolean;
    register: UseFormRegisterReturn;
    error?: boolean;
}

export const Inputs = ({ etiqueta, tipo, id, placeholder, className, accept, multiple, register, error }: Props) => {
    return (
        <div className={`${className || ''}`}>
            <label htmlFor={id} className="block text-gray-700 font-medium text-sm mb-1">
                {etiqueta}:
            </label>
            
            {tipo === 'textarea' ? (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm`}
                    rows={3}
                    {...register}
                />
            ) : tipo === 'file' ? (
                <input
                    type="file"
                    id={id}
                    accept={accept}
                    multiple={multiple}
                    className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100`}
                    {...register}
                />
            ) : (
                <input
                    type={tipo}
                    id={id}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm`}
                    {...register}
                />
            )}
        </div>
    );
};