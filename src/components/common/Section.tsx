import { ReactNode } from "react"


const Section = (props: { children: ReactNode, className?: string }) => {
    const { children, className } = props
    return (
        <section className={`${className ? className : null}`}>
            <div className="container mx-auto">
                {children}
            </div>
        </section>
    )
}

export default Section