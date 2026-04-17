import { createBrowserRouter } from "react-router-dom"
import { LandingPage } from "../features/landing/pages/LandingPage"
import { MainLayout } from "../layout/MainLayout"
import { Coordinador } from "../features/landing/pages/Coordinador"
import { Recepcion } from "../features/landing/pages/Recepcion"
import { Calidad } from "../features/landing/pages/Calidad"


export const router = createBrowserRouter([
    {
        element: <MainLayout />, 
        children: [

            {
                path: "/",
                element: <LandingPage /> 
            },
            {
                path: "/coordinador",
                element: <Coordinador/>  
            },
            {
                path: "/recepcion",
                element: <Recepcion /> 
            },
            {
                path: "/calidad",
                element: <Calidad /> 
            },
        ]
    }
])


