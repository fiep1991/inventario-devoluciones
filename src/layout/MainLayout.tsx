import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Fondo fijo */}
            <div 
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: "url('/src/assets/img/fondo.png')",
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