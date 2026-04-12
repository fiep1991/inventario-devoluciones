import { RoleCard } from "../components/RoleCard"
import { roles } from "../../../data/roles"





export const LandingPage = () => {
    return (
        <main className="flex flex-row gap-7">
            {roles.map((rol) => (
                <div key={rol.id} className="w-full flex justify-center">
                    <RoleCard
                        icono={rol.icono}
                        titulo={rol.titulo}
                        descripcion={rol.descripcion}
                        to={rol.ruta}
                    />
                </div>
            ))}
        </main>
    )
}