"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "none");
    }, []);


    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                await axios.post('/api/users/verifyemail', { token });
                setVerified(true);
            } catch (error: any) {
                setError(true);
            }
        }
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl text-center font-bold">Verify Email</h1>
            <hr className="w-1/3 my-8 border-gray-300" />
            {!verified && !error &&
                <h2 className="p-4 text-white-bold text-4xl">
                    {token ? "Verifying.." : "Checking.."}
                </h2>
            }
            {verified && (
                <div className="mt-8">
                    <h2 className="text-4xl text-center">Email Verified</h2>
                    <Link
                        className="w-full mt-8 p-4 rounded-lg bg-green-500 hover:bg-green-600 text-white focus:outline-none flex items-center justify-center"
                        href="/login"
                    >
                        <span className="font-bold">Log In</span>
                    </Link>
                </div>
            )}

            {error && (
                <div className="mt-8">
                    <h2 className="p-5 text-4xl text-center bg-red-500 text-white">Invalid Token</h2>
                </div>
            )}
        </div>
    );


}