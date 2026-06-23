import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
    const location = useLocation();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const links = [
        { to: '/', label: 'Menú principal' },
        { to: '/recepcion', label: 'Recepción' },
        { to: '/coordinador', label: 'Coordinador' },
        { to: '/calidad', label: 'Calidad' },
        { to: '/finalizadas', label: 'Finalizadas' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-neutral-200 shadow-sm px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 relative">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <img 
                        src="/img/clq_logo_header_blanconeg.png" 
                        alt="Colorquímica" 
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* Menú desktop */}
                <div className="hidden md:flex h-full items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all ${
                                location.pathname === link.to
                                    ? 'border-primary text-white'
                                    : 'border-transparent text-neutral-500 hover:border-white hover:text-secondary'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Side / User Profile */}
                <div className="flex items-center gap-4">
                    <button className="relative rounded-full p-2 text-white hover:bg-neutral-50 hover:text-primary transition-all">
                        <i className="ti ti-bell text-xl"></i>
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                        </span>
                    </button>
                    
                    <div className="h-8 w-px bg-neutral-200 hidden sm:block"></div>
                    
                    <div className="hidden sm:flex items-center gap-3 cursor-pointer group">
                        <div className="text-right">
                            <p className="text-xs font-semibold text-white">Usuario</p>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">Operador</p>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-primary group-hover:border-primary transition-all">
                            <i className="ti ti-user text-lg"></i>
                        </div>
                    </div>

                    {/* Botón hamburguesa */}
                    <button
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        className="md:hidden text-white hover:text-secondary p-2"
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
                                        ? 'bg-primary/10 text-primary'
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
