interface ToastProps {
    mensaje: string;
    tipo: 'exito' | 'error';
    visible: boolean;
    onClose: () => void;
}

export const Toast = ({ mensaje, tipo, visible, onClose }: ToastProps) => {
    if (!visible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-slide-up">
            <div className={`p-4 rounded-lg shadow-2xl flex items-center gap-4 ${
                tipo === 'exito' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
            }`}>
                <span className="flex-1 text-sm font-medium">{mensaje}</span>
                <button 
                    onClick={onClose}
                    className="text-white hover:text-gray-200 transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};