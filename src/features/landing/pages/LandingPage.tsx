import { RoleCard } from "../components/RoleCard";
import { roles } from "../../../data/roles";

export const LandingPage = () => {
    return (
        <main className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-7">
            {roles.map((rol) => (
                <div key={rol.id} className="w-full sm:w-auto h-full flex justify-center">
                    <RoleCard
                        icono={rol.icono}
                        titulo={rol.titulo}
                        descripcion={rol.descripcion}
                        to={rol.ruta}
                    />
                </div>
            ))}
        </main>
    );
};