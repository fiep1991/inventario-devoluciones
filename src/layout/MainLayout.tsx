import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";

export const MainLayout = () => {
    return (
        <div 
            className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
            style={{ 
                backgroundImage: "url('/img/fondo.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4 pt-12 md:pt-16">
                <div className="w-full max-w-7xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};