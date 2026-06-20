import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
    const location = useLocation();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const links = [
        { to: '/', label: 'Dashboard' },
        { to: '/recepcion', label: 'Recepción' },
        { to: '/coordinador', label: 'Coordinador' },
        { to: '/calidad', label: 'Calidad' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 shadow-sm px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 relative">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-morado text-white">
                        <i className="ti ti-box text-xl"></i>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-neutral-800">
                        Logi<span className="text-morado">Flow</span>
                    </span>
                </div>

                {/* Menú desktop */}
                <div className="hidden md:flex h-full items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all ${
                                location.pathname === link.to
                                    ? 'border-morado text-neutral-900'
                                    : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Side / User Profile */}
                <div className="flex items-center gap-4">
                    <button className="relative rounded-full p-2 text-neutral-400 hover:bg-neutral-50 hover:text-morado transition-all">
                        <i className="ti ti-bell text-xl"></i>
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-naranja opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-naranja"></span>
                        </span>
                    </button>
                    
                    <div className="h-8 w-px bg-neutral-200 hidden sm:block"></div>
                    
                    <div className="hidden sm:flex items-center gap-3 cursor-pointer group">
                        <div className="text-right">
                            <p className="text-xs font-semibold text-neutral-800">Usuario LogiFlow</p>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">Operador</p>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-morado group-hover:border-morado transition-all">
                            <i className="ti ti-user text-lg"></i>
                        </div>
                    </div>

                    {/* Botón hamburguesa */}
                    <button
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        className="md:hidden text-neutral-500 hover:text-morado p-2"
                    >
                        <i className={`ti ti-${menuAbierto ? 'x' : 'menu-2'} text-2xl`}></i>
                    </button>
                </div>

                {/* Menú móvil desplegable */}
                {menuAbierto && (
                    <div className="absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-lg md:hidden py-4 px-4 flex flex-col gap-2">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMenuAbierto(false)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    location.pathname === link.to
                                        ? 'bg-morado/10 text-morado'
                                        : 'text-neutral-600 hover:bg-neutral-50'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};
