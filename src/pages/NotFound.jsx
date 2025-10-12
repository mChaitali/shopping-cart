import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-lg mb-6">Oops! The page you are looking for does not exist.</p>
            <Link
                to="/"
                className="px-4 py-2 rounded transition bg-[#185574] text-white hover:bg-[#012233] focus:ring-[#185574]"
            >
                Go Home
            </Link>
        </div>
    );
}
