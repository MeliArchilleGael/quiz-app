import React from "react";
import Link from "next/link";
import Dropdown from "@/src/components/Admin/Dropdown";
import {deleteSession} from "@/src/actions/session";
import {signOut} from "next-auth/react";

export default function Navbar() {

    const logOut = async () => {
        await deleteSession()
        await signOut({callbackUrl: '/'})
    }


    return (
        <>
            {/* Navbar */}
            <nav
                className=" top-0 left-0 w-full z-10 bg-transparent p-4">
                <div
                    className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <Link
                        href='/dashboard'
                        className="text-xl uppercase hidden lg:inline-block font-semibold">
                        Dashboard Admin
                    </Link>

                    <div className="hidden flex-row md:flex md:justify-between py-2 lg:ml-auto mr-5 md:items-center">
                        <div>
                            <p>Date Aujourd&apos;hui</p>
                            <p>{new Date().toLocaleDateString("fr-FR")}</p>
                        </div>
                        <i className="fa fa-calendar-alt m-2 text-3xl"/>
                    </div>
                    {/* Form */}
                    {/* User */}
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <Dropdown>
                            <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <span
                                                    className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                                                    <img
                                                        alt="..."
                                                        className="w-full rounded-full align-middle border-none shadow-lg"
                                                        src={"/assets/images/user.png"}
                                                    />
                                                  </span>
                                            </button>
                                        </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href="">Profile</Dropdown.Link>
                                <Dropdown.Button onClick={logOut}>
                                    Log Out
                                </Dropdown.Button>
                            </Dropdown.Content>
                        </Dropdown>
                    </ul>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    );
}
