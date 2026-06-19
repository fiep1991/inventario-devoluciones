import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import fondoDesktop from "../assets/img/fondo.png";
import fondoTablet from "../assets/img/fondo-tablet.png";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500">
            {/* Fondo para tablet */}
            <div 
                className="fixed inset-0 -z-10 hidden md:block bg-cover bg-center bg-no-repeat"
                style={{ 
                    backgroundImage: `url(${fondoTablet})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    backgroundRepeat: "no-repeat"
                }}
            />
            
            {/* Fondo para desktop */}
            <div 
                className="fixed inset-0 -z-10 hidden lg:block bg-cover bg-center bg-no-repeat"
                style={{ 
                    backgroundImage: `url(${fondoDesktop})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    backgroundRepeat: "no-repeat"
                }}
            />

            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4 pt-16 md:pt-20">
                <div className="w-full max-w-7xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};