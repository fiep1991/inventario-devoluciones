import iconcoor from "../features/landing/components/assets/icons/icono-coordinador.png";
import iconcali from "../features/landing/components/assets/icons/icono-calidad.png";
import iconrece from "../features/landing/components/assets/icons/icono-recepcion.png";

export const roles = [
    {
        id: 1,
        icono: iconrece,
        titulo: "Recepción",
        descripcion: "Reporte de ingresos de Devolución.",
        ruta: "/recepcion"
    },
    {
        id: 2,
        icono: iconcoor,
        titulo: "Coordinador Transporte",
        descripcion: "Reportes de devolución pendientes.",
        ruta: "/coordinador"
    },
    {
        id: 3,
        icono: iconcali,
        titulo: "Control Calidad",
        descripcion: "Disposición de calidad devoluciones.",
        ruta: "/calidad"
    },
];