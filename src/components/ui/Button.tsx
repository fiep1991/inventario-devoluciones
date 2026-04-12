interface Props {
    texto: string;
    variant?: "primary" | "accent";
    size?: "sm" | "md" | "lg" | "full";
    type?: "submit" | "button";
    onClick?: () => void;
}

export const Boton = ({
    texto,
    variant = "primary",
    size = "md",
    onClick
}: Props) => {

    const variants = {
        primary: "bg-gradient-to-r from-[#a35fc1] to-[#9c9aee] hover:from-[#f27405] hover:to-[#9c9aee]",
        accent: "bg-gradient-to-r from-[#f27405] to-[#f29f05] hover:from-[#f29f05] hover:to-[#f27405]",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-lg",
        lg: "px-10 py-4 text-2xl",
        full: "w-full py-4 text-xl",
    };

    return (
        <button onClick={onClick}
        type="button"
            className={`
                
        mt-6
        rounded-2xl
        text-neutral
        transition-all duration-300
        cursor-pointer
        shadow-xl/30
        hover:scale-110
        ${variants[variant]}
        ${sizes[size]}
        `}
        >
            {texto}
        </button>
    );
};