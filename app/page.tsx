"use client"
import LoginForm from "@/src/components/LoginForm";

export default function Home() {

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="border-0 max-w-lg md:border-2 p-10 rounded-2xl border-blue-500">
                <h1 className="text-2xl text-center text-blue-500 mb-8">WEB QUIZZ APP</h1>
                    <LoginForm/>
            </div>
        </div>
    );
}
