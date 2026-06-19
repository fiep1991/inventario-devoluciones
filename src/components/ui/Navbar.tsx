import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
    const location = useLocation();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const links = [
        { to: '/', label: 'Inicio' },
        { to: '/recepcion', label: 'Recepción' },
        { to: '/coordinador', label: 'Coordinador' },
        { to: '/calidad', label: 'Calidad' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm shadow-md px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">
                <div className="text-lg font-bold text-purple-700">
                    Devoluciones CLQ
                </div>

                {/* Menú desktop */}
                <div className="hidden md:flex gap-4">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                location.pathname === link.to
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-700 hover:bg-purple-300'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Botón hamburguesa (solo móvil) */}
                <button
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    className="md:hidden text-gray-700 hover:text-purple-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Menú móvil desplegable */}
                {menuAbierto && (
                    <div className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-sm shadow-lg md:hidden">
                        <div className="flex flex-col p-4 gap-2">
                            {links.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMenuAbierto(false)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        location.pathname === link.to
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-700 hover:bg-naranja'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};