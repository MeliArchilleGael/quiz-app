import RegisterForm from "@/src/components/RegisterForm";


export default function UserCreate() {

    return (
        <div className="flex justify-center items-center">
            <div className="border-0 p-10 rounded-2xl w-3/5">
                <h1 className="text-2xl text-center mb-8"> Crée un nouveau utilisateur  </h1>
                <RegisterForm/>
            </div>
        </div>
    )
}