import { useNavigate } from "react-router-dom";

interface Props {
    icono: string;
    titulo: string;
    descripcion: string;
    to: string;
}

export const RoleCard = ({ icono, titulo, descripcion, to }: Props) => {
    const navigate = useNavigate();

    // Map existing image icons to Tabler Icons names for the Enterprise look
    const getIcon = (title: string) => {
        switch (title.toLowerCase()) {
            case 'recepción': return 'ti-truck-loading';
            case 'coordinador': return 'ti-truck-delivery';
            case 'control calidad': return 'ti-shield-check';
            default: return 'ti-box';
        }
    };

    return (
        <div 
            onClick={() => navigate(to)}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-l-4 hover:border-l-morado hover:shadow-xl cursor-pointer"
        >
            <div className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-50 text-morado group-hover:bg-morado/10 transition-colors">
                    <i className={`ti ${getIcon(titulo)} text-3xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-neutral-900">{titulo}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                    {descripcion}
                </p>
            </div>
            
            <div className="mt-auto border-t border-neutral-50 p-6 bg-neutral-50/50">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 border border-neutral-200 shadow-sm group-hover:bg-morado group-hover:text-white group-hover:border-morado transition-all">
                    Ingresar {titulo}
                    <i className="ti ti-arrow-right text-lg"></i>
                </button>
            </div>
        </div>
    );
};
