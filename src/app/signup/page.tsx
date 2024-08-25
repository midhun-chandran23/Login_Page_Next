"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [buttonText, setButtonText] = React.useState("Signup");

    const onSignup = async () => {
        try {
            setLoading(true);
            setButtonText("Creating profile..");
            const response = await axios.post("/api/users/signup", user);
            setButtonText("Successfully registered.");
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        } catch (error: any) {
            setButtonText("Signup");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl sm:text-6xl text-center font-bold">Signup</h1>
            <hr className="w-2/3 sm:w-1/3 my-8 border-gray-300" />

            <div className="w-5/6 sm:w-1/2">
                <label htmlFor="username" className="text-lg mb-2">
                    Username
                </label>
                <input
                    className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                />

                <label htmlFor="email" className="text-lg mb-2">
                    Email
                </label>
                <input
                    className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />

                <label htmlFor="password" className="text-lg mb-2">
                    Password
                </label>
                <input
                    className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />

                <button
                    onClick={onSignup}
                    className="w-full p-4 font-bold rounded-lg bg-green-500 hover:bg-green-600 text-white focus:outline-none"
                    disabled={buttonDisabled || loading}
                >
                    {buttonText}
                </button>

                <div className="mt-4 text-center">
                    Already have an account? <Link href="/login">Visit Login page</Link>
                </div>
            </div>
        </div>
    );
}