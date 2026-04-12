import { createBrowserRouter } from "react-router-dom"
import { LandingPage } from "../features/landing/pages/LandingPage"
import { MainLayout } from "../layout/MainLayout"
import { Coordinador } from "../features/landing/pages/Coordinador"
import { Recepcion } from "../features/landing/pages/Recepcion"
import { Calidad } from "../features/landing/pages/Calidad"


export const router = createBrowserRouter([
    {
        element: <MainLayout />, // layout padre
        children: [

            {
                path: "/",
                element: <LandingPage /> // rutas 
            },
            {
                path: "/coordinador",
                element: <Coordinador/> // rutas 
            },
            {
                path: "/recepcion",
                element: <Recepcion /> // rutas 
            },
            {
                path: "/calidad",
                element: <Calidad /> // rutas 
            },
        ]
    }
])


