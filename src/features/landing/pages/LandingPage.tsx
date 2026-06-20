import { RoleCard } from "../components/RoleCard";
import { roles } from "../../../data/roles";

export const LandingPage = () => {
    // Note: These are example metrics for the demonstration of the Enterprise design.
    // In a real scenario, these would be fetched from an analytics endpoint.
    const stats = [
        { label: "Total Recepciones", value: "158", color: "text-neutral-800" },
        { label: "Pendientes Calidad", value: "12", color: "text-naranja" },
        { label: "Procesados Hoy", value: "24", color: "text-neutral-800" },
        { label: "Eficiencia Operativa", value: "94.2%", color: "text-emerald-500" },
    ];

    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                    Gestión de Inventario y Devoluciones
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-neutral-500">
                    Bienvenido al panel central. Seleccione su rol para comenzar el procesamiento de mercancía.
                </p>
            </div>

            {/* Role Cards Grid */}
            <main className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {roles.map((rol) => (
                    <RoleCard
                        key={rol.id}
                        icono={rol.icono}
                        titulo={rol.titulo}
                        descripcion={rol.descripcion}
                        to={rol.ruta}
                    />
                ))}
            </main>

            {/* Stats Row */}
            <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div key={index} className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs">
                        <p className="text-sm font-medium text-neutral-400">{stat.label}</p>
                        <p className={`mt-2 text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
