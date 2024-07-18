import {StepperProps} from "@/src/types/compoment";

export default function Stepper({steps, goTo}: {
    steps: StepperProps[],
    goTo: (index: number) => void
}) {
    const handleClickStep = (step: StepperProps, index: number) => {
        if (step.active) {
            goTo(index)
        }
    }

    return (
        steps.map((step: StepperProps, index: number) =>
            <div key={index} className="flex max-w-12 items-center w-full">
                <div onClick={() => handleClickStep(step, index)}
                     className={`w-8 h-8 shrink-0 mx-[-1px] p-1.5 cursor-pointer flex items-center justify-center rounded-full ${step.active ? "bg-blue-600" : "bg-gray-300"}`}>
                    <span className="text-base text-white font-bold">{step.num}</span>
                </div>
                {!step.lastElement &&
                    <div className={step.active ? "w-full h-1 bg-blue-600 " : "w-full h-1 bg-gray-300"}></div>
                }
            </div>
        )
    )
}