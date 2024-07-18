"use client"
import RegisterForm from "@/src/components/RegisterForm";

export default function Home() {

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="border-0 max-w-lg md:border-2 p-10 rounded-2xl border-blue-500">
                <h1 className="text-2xl text-center text-blue-500 mb-8">WEB QUIZZ APP Register a user </h1>
                <RegisterForm/>
            </div>
        </div>
    );
}
