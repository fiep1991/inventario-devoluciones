import { Outlet } from "react-router-dom"



export const MainLayout = () => {
    return (
        <div>
            <div className="bg-cover bg-[url('/src/assets/img/fondo.png')] min-h-screen flex flex-col items-center justify-center">
            

            <div className="flex-1 flex items-center justify-center">
                <Outlet />
            </div>
            </div>
        </div>
    )
}



