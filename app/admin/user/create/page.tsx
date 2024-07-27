import RegisterForm from "@/src/components/RegisterForm";


export default function UserCreate() {

    return (
        <div className="flex justify-center items-center">
            <div className="border-0 max-w-lg md:border-2 p-10 rounded-2xl border-blue-500">
                <h1 className="text-2xl text-center text-blue-500 mb-8">WEB QUIZZ APP Register a user </h1>
                <RegisterForm/>
            </div>
        </div>
    )
}