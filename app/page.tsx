import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex justify-center items-center h-[100vh]">
          <div className="border-0 md:border-2 p-10 rounded-2xl border-blue-500">
              <h1 className="text-2xl text-center text-blue-500 mb-8">WEB QUIZZ APP</h1>
              <form className="space-y-4 font-[sans-serif] max-w-md mx-auto">
                  <input type="email" placeholder="Enter Email"
                         className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"/>

                  <input type="password" placeholder="Enter Password"
                         className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded"/>

                  <div className="flex">
                      <input type="checkbox" className="w-4"/>
                      <label className="text-sm ml-4 ">Remember me</label>
                  </div>

                  <div className="mt-8 w-full px-4 py-2.5 mx-auto text-center text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                      <Link href="/dashboard" type="button">Submit</Link>
                  </div>
              </form>
          </div>
      </div>
  );
}
