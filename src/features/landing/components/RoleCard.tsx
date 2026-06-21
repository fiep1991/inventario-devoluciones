import { useNavigate } from "react-router-dom";
import iconoRecepcion from '../components/assets/icons/icono-recepcion.png';
import iconoCoordinador from '../components/assets/icons/icono-coordinador.png';
import iconoCalidad from '../components/assets/icons/icono-calidad.png';

interface Props {
    titulo: string;
    descripcion: string;
    to: string;
}

export const RoleCard = ({ titulo, descripcion, to }: Props) => {
    const navigate = useNavigate();

    const getIcon = (title: string) => {
        switch (title) {
            case 'Recepción': return iconoRecepcion;
            case 'Coordinador Transporte': return iconoCoordinador;
            case 'Control Calidad': return iconoCalidad;
            default: return iconoRecepcion;
        }
    };

    return (
        <div 
            onClick={() => navigate(to)}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-l-4 hover:border-l-primary hover:shadow-xl cursor-pointer"
        >
            <div className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-50 group-hover:bg-primary/10 transition-colors">
                    <img 
                        src={getIcon(titulo)} 
                        alt={titulo}
                        className="h-20 w-20 object-contain"
                    />
                </div>
                <h3 className="text-xl font-bold text-secondary">{titulo}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                    {descripcion}
                </p>
            </div>
            
            <div className="mt-auto border-t border-neutral-50 p-6 bg-neutral-50/50">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 border border-neutral-200 shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    Ingresar {titulo}
                    <i className="ti ti-arrow-right text-lg"></i>
                </button>
            </div>
        </div>
    );
};