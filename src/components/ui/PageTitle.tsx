interface Props {
    title: string;
    subtitle: string;
    estilo?: string;
    estiloSubtitle?: string;
}



export const PageTitle = ({title, subtitle, estilo, estiloSubtitle}:Props) => {
    return (
        <header>
            <h1 className={estilo}>
                {title}
            </h1>
            <h2 className={estiloSubtitle}>
                {subtitle}
            </h2>
        </header>
    )
}


