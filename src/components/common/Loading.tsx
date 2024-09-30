import Section from "./Section"



const Loading = () => {
    return (
        <Section>
            <div className="py-5 font-bold text-lg text-center flex items-center justify-center gap-3">
                <span>Loading...</span>
                <AnimateSpin />
            </div>
        </Section>
    )
}

export default Loading

export const AnimateSpin = () => {
    return <div className="size-4 border-dashed border-4 border-primary rounded-full animate-spin"></div>
}