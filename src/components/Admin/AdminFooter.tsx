import React from "react"

const AuthFooter = () => {
    return (
        <div className="container mx-auto px-4">
            <hr className="mb-4 border-blueGray-200"/>
            <div className="w-full px-4">
                <div className="text-sm text-blueGray-500 text-center font-semibold py-1">
                    Copyright © {new Date().getFullYear()}
                </div>
            </div>
        </div>
    )
}

export default AuthFooter
