import { Outlet } from "react-router-dom"



export const MainLayout = () => {
    return (
        <div>
            <div className="
    min-h-screen flex items-center justify-center
    bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500
    md:bg-cover md:bg-center md:bg-[url('/src/assets/img/fondo-tablet.png')]
    lg:bg-[url('/src/assets/img/fondo.png')]
">
            

            <div className="flex-1 flex items-center justify-center">
                <Outlet />
            </div>
            </div>
        </div>
    )
}



