import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500">
            {/* Fondo como imagen solo en tablet y desktop */}
            <div 
                className="fixed inset-0 -z-10 hidden md:block"
                style={{
                    backgroundImage: "url('/src/assets/img/fondo-tablet.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "scroll"
                }}
            />
            <div 
                className="fixed inset-0 -z-10 hidden lg:block"
                style={{
                    backgroundImage: "url('/src/assets/img/fondo.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "scroll"
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