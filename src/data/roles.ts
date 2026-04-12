import iconcoor from "../features/landing/components/assets/icons/icono-coordinador.png";
import iconcali from "../features/landing/components/assets/icons/icono-calidad.png";
import iconrece from "../features/landing/components/assets/icons/icono-recepcion.png";

export const roles = [
    {
        id: 1,
        icono: iconcoor,
        titulo: "Coordinador Transporte",
        descripcion: "Reportes de devolución que van a ser entregadas.",
        ruta: "coordinador"
    },
    {
        id: 2,
        icono: iconrece,
        titulo: "Recepción",
        descripcion: "Reportes de ingresos de Devoluciones.",
        ruta: "recepcion"
    },
    {
        id: 3,
        icono: iconcali,
        titulo: "Control Calidad",
        descripcion: "Disposición de las devoluciones.",
        ruta: "calidad"
    },
];
