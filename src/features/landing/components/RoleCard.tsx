import { useNavigate } from "react-router-dom";
import { Boton } from "../../../components/ui/Button";



interface Props{
    icono: string;
    titulo: string;
    descripcion: string;
    to: string;
}

export const RoleCard = ({icono, titulo, descripcion,to}: Props) => {

    const navigate = useNavigate();

    return (
        <div className="bg-[#C4C4C4] rounded-2xl shadow-xl/30 p-8 w-87 h-137.5 grid grid-rows-[auto_auto_1fr_auto] gap-2  ">

            <div className="flex justify-center items-center pb-2.5 ">
                <img src={icono} alt={titulo} className="size-45 "/>
            </div>

            <div className="text-center pb-2.5">
                <h1 className="font-bold text-2xl">{titulo}</h1>
            </div>

            <div className="flex flex-col justify-between text-center font-bold text-gray-700 ">
                <p>{descripcion}</p>
            </div>

            <div> 
                <Boton texto="Ingresar" size="full" onClick={()=> navigate(to)} />
                
            </div>
            
        </div>
    )
}


