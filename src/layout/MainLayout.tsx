import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Fondo */}
            <div className="fixed inset-0 -z-10">
                <div className="
                    h-full w-full
                    bg-linear-to-br from-purple-900 via-purple-700 to-purple-500
                    md:bg-cover md:bg-center md:bg-[url('/src/assets/img/fondo-tablet.png')]
                    lg:bg-[url('/src/assets/img/fondo.png')]
                " />
            </div>

            <Navbar />

            
            <div className="flex-1 flex items-center justify-center p-4 pt-16 md:pt-20">
                <div className="w-full max-w-7xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}