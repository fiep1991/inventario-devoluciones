import { useNavigate } from "react-router-dom";

interface Props {
    icono: string;
    titulo: string;
    descripcion: string;
    to: string;
}

export const RoleCard = ({ icono, titulo, descripcion, to }: Props) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(to)}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-72 h-full flex flex-col items-center text-center p-6"
        >
            <div className="bg-purple-100 rounded-full p-4 mb-4 group-hover:bg-purple-200 transition-colors">
                <img src={icono} alt={titulo} className="w-16 h-16" />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">{titulo}</h2>

            <p className="text-gray-500 text-sm mb-6 flex-grow">{descripcion}</p>

            <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                Ingresar →
            </button>
        </div>
    );
};