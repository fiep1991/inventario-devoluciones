import type { UseFormRegisterReturn } from 'react-hook-form';


interface Props {
    etiqueta: string,
    tipo: string,
    id: string,
    placeholder?: string,
    className?:string,
    accept?: string,  
    multiple?: boolean,
    register: UseFormRegisterReturn; 
    error?: boolean,

}

export const Inputs = ({etiqueta, tipo, id, placeholder, className="",accept, multiple, register, error}:Props) => {

    const borderClass = error ? 'border-red-700' : 'border-morado';

    return (
        <div className={`${className}`}>
            <label htmlFor={id} className="w-24 inline-block text-right text-sm font-bold text-gris pr-2 font">
                {etiqueta}:
            </label>
            {tipo === 'textarea' ? (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    className={`${borderClass} rounded-xl px-4 bg-amber-50 flex-1 min-h-25 py-2 focus:border-naranja outline-none`}
                    {...register}
                />
            ) : (
                <input
                    type={tipo}
                    id={id}
                    placeholder={placeholder}
                    accept={accept}
                    multiple={multiple}
                    className={`${borderClass} border rounded-xl px-4 bg-amber-50 flex-1 min-h-10 py-2 focus:border-naranja outline-none`}
                    {...register}
                />
            )}
        </div>
    )
}